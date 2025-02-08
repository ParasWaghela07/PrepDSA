const Tag=require('../models/tags');
const TechQuestion=require('../models/techquestion');

exports.getAllTags=async(req,res)=>{
    try{
        const tags=await Tag.find({}).populate('question_list');
        if(!tags){
            return res.status(404).json({
                success:false,
                message:"Tags not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"All tags are fetched",
            data:tags
        })
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Error during fetching all tags",
            error:e
        })
    }
}

exports.getAllTechQuestions = async (req, res) => {
    try {
        const questions = await TechQuestion.find({})
        .populate('companies')
            .populate('tags');
  
        return res.status(200).json({
            success: true,
            message: "Questions retrieved successfully.",
            data: questions
        });
    } catch (error) {
        console.error("Error in finding questions:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving techquestions. Please try again later."
        });
    }
};

exports.getTechQuestionDetail = async (req, res) => {
    try {
      const { qstid } = req.body;
     
      const question = await TechQuestion.findById(qstid).populate('companies').populate('tags') 
      if (!question) {
        return res.status(404).json({
          success: false,
          message: "Question not found.",
        });
      }
  
      // Return the question details if found
      return res.status(200).json({
        success: true,
        message: "Question retrieved successfully.",
        data: question,
      });
  
    } catch (error) {
      console.error("Error in fetching question:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the question. Please try again later.",
      });
    }
};

exports.getTagDetail = async (req, res) => {
    try {
      const { tagid } = req.body;
     
      const tag = await Tag.findById(tagid)
      .populate('question_list');
      
      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found.",
        });
      }
  
      // Return the question details if found
      return res.status(200).json({
        success: true,
        message: "Tag retrieved successfully.",
        data: tag,
      });
  
    } catch (error) {
      console.error("Error in fetching topic:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the tag details. Please try again later.",
      });
    }
};

