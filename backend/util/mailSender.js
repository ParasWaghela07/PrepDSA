const nodemailer=require('nodemailer');
require('dotenv').config();

const mailsender=async(email,title,url)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use true for 465, false for 587
            auth: {
              user: process.env.MAIL_USER, // Your email
              pass: process.env.MAIL_PASS, // Your app password
            },
          });
          

        let info = await transporter.sendMail({
            from:'PrepDSA',
            to:`${email}`,
            subject:title,
            html:`YOUR LINK :- <h3>${url}<h3>`
        })

        // console.log(info);
    }
    catch(e){
        console.log("In Utils " , e.message);
    }
}

module.exports=mailsender;