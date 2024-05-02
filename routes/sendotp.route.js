import express from "express";
import dotenv from "dotenv";
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const router = express.Router();
const sendEmail = async (req, res) => {
  const { otp, email } = req.body;
  console.log(email, otp);
  const info = await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "subject",
    text: otp,
  });
  console.log("Message sent: %s", info.messageId);
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log("error");
  //   } else {
  //     console.log("Email sent successfully!");
  //   }
  // });
};

router.post("/", sendEmail);
console.log(sendEmail);

export default router;
