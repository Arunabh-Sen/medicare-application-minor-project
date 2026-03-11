import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const Tabs = ({ tab, setTab, doctorId }) => {
    const { dispatch } = useContext(authContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your doctor account? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
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

    const tabStyle = (name) => ({
        width: "100%",
        padding: "12px 20px",
        borderRadius: 10,
        border: "none",
        textAlign: "left",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 8,
        transition: "all 0.2s ease",
        background: tab === name ? "rgba(0,103,255,0.1)" : "transparent",
        color: tab === name ? "#0067ff" : "#181a1e",
    });

    return (
        <div style={{
            background: "#fff",
            borderRadius: 20,
            border: "1.5px solid #eaeff6",
            padding: "28px 20px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            position: "sticky",
            top: 20,
        }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#8a97aa", textTransform: "uppercase", marginBottom: 16, paddingLeft: 8 }}>
                Navigation
            </p>

            <button onClick={() => setTab("overview")} style={tabStyle("overview")}>
                Overview
            </button>
            <button onClick={() => setTab("appointments")} style={tabStyle("appointments")}>
                Appointments
            </button>
            <button onClick={() => setTab("settings")} style={tabStyle("settings")}>
                Profile Settings
            </button>

            <div style={{ marginTop: 40, borderTop: "1.5px solid #eaeff6", paddingTop: 20 }}>
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
                        marginBottom: 10,
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
    );
};

export default Tabs;
