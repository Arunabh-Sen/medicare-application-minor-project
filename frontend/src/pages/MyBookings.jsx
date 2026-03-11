import React from "react";
import useFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../config";
import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";
import { FaUserMd } from "react-icons/fa";
import { BsCalendarCheck, BsClock } from "react-icons/bs";

const statusColors = {
    pending: { bg: "#fef9c3", text: "#92400e", label: "Pending" },
    approved: { bg: "#dcfce7", text: "#166534", label: "Confirmed" },
    cancelled: { bg: "#fee2e2", text: "#991b1b", label: "Cancelled" },
};

const BookingCard = ({ booking, onCancel }) => {
    const [cancelling, setCancelling] = React.useState(false);

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        setCancelling(true);
        try {
            const res = await fetch(`${BASE_URL}/bookings/${booking._id}/cancel`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
            if (res.ok) {
                onCancel();
            } else {
                alert(result.message || "Failed to cancel booking.");
            }
        } catch (err) {
            alert("Error cancelling booking.");
        } finally {
            setCancelling(false);
        }
    };

    const status = statusColors[booking.status] || statusColors.pending;

    return (
        <div style={{
            background: "#fff",
            borderRadius: 16,
            border: "1.5px solid #eaeff6",
            padding: "20px 22px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
        }}>
            {/* Avatar */}
            <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "linear-gradient(135deg, #c5d8ff, #a0c0ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, color: "#0067ff", flexShrink: 0,
            }}>
                <FaUserMd />
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                        <h4 style={{ fontSize: 16, fontWeight: 700, color: "#181a1e", marginBottom: 2 }}>
                            {booking.doctorName}
                        </h4>
                        {booking.doctorSpecialty && (
                            <span style={{
                                fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
                                textTransform: "uppercase", color: "#0067ff",
                            }}>
                                {booking.doctorSpecialty}
                            </span>
                        )}
                    </div>

                    <span style={{
                        fontSize: 12, fontWeight: 700, background: status.bg,
                        color: status.text, padding: "3px 12px", borderRadius: 100,
                    }}>
                        {status.label}
                    </span>
                </div>

                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#4e545f" }}>
                            <BsClock /> {booking.timeSlot}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#4e545f" }}>
                            <BsCalendarCheck /> ₹{booking.ticketPrice} ticket
                        </div>
                    </div>

                    {(booking.status === "pending" || booking.status === "approved") && (
                        <button
                            onClick={handleCancel}
                            disabled={cancelling}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#ef4444",
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: "pointer",
                                padding: "4px 8px",
                                borderRadius: 6,
                                transition: "all 0.2s",
                                textDecoration: "underline",
                                opacity: cancelling ? 0.6 : 1,
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}
                        >
                            {cancelling ? "Cancelling…" : "Cancel Appointment"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const MyBookings = () => {
    const {
        data: bookings,
        loading,
        error,
        refetch,
    } = useFetchData(`${BASE_URL}/bookings/my-bookings`);

    return (
        <div style={{ marginTop: 24 }}>
            {loading && !error && <Loading />}
            {error && !loading && <Error errMessage={error} />}

            {!loading && !error && bookings.length === 0 && (
                <div style={{
                    textAlign: "center", padding: "48px 24px",
                    background: "#fff", borderRadius: 16,
                    border: "1.5px solid #eaeff6",
                }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#181a1e", marginBottom: 8 }}>
                        No Appointments Yet
                    </h3>
                    <p style={{ fontSize: 15, color: "#4e545f" }}>
                        You haven't booked any doctors yet. Go to <strong>Find a Doctor</strong> to get started!
                    </p>
                </div>
            )}

            {!loading && !error && bookings.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#4e545f", marginBottom: 4 }}>
                        {bookings.length} appointment{bookings.length !== 1 ? "s" : ""} booked
                    </h3>
                    {bookings.map((b) => (
                        <BookingCard key={b._id} booking={b} onCancel={refetch} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
