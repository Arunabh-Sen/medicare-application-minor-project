import express from "express";
import { createBooking, getMyBookings } from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/", authenticate, restrict(["patient"]), createBooking);
router.get("/my-bookings", authenticate, restrict(["patient"]), getMyBookings);

export default router;
