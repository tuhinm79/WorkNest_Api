import mongoose from "mongoose";
const { Schema } = mongoose;

const CompletedOrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },  
    cgigId: {
      type: String,
      required: true,
    },
    // orderId: {
    //   type: String,
    //   required: true,
    // },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    // sellerName: {
    //   type: String,
    //   required: true,
    // },
    // buyerName: {
    //   type: String,
    //   required: true,
    // },
    completedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CompletedOrder", CompletedOrderSchema);
