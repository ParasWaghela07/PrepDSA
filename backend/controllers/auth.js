const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, password, name, email } = req.body;

  try {
    // Validate input
    if (!username || !password || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check for existing user with the same email or username
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email
          ? "This email is already registered."
          : "This username is already taken.",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occurred while hashing the password.",
      });
    }

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
    });

    // Save user to the database
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please log in to continue.",
    });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during signup. Please try again later.",
    });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if(!email || !password){
        return res.status(333).json({
            success:false,
            message:"All fields are required"
        })
    }
  
  
      const user = await User.findOne({ email });
      if(!user){
          return res.status(404).json({
              success:false,
              message:"Email id is not registered"
          })
      }
  
      if(await bcrypt.compare(password,user.password)){
        const payload={
            id:user._id,
            name:user.name,
            email:user.email
        }
  
        let token=jwt.sign(payload,process.env.JWT_SECRET);
  
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        return res.cookie('token',token,options).status(200).json({
            success:true,
            message:"Login Successful"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Incorrect Password"
        })
    }
  
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json("fail");
    }
  };
  
