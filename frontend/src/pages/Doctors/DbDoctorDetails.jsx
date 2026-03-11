import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BsStarFill, BsStar, BsStarHalf, BsCheckCircleFill, BsClock, BsCalendarCheck, BsArrowLeft } from 'react-icons/bs'
import { FaUserMd } from 'react-icons/fa'
import { BASE_URL } from '../../config'
import { authContext } from '../../context/AuthContext'
import DoctorAbout from './DoctorAbout'

const StarRow = ({ rating }) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) stars.push(<BsStarFill key={i} style={{ color: '#f4c430', fontSize: 14 }} />)
        else if (i - rating < 1) stars.push(<BsStarHalf key={i} style={{ color: '#f4c430', fontSize: 14 }} />)
        else stars.push(<BsStar key={i} style={{ color: '#d1d9e0', fontSize: 14 }} />)
    }
    return <div style={{ display: 'flex', gap: 3 }}>{stars}</div>
}

const DbDoctorDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { token, role } = useContext(authContext)

    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [bookingDate, setBookingDate] = useState('')
    const [bookingLoading, setBookingLoading] = useState(false)
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const [bookingError, setBookingError] = useState('')

    const getDayName = (dateString) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const d = new Date(dateString);
        return days[d.getDay()];
    }

    const selectedDay = bookingDate ? getDayName(bookingDate) : null;
    const availableSlots = (doctor && doctor.timeSlots) ? doctor.timeSlots.filter(s => s.day === selectedDay) : [];

    useEffect(() => {
        const fetch_ = async () => {
            try {
                const res = await fetch(`${BASE_URL}/doctors/${id}`)
                const data = await res.json()
                if (!res.ok) throw new Error(data.message)
                setDoctor(data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetch_()
        setSelectedSlot(null)
        setBookingSuccess(false)
    }, [id])

    const handleBooking = async () => {
        if (selectedSlot === null || !bookingDate) return
        if (!token) {
            setBookingError('Please log in to book an appointment.')
            setTimeout(() => setBookingError(''), 3500)
            return
        }
        if (role !== 'patient') {
            setBookingError('Only patients can book appointments.')
            setTimeout(() => setBookingError(''), 3500)
            return
        }

        const slot = doctor.timeSlots[selectedSlot]
        setBookingLoading(true)
        setBookingError('')

        try {
            const res = await fetch(`${BASE_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    mongoDocId: doctor._id,
                    doctorName: doctor.name,
                    doctorSpecialty: doctor.specialization,
                    ticketPrice: doctor.ticketPrice,
                    timeSlot: `${bookingDate} (${slot.day}) ${slot.startingTime} – ${slot.endingTime}`,
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Failed to book appointment')
            setBookingSuccess(true)
            setTimeout(() => setBookingSuccess(false), 3500)
        } catch (err) {
            setBookingError(err.message)
            setTimeout(() => setBookingError(''), 3500)
        } finally {
            setBookingLoading(false)
        }
    }

    if (loading) return (
        <section style={{ padding: '80px 20px', textAlign: 'center' }}>
            <p style={{ color: '#4e545f' }}>Loading doctor details…</p>
        </section>
    )

    if (error || !doctor) return (
        <section style={{ padding: '80px 20px', textAlign: 'center' }}>
            <p style={{ color: '#dc2626' }}>Error: {error || 'Doctor not found.'}</p>
            <button onClick={() => navigate('/doctors')} style={{ marginTop: 16, color: '#0067ff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                ← Back to Doctors
            </button>
        </section>
    )

    return (
        <section className="doctor__page__section">
            <div className="container">
                <button className="doc__back__btn" onClick={() => navigate('/doctors')}>
                    <BsArrowLeft /> Back to Doctors
                </button>

                <div className="doctor__layout">
                    {/* LEFT: Info */}
                    <div>
                        <div className="doctor__profile__card">
                            <div className="doctor__profile__img__wrapper">
                                <div className="doctor__avatar__placeholder">
                                    <FaUserMd />
                                </div>
                                {doctor.isApproved === 'approved' && <span className="doc__online__badge" />}
                            </div>
                            <div className="doctor__profile__info">
                                {doctor.specialization && (
                                    <span className="doc__specialty__tag">{doctor.specialization}</span>
                                )}
                                <h1 className="doc__name">{doctor.name}</h1>
                                <div className="doc__rating__row">
                                    <StarRow rating={doctor.averageRating || 0} />
                                    <span className="doc__rating__num">{doctor.averageRating}</span>
                                    <span className="doc__rating__count">({doctor.totalRating} ratings)</span>
                                </div>
                                {doctor.bio && <p className="doc__about__short">{doctor.bio}</p>}
                            </div>
                        </div>

                        <DoctorAbout
                            name={doctor.name}
                            about={doctor.about}
                            qualifications={doctor.qualifications}
                            experiences={doctor.experiences}
                        />
                    </div>

                    {/* RIGHT: Booking Card */}
                    <div>
                        <div className="doc__booking__card">
                            <div className="doc__price__row">
                                <span className="doc__price__label">Ticket Price</span>
                                <span className="doc__price__value">₹{doctor.ticketPrice} INR</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{
                                    width: 10, height: 10, borderRadius: '50%',
                                    background: '#22c55e', flexShrink: 0
                                }} />
                                <span style={{ fontSize: 14, color: '#16a34a', fontWeight: 600 }}>
                                    Currently Available
                                </span>
                            </div>

                             <div className="doc__slots__section">
                                <div className="doc__slots__header">
                                    <BsClock className="doc__slots__icon" />
                                    <p className="doc__slots__title">Select Date & Time:</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label className="doc__slots__title" style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                                        Appointment Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form__input"
                                        value={bookingDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => {
                                            setBookingDate(e.target.value)
                                            setSelectedSlot(null)
                                        }}
                                        style={{
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: '1.5px solid #eaeff6',
                                            width: '100%',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>

                                {bookingDate && availableSlots.length > 0 && (
                                    <>
                                        <p className="doc__slots__title" style={{ fontSize: '14px', marginBottom: '12px' }}>
                                            Available Slots for {selectedDay}:
                                        </p>
                                        <ul className="doc__slots__list">
                                            {availableSlots.map((slot, i) => (
                                                <li
                                                    key={i}
                                                    className={`doc__slot__item${selectedSlot === i ? ' doc__slot__selected' : ''}`}
                                                    onClick={() => setSelectedSlot(i)}
                                                >
                                                    <span className="doc__slot__day">{slot.day}</span>
                                                    <span className="doc__slot__time">{slot.startingTime} – {slot.endingTime}</span>
                                                    {selectedSlot === i && <BsCheckCircleFill className="doc__slot__check" />}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {bookingDate && availableSlots.length === 0 && (
                                    <div style={{
                                        background: '#fff7ed',
                                        border: '1.5px solid #fed7aa',
                                        borderRadius: '12px',
                                        padding: '12px',
                                        color: '#9a3412',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        marginTop: '10px'
                                    }}>
                                        The doctor is not available on {selectedDay}s. Please select another date.
                                    </div>
                                )}
                            </div>

                             <button
                                className={`doc__book__btn${(selectedSlot === null || !bookingDate || bookingLoading) ? ' doc__book__btn--disabled' : ''}`}
                                onClick={handleBooking}
                                disabled={selectedSlot === null || !bookingDate || bookingLoading}
                            >
                                <BsCalendarCheck />
                                {bookingLoading ? 'Booking…' : 'Book Appointment'}
                            </button>

                            {bookingSuccess && (
                                <div className="doc__booking__success">
                                    <BsCheckCircleFill />
                                    <span>Appointment booked successfully!</span>
                                </div>
                            )}

                            {bookingError && (
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    background: '#fef2f2', border: '1px solid #fecaca',
                                    borderRadius: 10, padding: '10px 14px',
                                    marginTop: 12, color: '#dc2626', fontSize: 13, fontWeight: 500,
                                }}>
                                    <span></span>
                                    <span>{bookingError}</span>
                                </div>
                            )}

                            {selectedSlot === null && (
                                <p className="doc__slot__hint">Select a time slot to proceed</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DbDoctorDetails
