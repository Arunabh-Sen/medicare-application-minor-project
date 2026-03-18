import express from "express";
import {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRouter);

// ✅ Specific routes BEFORE dynamic /:id — otherwise Express treats "profile" as an ID
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
router.get("/", getAllDoctor);
router.get("/:id", getSingleDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

export default router;
