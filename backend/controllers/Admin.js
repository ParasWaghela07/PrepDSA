const Company = require("../models/company");
const Topic = require("../models/topic");
const Question = require("../models/question");
const Sheet=require('../models/sheet');


exports.addquestion = async (req, res) => {
    const { question_title, difficulty, companies, redirect_links, solution_links,time_complexity,topics } = req.body;
  
    try {
      if (!question_title || !difficulty || !redirect_links || !solution_links||!time_complexity ||!topics) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }
  
      const newQuestion = new Question({
        question_title,
        difficulty,
        companies: companies || [], 
        redirect_links,
        solution_links,
        time_complexity,
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