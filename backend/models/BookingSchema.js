import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String, // static local ID (1, 2, 3 etc.) from doctorData
      required: true,
    },
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
      enum: ["pending", "approved", "cancelled"],
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
