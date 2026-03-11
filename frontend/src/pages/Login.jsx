import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config.js'
import { authContext } from '../context/AuthContext.jsx'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import useReveal from '../hooks/useReveal'

const Login = () => {
  useReveal()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { dispatch } = useContext(authContext)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message)
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        }
      })

      setLoading(false)
      toast.success(result.message)

      if (result.role === 'patient') {
        navigate('/users/profile/me')
      } else {
        navigate('/doctors/profile/me')
      }

    } catch (err) {
      setError(err.message)
      toast.error(err.message)
      setLoading(false)
    }
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

          {error && (
            <div style={{
              background: '#fff5f5',
              border: '1.5px solid #feb2b2',
              color: '#c53030',
              padding: '12px 18px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
              <style>{`
                @keyframes shake {
                  10%, 90% { transform: translate3d(-1px, 0, 0); }
                  20%, 80% { transform: translate3d(2px, 0, 0); }
                  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                  40%, 60% { transform: translate3d(4px, 0, 0); }
                }
              `}</style>
            </div>
          )}

          <div style={{ marginTop: '32px' }}>
            <button
              type='submit'
              disabled={loading}
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
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(0, 103, 255, 0.32)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' } }}
            >
              {loading ? <HashLoader size={25} color='#fff' /> : 'Login'}
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