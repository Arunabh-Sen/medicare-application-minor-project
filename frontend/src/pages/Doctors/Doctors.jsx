import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsStarFill, BsStarHalf, BsStar, BsSearch, BsFunnelFill } from 'react-icons/bs'
import { FaUserMd } from 'react-icons/fa'
import { doctorData } from './doctorData'

/* ── scroll reveal ── */
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
      { threshold: 0.08 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ── Star renderer ── */
const StarRow = ({ rating }) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push(<BsStarFill key={i} style={{ color: '#f4c430', fontSize: 13 }} />)
    else if (i - rating < 1) stars.push(<BsStarHalf key={i} style={{ color: '#f4c430', fontSize: 13 }} />)
    else stars.push(<BsStar key={i} style={{ color: '#d1d9e0', fontSize: 13 }} />)
  }
  return <div style={{ display: 'flex', gap: 3 }}>{stars}</div>
}

/* doctorData is imported from ./doctorData */

const specialties = ['All', 'Surgeon', 'Cardiologist', 'Neurologist', 'Gynecologist', 'Oncologist', 'Dermatologist', 'Orthopedist', 'Psychiatrist']

/* Map shared data shape to listing-card shape */
const listingData = doctorData.map((d) => ({
  id: d.id,
  name: d.name,
  specialty: d.specialty,
  rating: d.rating,
  reviews: d.totalReviews,
  price: d.ticketPrice,
  available: d.available,
  currency: d.currency,
}))

/* ── Doctor Card ── */
const DoctorCard = ({ doctor, index }) => (
  <div
    className="find__doc__card"
    data-reveal
    style={{ '--delay': `${index * 70}ms`, animationDelay: `${index * 70}ms` }}
  >
    {/* Avatar area */}
    <div className="find__doc__img">
      <div className="find__doc__avatar">
        <FaUserMd />
      </div>
      <span className={`find__doc__badge ${doctor.available ? 'find__doc__badge--on' : 'find__doc__badge--off'}`}>
        {doctor.available ? 'Available' : 'Unavailable'}
      </span>
    </div>

    {/* Info */}
    <div className="find__doc__info">
      <span className="find__doc__specialty">{doctor.specialty}</span>
      <h3 className="find__doc__name">{doctor.name}</h3>

      <div className="find__doc__rating">
        <StarRow rating={doctor.rating} />
        <span className="find__doc__rating__num">{doctor.rating}</span>
        <span className="find__doc__rating__count">({doctor.reviews})</span>
      </div>

      <div className="find__doc__footer">
        <div className="find__doc__price">
          <span className="find__doc__price__label">Fee</span>
          <span className="find__doc__price__val">{doctor.price} {doctor.currency}</span>
        </div>
        <Link to={`/doctors/${doctor.id}`} className="find__doc__btn">
          Book Now
        </Link>
      </div>
    </div>
  </div>
)

/* ── Main Page ── */
const Doctors = () => {
  useReveal()

  const [search, setSearch] = useState('')
  const [activeSpec, setActiveSpec] = useState('All')

  const filtered = listingData.filter((d) => {
    const matchSpec = activeSpec === 'All' || d.specialty === activeSpec
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    return matchSpec && matchSearch
  })

  return (
    <section className="find__doc__section">
      <div className="container">

        {/* ── Header ── */}
        <div className="find__doc__header" data-reveal style={{ '--delay': '0ms' }}>
          <div className="services__eyebrow">
            <span className="eyebrow__dot" />
            <span>Our Doctors</span>
          </div>
          <h1 className="find__doc__title">
            Find your <span className="title__highlight">perfect doctor</span>
          </h1>
          <p className="find__doc__subtitle">
            Browse our verified specialists, check their availability, and book an appointment in just a few clicks.
          </p>
        </div>

        {/* ── Search + Filter Bar ── */}
        <div className="find__doc__controls" data-reveal style={{ '--delay': '100ms' }}>
          <div className="find__doc__search">
            <BsSearch className="find__search__icon" />
            <input
              type="text"
              className="find__search__input"
              placeholder="Search by name or specialty…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="find__doc__filters">
            <BsFunnelFill className="find__filter__icon" />
            <div className="find__spec__pills">
              {specialties.map((s) => (
                <button
                  key={s}
                  className={`find__spec__pill${activeSpec === s ? ' find__spec__pill--active' : ''}`}
                  onClick={() => setActiveSpec(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        <p className="find__doc__count" data-reveal style={{ '--delay': '130ms' }}>
          Showing <strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? 's' : ''}
          {activeSpec !== 'All' ? ` in ${activeSpec}` : ''}
          {search ? ` matching "${search}"` : ''}
        </p>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="find__doc__grid">
            {filtered.map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={i} />
            ))}
          </div>
        ) : (
          <div className="find__doc__empty">
            <FaUserMd />
            <p>No doctors found. Try a different search or filter.</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default Doctors