const Question = require("../models/question");
const Company=require("../models/company");
const Topic=require("../models/topic");
const User = require("../models/user");
const {uploadImageToCloudinary}=require('../util/imageUploader');
const bcrypt = require("bcrypt");
const mongoose=require('mongoose');
const Sheet = require("../models/sheet");
const AptitudeQuestion = require("../models/aptitudeQuestion");
const TechQuestion=require("../models/techquestion");
const Quiz=require("../models/quiz");
require('dotenv').config();
const Interview=require('../models/interview');

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
    ).populate('solved_question_ids')
    .populate('bookmarkedquestions');;

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
      user:updatedUser
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
    ).populate('solved_question_ids')
    .populate('bookmarkedquestions');;

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
      user:updatedUser
    });
  } catch (error) {
    console.error("Error in removing bookmark:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while removing the bookmark. Please try again later.",
    });
  }
};


// exports.solved = async (req, res) => {
//     const { questionid ,difficulty} = req.body; 
//     const userId = req.payload.id;  
  
//     try {
     
//       if (!questionid) {
//         return res.status(400).json({
//           success: false,
//           message: "Question ID is required.",
//         });
//       }
  
//       let updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { $addToSet: { solved_question_ids: questionid } }, 
//         { new: true } 
//       ).populate('solved_question_ids')
//       .populate('bookmarkedquestions');;

//       if(difficulty==1){
//         updatedUser=await User.findByIdAndUpdate(userId,{$inc:{easy_question_count:1}},{new:true});
//       }
//       else if(difficulty==2){
//         updatedUser=await User.findByIdAndUpdate(userId,{$inc:{medium_question_count:1}},{new:true});
//       }
//       else{
//         updatedUser=await User.findByIdAndUpdate(userId,{$inc:{hard_question_count:1}},{new:true});
//       }
  
//       if (!updatedUser) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found.",
//         });
//       }
//       // console.log(updatedUser);
//       return res.status(201).json({
//         success: true,
//         message: "Question solved successfully.",
//         data: updatedUser.solved_question_ids, 
//         user:updatedUser
//       });
//     } catch (error) {
//       console.error("Error in solving question:", error);
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred during solving. Please try again later.",
//       });
//     }
// };

exports.solved = async (req, res) => {
  const { questionid, difficulty } = req.body;
  const userId = req.payload.id;

  try {
      if (!questionid) {
          return res.status(400).json({
              success: false,
              message: "Question ID is required.",
          });
      }

      // Define the increment field based on difficulty
      const incrementField = 
          difficulty == 1 ? { easy_question_count: 1 } :
          difficulty == 2 ? { medium_question_count: 1 } :
          { hard_question_count: 1 };

      // Update solved questions and increment count in one query
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
              $addToSet: { solved_question_ids: questionid },
              $inc: incrementField
          },
          { new: true }
      )
      .populate('solved_question_ids')
      .populate('bookmarkedquestions');

      if (!updatedUser) {
          return res.status(404).json({
              success: false,
              message: "User not found.",
          });
      }

      // console.log(updatedUser);
      return res.status(201).json({
          success: true,
          message: "Question solved successfully.",
          data: updatedUser.solved_question_ids,
          user: updatedUser
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

exports.getallsheets=async(req,res)=>{
  try{
    const sheets=await Sheet.find({}).populate('question_list');
    // console.log(sheets);
    return res.status(200).json({
      success:true,
      message:"sheets retrieved successfully.",
      data:sheets
      });

  }
  catch(e){
      console.error("error in retireving sheets:",e);
      return res.status(500).json({
        success:false,
        message:"An error occurred while retrieving sheets. Please try again later."
      });
  }
}

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

exports.getquestionobject=async(req,res)=>{
  try {
    const qid = req.body;
    const question = await Question.findById(qid);
    if (!question) {
        return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ question });
} catch (err) {
    res.status(500).json({ message: 'Error fetching question', error: err.message });
}  
}

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
    const user=await User.findById(req.payload.id).populate({
      path:'solved_question_ids',
      populate:{path:'companies topics'}
    }
    ).populate({
      path:'bookmarkedquestions',
      populate:{path:'companies topics'}
    })
    .populate('quizzes')
    .populate('interviews');

    return res.status(200).json({
      success:true,
      message:"User details retrieved successfully.",
      data:user
    }); 
  }
  catch(error){
    console.error("Error in finding user:",error);
    return res.status(500).json({
      success:false,
      message:"An error occurred while retrieving user details. Please try again later."
  });
  }
}

exports.changeProfile = async (req, res) => {
  try {
    const userId = req.payload.id;
    const { name, username } = req.body;
    
    const updateData = {};

    if (req.files) {
      const imgfile  = req.files.imgfile;
      const response = await uploadImageToCloudinary(imgfile, process.env.FOLDER_NAME, 200, 80);
      updateData.userImg = response.secure_url;
    }
    
    if (name) {
      updateData.name = name;
    }
    
    if (username) {
      updateData.username = username;
    }

  
    if (Object.keys(updateData).length > 0) {
      await User.updateOne({ _id: userId }, { $set: updateData });
    }

    const updatedUser=await User.findById(userId).populate('solved_question_ids').populate('bookmarkedquestions');
    return res.status(200).json({
      success: true,
      message: 'Profile changed successfully.',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error in changing profile:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while changing profile. Please try again later.',
    });
  }
};

