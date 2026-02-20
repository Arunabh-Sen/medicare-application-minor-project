import React, { useState } from 'react'

const serviceData = [
  {
    name: 'Cancer Care',
    desc: 'World-class oncology care with leading specialists, cutting-edge therapies, and compassionate support for every stage of your journey.',
    accent: '#FF6B6B',
    bg: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)',
    tag: 'Oncology',
  },
  {
    name: 'Labor & Delivery',
    desc: 'Expert maternal care from conception to birth and beyond. Our team is with you at every milestone of this extraordinary journey.',
    accent: '#4ECDC4',
    bg: 'linear-gradient(135deg, #f0fffe 0%, #d8faf8 100%)',
    tag: 'Maternity',
  },
  {
    name: 'Heart & Vascular',
    desc: 'Advanced cardiovascular care, from diagnostics to complex interventions, with technology and expertise that sets the standard.',
    accent: '#FF4757',
    bg: 'linear-gradient(135deg, #fff0f0 0%, #ffe0e0 100%)',
    tag: 'Cardiology',
  },
  {
    name: 'Mental Health',
    desc: 'Compassionate, evidence-based mental health services delivered with dignity, offering a safe space for healing and growth.',
    accent: '#A29BFE',
    bg: 'linear-gradient(135deg, #f5f0ff 0%, #ebe4ff 100%)',
    tag: 'Psychiatry',
  },
  {
    name: 'Neurology',
    desc: 'Leading neurological expertise for complex conditions of the brain and nervous system, with precision diagnostics and personalized care.',
    accent: '#FDCB6E',
    bg: 'linear-gradient(135deg, #fffbf0 0%, #fff3d0 100%)',
    tag: 'Neuroscience',
  },
  {
    name: 'Burn Treatment',
    desc: 'Specialized burn care with advanced wound management, reconstructive services, and rehabilitation to restore quality of life.',
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
      {/* Top badge + number */}
      <div className="card__header">
        <span
          className="card__tag"
          style={{ color: service.accent, background: `${service.accent}18` }}
        >
          {service.tag}
        </span>
        <span className="card__num">0{index + 1}</span>
      </div>

      {/* Content */}
      <div className="card__body">
        <h3 className="card__title">{service.name}</h3>
        <p className="card__desc">{service.desc}</p>
      </div>

      {/* Bottom accent line */}
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
        {/* Section header */}
        <div className="services__header">
          <div className="services__eyebrow">
            <span className="eyebrow__dot" />
            <span>What We Offer</span>
          </div>
          <h2 className="services__title">
            Our medical <span className="title__highlight">services</span>
          </h2>
          <p className="services__subtitle">
            Reliable healthcare for every patient, combining precise diagnosis with compassionate long-term care.
          </p>

          {/* Stats row */}
          <div className="services__stats">
            {[
              { value: '200+', label: 'Specialists' },
              { value: '50k+', label: 'Patients Served' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="stat__pill">
                <span className="stat__value">{stat.value}</span>
                <span className="stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
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