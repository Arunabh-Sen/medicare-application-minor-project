import React, { useState } from 'react'
import signupImg from '../assets/images/signup.gif'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import useReveal from '../hooks/useReveal'

const Signup = () => {
  useReveal()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    role: 'patient',
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const submitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const { message } = await res.json()

      if (!res.ok) {
        throw new Error(message)
      }

      setLoading(false)
      toast.success(message)
      navigate('/login', { state: { successMessage: "Registration successful. Please login to proceed" } })

    } catch (err) {
      toast.error(err.message)
      setLoading(false)
    }
  }

  return (
    <section style={{ background: '#f8faff', padding: '80px 20px' }}>
      <div className='container'>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1.5px solid #eaeff6',
          boxShadow: '0 8px 48px rgba(0, 103, 255, 0.13)',
          minHeight: '600px',
        }}
          className='signup-grid'
        >
          {/* Left: blue panel */}
          <div style={{
            background: '#0067ff',
            padding: '52px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <figure style={{ width: '100%', maxWidth: '360px' }}>
              <img
                src={signupImg}
                alt=""
                style={{ width: '100%', borderRadius: '16px', mixBlendMode: 'lighten' }}
              />
            </figure>
            <div style={{ maxWidth: '340px', marginTop: '36px' }}>
              <h2 className='font-fraunces' style={{
                color: '#fff',
                fontSize: '30px',
                fontWeight: 900,
                lineHeight: 1.25,
              }}>
                Join Our Healthcare Community
              </h2>
              <p style={{
                color: 'rgba(219, 234, 254, 0.9)',
                marginTop: '14px',
                fontSize: '16px',
                lineHeight: 1.7,
              }}>
                Start your journey towards better health today. Book appointments, track history, and consult with the best doctors.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0067ff', display: 'block', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0067ff' }}>
                Registration
              </span>
            </div>

            <h3 className='font-fraunces' style={{
              fontSize: '30px',
              fontWeight: 900,
              color: '#0f1724',
              lineHeight: 1.2,
              marginBottom: '28px',
            }}>
              Create an{' '}
              <span style={{ color: '#0067ff', fontStyle: 'italic' }}>Account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div style={{ marginBottom: '18px' }}>
                <label className='form__label'>Full Name</label>
                <input type='text' placeholder='Enter your full name' name='name'
                  value={formData.name} onChange={handleInputChange} className='form__input' required />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label className='form__label'>Email Address</label>
                <input type='email' placeholder='Enter your email' name='email'
                  value={formData.email} onChange={handleInputChange} className='form__input' required />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label className='form__label'>Password</label>
                <input type='password' placeholder='Password' name='password'
                  value={formData.password} onChange={handleInputChange} className='form__input' required />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '18px' }}>
                <div style={{ flex: 1 }}>
                  <label className='form__label'>Are you a:</label>
                  <select name='role' value={formData.role} onChange={handleInputChange} className='form__input' style={{ cursor: 'pointer' }}>
                    <option value='patient'>Patient</option>
                    <option value='doctor'>Doctor</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label className='form__label'>Gender:</label>
                  <select name='gender' value={formData.gender} onChange={handleInputChange} className='form__input' style={{ cursor: 'pointer' }} required>
                    <option value=''>Select</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
              </div>


              <button
                disabled={loading && true}
                type='submit'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  background: '#0067ff',
                  color: '#fff',
                  fontSize: '17px',
                  fontWeight: 700,
                  borderRadius: '50px',
                  padding: '14px 24px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 20px rgba(0, 103, 255, 0.32)',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.opacity = '1' }}
              >
                {loading ? <HashLoader size={35} color='#ffffff' /> : 'Sign Up'}
              </button>

              <p style={{ marginTop: '20px', color: '#8a97aa', textAlign: 'center', fontSize: '15px' }}>
                Already have an account?{' '}
                <Link to='/login' style={{ color: '#0067ff', fontWeight: 700, marginLeft: '4px' }}>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Responsive: hide left panel on mobile */}
      <style>{`
        @media (max-width: 1024px) {
          .signup-grid {
            grid-template-columns: 1fr !important;
          }
          .signup-grid > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Signup