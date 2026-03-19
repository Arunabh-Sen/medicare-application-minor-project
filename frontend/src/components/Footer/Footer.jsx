import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const quickLinks01 = [
  { display: 'Home', path: '/home' },
  { display: 'About Us', path: '/home' },
  { display: 'Services', path: '/services' },
]

const quickLinks02 = [
  { display: 'Find a Doctor', path: '/doctors' },
  { display: 'Request an Appointment', path: '/doctors' },
]

const quickLinks03 = [
  { display: 'Contact Us', path: '/contact' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">

        {/* Top */}
        <div className="footer__top">

          {/* Brand */}
          <div className="footer__brand">
            <h2 className="footer__logo">
              <span>+</span> Medicare
            </h2>
            <p className="footer__desc">
              World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social__link"><FaFacebookF /></a>
              <a href="#" className="footer__social__link"><FaTwitter /></a>
              <a href="#" className="footer__social__link"><FaInstagram /></a>
              <a href="#" className="footer__social__link"><FaLinkedinIn /></a>
              <a href="#" className="footer__social__link"><FaYoutube /></a>
            </div>
          </div>

          {/* Links */}
          <div className="footer__links__group">
            <h3 className="footer__links__title">Quick Links</h3>
            <ul className="footer__links__list">
              {quickLinks01.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="footer__link">
                    <BsArrowRight className="footer__link__icon" />
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links__group">
            <h3 className="footer__links__title">I want to</h3>
            <ul className="footer__links__list">
              {quickLinks02.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="footer__link">
                    <BsArrowRight className="footer__link__icon" />
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links__group">
            <h3 className="footer__links__title">Support</h3>
            <ul className="footer__links__list">
              {quickLinks03.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="footer__link">
                    <BsArrowRight className="footer__link__icon" />
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="footer__newsletter">
              <input type="email" placeholder="Enter your email" className="footer__newsletter__input" />
              <button className="footer__newsletter__btn">Subscribe</button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {year} Medicare. All rights reserved. Developed by the team of <span>Arunabh, Soumya, Dipanjan, Abhinav, Aayush & Atul</span> for the 6th semester minor project.
          </p>
          <div className="footer__bottom__links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer