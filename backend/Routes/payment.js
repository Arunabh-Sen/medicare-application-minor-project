import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession, stripeWebhook, verifyPayment } from "../Controllers/paymentController.js";

const router = express.Router();

// Checkout session route
router.post("/checkout-session/:bookingId", authenticate, getCheckoutSession);

// Webhook route - note: this needs raw body, handled in index.js
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Verify payment after Stripe redirect (uses session_id query param)
router.get("/verify-payment", authenticate, verifyPayment);

export default router;
