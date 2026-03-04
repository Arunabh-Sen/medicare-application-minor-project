import React, { useEffect, useState } from 'react'
import { BsEnvelopeFill, BsTelephoneFill, BsGeoAltFill, BsSendFill, BsCheckCircleFill, BsX } from 'react-icons/bs'

/* ── scroll reveal hook ── */
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

const Contact = () => {
  useReveal()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true)
      // Auto hide after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }, 600)
  }

  return (
    <div className="contact__page__wrapper">
      {/* ── SUCCESS POPUP ── */}
      {showSuccess && (
        <div className="success__popup__overlay">
          <div className="success__popup">
            <button className="popup__close" onClick={() => setShowSuccess(false)}>
              <BsX />
            </button>
            <div className="popup__icon">
              <BsCheckCircleFill />
            </div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
            <button className="popup__btn" onClick={() => setShowSuccess(false)}>
              Great!
            </button>
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <section className="contact__hero">
        <div className="container">
          <div className="contact__hero__content" data-reveal style={{ '--delay': '0ms' }}>
            <div className="services__eyebrow">
              <span className="eyebrow__dot" />
              <span>Get In Touch</span>
            </div>
            <h1 className="contact__title">
              Contact <span className="title__highlight">Our Team</span>
            </h1>
            <p className="contact__subtitle">
              Got a technical issue? Want to send feedback about a beta feature? Let us know.
              We're here to help you with any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT (Form + Info) ── */}
      <section className="contact__main__section pt-0 pb-[100px]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[50px] items-start">

            {/* Left: Contact Form */}
            <div
              className="lg:col-span-7 contact__form__container"
              data-reveal
              style={{ '--delay': '120ms' }}
            >
              <form onSubmit={handleSubmit} className="contact__form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="form__group">
                    <label htmlFor="name" className="form__label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="form__input"
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="email" className="form__label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      className="form__input"
                      required
                    />
                  </div>
                </div>

                <div className="form__group mb-6">
                  <label htmlFor="subject" className="form__label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="How can we help?"
                    className="form__input"
                    required
                  />
                </div>

                <div className="form__group mb-8">
                  <label htmlFor="message" className="form__label">Your Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Leave a comment..."
                    className="form__input resize-none"
                    required
                  />
                </div>

                <button type="submit" className="contact__btn">
                  <span>Send Message</span>
                  <BsSendFill />
                </button>
              </form>
            </div>

            {/* Right: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              {[
                {
                  icon: <BsEnvelopeFill />,
                  title: 'Email Us',
                  desc: 'Our support team is here to help.',
                  detail: 'support@medicare.com',
                  delay: '220ms',
                  color: '#0067ff'
                },
                {
                  icon: <BsTelephoneFill />,
                  title: 'Call Us',
                  desc: 'Mon-Fri from 8am to 5pm.',
                  detail: '+1 (555) 000-0000',
                  delay: '320ms',
                  color: '#4ECDC4'
                },
                {
                  icon: <BsGeoAltFill />,
                  title: 'Visit Us',
                  desc: 'Visit our main office.',
                  detail: 'KIIT Campus, Bhubaneswar, India',
                  delay: '420ms',
                  color: '#FF6B6B'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="contact__info__card"
                  data-reveal
                  style={{ '--delay': item.delay, '--accent': item.color }}
                >
                  <div className="info__icon__box" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="info__content">
                    <h3 className="info__title">{item.title}</h3>
                    <p className="info__desc">{item.desc}</p>
                    <p className="info__detail">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact