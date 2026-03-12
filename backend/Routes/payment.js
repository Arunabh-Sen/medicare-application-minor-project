import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession, stripeWebhook } from "../Controllers/paymentController.js";

const router = express.Router();

// Checkout session route
router.post("/checkout-session/:bookingId", authenticate, getCheckoutSession);

export default router;

