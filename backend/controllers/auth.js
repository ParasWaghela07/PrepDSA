const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin=require('../models/admin');
const mailsender=require('../util/mailSender')

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

exports.adminsignup = async (req, res) => {
  const { username, password1,password2, name, email } = req.body;

  try {
    // Validate input
    if (!username || !password1 ||!password2 || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check for existing user with the same email or username
    const existingUser = await Admin.findOne({
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
    let hashedPassword1;
    try {
      hashedPassword1 = await bcrypt.hash(password1, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occurred while hashing the password.",
      });
    }

    let hashedPassword2;
    try {
      hashedPassword2 = await bcrypt.hash(password2, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occurred while hashing the password.",
      });
    }

    // Create a new user
    const newUser = new Admin({
      username:username,
      password1: hashedPassword1,
      password2: hashedPassword2,
      name:name,
      email:email
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
            email:user.email,
            role:"user"
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

exports.adminlogin = async (req, res) => {
  try {
    const { email, password1, password2 } = req.body;

    // Check if all fields are provided
    if (!email || !password1 || !password2) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find admin by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email ID is not registered",
      });
    }

    const isPassword1Valid = await bcrypt.compare(password1, user.password1);
    const isPassword2Valid = await bcrypt.compare(password2, user.password2);

    if (isPassword1Valid && isPassword2Valid) {
      // Create payload for JWT
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "admin",
      };

      // Generate JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d", 
      });

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
        httpOnly: true, 
      };

      return res
        .cookie("token", token, options)
        .status(200)
        .json({
          success: true,
          message: "Login successful",
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect passwords",
      });
    }
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
};

exports.isloggedin=async(req,res)=>{
  return res.status(200).json({
    success:true,
    message:"User Logged In"
  })
};

exports.logout=async(req,res)=>{
  try{
    return res.clearCookie('token').json({
        success: true,
        message: "User Logged Out Successfully"
    });
    
  }
  catch(e){
      return res.json({
          success:false,
          message:"Errors while logging out"
      })
  }
};

exports.resetpasswordtoken=async(req,res)=>{
  try{
    const {email}=req.body;

    if(!email){
      return res.status(400).json({
        success:false,
        message:"Email is required"
      });
    }

    const user=await User.findOne({email});

    if(!user){
      return res.status(400).json({
        success:false,
        message:"Email is not registered"
      });
    }

    const token=crypto.randomUUID();
    await User.findOneAndUpdate({email:email},{
      resetToken:token,
      resetTokenExpiration:Date.now()+5*60*1000
    },{new:true});
    
    const url=`http://localhost:3000/update-password/${token}`;

    await mailsender(email,"Password Reset Link",url);

    return res.status(200).json({
      success:true,
      message:"Email sent successfully, please check email and change password"
    });
  }
  catch(e){
    return res.status(500).json({
      success:false,
      message:"Errors while sending reset password password link"
    })
  }
}

exports.resetpassword=async(req,res)=>{
  try{
    const {password,confirmPassword,token}=req.body;

    if(password!==confirmPassword){
      return res.status(400).json({
        success:false,
        message:"Passwords are not matching"
      });
    }

    const user=await User.findOne({resetToken:token});

    if(!user){
      return res.status(400).json({
        success:false,
        message:"Token is invalid"
      });
    }

    if(user.resetTokenExpiration<Date.now()){
      return res.status(400).json({
        success:false,
        message:"Token is expired"  
      });
    }

    const hashedPassword=await bcrypt.hash(password,10);

    await User.findOneAndUpdate(
      {resetToken:token},
      {password:hashedPassword},
      {new:true},
  );

    return res.status(200).json({
      success:true,
      message:"Password reset successfully"
    });
  }
  catch(e){
    return res.status(500).json({
      success:false,
      message:"Errors while resetting password"
    })
  }
}

