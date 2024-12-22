const Question = require("../models/question");
const User = require("../models/user");

exports.bookmark = async (req, res) => {
  const { questionid } = req.body; 
  const userId = req.payload.id;  

  try {
   
    if (!questionid) {
      return res.status(400).json({
        success: false,
        message: "Question ID is required.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookmarkedquestions: questionid } }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Question bookmarked successfully.",
      data: updatedUser.bookmarkedquestion, 
    });
  } catch (error) {
    console.error("Error in bookmarking question:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during bookmarking. Please try again later.",
    });
  }
};

exports.solved = async (req, res) => {
    const { questionid } = req.body; 
    const userId = req.payload.id;  
  
    try {
     
      if (!questionid) {
        return res.status(400).json({
          success: false,
          message: "Question ID is required.",
        });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { solved_question_ids: questionid } }, 
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      return res.status(201).json({
        success: true,
        message: "Question solved successfully.",
        data: updatedUser.bookmarkedquestion, 
      });
    } catch (error) {
      console.error("Error in solving question:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during solving. Please try again later.",
      });
    }
  };
  

  exports.getAllQuestions = async (req, res) => {
    try {
      const questions = await Question.find({});
      return res.status(200).json({
        success: true,
        message: "Questions retrieved successfully.",
        data: questions
      });
    } catch (error) {
      console.error("Error in finding questions:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving questions. Please try again later."
      });
    }
  };
  
  