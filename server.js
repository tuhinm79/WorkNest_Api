import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
// import completedorder from "./routes/completedorder.route.js";
import completedorder from "./routes/completedorder.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import sendEmail from "./routes/sendotp.route.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://work-nest-client.vercel.app",
      "https://work-nest-client-git-main-tuhinm79s-projects.vercel.app",
      "https://work-nest-client-3k854jpzn-tuhinm79s-projects.vercel.app",
      "https://work-nest-client-tuhinm79s-projects.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/completedorder", completedorder);
app.use("/api/email", sendEmail);

// app.get("/", (req, res) => {
//   // Example response
//   res.json("hello");
// });

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
