import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const createBooking = async (req, res) => {
    const { doctorId, mongoDocId, doctorName, doctorSpecialty, ticketPrice, timeSlot } = req.body;
    const userId = req.userId;

    if (!doctorName || !ticketPrice || !timeSlot) {
        return res.status(400).json({ success: false, message: "All booking details are required." });
    }

    try {
        const booking = new Booking({
            doctorId: doctorId || null,
            mongoDocId: mongoDocId || null,
            doctorName,
            doctorSpecialty,
            user: userId,
            ticketPrice,
            timeSlot,
        });

        await booking.save();

        res.status(201).json({ success: true, message: "Appointment booked successfully!", data: booking });
    } catch (err) {
        console.error("Booking error:", err);
        res.status(500).json({ success: false, message: "Failed to book appointment. Try again." });
    }
};

export const getMyBookings = async (req, res) => {
    const userId = req.userId;

    try {
        const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, message: "Bookings retrieved.", data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to retrieve bookings." });
    }
};

// Doctor fetches their appointments
export const getDoctorAppointments = async (req, res) => {
    const doctorId = req.userId;

    try {
        const bookings = await Booking.find({ mongoDocId: doctorId })
            .populate("user", "name email gender phone bloodType")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, message: "Appointments retrieved.", data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to retrieve appointments." });
    }
};

// Doctor updates appointment status
export const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const doctorId = req.userId;

    const validStatuses = ["pending", "approved", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
    }

    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }

        // Verify this doctor owns this booking
        if (booking.mongoDocId?.toString() !== doctorId.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update this booking." });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({ success: true, message: `Appointment marked as ${status}.`, data: booking });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update booking status." });
    }
};
