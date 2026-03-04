import React, { useEffect } from 'react'
import { BsEnvelopeFill, BsTelephoneFill, BsGeoAltFill, BsSendFill } from 'react-icons/bs'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted')
  }

  return (
    <div className="contact__page__wrapper">
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
      <section className="contact__main__section pt-0">
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
                  <BsSendFill className="ml-2" />
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
                  detail: '123 Medical Drive, Health City, HC 12345',
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

              {/* FAQ/Help nudge */}
              <div
                className="help__nudge"
                data-reveal
                style={{ '--delay': '520ms' }}
              >
                <h3>Need immediate help?</h3>
                <p>Check our FAQ page or start a live chat with our support team.</p>
                <button className="nudge__btn">View FAQs</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact