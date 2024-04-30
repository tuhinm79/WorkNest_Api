import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";
export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: gig.price,
  //   currency: "inr",
  //   automatic_payment_methods: {
  //     enabled: true,
  //   },
  // });
  // const paymentIntent = i28d;
  // console.log(req.body);

  const newOrder = new Order({
    // orderId: _id,
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    buyerName: req.body.buyername,
    sellerName: gig.sellerName,
    deliveryTime: req.body.deliveryTime,
    // payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    // clientSecret: paymentIntent.client_secret,
  });
};

// export const createOrder = async (req, res, next) => {
//   // const stripe = new Stripe(process.env.STRIPE);

//   const gig = await Gig.findById(req.params.gigId);
//   console.log(gig);

//   const newOrder = new Order({
//     gigId: gig._id,
//     img: gig.cover,
//     title: gig.title,
//     buyerId: req.userId,
//     sellerId: gig.userId,
//     price: gig.price,
//     payment_intent: "temp",
//   });

//   await newOrder.save();

//   res.status(200).send("succesfull");
// };

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      // isCompleted: true,
    });
    // console.log(req.userId);
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
export const deleteorder = async (req, res, next) => {
  // console.log(req.params.id);
  try {
    const order = await Order.findById(req.params.id);
    // console.log(req.params.id,"   ", order.id);
    if (order.id !== req.params.id)
      return next(createError(403, "You can delete only your order!"));

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
