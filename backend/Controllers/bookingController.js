import Booking from "../models/BookingSchema.js";

export const createBooking = async (req, res) => {
    const { doctorId, doctorName, doctorSpecialty, ticketPrice, timeSlot } = req.body;
    const userId = req.userId;

    if (!doctorId || !doctorName || !ticketPrice || !timeSlot) {
        return res.status(400).json({ success: false, message: "All booking details are required." });
    }

    try {
        const booking = new Booking({
            doctorId,
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
