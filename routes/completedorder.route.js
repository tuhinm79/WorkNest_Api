import express from "express";
import { verifyToken } from "../middleware/jwt.js";
// import {
// //   getCompletedOrders,
//   postCompletedOrders,
// } from "../controllers/completedorder.controller.js";
import { postCompletedOrders, getCompletedOrders } from "../controllers/completedorder.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken,  getCompletedOrders);
router.post("/", postCompletedOrders);
// router.put("/", verifyToken, confirm);

export default router;