exports.changepassword=async(req,res)=>{
  try{
    const {oldPassword,newPassword}=req.body;
    const userId=req.payload.id;


    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found."
      });
    }

    const isMatch=await bcrypt.compare(oldPassword,user.password);
    if(!isMatch){
      return res.status(400).json({
        success:false,
        message:"Old password is incorrect."
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occurred while hashing the password.",
      });
    }

    const updatedUser=await User.findByIdAndUpdate(userId,{$set:{password:hashedPassword}},{new:true}).populate('solved_question_ids')
    .populate('bookmarkedquestions');;

    return res.status(200).json({
      success:true,
      message:"Password changed successfully.",
      user:updatedUser
    })
  }
  catch(error){
    console.error("Error in changing password:",error);
    return res.status(500).json({
      success:false,
      message:"An error occurred while changing password. Please try again later."
    });
  }
}

exports.getquestiondetail = async (req, res) => {
  try {
    const { qstid } = req.body;
   
    const question = await Question.findById(qstid)
    .populate('companies') 
    .populate({
        path: 'topics', 
        populate: { path: 'question_list' } 
    });
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

exports.gettopicdetail = async (req, res) => {
  try {
    const { topicid } = req.body;
   
    const topic = await Topic.findById(topicid)
    .populate('question_list');
    
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }

    // Return the question details if found
    return res.status(200).json({
      success: true,
      message: "Topic retrieved successfully.",
      data: topic,
    });

  } catch (error) {
    console.error("Error in fetching topic:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the topic details. Please try again later.",
    });
  }
};

exports.generatemock=async(req,res)=>{
  try {
    const company = req.body.company; // Assuming the company is passed in req.body.company

    // Fetch all questions
    const questions = await Question.find({})
        .populate('companies')
        // .populate({
        //     path: 'topics',
        //     populate: { path: 'question_list' }
        // });

    const aptiquestions = await AptitudeQuestion.find({});
    const techquestions = await TechQuestion.find({}).populate('tags');

    // Helper function to randomly select unique questions based on difficulty
    const getRandomQuestions = (questions, difficulty, count) => {
        const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
        const shuffled = filteredQuestions.sort(() => 0.5 - Math.random()); // Shuffle the array
        return shuffled.slice(0, count); // Select the first `count` questions
    };


    function filterds(question,company){
    //  console.log(question,company);
      for(let i=0;i<question.companies.length;i++){
        if(question.companies[i].company_name===company || !company) return true ;
      }
      return false ;
    }
    // Filter DSA questions based on the company
    const dsaQuestions = questions.filter(question => {
        // return question.companies.some(comp => comp.company_name == company);
        return filterds(question,company);
    });
    //console.log(dsaQuestions);
    // Select 1 easy, 1 medium, and 1 hard DSA question (difficulty levels 1, 2, 3)
    const easyDSA = getRandomQuestions(dsaQuestions, 1, 1);
    const mediumDSA = getRandomQuestions(dsaQuestions, 2, 1);
    const hardDSA = getRandomQuestions(dsaQuestions, 3, 1);
    
    // Combine DSA questions
    const selectedDSA = [...easyDSA, ...mediumDSA, ...hardDSA];
    //console.log(selectedDSA);
    // Select aptitude questions: 3 easy, 5 medium, 2 hard (difficulty levels as strings)
    const easyApti = getRandomQuestions(aptiquestions, 'Easy', 3);
    const mediumApti = getRandomQuestions(aptiquestions, 'Medium', 5);
    const hardApti = getRandomQuestions(aptiquestions, 'Hard', 2);

    // Combine aptitude questions
    const selectedApti = [...easyApti, ...mediumApti, ...hardApti];

    // Select technical questions randomly (no difficulty filter specified, so select 5 unique questions)
    const shuffledTech = techquestions.sort(() => 0.5 - Math.random());
    const selectedTech = shuffledTech.slice(0, 5);

    // Prepare the response object
    const response = {
        dsaQuestions: selectedDSA,
        aptiquestions: selectedApti,
        techquestions: selectedTech
    };

    // Send the response
    res.status(200).json(response);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}   
}

exports.endquiz=async(req,res)=>{
  try{
    const {quiz_duration,quiz_total_marks,quiz_score}=req.body;
    const userId=req.payload.id;

    const new_quiz=await Quiz.create({
      duration:quiz_duration+" Minutes",
      quiz_marks:quiz_total_marks,
      quiz_score:quiz_score,
      given_by:userId
    });

    await User.findByIdAndUpdate(userId,{$push:{quizzes:new_quiz._id}});

    return res.status(200).json({
      success:true,
      message:"Quiz ended successfully.",
      data:new_quiz
    });

  }
  catch(e){
    console.error("Error in ending quiz:",e);
    return res.status(500).json({
      success:false,
      message:"An error occurred while ending quiz. Please try again later."
    });
  }
}

exports.endinterview=async(req,res)=>{
  try{
    const {time,company,score,maxScore}=req.body;
    
    const userId=req.payload.id;

    const secondsTaken=3600-Number(time);
    const MinutesTaken=Math.ceil((secondsTaken/60));
    
    const newinterview=await Interview.create({
      interview_marks:maxScore,
      interview_score:score,
      company:company || null,
      duration:MinutesTaken+' Minutes',
      given_by:userId
    })

    await User.findByIdAndUpdate(userId,{$push:{interviews:newinterview._id}});

    return res.status(200).json({
      success:true,
      message:"Interview ended successfully.",
      data:newinterview
    });

  }
  catch(e){
    console.error("Error in ending interview:",e);
    return res.status(500).json({
      success:false,
      message:"An error occurred while ending interview. Please try again later."
    });
  }
}