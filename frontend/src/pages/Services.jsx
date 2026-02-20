import React, { useState } from 'react'

const serviceData = [
  {
    name: 'Cancer Specialists',
    desc: 'Find experienced oncologists and book appointments instantly for consultations, follow-ups, and treatment guidance.',
    accent: '#FF6B6B',
    bg: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)',
    tag: 'Oncology',
  },
  {
    name: 'Gynecology Care',
    desc: 'Schedule visits with trusted gynecologists for pregnancy care, routine checkups, and women’s health services.',
    accent: '#4ECDC4',
    bg: 'linear-gradient(135deg, #f0fffe 0%, #d8faf8 100%)',
    tag: 'Maternity',
  },
  {
    name: 'Heart Specialists',
    desc: 'Book cardiology appointments easily for heart checkups, diagnostics, and ongoing care with certified experts.',
    accent: '#FF4757',
    bg: 'linear-gradient(135deg, #fff0f0 0%, #ffe0e0 100%)',
    tag: 'Cardiology',
  },
  {
    name: 'Mental Health',
    desc: 'Connect with qualified psychologists and psychiatrists for therapy sessions and mental wellness support.',
    accent: '#A29BFE',
    bg: 'linear-gradient(135deg, #f5f0ff 0%, #ebe4ff 100%)',
    tag: 'Psychiatry',
  },
  {
    name: 'Neurology',
    desc: 'Consult neurologists for migraines, nerve disorders, and brain health through easy online appointment booking.',
    accent: '#FDCB6E',
    bg: 'linear-gradient(135deg, #fffbf0 0%, #fff3d0 100%)',
    tag: 'Neuroscience',
  },
  {
    name: 'Emergency & Trauma',
    desc: 'Quickly find nearby trauma specialists and book priority consultations for urgent medical needs.',
    accent: '#FD7F4B',
    bg: 'linear-gradient(135deg, #fff7f0 0%, #ffe8d8 100%)',
    tag: 'Trauma',
  },
]

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="service__card__enhanced"
      style={{
        background: hovered ? service.bg : '#fff',
        '--accent': service.accent,
        animationDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card__header">
        <span
          className="card__tag"
          style={{ color: service.accent, background: `${service.accent}18` }}
        >
          {service.tag}
        </span>
        <span className="card__num">0{index + 1}</span>
      </div>

      <div className="card__body">
        <h3 className="card__title">{service.name}</h3>
        <p className="card__desc">{service.desc}</p>
      </div>

      <div
        className="card__accent__line"
        style={{ background: service.accent, opacity: hovered ? 1 : 0 }}
      />
    </div>
  )
}

const Services = () => {
  return (
    <section className="services__section__wrapper">
      <div className="container">
        <div className="services__header">
          <div className="services__eyebrow">
            <span className="eyebrow__dot" />
            <span>What We Offer</span>
          </div>
          <h2 className="services__title">
            Our medical <span className="title__highlight">services</span>
          </h2>
          <p className="services__subtitle">
            Easily book appointments with verified doctors across multiple specialties — fast, simple, and secure.
          </p>

          <div className="services__stats">
            {[
              { value: '200+', label: 'Verified Doctors' },
              { value: '50k+', label: 'Appointments Booked' },
              { value: '98%', label: 'Happy Users' },
            ].map((stat, i) => (
              <div key={i} className="stat__pill">
                <span className="stat__value">{stat.value}</span>
                <span className="stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="services__cards__grid">
          {serviceData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services