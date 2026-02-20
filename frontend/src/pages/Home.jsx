import React, { useEffect } from 'react'
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import Footer from '../components/Footer/Footer'

/* ── tiny hook: triggers .animate-in when element enters viewport ── */
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
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const Home = () => {
  useReveal()

  const services = [
    { name: 'Cancer Care', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Labor & Delivery', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Heart & Vascular', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Mental Health', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Neurology', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Burn Treatment', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
  ]

  return <>
    {/* ── HERO ── */}
    <section className='hero__section pt-[60px] 2xl:h-[800px]'>
      <div className="container">
        <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>

          {/* left: text */}
          <div>
            <div className='lg:w-[570px]'>
              <h1
                data-reveal
                className='reveal-fade-up text-[36px] leading-[46px] text-[#181a1e] font-[800] md:text-[60px] md:leading-[70px]'
                style={{ '--delay': '0ms' }}
              >
                We help patients live a healthy, longer life.
              </h1>
              <p
                data-reveal
                className='reveal-fade-up text__para'
                style={{ '--delay': '120ms' }}
              >
                Book appointments easily with trusted doctors and get quality care when you need it. Simple, fast, and reliable.
              </p>
              <button
                data-reveal
                className='reveal-fade-up btn cursor-pointer mb-[30px]'
                style={{ '--delay': '220ms' }}
              >
                Book an Appointment
              </button>
            </div>

            {/* stats */}
            <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
              {[
                { value: '30+', label: 'Years of Experience', color: 'bg-yellow-500' },
                { value: '15+', label: 'Clinic Locations', color: 'bg-purple-700' },
                { value: '90%', label: 'Patient Satisfaction', color: 'bg-cyan-600' },
              ].map((stat, i) => (
                <div
                  key={i}
                  data-reveal
                  className='reveal-fade-up'
                  style={{ '--delay': `${320 + i * 100}ms` }}
                >
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-[#181a1e]'>
                    {stat.value}
                  </h2>
                  <span className={`w-[100px] h-2 ${stat.color} rounded-full block stat__line`} />
                  <p className='text__para'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right: images */}
          <div className='flex gap-[30px] justify-end'>
            <div
              data-reveal
              className='reveal-fade-right'
              style={{ '--delay': '100ms' }}
            >
              <img className='w-full' src={heroImg01} alt="" />
            </div>
            <div
              data-reveal
              className='reveal-fade-right'
              style={{ '--delay': '220ms' }}
            >
              <img src={heroImg02} alt="" className='w-full hero__img__gap' />
              <img src={heroImg03} alt="" className='w-full' />
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* ── ICON CARDS ── */}
    <section className="pt-0 pb-[80px]">
      <div className="container">

        <div
          data-reveal
          className='reveal-fade-up flex flex-col items-center text-center'
          style={{ '--delay': '0ms' }}
        >
          <h2 className="heading max-w-[400px]">Providing the best medical services</h2>
          <p className="text__para max-w-[500px] mt-4">
            World-class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] services__grid">
          {[
            { icon: icon01, title: 'Find a Doctor', desc: 'Easily search and connect with experienced doctors across multiple specialties, all dedicated to providing personalized and compassionate care.' },
            { icon: icon02, title: 'Find a Location', desc: 'Discover nearby clinics and hospitals with ease. Access quality healthcare services at convenient locations close to you.' },
            { icon: icon03, title: 'Book Appointment', desc: 'Schedule appointments in just a few clicks. Choose your preferred doctor, date, and time for a seamless booking experience.' },
          ].map((card, i) => (
            <div
              key={i}
              data-reveal
              className='reveal-fade-up service__card services__grid'
              style={{ '--delay': `${i * 120}ms` }}
            >
              <div className="flex items-center justify-center">
                <img src={card.icon} alt="" />
              </div>
              <div className="mt-[20px]">
                <h2 className="text-[22px] leading-8 text-[#181a1e] font-[700]">{card.title}</h2>
                <p className="text-[15px] leading-6 text-gray-600 font-[400] mt-3">{card.desc}</p>
              </div>
              <div className="service__card__arrow"><span>→</span></div>
            </div>
          ))}
        </div>

      </div>
    </section>

    {/* ── SERVICE ITEMS ── */}
    <section className="pt-[40px] pb-[80px]">
      <div className="container">

        <div
          data-reveal
          className='reveal-fade-up flex flex-col items-center text-center services__section__top'
          style={{ '--delay': '0ms' }}
        >
          <h2 className="heading">Our medical services</h2>
          <p className="text__para max-w-[500px] mt-4">
            World-class care for everyone. Our health System offers unmatched, expert health care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] services__grid">
          {services.map((item, index) => (
            <div
              key={index}
              data-reveal
              className='reveal-fade-up service__item'
              style={{ '--delay': `${index * 90}ms` }}
            >
              <div className="service__item__content">
                <h2 className="service__item__title">{item.name}</h2>
                <p className="text__para">{item.desc}</p>
              </div>
              <div className="service__item__footer">
                <div className="service__item__arrow"><BsArrowRight /></div>
                <span className="service__item__number">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  </>
}

export default Home