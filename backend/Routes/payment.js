import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession, stripeWebhook } from "../Controllers/paymentController.js";

const router = express.Router();

// Checkout session route
router.post("/checkout-session/:bookingId", authenticate, getCheckoutSession);

// Webhook route - note: this needs raw body, handled in index.js
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

export default router;
