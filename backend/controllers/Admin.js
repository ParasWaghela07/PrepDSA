const Company = require("../models/company");
const Topic = require("../models/topic");
const Question = require("../models/question");
const Sheet=require('../models/sheet');
const Tag=require('../models/tags');
const TechQuestion=require('../models/techquestion');
const { uploadImageToCloudinary } = require("../util/imageUploader");

exports.isAdminloggedin=async(req,res)=>{
  return res.status(200).json({
    success:true,
    message:"User Logged In"
  })
};




exports.addquestion = async (req, res) => {
    const { question_title, difficulty, companies, redirect_links, solution_links,time_complexity,space_complexity,topics } = req.body;
  
    try {
      if (!question_title || !difficulty || !redirect_links || !solution_links||!time_complexity||!space_complexity ||!topics) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }
  
      const newQuestion = new Question({
        question_title,
        difficulty,
        companies: companies || [], 
        redirectLinks:redirect_links,
        solution_links,
        time_complexity,
        space_complexity,
        topics: topics || [],
      });
  
      await newQuestion.save();
  
      if (Array.isArray(companies)) {
        for (const company of companies) {
          await Company.findByIdAndUpdate(
            { _id: company },
            { $push: { question_list: newQuestion.id } }
          );
        }
      }

      if (Array.isArray(topics)) {
        for (const topic of topics) {
          await Topic.findByIdAndUpdate(
            { _id: topic },
            { $push: { question_list: newQuestion.id } }
          );
        }
      }


  
      return res.status(201).json({
        success: true,
        message: "Question added successfully and associated with companies.",
      });
    } catch (error) {
      console.error("Error in question creation:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during question creation. Please try again later.",
      });
    }
};
  

exports.addcompany = async (req, res) => {
    try {
      const { company_name, question_list } = req.body;
  
      // Validate required fields
      if (!company_name) {
        return res.status(400).json({
          success: false,
          message: "Company name is required.",
        });
      }
  
      // Create a new company
      const newCompany = new Company({
        company_name,
        question_list: question_list || [], // Default to empty array if not provided
      });
  
      // Save to database
      await newCompany.save();
  
      return res.status(201).json({
        success: true,
        message: "Company added successfully.",
      });
    } catch (error) {
      console.error("Error in company creation:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the company. Please try again later.",
      });
    }
};

exports.addtopic = async (req, res) => {
    try {
      const { topic_name, question_list } = req.body;
  
      // Validate required fields
      if (!topic_name) {
        return res.status(400).json({
          success: false,
          message: "Topic name is required.",
        });
      }
  
      // Create a new company
      const newCompany = new Topic({
        topic_name,
        question_list: question_list || [], // Default to empty array if not provided
      });
  
      // Save to database
      await newCompany.save();
  
      return res.status(201).json({
        success: true,
        message: "Topic added successfully.",
      });
    } catch (error) {
      console.error("Error in topic creation:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the topic. Please try again later.",
      });
    }
};
  

exports.addsheet=async(req,res)=>{
    try{
      const {sheetname,questions}=req.body;
      // console.log(questions);
      if(!sheetname || !questions){
        return res.status(400).json({
          success:false,
          message:"All fields are required"
        })
      }

      

      await Sheet.create({
        sheet_name:sheetname,
        question_list:questions
      })

      return res.status(200).json({
        success:true,
        message:"Sheet added successfully"
      })
    }
    catch(error){
      console.error("Error in company creation:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the sheet. Please try again later.",
      });
    }
}

//   exports.addtag=async(req,res)=>{
//     try{
//         const {tagname}=req.body;
//         const data=await Tag.create({
//             tag_name:tagname
//         })

//         return res.status(200).json({
//             success:true,
//             message:"Tag created successfully",
//             data:data
//         })
//     }
//     catch(e){
//       console.error("Error in tag creation:", error);
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred while creating the tag. Please try again later.",
//       });
//     }
// }

exports.addtechquestion = async (req, res) => {
  const { question, answers, companies, tags } = req.body;

  // console.log(tags);
  try {
    if (!question || !answers || !tags) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    let tagsarr=[];
    for (const tagname of tags) {
      let tag=await Tag.findOne({tag_name:tagname});
      if(!tag) tag=await Tag.create({ tag_name: tagname });
  
      tagsarr.push(tag._id);
    }

    let secureqstImg;
    if(req.files){
      const qstImg=req.files.qstImg;
      const response=await uploadImageToCloudinary(qstImg, process.env.FOLDER_NAME, 200, 80);
      secureqstImg=response.secure_url;
    }
  
    const newQst=await TechQuestion.create({
      question:question,
      answer:answers,
      companies:companies||[],
      tags:tagsarr,
      qstImg:secureqstImg || ""
    })

    // console.log(newQst)

    if (Array.isArray(companies)) {
      for (const company of companies) {
        await Company.findByIdAndUpdate(
          { _id: company },
          { $push: { techquestions: newQst._id } }
        );
      }
    }

    if (Array.isArray(tagsarr)) {
      for (const tag of tagsarr) {
        await Tag.findByIdAndUpdate(
          { _id: tag },
          { $push: { question_list: newQst._id } }
        );
      }
    }



    return res.status(201).json({
      success: true,
      message: "Question added successfully and associated with companies.",
    });
  } catch (error) {
    console.error("Error in question creation:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during question creation. Please try again later.",
    });
  }
};