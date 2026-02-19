import React from 'react'
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import Footer from '../components/Footer/Footer'

const Home = () => {
  const services = [
    { name: 'Cancer Care', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Labor & Delivery', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Heart & Vascular', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Mental Health', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Neurology', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
    { name: 'Burn Treatment', desc: 'World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.' },
  ]
  return <>
    {/* HERO SECTION */}
    <>
      <section className='hero__section pt-[60px] 2xl:h-[800px]'>
        <div className="container">
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/* hero content */}
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-[#181a1e] font-[800] md:text-[60px] md:leading-[70px]'>We help patients live a healthy, longer life.</h1>
                <p className='text__para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, iste odit impedit, consectetur quae nihil repellat praesentium placeat ut magnam deleniti amet quas?</p>
                <button className='btn mb-[30px]'>Book an Appointment</button>
              </div>
              {/* hero counter */}
              <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-[#181a1e]'>30+</h2>
                  <span className='w-[100px] h-2 bg-yellow-500 rounded-full block stat__line'></span>
                  <p className='text__para'>Years of Experience</p>
                </div>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-[#181a1e]'>15+</h2>
                  <span className='w-[100px] h-2 bg-purple-700 rounded-full block stat__line'></span>
                  <p className='text__para'>Clinic Locations</p>
                </div>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-[#181a1e]'>90%</h2>
                  <span className='w-[100px] h-2 bg-cyan-600 rounded-full block stat__line'></span>
                  <p className='text__para'>Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* hero content */}
            <div className='flex gap-[30px] justify-end'>
              <div>
                <img className='w-full' src={heroImg01} alt="" />
              </div>
              <div className='mt-[50px]'>
                <img src={heroImg02} alt="" className='w-full hero__img__gap' />
                <img src={heroImg03} alt="" className='w-full' />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* hero section ends */}
      <section className="pt-0 pb-[80px]">
        <div className="container">

          {/* Heading */}
          <div className="flex flex-col items-center text-center">
            <h2 className="heading max-w-[400px]">
              Providing the best medical services
            </h2>

            <p className="text__para max-w-[500px] mt-4">
              World-class care for everyone. Our health system offers unmatched, expert health care.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] services__grid">

            {/* Find Doctor Card */}
            <div className="service__card services__grid">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>

              <div className="mt-[20px]">
                <h2 className="text-[22px] leading-8 text-[#181a1e] font-[700]">
                  Find a Doctor
                </h2>
                <p className="text-[15px] leading-6 text-gray-600 font-[400] mt-3">
                  Easily search and connect with experienced doctors across multiple specialties, all dedicated to providing personalized and compassionate care.
                </p>
              </div>

              <div className="service__card__arrow">
                <span>→</span>
              </div>
            </div>

            {/* Find Doctor Card */}
            <div className="service__card services__grid">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>

              <div className="mt-[20px]">
                <h2 className="text-[22px] leading-8 text-[#181a1e] font-[700]">
                  Find a Location
                </h2>
                <p className="text-[15px] leading-6 text-gray-600 font-[400] mt-3">
                  Discover nearby clinics and hospitals with ease. Access quality healthcare services at convenient locations close to you.
                </p>
              </div>

              <div className="service__card__arrow">
                <span>→</span>
              </div>
            </div>

            {/* Find Doctor Card */}
            <div className="service__card services__grid">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>

              <div className="mt-[20px]">
                <h2 className="text-[22px] leading-8 text-[#181a1e] font-[700]">
                  Book Appointment
                </h2>
                <p className="text-[15px] leading-6 text-gray-600 font-[400] mt-3">
                  Schedule appointments in just a few clicks. Choose your preferred doctor, date, and time for a seamless booking experience.
                </p>
              </div>

              <div className="service__card__arrow">
                <span>→</span>
              </div>
            </div>

          </div>

        </div>
      </section>
      <section className="pt-[40px] pb-[80px]">
        <div className="container">
          <div className="flex flex-col items-center text-center services__section__top">
            <h2 className="heading">Our medical services</h2>
            <p className="text__para max-w-[500px] mt-4">
              World-class care for everyone. Our health System offers unmatched, expert health care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] services__grid">
            {services.map((item, index) => (
              <div key={index} className="service__item">
                <div className="service__item__content">
                  <h2 className="service__item__title">{item.name}</h2>
                  <p className="text__para">{item.desc}</p>
                </div>
                <div className="service__item__footer">
                  <div className="service__item__arrow">
                    <BsArrowRight />
                  </div>
                  <span className="service__item__number">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  </>
}

export default Home