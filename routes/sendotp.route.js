import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});
const sendEmail = async (req, res) => {
  const { otp, email } = req.body;
  // console.log(email, otp);
  const info = await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "subject",
    text: otp,
  });
  // console.log("Message sent: %s", info.messageId);
};

router.post("/", sendEmail);

export default router;
