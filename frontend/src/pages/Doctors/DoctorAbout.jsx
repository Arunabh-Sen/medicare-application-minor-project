import React from "react";
import { formatDate } from "../../utils/formatDate";
import { HiAcademicCap, HiBriefcase } from "react-icons/hi";

const sectionTitleStyle = {
    fontSize: 20,
    fontWeight: 800,
    color: "#181a1e",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 10
};

const cardStyle = {
    background: "#fff",
    border: "1.5px solid #eaeff6",
    borderRadius: 16,
    padding: "20px",
    marginBottom: 16,
    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
    transition: "transform 0.2s ease",
};

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* About Section */}
            <div>
                <h3 style={sectionTitleStyle}>
                    About of <span style={{ color: "#0067ff" }}>{name}</span>
                </h3>
                <p style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: "#4e545f",
                    background: "#f8faff",
                    padding: "20px",
                    borderRadius: 16,
                    border: "1px solid #eaeff6"
                }}>
                    {about || "No description provided."}
                </p>
            </div>

            {/* Education Section */}
            <div>
                <h3 style={sectionTitleStyle}>
                    <HiAcademicCap style={{ color: "#0067ff", fontSize: 24 }} /> Education
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                    {qualifications?.length > 0 ? (
                        qualifications.map((item, index) => (
                            <div key={index} style={cardStyle}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                    <span style={{
                                        background: "#e0f2fe",
                                        color: "#0369a1",
                                        padding: "4px 12px",
                                        borderRadius: 100,
                                        fontSize: 13,
                                        fontWeight: 700
                                    }}>
                                        {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                                    </span>
                                </div>
                                <h4 style={{ fontSize: 17, fontWeight: 700, color: "#181a1e", marginBottom: 4 }}>
                                    {item.degree}
                                </h4>
                                <p style={{ fontSize: 14, color: "#4e545f", fontWeight: 500 }}>
                                    {item.university}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#8a97aa", fontSize: 14 }}>No education details added.</p>
                    )}
                </div>
            </div>

            {/* Experience Section */}
            <div>
                <h3 style={sectionTitleStyle}>
                    <HiBriefcase style={{ color: "#feb60d", fontSize: 24 }} /> Experience
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                    {experiences?.length > 0 ? (
                        experiences.map((item, index) => (
                            <div key={index} style={{ ...cardStyle, background: "#fffdf5", border: "1.5px solid #fff2cc" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                    <span style={{
                                        background: "#fff9ea",
                                        color: "#92400e",
                                        padding: "4px 12px",
                                        borderRadius: 100,
                                        fontSize: 13,
                                        fontWeight: 700
                                    }}>
                                        {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                                    </span>
                                </div>
                                <h4 style={{ fontSize: 17, fontWeight: 700, color: "#181a1e", marginBottom: 4 }}>
                                    {item.position}
                                </h4>
                                <p style={{ fontSize: 14, color: "#4e545f", fontWeight: 500 }}>
                                    {item.hospital}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#8a97aa", fontSize: 14 }}>No experience details added.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorAbout;
