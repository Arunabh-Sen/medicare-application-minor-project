import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

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

    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
        });
    }, [doctorData]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const updateProfileHandler = async (e) => {
        e.preventDefault();

        try {
            const authToken = localStorage.getItem("token");
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw Error(result.message);
            }

            toast.success(result.message);
        } catch (err) {
            toast.error(err.message);
        }
    };

    // reusable function for adding item
    const addItem = (key, item) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: [...prevFormData[key], item],
        }));
    };

    // reusable handle input change
    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            const updateItems = [...prevFormData[key]];
            updateItems[index][name] = value;
            return {
                ...prevFormData,
                [key]: updateItems,
            };
        });
    };

    // reusable function for deleting item
    const deleteItem = (key, index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_, i) => i !== index),
        }));
    };

    const addQualification = (e) => {
        e.preventDefault();
        addItem("qualifications", {
            startingDate: "",
            endingDate: "",
            degree: "PHD",
            university: "Dhaka Medical College",
        });
    };

    const handleQualificationChange = (event, index) => {
        handleReusableInputChangeFunc("qualifications", index, event);
    };

    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem("qualifications", index);
    };

    const addExperience = (e) => {
        e.preventDefault();
        addItem("experiences", {
            startingDate: "",
            endingDate: "",
            position: "Senior Surgeon",
            hospital: "Dhaka Medical College",
        });
    };

    const handleExperienceChange = (event, index) => {
        handleReusableInputChangeFunc("experiences", index, event);
    };

    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteItem("experiences", index);
    };

    const addTimeSlot = (e) => {
        e.preventDefault();
        addItem("timeSlots", { day: "Sunday", startingTime: "10:00", endingTime: "11:00" });
    };

    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChangeFunc("timeSlots", index, event);
    };

    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem("timeSlots", index);
    };

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>
            <form>
                <div className="mb-5">
                    <p className="form__label">Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="form__input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Email*</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="form__input"
                        readOnly
                        aria-readonly
                        disabled={true}
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Phone*</p>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="form__input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Bio*</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Bio"
                        maxLength={100}
                        className="form__input"
                    />
                </div>

                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className="form__label">Gender*</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="form__input py-3"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Specialization*</p>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="form__input py-3"
                            >
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Ticket Price*</p>
                            <input
                                type="number"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                onChange={handleInputChange}
                                placeholder="100"
                                className="form__input"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <p className="form__label">Qualifications*</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        onChange={(e) => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        onChange={(e) => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Degree*</p>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={item.degree}
                                        onChange={(e) => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">University*</p>
                                    <input
                                        type="text"
                                        name="university"
                                        value={item.university}
                                        onChange={(e) => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={(e) => deleteQualification(e, index)}
                                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addQualification}
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                    >
                        Add Qualification
                    </button>
                </div>

                <div className="mb-5">
                    <p className="form__label">Experiences*</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Position*</p>
                                    <input
                                        type="text"
                                        name="position"
                                        value={item.position}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Hospital*</p>
                                    <input
                                        type="text"
                                        name="hospital"
                                        value={item.hospital}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={(e) => deleteExperience(e, index)}
                                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addExperience}
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                    >
                        Add Experience
                    </button>
                </div>

                <div className="mb-5">
                    <p className="form__label">Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5 mt-5">
                                <div>
                                    <p className="form__label">Day*</p>
                                    <select
                                        name="day"
                                        value={item.day}
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                        className="form__input py-3"
                                    >
                                        <option value="">Select</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="form__label">Starting Time*</p>
                                    <input
                                        type="time"
                                        name="startingTime"
                                        value={item.startingTime}
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Time*</p>
                                    <input
                                        type="time"
                                        name="endingTime"
                                        value={item.endingTime}
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={(e) => deleteTimeSlot(e, index)}
                                        className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer"
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addTimeSlot}
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                    >
                        Add TimeSlot
                    </button>
                </div>

                <div className="mb-5">
                    <p className="form__label">About*</p>
                    <textarea
                        name="about"
                        rows={5}
                        value={formData.about}
                        onChange={handleInputChange}
                        placeholder="Write about you"
                        className="form__input"
                    ></textarea>
                </div>


                <div className="mt-7">
                    <button
                        type="submit"
                        onClick={updateProfileHandler}
                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
