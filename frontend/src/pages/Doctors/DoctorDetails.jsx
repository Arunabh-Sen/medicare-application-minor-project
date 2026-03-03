import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BsStarFill, BsStar, BsStarHalf, BsCheckCircleFill, BsClock, BsCalendarCheck, BsArrowLeft } from 'react-icons/bs'
import { FaUserMd } from 'react-icons/fa'
import { doctorData } from './doctorData'

/* ── helper: scroll-reveal ── */
function useReveal(selector = '[data-reveal]') {
    useEffect(() => {
        const els = document.querySelectorAll(selector)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('animate-in')
                        observer.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.1 }
        )
        els.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])
}

/* ── Star renderer ── */
const StarRow = ({ rating, size = 16 }) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars.push(<BsStarFill key={i} style={{ color: '#f4c430', fontSize: size }} />)
        } else if (i - rating < 1) {
            stars.push(<BsStarHalf key={i} style={{ color: '#f4c430', fontSize: size }} />)
        } else {
            stars.push(<BsStar key={i} style={{ color: '#d1d9e0', fontSize: size }} />)
        }
    }
    return <div style={{ display: 'flex', gap: 3 }}>{stars}</div>
}

/* ── Interactive star picker ── */
const StarPicker = ({ value, onChange }) => (
    <div style={{ display: 'flex', gap: 6 }}>
        {[1, 2, 3, 4, 5].map((n) => (
            <button
                key={n}
                type="button"
                onClick={() => onChange(n)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
            >
                {n <= value
                    ? <BsStarFill style={{ color: '#f4c430', fontSize: 22 }} />
                    : <BsStar style={{ color: '#d1d9e0', fontSize: 22 }} />}
            </button>
        ))}
    </div>
)

/* ── Review Card ── */
const ReviewCard = ({ review }) => (
    <div className="doc__review__card" data-reveal style={{ '--delay': '0ms' }}>
        <div className="doc__review__top">
            <div className="doc__review__avatar">
                {review.avatar
                    ? <img src={review.avatar} alt={review.name} />
                    : <span>{review.name.charAt(0)}</span>}
            </div>
            <div>
                <p className="doc__review__name">{review.name}</p>
                <p className="doc__review__date">{review.date}</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
                <StarRow rating={review.rating} size={14} />
            </div>
        </div>
        <p className="doc__review__text">{review.text}</p>
    </div>
)

/* ── Main Component ── */
const DoctorDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    useReveal()

    // Find the matching doctor
    const doctor = doctorData.find((d) => d.id === parseInt(id))

    const [activeTab, setActiveTab] = useState('about')
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [ratingValue, setRatingValue] = useState(0)
    const [feedbackText, setFeedbackText] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [bookingSuccess, setBookingSuccess] = useState(false)

    // Reset slot when switching doctors
    useEffect(() => {
        setSelectedSlot(null)
        setActiveTab('about')
        setBookingSuccess(false)
    }, [id])

    const handleSubmitReview = (e) => {
        e.preventDefault()
        if (ratingValue === 0 || !feedbackText.trim()) return
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setRatingValue(0)
        setFeedbackText('')
    }

    const handleBooking = () => {
        if (!selectedSlot && selectedSlot !== 0) return
        setBookingSuccess(true)
        setTimeout(() => setBookingSuccess(false), 3500)
    }

    // 404 state
    if (!doctor) {
        return (
            <section className="doctor__page__section">
                <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <FaUserMd style={{ fontSize: 80, color: '#c8d8f0', marginBottom: 20 }} />
                    <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 28, color: '#0f1724', marginBottom: 12 }}>
                        Doctor not found
                    </h2>
                    <p style={{ color: '#8a97aa', marginBottom: 28 }}>
                        The doctor profile you're looking for doesn't exist.
                    </p>
                    <button className="doc__book__btn" style={{ width: 'auto', margin: '0 auto' }} onClick={() => navigate('/doctors')}>
                        <BsArrowLeft /> Back to Doctors
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section className="doctor__page__section">
            <div className="container">

                {/* Back link */}
                <button
                    className="doc__back__btn"
                    onClick={() => navigate('/doctors')}
                    data-reveal
                    style={{ '--delay': '0ms' }}
                >
                    <BsArrowLeft /> Back to Doctors
                </button>

                {/* ── TWO-COLUMN LAYOUT ── */}
                <div className="doctor__layout">

                    {/* ── LEFT COLUMN ── */}
                    <div className="doctor__left">

                        {/* Profile Card */}
                        <div className="doctor__profile__card" data-reveal style={{ '--delay': '60ms' }}>
                            <div className="doctor__profile__img__wrapper">
                                <div className="doctor__avatar__placeholder">
                                    <FaUserMd />
                                </div>
                                <span className={`doc__online__badge ${doctor.available ? '' : 'doc__online__badge--off'}`} />
                            </div>
                            <div className="doctor__profile__info">
                                <span className="doc__specialty__tag">{doctor.specialty}</span>
                                <h1 className="doc__name">{doctor.name}</h1>
                                <div className="doc__rating__row">
                                    <StarRow rating={doctor.rating} size={18} />
                                    <span className="doc__rating__num">{doctor.rating}</span>
                                    <span className="doc__rating__count">({doctor.totalReviews} reviews)</span>
                                </div>
                                <p className="doc__about__short">{doctor.about}</p>
                            </div>
                        </div>

                        {/* ── TABS ── */}
                        <div className="doc__tabs" data-reveal style={{ '--delay': '100ms' }}>
                            <button
                                className={`doc__tab__btn${activeTab === 'about' ? ' doc__tab__active' : ''}`}
                                onClick={() => setActiveTab('about')}
                            >
                                About
                            </button>
                            <button
                                className={`doc__tab__btn${activeTab === 'feedback' ? ' doc__tab__active' : ''}`}
                                onClick={() => setActiveTab('feedback')}
                            >
                                Feedback
                            </button>
                        </div>
                        <div className="doc__tab__divider" />

                        {/* ── TAB CONTENT ── */}
                        {activeTab === 'about' && (
                            <div className="doc__about__content" data-reveal style={{ '--delay': '150ms' }}>
                                {/* Education */}
                                <div className="doc__section__block">
                                    <h3 className="doc__block__title">Education</h3>
                                    <ul className="doc__timeline">
                                        {doctor.education.map((e, i) => (
                                            <li key={i} className="doc__timeline__item">
                                                <span className="doc__timeline__dot" />
                                                <div>
                                                    <p className="doc__timeline__main">{e.degree} – <span>{e.institution}</span></p>
                                                    <p className="doc__timeline__sub">{e.year}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Experience */}
                                <div className="doc__section__block">
                                    <h3 className="doc__block__title">Experience</h3>
                                    <ul className="doc__timeline">
                                        {doctor.experience.map((ex, i) => (
                                            <li key={i} className="doc__timeline__item">
                                                <span className="doc__timeline__dot doc__timeline__dot--blue" />
                                                <div>
                                                    <p className="doc__timeline__main">{ex.role} – <span>{ex.hospital}</span></p>
                                                    <p className="doc__timeline__sub">{ex.years}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'feedback' && (
                            <div className="doc__feedback__content">
                                {/* All Reviews */}
                                <h2 className="doc__reviews__title" data-reveal style={{ '--delay': '0ms' }}>
                                    All reviews ({doctor.totalReviews})
                                </h2>
                                <div className="doc__reviews__list">
                                    {doctor.reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                                </div>

                                {/* Leave a review form */}
                                <form className="doc__review__form" onSubmit={handleSubmitReview} data-reveal style={{ '--delay': '80ms' }}>
                                    <h3 className="doc__form__title">How would you rate the overall experience?*</h3>
                                    <StarPicker value={ratingValue} onChange={setRatingValue} />

                                    <h3 className="doc__form__title" style={{ marginTop: 20 }}>
                                        Share your feedback or suggestions*
                                    </h3>
                                    <textarea
                                        className="doc__review__textarea"
                                        placeholder="Write your message"
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                        rows={4}
                                    />

                                    <button type="submit" className="doc__submit__btn">
                                        {submitted ? <><BsCheckCircleFill /> Submitted!</> : 'Submit Review'}
                                    </button>

                                    {submitted && (
                                        <p className="doc__success__msg">Thank you for your feedback 🎉</p>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT COLUMN – BOOKING PANEL ── */}
                    <div className="doctor__right">
                        <div className="doc__booking__card" data-reveal style={{ '--delay': '200ms' }}>

                            {/* Price */}
                            <div className="doc__price__row">
                                <span className="doc__price__label">Ticket Price</span>
                                <span className="doc__price__value">{doctor.ticketPrice} {doctor.currency}</span>
                            </div>

                            {/* Availability status */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{
                                    width: 10, height: 10, borderRadius: '50%',
                                    background: doctor.available ? '#22c55e' : '#ef4444',
                                    flexShrink: 0
                                }} />
                                <span style={{ fontSize: 14, color: doctor.available ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                                    {doctor.available ? 'Currently Available' : 'Currently Unavailable'}
                                </span>
                            </div>

                            {/* Time Slots */}
                            <div className="doc__slots__section">
                                <div className="doc__slots__header">
                                    <BsClock className="doc__slots__icon" />
                                    <p className="doc__slots__title">Available Time Slots:</p>
                                </div>
                                <ul className="doc__slots__list">
                                    {doctor.timeSlots.map((slot, i) => (
                                        <li
                                            key={i}
                                            className={`doc__slot__item${selectedSlot === i ? ' doc__slot__selected' : ''}`}
                                            onClick={() => setSelectedSlot(i)}
                                        >
                                            <span className="doc__slot__day">{slot.day}</span>
                                            <span className="doc__slot__time">{slot.time}</span>
                                            {selectedSlot === i && <BsCheckCircleFill className="doc__slot__check" />}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Book Button */}
                            <button
                                className={`doc__book__btn${(selectedSlot === null || !doctor.available) ? ' doc__book__btn--disabled' : ''}`}
                                onClick={handleBooking}
                                disabled={selectedSlot === null || !doctor.available}
                            >
                                <BsCalendarCheck />
                                Book Appointment
                            </button>

                            {bookingSuccess && (
                                <div className="doc__booking__success">
                                    <BsCheckCircleFill />
                                    <span>Appointment booked successfully!</span>
                                </div>
                            )}

                            {selectedSlot === null && doctor.available && (
                                <p className="doc__slot__hint">Select a time slot to proceed</p>
                            )}
                            {!doctor.available && (
                                <p className="doc__slot__hint" style={{ color: '#ef4444' }}>This doctor is currently not accepting appointments</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default DoctorDetails