const nodemailer = require('nodemailer');
require('dotenv').config();
const emailTemplate = require('../emailTemplate');

const mailsender = async (email, title, url) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: 'PrepDSA',
            to: email,
            subject: title,
            html: emailTemplate(url),
        });

        // console.log(info);
    } catch (e) {
        console.log("In Utils", e.message);
    }
}

module.exports = mailsender;
