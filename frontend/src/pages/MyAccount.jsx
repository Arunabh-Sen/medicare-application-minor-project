import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../config";
import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";
import { toast } from "react-toastify";

const MyAccount = () => {
    const { dispatch } = useContext(authContext);
    const [tab, setTab] = useState("bookings");
    const navigate = useNavigate();

    const {
        data: userData,
        loading,
        error,
    } = useFetchData(`${BASE_URL}/users/profile/me`);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            dispatch({ type: "LOGOUT" });
            toast.success(result.message);
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <section style={{ padding: "60px 0", background: "#f8faff", minHeight: "70vh" }}>
            <div className="container">
                {loading && !error && <Loading />}
                {error && !loading && <Error errMessage={error} />}

                {!loading && !error && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "280px 1fr",
                        gap: "40px",
                        alignItems: "start",
                    }}
                        className="dashboard__grid"
                    >
                        {/* Sidebar */}
                        <div style={{
                            background: "#fff",
                            borderRadius: "20px",
                            border: "1.5px solid #eaeff6",
                            padding: "36px 24px",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                            textAlign: "center",
                        }}>
                            {/* User initials avatar */}
                            <div style={{
                                width: 80, height: 80,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #c5d8ff, #a0c0ff)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 30, fontWeight: 800, color: "#0067ff",
                                margin: "0 auto 16px",
                            }}>
                                {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#181a1e", marginBottom: 6 }}>
                                {userData.name}
                            </h3>
                            <p style={{ fontSize: 14, color: "#4e545f", marginBottom: 6 }}>
                                {userData.email}
                            </p>
                            {userData.bloodType && (
                                <p style={{ fontSize: 14, color: "#4e545f" }}>
                                    Blood Type:{" "}
                                    <span style={{ fontWeight: 700, fontSize: 18, color: "#181a1e" }}>
                                        {userData.bloodType}
                                    </span>
                                </p>
                            )}

                            <div style={{ marginTop: 40 }}>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: "100%",
                                        background: "#181a1e",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 10,
                                        padding: "12px 0",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        marginBottom: 12,
                                        transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    style={{
                                        width: "100%",
                                        background: "#ef4444",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 10,
                                        padding: "12px 0",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        {/* Main content */}
                        <div>
                            {/* Tab buttons */}
                            <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
                                <button
                                    onClick={() => setTab("bookings")}
                                    style={{
                                        padding: "10px 26px",
                                        borderRadius: 50,
                                        border: "2px solid #0067ff",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        background: tab === "bookings" ? "#0067ff" : "#fff",
                                        color: tab === "bookings" ? "#fff" : "#0067ff",
                                    }}
                                >
                                    My Bookings
                                </button>
                                <button
                                    onClick={() => setTab("settings")}
                                    style={{
                                        padding: "10px 26px",
                                        borderRadius: 50,
                                        border: "2px solid #0067ff",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        background: tab === "settings" ? "#0067ff" : "#fff",
                                        color: tab === "settings" ? "#fff" : "#0067ff",
                                    }}
                                >
                                    Profile Settings
                                </button>
                            </div>

                            {tab === "bookings" && <MyBookings />}
                            {tab === "settings" && <Profile user={userData} />}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .dashboard__grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default MyAccount;
