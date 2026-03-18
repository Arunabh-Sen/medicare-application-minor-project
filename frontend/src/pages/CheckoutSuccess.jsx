import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { authContext } from "../context/AuthContext";
import { BASE_URL } from "../config";

const CheckoutSuccess = () => {
    const { role, token } = useContext(authContext);
    const dashboardUrl = role === "doctor" ? "/doctors/profile/me" : "/users/profile/me";
    const [searchParams] = useSearchParams();
    const [verifying, setVerifying] = useState(true);
    const [verifyError, setVerifyError] = useState(null);

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        if (!sessionId) {
            setVerifying(false);
            return;
        }

        const verifyPayment = async () => {
            try {
                const res = await fetch(`${BASE_URL}/payments/verify-payment?session_id=${sessionId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await res.json();
                if (!res.ok) throw new Error(result.message);
            } catch (err) {
                setVerifyError(err.message);
            } finally {
                setVerifying(false);
            }
        };

        verifyPayment();
    }, [searchParams, token]);

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
                {verifying ? (
                    <>
                        <div style={{ fontSize: "60px", color: "#0067ff", marginBottom: "24px", display: "flex", justifyContent: "center" }}>
                            <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                        </div>
                        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#181a1e" }}>Confirming your payment...</h2>
                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                    </>
                ) : verifyError ? (
                    <>
                        <div style={{ fontSize: "60px", color: "#f59e0b", marginBottom: "24px", display: "flex", justifyContent: "center" }}>
                            <FaExclamationTriangle />
                        </div>
                        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#181a1e", marginBottom: "12px" }}>Payment Received</h2>
                        <p style={{ fontSize: "15px", color: "#4e545f", marginBottom: "32px" }}>
                            Your payment went through but we had trouble updating the record automatically. Please contact support if your dashboard still shows "Not Paid" after a few minutes.
                        </p>
                    </>
                ) : (
                    <>
                        <div style={{ fontSize: "80px", color: "#22c55e", marginBottom: "24px", display: "flex", justifyContent: "center" }}>
                            <FaCheckCircle />
                        </div>
                        <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#181a1e", marginBottom: "12px" }}>
                            Payment Successful!
                        </h2>
                        <p style={{ fontSize: "16px", color: "#4e545f", lineHeight: "1.6", marginBottom: "32px" }}>
                            Thank you for your payment. Your appointment has been successfully confirmed and marked as paid.
                        </p>
                    </>
                )}

                {!verifying && (
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
                            to={dashboardUrl}
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
                )}
            </div>
        </div>
    );
};

export default CheckoutSuccess;
