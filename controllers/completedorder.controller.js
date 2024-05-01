// import createError from "../utils/createError.js";
// import CompletedOrder from "../models/completedorder.model.js";
// import Gig from "../models/gig.model.js";
// import Stripe from "stripe";
import completedOrder from "../models/completed.model.js";
export const postCompletedOrders = async (req, res, next) => {
// console.log(req.body.order);
  const newCompletedOrder = new completedOrder({
    orderId: req.body.order._id,
    cgigId: JSON.stringify(req.body.order.gigId),
    img: req.body.order.img,
    title: req.body.order.title,
    buyerId: req.body.order.buyerId,
    sellerId: req.body.order.sellerId,
    price: req.body.order.price,
    completedAt:req.body.order.createdAt,
    // // payment_intent: paymentIntent.id,
  });

  try {
    const savednewCompletedOrder = await newCompletedOrder.save();
    res.status(201).json(savednewCompletedOrder);
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
