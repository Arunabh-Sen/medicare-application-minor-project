import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const Login = () => {
  useReveal()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log(formData)
  }

  return (
    <section style={{
      background: '#f8faff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
    }}>
      <div
        data-reveal
        className='reveal-fade-up'
        style={{
          width: '100%',
          maxWidth: '500px',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid #eaeff6',
          padding: '52px',
          boxShadow: '0 8px 48px rgba(0, 103, 255, 0.13)',
        }}
      >
        {/* Eyebrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '14px',
        }}>
          <span style={{
            width: 7, height: 7,
            borderRadius: '50%',
            background: '#0067ff',
            display: 'block',
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0067ff',
          }}>Welcome Back</span>
        </div>

        {/* Title */}
        <h3 className='font-fraunces' style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#0f1724',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: '36px',
        }}>
          Hello!{' '}
          <span style={{ color: '#0067ff', fontStyle: 'italic' }}>Welcome</span>
          {' '}Back
        </h3>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '20px' }}>
            <label className='form__label'>Email Address</label>
            <input
              type='email'
              placeholder='Enter your email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='form__input'
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className='form__label'>Password</label>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='form__input'
              required
            />
          </div>

          <div style={{ marginTop: '32px' }}>
            <button
              type='submit'
              style={{
                display: 'block',
                width: '100%',
                background: '#0067ff',
                color: '#fff',
                fontSize: '17px',
                fontWeight: 700,
                borderRadius: '50px',
                padding: '14px 24px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0, 103, 255, 0.32)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Login
            </button>
          </div>

          <p style={{
            marginTop: '22px',
            color: '#8a97aa',
            textAlign: 'center',
            fontSize: '15px',
          }}>
            Don&apos;t have an account?{' '}
            <Link
              to='/register'
              style={{ color: '#0067ff', fontWeight: 700, marginLeft: '4px' }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login