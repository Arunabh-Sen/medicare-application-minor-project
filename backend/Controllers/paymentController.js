import Stripe from "stripe";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckoutSession = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId).populate("user").populate("mongoDocId");

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // Create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.protocol}://${req.get("host")}/api/v1/doctors/profile/me`, // Fallback or user dashboard
            customer_email: booking.user.email,
            client_reference_id: booking._id.toString(),
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        unit_amount: booking.ticketPrice * 100, // Amount in paise
                        product_data: {
                            name: `Appointment with Dr. ${booking.doctorName}`,
                            description: `Specialty: ${booking.doctorSpecialty || "General"}`,
                        },
                    },
                    quantity: 1,
                },
            ],
        });

        res.status(200).json({ success: true, message: "Successfully created checkout session", session });
    } catch (err) {
        console.error("Stripe Session Error:", err);
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
};

export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    console.log("🔔 Webhook received! Signature:", sig ? "Present" : "Missing");

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log("✅ Webhook verified! Event Type:", event.type);
    } catch (err) {
        console.error("❌ Webhook signature verification failed:", err.message);
        console.error("Check your STRIPE_WEBHOOK_SECRET in .env. If using Stripe CLI, use the secret from 'stripe listen'.");
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const bookingId = session.client_reference_id;

        console.log(`💳 Checkout completed for session: ${session.id}, BookingID: ${bookingId}`);

        try {
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { isPaid: true }, { new: true });
            if (updatedBooking) {
                console.log(`✅ Success: Booking ${bookingId} marked as paid.`);
            } else {
                console.error(`⚠️ Warning: Booking ${bookingId} not found in database.`);
            }
        } catch (err) {
            console.error("❌ Error updating database:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    res.json({ received: true });
};

export const verifyPayment = async (req, res) => {
    const { session_id } = req.query;

    if (!session_id) {
        return res.status(400).json({ success: false, message: "No session ID provided" });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status !== "paid") {
            return res.status(400).json({ success: false, message: "Payment not completed" });
        }

        const bookingId = session.client_reference_id;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { isPaid: true, status: "approved" },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        console.log(`✅ Payment verified via session: Booking ${bookingId} marked as paid.`);
        res.status(200).json({ success: true, message: "Payment verified and booking updated", data: updatedBooking });
    } catch (err) {
        console.error("❌ Error verifying payment:", err);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};


