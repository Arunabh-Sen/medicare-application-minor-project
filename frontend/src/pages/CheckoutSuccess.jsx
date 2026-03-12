import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { authContext } from "../context/AuthContext";

const CheckoutSuccess = () => {
    const { role } = useContext(authContext);

    return (
        <div style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
        }}>
            <div style={{
                background: "#fff",
                padding: "48px",
                borderRadius: "24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                maxWidth: "500px",
                width: "100%",
                textAlign: "center",
                border: "1px solid #f0f4f8"
            }}>
                <div style={{
                    fontSize: "80px",
                    color: "#22c55e",
                    marginBottom: "24px",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <FaCheckCircle />
                </div>
                <h2 style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#181a1e",
                    marginBottom: "12px"
                }}>
                    Payment Successful!
                </h2>
                <p style={{
                    fontSize: "16px",
                    color: "#4e545f",
                    lineHeight: "1.6",
                    marginBottom: "32px"
                }}>
                    Thank you for your payment. Your appointment has been successfully confirmed and marked as paid.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Link
                        to="/home"
                        style={{
                            display: "block",
                            padding: "14px",
                            background: "#0067ff",
                            color: "#fff",
                            borderRadius: "12px",
                            fontWeight: 700,
                            textDecoration: "none",
                            transition: "all 0.3s ease"
                        }}
                    >
                        Return to Homepage
                    </Link>
                    <Link
                        to={role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}
                        style={{
                            display: "block",
                            padding: "14px",
                            background: "#f0f4f8",
                            color: "#181a1e",
                            borderRadius: "12px",
                            fontWeight: 700,
                            textDecoration: "none",
                            transition: "all 0.3s ease"
                        }}
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default CheckoutSuccess;
