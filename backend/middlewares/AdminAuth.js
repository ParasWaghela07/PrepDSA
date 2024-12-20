const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.isAdmin=async(req,res,next)=>{
    try{

        let token=req.cookies.token;
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            if(payload.role!=='admin'){
                return res.status(400).json({
                    success:false,
                    message:"Only Admins are allowed !"
                })
            }
            req.payload=payload;
        }
        catch(e){
            console.log(e);
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(e){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
}