import React, { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";
import { FaUserMd } from "react-icons/fa";

const Dashboard = () => {
    const { data, loading, error } = useFetchData(`${BASE_URL}/doctors/profile/me`);
    const [tab, setTab] = useState("overview");

    return (
        <section style={{ padding: "60px 0", background: "#f8faff", minHeight: "70vh" }}>
            <div className="container">
                {loading && !error && <Loader />}
                {error && !loading && <Error />}

                {!loading && !error && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "260px 1fr",
                        gap: "36px",
                        alignItems: "start",
                    }}
                        className="doc__dashboard__grid"
                    >
                        {/* Sidebar Tabs */}
                        <Tabs tab={tab} setTab={setTab} doctorId={data._id} />

                        {/* Main Content */}
                        <div>
                            {/* Approval Banner */}
                            {data.isApproved === "pending" && (
                                <div style={{
                                    display: "flex",
                                    gap: 12,
                                    alignItems: "flex-start",
                                    background: "#fef9c3",
                                    border: "1px solid #fcd34d",
                                    borderRadius: 12,
                                    padding: "14px 18px",
                                    marginBottom: 24,
                                    color: "#92400e",
                                    fontSize: 14,
                                    fontWeight: 500,
                                }}>
                                    <span style={{ fontSize: 18 }}></span>
                                    <span>To get approval please complete your profile. We'll review manually and approve within 3 days.</span>
                                </div>
                            )}

                            {/* Tab Content */}
                            <div>
                                {tab === "overview" && (
                                    <div>
                                        {/* Doctor header card */}
                                        <div style={{
                                            background: "#fff",
                                            borderRadius: 20,
                                            border: "1.5px solid #eaeff6",
                                            padding: "28px 28px",
                                            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 24,
                                            marginBottom: 28,
                                        }}>
                                            {/* Avatar */}
                                            <div style={{
                                                width: 80, height: 80,
                                                borderRadius: "50%",
                                                background: "linear-gradient(135deg, #c5d8ff, #a0c0ff)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 36, color: "#0067ff", flexShrink: 0,
                                            }}>
                                                <FaUserMd />
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                {data.specialization && (
                                                    <span style={{
                                                        display: "inline-block",
                                                        background: "#e0f2fe",
                                                        color: "#0369a1",
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        letterSpacing: "0.08em",
                                                        textTransform: "uppercase",
                                                        padding: "3px 12px",
                                                        borderRadius: 100,
                                                        marginBottom: 8,
                                                    }}>
                                                        {data.specialization}
                                                    </span>
                                                )}
                                                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#181a1e", marginBottom: 6 }}>
                                                    {data.name}
                                                </h3>
                                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                                    <img src={starIcon} alt="" style={{ width: 16 }} />
                                                    <span style={{ fontWeight: 700, color: "#181a1e" }}>{data.averageRating}</span>
                                                    <span style={{ color: "#4e545f", fontSize: 14 }}>({data.totalRating} ratings)</span>
                                                </div>
                                                {data.bio && (
                                                    <p style={{ fontSize: 14, color: "#4e545f", lineHeight: 1.6 }}>{data.bio}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* About Section */}
                                        <DoctorAbout
                                            name={data.name}
                                            about={data.about}
                                            qualifications={data.qualifications}
                                            experiences={data.experiences}
                                        />
                                    </div>
                                )}

                                {tab === "appointments" && (
                                    <Appointments />
                                )}

                                {tab === "settings" && <Profile doctorData={data} />}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .doc__dashboard__grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Dashboard;
