import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  console.log(req.body.isSeller);
  const newConversation = new Conversation({
    id: req.body.isSeller
      ? req.body.buyer + req.body.seller
      : req.body.seller + req.body.buyer,
    sellerId: req.body.isSeller ? req.body.buyer : req.body.seller,
    buyerId: req.body.isSeller ? req.body.seller : req.body.buyer,
    readBySeller: req.body.isSeller,
    readByBuyer: !req.body.isSeller,
  });

  try {
    // console.log(newConversation)
    const savedConversation = await newConversation.save();
    // console.log("pp")
    res.status(201).send(savedConversation);
    // console.log("ll")
  } catch (err) {
    // console.log(err)
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    // console.log("hello")
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    console.log("hi");
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
