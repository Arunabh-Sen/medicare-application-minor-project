import React from 'react'
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'

const Home = () => {
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
                <img src={heroImg03} alt="" className='w-full'/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  </>
}

export default Home