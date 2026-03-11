import express from "express";
import {
    createBooking,
    getMyBookings,
    getDoctorAppointments,
    updateBookingStatus,
    cancelBooking,
    deleteBooking,
} from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Patient routes
router.post("/", authenticate, restrict(["patient"]), createBooking);
router.get("/my-bookings", authenticate, restrict(["patient"]), getMyBookings);
router.put("/:id/cancel", authenticate, restrict(["patient"]), cancelBooking);

// Doctor routes
router.get("/doctor-appointments", authenticate, restrict(["doctor"]), getDoctorAppointments);
router.put("/:id/status", authenticate, restrict(["doctor"]), updateBookingStatus);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteBooking);

export default router;
