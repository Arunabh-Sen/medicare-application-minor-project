import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
import paymentRoute from "./Routes/payment.js";
import { stripeWebhook } from "./Controllers/paymentController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
};

// ✅ Middleware FIRST
app.use(cors(corsOptions));
app.use(cookieParser());

// ✅ Routes with special body requirements (Stripe Webhook)
// This MUST come before express.json()
app.post("/api/v1/payments/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use("/api/v1/payments", paymentRoute);

app.use(express.json());


// ✅ Routes AFTER middleware
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

app.get("/", (req, res) => {
    res.send("API is working");
});

// Database connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB database connected");
    } catch (err) {
        console.log("MongoDB database connection failed");
    }
};

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});