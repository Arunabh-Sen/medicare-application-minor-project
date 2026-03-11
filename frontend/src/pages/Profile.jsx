import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 15,
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

const Profile = ({ user }) => {
    const [saving, setSaving] = useState(false);
    const [updateStatus, setUpdateStatus] = useState({ type: 'idle', message: '' });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        bloodType: "",
        phone: "",
    });

    useEffect(() => {
        if (!user) return;
        setFormData({
            name: user.name || "",
            email: user.email || "",
            gender: user.gender || "",
            bloodType: user.bloodType || "",
            phone: user.phone || "",
        });
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setSaving(true);
        setUpdateStatus({ type: 'idle', message: '' });
        try {
            const authToken = localStorage.getItem("token");
            const res = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message);
            setUpdateStatus({ type: 'success', message: "Profile updated successfully! 🎉" });
        } catch (err) {
            setUpdateStatus({ type: 'error', message: err.message || "Failed to update profile" });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #eaeff6", padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#181a1e", marginBottom: 24 }}>Profile Settings</h2>

            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>Full Name *</p>
                    <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your full name" required />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>Email</p>
                    <input style={{ ...inputStyle, background: "#f8faff", color: "#8a97aa" }} type="email" name="email" value={formData.email} readOnly />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>Phone</p>
                    <input style={inputStyle} type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>New Password</p>
                    <input style={inputStyle} type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Leave blank to keep current" />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <p style={labelStyle}>Blood Type</p>
                    <input style={inputStyle} type="text" name="bloodType" value={formData.bloodType} onChange={handleInputChange} placeholder="e.g. O+" />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <p style={labelStyle}>Gender</p>
                    <select style={inputStyle} name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {updateStatus.type !== 'idle' && (
                    <div style={{
                        marginBottom: 20,
                        padding: '12px 16px',
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        background: updateStatus.type === 'success' ? '#f0fdf4' : '#fff1f2',
                        color: updateStatus.type === 'success' ? '#166534' : '#991b1b',
                        border: `1.5px solid ${updateStatus.type === 'success' ? '#bbf7d0' : '#fecdd3'}`,
                        animation: 'fadeInUp 0.3s ease-out'
                    }}>
                        {updateStatus.type === 'success' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        )}
                        <span>{updateStatus.message}</span>
                        <style>{`
                            @keyframes fadeInUp {
                                from { opacity: 0; transform: translateY(10px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                        `}</style>
                    </div>
                )}

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
                    }}
                >
                    {saving ? "Saving…" : "💾 Save Profile"}
                </button>
            </form>
        </div>
    );
};

export default Profile;
