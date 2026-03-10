import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // For real DB doctors (seeded or registered)
    mongoDocId: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      default: null,
    },
    // For static doctorData fallback (local integer id "1", "2", etc.)
    doctorId: { type: String, default: null },
    doctorName: { type: String, required: true },
    doctorSpecialty: { type: String },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: Number, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "completed"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
