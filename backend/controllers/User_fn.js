const Question = require("../models/question");
const Company=require("../models/company");
const Topic=require("../models/topic");
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
      data: updatedUser.bookmarkedquestions, 
    });
  } catch (error) {
    console.error("Error in bookmarking question:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during bookmarking. Please try again later.",
    });
  }
};
exports.popfrombookmark = async (req, res) => {
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
      { $pull: { bookmarkedquestions: questionid } }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Question removed from bookmarks successfully.",
      data: updatedUser.bookmarkedquestions, 
    });
  } catch (error) {
    console.error("Error in removing bookmark:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while removing the bookmark. Please try again later.",
    });
  }
};


exports.solved = async (req, res) => {
    const { questionid ,difficulty} = req.body; 
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

      if(difficulty==1){
        await User.findByIdAndUpdate(userId,{$inc:{easy_question_count:1}});
      }
      else if(difficulty==2){
        await User.findByIdAndUpdate(userId,{$inc:{medium_question_count:1}});
      }
      else{
        await User.findByIdAndUpdate(userId,{$inc:{hard_question_count:1}});
      }
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      return res.status(201).json({
        success: true,
        message: "Question solved successfully.",
        data: updatedUser.solved_question_ids, 
      });
    } catch (error) {
      console.error("Error in solving question:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during solving. Please try again later.",
      });
    }
};
exports.checksolvestatus=async(req,res)=>{
  const { questionid } = req.body;

  const userId =req.payload.id;
  try {
    if (!questionid) {
      return res.status(400).json({
        success: false,
        message: "Question ID is required.",
        });

    }
    const user = await User.findById(userId);
    const question = await Question.findById(questionid); 
    //  console.log(question);
    if (!user||!question) {
      return res.status(404).json({
        success: false,
        message: "User or question not found.",
        });
    }
    const solved = user.solved_question_ids.includes(questionid);
    if(solved){
      return res.status(200).json({
        success: true,
        message: "Question already solved.",
        data:true
        });
    }
    else{
      return res.status(200).json({
        success: false,
        message: "Question not solved.",
        data:false
        });
    }

}

catch (error) {
  console.error("Error in checking solve status:", error);
  return res.status(500).json({
    success: false,
    message: "An error occurred during checking solve status. Please try again later.",
  });
}
}

exports.checkbookmarkstatus=async(req,res)=>{
  const { questionid } = req.body;

  const userId =req.payload.id;
  try {
    if (!questionid) {
      return res.status(400).json({
        success: false,
        message: "Question ID is required.",
        });

    }
    const user = await User.findById(userId);
    const question = await Question.findById(questionid); 
    //  console.log(question);
    if (!user||!question) {
      return res.status(404).json({
        success: false,
        message: "User or question not found.",
        });
    }
    const solved = user.bookmarkedquestions.includes(questionid);
    if(solved){
      return res.status(200).json({
        success: true,
        message: "boolmark already solved.",
        data:true
        });
    }
    else{
      return res.status(200).json({
        success: false,
        message: "bookmark not solved.",
        data:false
        });
    }

}

catch (error) {
  console.error("Error in checking bookmark status:", error);
  return res.status(500).json({
    success: false,
    message: "An error occurred during checking bookmark status. Please try again later.",
  });
}
}



exports.getAllQuestions = async (req, res) => {
  try {
      const questions = await Question.find({})
          .populate('companies') 
          .populate('topics'); 

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


exports.getAllCompanies=async(req,res)=>{
  try{
    const companies=await Company.find({}).populate('question_list');
    return res.status(200).json({
      success:true,
      message:"All Companies retrieved successfully.",
      data:companies
    });
  }catch(error){
    console.error("Error in finding companies:",error);
    return res.status(500).json({
      success:false,
      message:"An error occurred while retrieving companies. Please try again later."
    });
  }
};

exports.getAllTopics=async(req,res)=>{
  try{
    const topics=await Topic.find({}).populate('question_list');
    return res.status(200).json({
      success:true,
      message:"All Topics retrieved successfully.",
      data:topics
    });
  }catch(error){
    console.error("Error in finding topics:",error);
    return res.status(500).json({
      success:false,
      message:"An error occurred while retrieving topics. Please try again later."
    });
  }
}
  
exports.getUserDetail=async(req,res)=>{
  try{
    const user=await User.findById(req.payload.id).populate('solved_question_ids').populate('bookmarkedquestions');
    return res.status(200).json({
      success:true,
      message:"User details retrieved successfully.",
      data:user
    }); 
  }
  catch(e){
    console.error("Error in finding user:",error);
    return res.status(500).json({
      success:false,
      message:"An error occurred while retrieving user details. Please try again later."
  });
  }
}