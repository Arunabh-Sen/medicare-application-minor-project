import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 14,
    color: "#181a1e",
    outline: "none",
    background: "#fff",
    marginTop: 6,
    boxSizing: "border-box",
};

const labelStyle = {
    fontSize: 13,
    fontWeight: 700,
    color: "#4e545f",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
};

const sectionTitle = {
    fontSize: 15,
    fontWeight: 800,
    color: "#181a1e",
    marginBottom: 12,
    marginTop: 28,
    paddingBottom: 8,
    borderBottom: "2px solid #f0f4f8",
};

const addBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    background: "#181a1e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 12,
};

const deleteBtnStyle = {
    background: "#fee2e2",
    color: "#dc2626",
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    marginTop: 24,
};

const cardStyle = {
    background: "#f8faff",
    border: "1.5px solid #eaeff6",
    borderRadius: 12,
    padding: "16px 18px",
    marginBottom: 12,
};

const gridTwo = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 12,
};

const gridThree = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 16,
};

const Profile = ({ doctorData }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        bio: "",
        gender: "",
        specialization: "",
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!doctorData) return;
        setFormData({
            name: doctorData.name || "",
            email: doctorData.email || "",
            phone: doctorData.phone || "",
            bio: doctorData.bio || "",
            gender: doctorData.gender || "",
            specialization: doctorData.specialization || "",
            ticketPrice: doctorData.ticketPrice || 0,
            qualifications: doctorData.qualifications || [],
            experiences: doctorData.experiences || [],
            timeSlots: doctorData.timeSlots || [],
            about: doctorData.about || "",
        });
    }, [doctorData]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const authToken = localStorage.getItem("token");
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message);
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    /* ── Reusable array helpers ── */
    const addItem = (key, item) => {
        setFormData((prev) => ({ ...prev, [key]: [...prev[key], item] }));
    };
    const deleteItem = (key, index) => {
        setFormData((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
    };
    const handleArrayChange = (key, index, event) => {
        const { name, value } = event.target;
        setFormData((prev) => {
            const updated = [...prev[key]];
            updated[index] = { ...updated[index], [name]: value };
            return { ...prev, [key]: updated };
        });
    };

    /* Qualification */
    const addQualification = (e) => { e.preventDefault(); addItem("qualifications", { startingDate: "", endingDate: "", degree: "", university: "" }); };
    const deleteQualification = (e, i) => { e.preventDefault(); deleteItem("qualifications", i); };

    /* Experience */
    const addExperience = (e) => { e.preventDefault(); addItem("experiences", { startingDate: "", endingDate: "", position: "", hospital: "" }); };
    const deleteExperience = (e, i) => { e.preventDefault(); deleteItem("experiences", i); };

    /* Time Slots */
    const addTimeSlot = (e) => { e.preventDefault(); addItem("timeSlots", { day: "Monday", startingTime: "09:00", endingTime: "13:00" }); };
    const deleteTimeSlot = (e, i) => { e.preventDefault(); deleteItem("timeSlots", i); };

    return (
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #eaeff6", padding: "28px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#181a1e", marginBottom: 24 }}>
                Profile Settings
            </h2>

            <form onSubmit={updateProfileHandler}>
                {/* Basic Info */}
                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>Full Name *</p>
                    <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" required />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>Email</p>
                    <input style={{ ...inputStyle, background: "#f8faff", color: "#8a97aa" }} type="email" name="email" value={formData.email} disabled />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>Phone</p>
                    <input style={inputStyle} type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>Bio (max 150 chars)</p>
                    <input style={inputStyle} type="text" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Short bio shown on listing" maxLength={150} />
                </div>

                <div style={gridThree}>
                    <div>
                        <p style={labelStyle}>Gender *</p>
                        <select style={inputStyle} name="gender" value={formData.gender} onChange={handleInputChange} required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p style={labelStyle}>Specialization *</p>
                        <select style={inputStyle} name="specialization" value={formData.specialization} onChange={handleInputChange}>
                            <option value="">Select</option>
                            <option value="Surgeon">Surgeon</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Oncologist">Oncologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Orthopedist">Orthopedist</option>
                            <option value="Psychiatrist">Psychiatrist</option>
                            <option value="General Physician">General Physician</option>
                            <option value="Pediatrician">Pediatrician</option>
                        </select>
                    </div>
                    <div>
                        <p style={labelStyle}>Ticket Price (₹) *</p>
                        <input style={inputStyle} type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleInputChange} placeholder="500" min={0} />
                    </div>
                </div>

                {/* About */}
                <div style={{ marginTop: 16 }}>
                    <p style={labelStyle}>About</p>
                    <textarea
                        name="about"
                        rows={4}
                        value={formData.about}
                        onChange={handleInputChange}
                        placeholder="Write a detailed description about your practice…"
                        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                    />
                </div>

                {/* ── Qualifications ── */}
                <p style={sectionTitle}>📚 Qualifications</p>
                {formData.qualifications?.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <div style={gridTwo}>
                            <div>
                                <p style={labelStyle}>Starting Year</p>
                                <input style={inputStyle} type="text" name="startingDate" value={item.startingDate} onChange={(e) => handleArrayChange("qualifications", index, e)} placeholder="e.g. 2010" />
                            </div>
                            <div>
                                <p style={labelStyle}>Ending Year</p>
                                <input style={inputStyle} type="text" name="endingDate" value={item.endingDate} onChange={(e) => handleArrayChange("qualifications", index, e)} placeholder="e.g. 2015" />
                            </div>
                        </div>
                        <div style={gridTwo}>
                            <div>
                                <p style={labelStyle}>Degree</p>
                                <input style={inputStyle} type="text" name="degree" value={item.degree} onChange={(e) => handleArrayChange("qualifications", index, e)} placeholder="e.g. MD (Cardiology)" />
                            </div>
                            <div>
                                <p style={labelStyle}>University / Institution</p>
                                <input style={inputStyle} type="text" name="university" value={item.university} onChange={(e) => handleArrayChange("qualifications", index, e)} placeholder="e.g. AIIMS Delhi" />
                            </div>
                        </div>
                        <button style={deleteBtnStyle} onClick={(e) => deleteQualification(e, index)}><AiOutlineDelete /></button>
                    </div>
                ))}
                <button style={addBtnStyle} onClick={addQualification}><FiPlus /> Add Qualification</button>

                {/* ── Experiences ── */}
                <p style={sectionTitle}>💼 Experiences</p>
                {formData.experiences?.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <div style={gridTwo}>
                            <div>
                                <p style={labelStyle}>Starting Year</p>
                                <input style={inputStyle} type="text" name="startingDate" value={item.startingDate} onChange={(e) => handleArrayChange("experiences", index, e)} placeholder="e.g. 2015" />
                            </div>
                            <div>
                                <p style={labelStyle}>Ending Year</p>
                                <input style={inputStyle} type="text" name="endingDate" value={item.endingDate} onChange={(e) => handleArrayChange("experiences", index, e)} placeholder="e.g. Present" />
                            </div>
                        </div>
                        <div style={gridTwo}>
                            <div>
                                <p style={labelStyle}>Position / Role</p>
                                <input style={inputStyle} type="text" name="position" value={item.position} onChange={(e) => handleArrayChange("experiences", index, e)} placeholder="e.g. Senior Cardiologist" />
                            </div>
                            <div>
                                <p style={labelStyle}>Hospital / Clinic</p>
                                <input style={inputStyle} type="text" name="hospital" value={item.hospital} onChange={(e) => handleArrayChange("experiences", index, e)} placeholder="e.g. Apollo Hospital" />
                            </div>
                        </div>
                        <button style={deleteBtnStyle} onClick={(e) => deleteExperience(e, index)}><AiOutlineDelete /></button>
                    </div>
                ))}
                <button style={addBtnStyle} onClick={addExperience}><FiPlus /> Add Experience</button>

                {/* ── Time Slots ── */}
                <p style={sectionTitle}>🕐 Time Slots</p>
                {formData.timeSlots?.map((item, index) => (
                    <div key={index} style={{ ...cardStyle, display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
                        <div>
                            <p style={labelStyle}>Day</p>
                            <select style={inputStyle} name="day" value={item.day} onChange={(e) => handleArrayChange("timeSlots", index, e)}>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p style={labelStyle}>Start Time</p>
                            <input style={inputStyle} type="time" name="startingTime" value={item.startingTime} onChange={(e) => handleArrayChange("timeSlots", index, e)} />
                        </div>
                        <div>
                            <p style={labelStyle}>End Time</p>
                            <input style={inputStyle} type="time" name="endingTime" value={item.endingTime} onChange={(e) => handleArrayChange("timeSlots", index, e)} />
                        </div>
                        <button style={{ ...deleteBtnStyle, marginTop: 0, height: "fit-content" }} onClick={(e) => deleteTimeSlot(e, index)}>
                            <AiOutlineDelete />
                        </button>
                    </div>
                ))}
                <button style={addBtnStyle} onClick={addTimeSlot}><FiPlus /> Add Time Slot</button>

                {/* ── Save Button ── */}
                <div style={{ marginTop: 36 }}>
                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            width: "100%",
                            background: saving ? "#6b7280" : "#0067ff",
                            color: "#fff",
                            border: "none",
                            borderRadius: 12,
                            padding: "14px 0",
                            fontSize: 16,
                            fontWeight: 700,
                            cursor: saving ? "not-allowed" : "pointer",
                            transition: "opacity 0.2s",
                        }}
                        onMouseEnter={e => { if (!saving) e.currentTarget.style.opacity = "0.88" }}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        {saving ? "Saving…" : "💾 Save Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
