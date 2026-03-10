/**
 * Seed script – inserts 8 predefined doctors into MongoDB.
 * Run once: node seed.js
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Doctor from "./models/DoctorSchema.js";

dotenv.config();

const doctors = [
    {
        name: "Dr. Rahul Sharma",
        email: "rahul.sharma@medicare.com",
        specialization: "Surgeon",
        gender: "male",
        ticketPrice: 500,
        bio: "Board-certified surgeon with 15+ years in general and laparoscopic surgery.",
        about: "Dr. Rahul Sharma is a board-certified surgeon with over 15 years of experience in general and laparoscopic surgery. He is known for his compassionate care and precise surgical technique.",
        qualifications: [
            { startingDate: "2003", endingDate: "2008", degree: "MS (Surgery)", university: "AIIMS Delhi" },
            { startingDate: "2008", endingDate: "2011", degree: "Fellowship", university: "Tata Memorial Hospital" },
        ],
        experiences: [
            { startingDate: "2012", endingDate: "2018", position: "Senior Surgeon", hospital: "Apollo Hospital" },
            { startingDate: "2018", endingDate: "Present", position: "Head of Surgery", hospital: "Max Super Speciality Hospital" },
        ],
        timeSlots: [
            { day: "Sunday", startingTime: "4:00 PM", endingTime: "9:30 PM" },
            { day: "Tuesday", startingTime: "4:00 PM", endingTime: "9:30 PM" },
            { day: "Wednesday", startingTime: "4:00 PM", endingTime: "9:30 PM" },
        ],
        averageRating: 4.8,
        totalRating: 272,
        isApproved: "approved",
        role: "doctor",
    },
    {
        name: "Dr. Anjali Gupta",
        email: "anjali.gupta@medicare.com",
        specialization: "Cardiologist",
        gender: "female",
        ticketPrice: 600,
        bio: "Leading cardiologist with 12 years of specialized experience in interventional cardiology.",
        about: "Dr. Anjali Gupta is a leading cardiologist with 12 years of specialized experience in interventional cardiology. She has treated thousands of patients with heart conditions and is passionate about preventive cardiac care.",
        qualifications: [
            { startingDate: "2005", endingDate: "2010", degree: "MD (Cardiology)", university: "AIIMS Delhi" },
            { startingDate: "2010", endingDate: "2013", degree: "Fellowship", university: "Cleveland Clinic" },
        ],
        experiences: [
            { startingDate: "2013", endingDate: "2019", position: "Consultant Cardiologist", hospital: "Fortis Hospital" },
            { startingDate: "2019", endingDate: "Present", position: "Senior Cardiologist", hospital: "Medanta - The Medicity" },
        ],
        timeSlots: [
            { day: "Monday", startingTime: "10:00 AM", endingTime: "2:00 PM" },
            { day: "Thursday", startingTime: "4:00 PM", endingTime: "8:00 PM" },
            { day: "Saturday", startingTime: "9:00 AM", endingTime: "1:00 PM" },
        ],
        averageRating: 4.7,
        totalRating: 198,
        isApproved: "approved",
        role: "doctor",
    },
    {
        name: "Dr. Ishaan Malhotra",
        email: "ishaan.malhotra@medicare.com",
        specialization: "Neurologist",
        gender: "male",
        ticketPrice: 550,
        bio: "Specialises in neurological disorders including epilepsy, Parkinson's disease, and stroke management.",
        about: "Dr. Ishaan Malhotra specialises in neurological disorders including epilepsy, Parkinson's disease, and stroke management. With 10+ years in neurology, he combines cutting-edge diagnostics with a patient-first approach.",
        qualifications: [
            { startingDate: "2006", endingDate: "2012", degree: "MD (Neurology)", university: "NIMHANS" },
        ],
        experiences: [
            { startingDate: "2012", endingDate: "2018", position: "Neurologist", hospital: "NIMHANS" },
            { startingDate: "2018", endingDate: "Present", position: "Senior Neurologist", hospital: "Manipal Hospital" },
        ],
        timeSlots: [
            { day: "Sunday", startingTime: "12:00 PM", endingTime: "4:00 PM" },
            { day: "Wednesday", startingTime: "5:00 PM", endingTime: "9:00 PM" },
        ],
        averageRating: 4.6,
        totalRating: 143,
        isApproved: "approved",
        role: "doctor",
    },
    {
        name: "Dr. Priya Sharma",
        email: "priya.sharma@medicare.com",
        specialization: "Gynecologist",
        gender: "female",
        ticketPrice: 450,
        bio: "One of the most trusted gynecologists with 18 years of experience in high-risk pregnancies.",
        about: "Dr. Priya Sharma is one of the most trusted gynecologists in the city with 18 years of experience. She specialises in high-risk pregnancies, infertility treatment, and minimally invasive gynecological surgeries.",
        qualifications: [
            { startingDate: "2000", endingDate: "2006", degree: "MS (Gynecology)", university: "KEM Hospital" },
            { startingDate: "2006", endingDate: "2009", degree: "Fellowship", university: "Royal College of Obstetricians" },
        ],
        experiences: [
            { startingDate: "2009", endingDate: "2015", position: "Gynecologist", hospital: "Jaslok Hospital" },
            { startingDate: "2015", endingDate: "Present", position: "Head of Gynecology", hospital: "Nanavati Hospital" },
        ],
        timeSlots: [
            { day: "Monday", startingTime: "9:00 AM", endingTime: "1:00 PM" },
            { day: "Wednesday", startingTime: "2:00 PM", endingTime: "6:00 PM" },
            { day: "Friday", startingTime: "10:00 AM", endingTime: "2:00 PM" },
        ],
        averageRating: 4.9,
        totalRating: 311,
        isApproved: "approved",
        role: "doctor",
    },
    {
        name: "Dr. Rajesh Iyer",
        email: "rajesh.iyer@medicare.com",
        specialization: "Oncologist",
        gender: "male",
        ticketPrice: 700,
        bio: "Dedicated oncologist with expertise in medical oncology and chemotherapy management.",
        about: "Dr. Rajesh Iyer is a dedicated oncologist with expertise in medical oncology and chemotherapy management. He provides comprehensive cancer care with a focus on quality of life and personalised treatment plans.",
        qualifications: [
            { startingDate: "2004", endingDate: "2011", degree: "MD (Oncology)", university: "Kidwai Memorial Institute of Oncology" },
        ],
        experiences: [
            { startingDate: "2011", endingDate: "2017", position: "Oncologist", hospital: "Kidwai Memorial" },
            { startingDate: "2017", endingDate: "Present", position: "Consultant Oncologist", hospital: "HCG Cancer Centre" },
        ],
        timeSlots: [
            { day: "Tuesday", startingTime: "10:00 AM", endingTime: "2:00 PM" },
            { day: "Friday", startingTime: "3:00 PM", endingTime: "7:00 PM" },
        ],
        averageRating: 4.5,
        totalRating: 89,
        isApproved: "approved",
        role: "doctor",
    },
    {
        name: "Dr. Sunita Deshmukh",
        email: "sunita.deshmukh@medicare.com",
        specialization: "Dermatologist",
        gender: "female",
        ticketPrice: 400,
        bio: "Expert dermatologist with 9 years of experience treating skin, hair, and nail conditions.",
        about: "Dr. Sunita Deshmukh is an expert dermatologist with 9 years of experience treating skin, hair, and nail conditions. She has a special interest in cosmetic dermatology and acne management.",
        qualifications: [
            { startingDate: "2008", endingDate: "2013", degree: "DDV (Dermatology)", university: "T. N. Medical College" },
        ],
        experiences: [
            { startingDate: "2013", endingDate: "2020", position: "Dermatologist", hospital: "Kaya Skin Clinic" },
            { startingDate: "2020", endingDate: "Present", position: "Senior Dermatologist", hospital: "Nanavati Hospital" },
        ],
        timeSlots: [
            { day: "Monday", startingTime: "3:00 PM", endingTime: "7:00 PM" },
            { day: "Thursday", startingTime: "10:00 AM", endingTime: "2:00 PM" },
        ],
        averageRating: 4.8,
        totalRating: 215,
        isApproved: "approved",
        role: "doctor",
    },
    {
        name: "Dr. Tanmay Bhatt",
        email: "tanmay.bhatt@medicare.com",
        specialization: "Orthopedist",
        gender: "male",
        ticketPrice: 500,
        bio: "Orthopedic surgeon specializing in joint replacement, sports injuries, and spine surgery.",
        about: "Dr. Tanmay Bhatt is an orthopedic surgeon specializing in joint replacement, sports injuries, and spine surgery. He has performed over 1,000 successful orthopedic surgeries throughout his career.",
        qualifications: [
            { startingDate: "2007", endingDate: "2013", degree: "MS (Orthopedics)", university: "KEM Hospital" },
        ],
        experiences: [
            { startingDate: "2013", endingDate: "2019", position: "Orthopedic Surgeon", hospital: "Sion Hospital" },
            { startingDate: "2019", endingDate: "Present", position: "Consultant Orthopedist", hospital: "Saifee Hospital" },
        ],
        timeSlots: [
            { day: "Sunday", startingTime: "6:00 PM", endingTime: "9:00 PM" },
            { day: "Tuesday", startingTime: "6:00 PM", endingTime: "9:00 PM" },
            { day: "Thursday", startingTime: "6:00 PM", endingTime: "9:00 PM" },
        ],
        averageRating: 4.4,
        totalRating: 127,
        isApproved: "approved",
        role: "doctor",
    },
    {
        name: "Dr. Shalini Kulkarni",
        email: "shalini.kulkarni@medicare.com",
        specialization: "Psychiatrist",
        gender: "female",
        ticketPrice: 480,
        bio: "Compassionate psychiatrist with expertise in anxiety, depression, OCD, and adolescent mental health.",
        about: "Dr. Shalini Kulkarni is a compassionate psychiatrist with expertise in anxiety, depression, OCD, and adolescent mental health. She believes in a holistic, evidence-based approach to mental wellness.",
        qualifications: [
            { startingDate: "2006", endingDate: "2012", degree: "MD (Psychiatry)", university: "IHBAS" },
            { startingDate: "2012", endingDate: "2015", degree: "Fellowship", university: "King's College London" },
        ],
        experiences: [
            { startingDate: "2012", endingDate: "2018", position: "Psychiatrist", hospital: "VIMHANS" },
            { startingDate: "2018", endingDate: "Present", position: "Consultant Psychiatrist", hospital: "Aasra Mental Health" },
        ],
        timeSlots: [
            { day: "Monday", startingTime: "5:00 PM", endingTime: "9:00 PM" },
            { day: "Wednesday", startingTime: "5:00 PM", endingTime: "9:00 PM" },
            { day: "Saturday", startingTime: "10:00 AM", endingTime: "2:00 PM" },
        ],
        averageRating: 4.7,
        totalRating: 176,
        isApproved: "approved",
        role: "doctor",
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123", salt);

        let inserted = 0;
        let skipped = 0;

        for (const doc of doctors) {
            const exists = await Doctor.findOne({ email: doc.email });
            if (exists) {
                console.log(`⏭  Skipping ${doc.name} — already in DB`);
                skipped++;
                continue;
            }

            await Doctor.create({ ...doc, password: hashedPassword });
            console.log(`✅ Inserted ${doc.name} <${doc.email}>`);
            inserted++;
        }

        console.log(`\nDone! ${inserted} inserted, ${skipped} skipped.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed error:", err.message);
        process.exit(1);
    }
};

seed();
