import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import { FaUserMd, FaCheck, FaClock, FaTimes, FaCheckDouble, FaFileInvoice } from "react-icons/fa";
import { BsCalendarCheck } from "react-icons/bs";

const statusConfig = {
    pending: { bg: "#fef9c3", color: "#92400e", label: "Pending", icon: "" },
    approved: { bg: "#dcfce7", color: "#166534", label: "Approved", icon: "" },
    cancelled: { bg: "#fee2e2", color: "#991b1b", label: "Cancelled", icon: "" },
    completed: { bg: "#e0f2fe", color: "#075985", label: "Completed", icon: "" },
};

const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status] || statusConfig.pending;
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 12, fontWeight: 700,
            background: cfg.bg, color: cfg.color,
            padding: "4px 12px", borderRadius: 100,
        }}>
            {cfg.icon} {cfg.label}
        </span>
    );
};

const AppointmentCard = ({ booking, onStatusChange, onDelete }) => {
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {

        if (!window.confirm("Are you sure you want to remove this appointment from your list?")) return;
        setDeleting(true);
        try {
            const res = await fetch(`${BASE_URL}/bookings/${booking._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                onDelete(booking._id);
            } else {
                alert(data.message || "Failed to delete booking.");
            }
        } catch {
            alert("Network error while deleting booking.");
        } finally {
            setDeleting(false);
        }
    };

    const changeStatus = async (newStatus) => {
        if (updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`${BASE_URL}/bookings/${booking._id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                onStatusChange(booking._id, newStatus);
            } else {
                alert(data.message || "Failed to update status");
            }
        } catch {
            alert("Network error while updating status");
        } finally {
            setUpdating(false);
        }
    };

    const patient = booking.user;

    return (
        <div style={{
            background: "#fff",
            borderRadius: 16,
            border: "1.5px solid #eaeff6",
            padding: "20px 24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            marginBottom: 16,
        }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                {/* Patient info */}
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 20, color: "#2563eb", flexShrink: 0,
                    }}>
                        {patient?.name?.charAt(0)?.toUpperCase() || "P"}
                    </div>
                    <div>
                        <p style={{ fontWeight: 700, color: "#181a1e", fontSize: 16, marginBottom: 2 }}>
                            {patient?.name || "Unknown Patient"}
                        </p>
                        <p style={{ color: "#4e545f", fontSize: 13 }}>{patient?.email}</p>
                        {patient?.gender && (
                            <p style={{ color: "#8a97aa", fontSize: 12, textTransform: "capitalize" }}>{patient.gender}</p>
                        )}
                    </div>
                </div>

                <StatusBadge status={booking.status} />
            </div>

            {/* Booking details */}
            <div style={{
                display: "flex", flexWrap: "wrap", gap: 20,
                marginTop: 14, paddingTop: 14,
                borderTop: "1px solid #f0f4f8",
                fontSize: 13, color: "#4e545f",
            }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <BsCalendarCheck style={{ color: "#0067ff" }} />
                    {booking.timeSlot}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    Ticket Price: ₹{booking.ticketPrice}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    Booked {new Date(booking.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                {booking.isPaid ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#16a34a", fontWeight: 600 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                        Paid
                    </span>
                ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#dc2626", fontWeight: 600 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                        Not Paid
                    </span>
                )}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                {booking.status !== "approved" && booking.status !== "completed" && (
                    <button
                        onClick={() => changeStatus("approved")}
                        disabled={updating}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 8,
                            background: "#dcfce7", color: "#166534",
                            border: "1px solid #86efac",
                            fontWeight: 600, fontSize: 13, cursor: "pointer",
                            opacity: updating ? 0.6 : 1,
                        }}
                    >
                        <FaCheck /> Approve
                    </button>
                )}
                {booking.status !== "completed" && booking.status !== "cancelled" && (
                    <button
                        onClick={() => changeStatus("completed")}
                        disabled={updating}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 8,
                            background: "#e0f2fe", color: "#075985",
                            border: "1px solid #7dd3fc",
                            fontWeight: 600, fontSize: 13, cursor: "pointer",
                            opacity: updating ? 0.6 : 1,
                        }}
                    >
                        <FaCheckDouble /> Mark Complete
                    </button>
                )}
                {booking.status !== "pending" && booking.status !== "cancelled" && booking.status !== "completed" && !booking.isPaid && (
                    <button
                        onClick={() => changeStatus("pending")}
                        disabled={updating}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 8,
                            background: "#fef9c3", color: "#92400e",
                            border: "1px solid #fcd34d",
                            fontWeight: 600, fontSize: 13, cursor: "pointer",
                            opacity: updating ? 0.6 : 1,
                        }}
                    >
                        <FaClock /> Set Pending
                    </button>
                )}
                {booking.status !== "cancelled" && booking.status !== "completed" && !booking.isPaid && (
                    <button
                        onClick={() => changeStatus("cancelled")}
                        disabled={updating || deleting}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 8,
                            background: "#fee2e2", color: "#991b1b",
                            border: "1px solid #fca5a5",
                            fontWeight: 600, fontSize: 13, cursor: "pointer",
                            opacity: (updating || deleting) ? 0.6 : 1,
                        }}
                    >
                        <FaTimes /> Cancel
                    </button>
                )}
                {(booking.status === "cancelled" || booking.status === "completed" || booking.isPaid) && (
                    <button
                        onClick={handleDelete}
                        disabled={updating || deleting}
                        style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 8,
                            background: "#181a1e", color: "#fff",
                            border: "1px solid #181a1e",
                            fontWeight: 600, fontSize: 13, cursor: "pointer",
                            opacity: (updating || deleting) ? 0.6 : 1,
                        }}
                    >
                        <FaTimes /> {deleting ? "Removing..." : "Remove from List"}
                    </button>
                )}
            </div>

        </div>
    );
};

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch(`${BASE_URL}/bookings/doctor-appointments`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to load appointments");
                setAppointments(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleStatusChange = (bookingId, newStatus) => {
        setAppointments((prev) =>
            prev.map((a) => (a._id === bookingId ? { ...a, status: newStatus } : a))
        );
    };

    const handleDelete = (bookingId) => {
        setAppointments((prev) => prev.filter((a) => a._id !== bookingId));
    };

    if (loading) return <p style={{ textAlign: "center", color: "#4e545f", paddingTop: 24 }}>Loading appointments…</p>;
    if (error) return <p style={{ color: "#dc2626", paddingTop: 16 }}>Error: {error}</p>;

    return (
        <div style={{ marginTop: 8 }}>
            {appointments.length === 0 ? (
                <div style={{
                    textAlign: "center", padding: "48px 24px",
                    background: "#fff", borderRadius: 16,
                    border: "1.5px solid #eaeff6",
                }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}></div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#181a1e", marginBottom: 8 }}>
                        No Appointments Yet
                    </h3>
                    <p style={{ fontSize: 15, color: "#4e545f" }}>
                        Patients haven't booked with you yet. Make sure your profile is complete!
                    </p>
                </div>
            ) : (
                <div>
                    <p style={{ fontSize: 14, color: "#8a97aa", marginBottom: 16, fontWeight: 600 }}>
                        {appointments.length} appointment{appointments.length !== 1 ? "s" : ""} total
                    </p>
                    {appointments.map((appt) => (
                        <AppointmentCard
                            key={appt._id}
                            booking={appt}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Appointments;
