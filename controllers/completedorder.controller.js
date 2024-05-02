// import createError from "../utils/createError.js";
// import CompletedOrder from "../models/completedorder.model.js";
// import Gig from "../models/gig.model.js";
// import Stripe from "stripe";
import completedOrder from "../models/completed.model.js";
import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";

import dotenv from "dotenv";
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
const sendEmail = async (req, res) => {
  const user = await User.findById(req.sellerId);
  const gig = await Gig.findById(JSON.parse(req.cgigId));
  // console.log(user.email);
  const date=req.completedAt.toString().substring(0,10)
  const info = await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: user.email,
    subject: "subject",
    html:`
        <p>Dear Freelancer,</p>
        <p>We are pleased to inform you that you have received a payment of ₹ ${req.price} for completing the project title "${req.title}" under category "${gig.cat}".</p>
        <p>The project was successfully completed on ${date} as per the requirements provided by the client ${req.buyerName}.</p>
        <p>Thank you for your hard work and dedication.</p>
        <p>Best regards,<br/>Worknest Team</p>
      `
  });
  // console.log("Message sent: %s", info.messageId);
};

export const postCompletedOrders = async (req, res, next) => {
  // console.log(req.body.order);
  const newCompletedOrder = new completedOrder({
    orderId: req.body.order._id,
    cgigId: JSON.stringify(req.body.order.gigId),
    img: req.body.order.img,
    title: req.body.order.title,
    buyerId: req.body.order.buyerId,
    sellerId: req.body.order.sellerId,
    buyerName: req.body.order.buyerName,
    sellerName: req.body.order.sellerName,
    price: req.body.order.price,
    completedAt: req.body.order.createdAt,
    // // payment_intent: paymentIntent.id,
  });

  try {
    const savednewCompletedOrder = await newCompletedOrder.save();
    res.status(201).json(savednewCompletedOrder);
    sendEmail(newCompletedOrder);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getCompletedOrders = async (req, res, next) => {
  try {
    // console.log(req.userId)
    const CompletedOrders = await completedOrder.find({
      $or: [{ sellerId: req.userId }, { buyerId: req.userId }],
      // isCompleted: true,
    });
    // console.log(req);
    res.status(200).send(CompletedOrders);
  } catch (err) {
    next(err);
  }
};
