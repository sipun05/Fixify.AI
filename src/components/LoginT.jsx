import React, { useState } from 'react';
import { auth } from '../../src/config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    community_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let firebaseUser;

      if (isRegister) {
        // Register new user in Firebase
        const result = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        firebaseUser = result.user;

        // Save user to MongoDB via backend
        await axios.post('http://localhost:5000/api/auth/register', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: role,
          community_id: formData.community_id,
          firebase_uid: firebaseUser.uid
        });

      } else {
        // Login existing user
        const result = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        firebaseUser = result.user;
      }

      // Get user role from backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        firebase_uid: firebaseUser.uid,
        email: formData.email
      });

      const { token, user } = response.data;

      // Save token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Reset form data after successful auth
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        community_id: ''
      });
      setIsRegister(false);
      setRole('user');

      // Redirect based on role
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'technician') navigate('/technician-dashboard');
      else navigate('/user-dashboard');

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logo}>
          <h1 style={styles.logoText}>Fixify<span style={styles.logoAI}>.AI</span></h1>
          <p style={styles.logoSub}>Smart Maintenance Platform</p>
        </div>

        {/* Toggle Register/Login */}
        <div style={styles.toggleRow}>
          <button
            style={isRegister ? styles.toggleInactive : styles.toggleActive}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            style={isRegister ? styles.toggleActive : styles.toggleInactive}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        {/* Role Selector */}
        <div style={styles.roleRow}>
          {['user', 'technician', 'admin'].map((r) => (
            <button
              key={r}
              style={role === r ? styles.roleActive : styles.roleInactive}
              onClick={() => setRole(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {isRegister && (
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {isRegister && (
            <input
              style={styles.input}
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          )}

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isRegister && (
            <input
              style={styles.input}
              type="text"
              name="community_id"
              placeholder="Community Code (e.g. BLOCK-A)"
              value={formData.community_id}
              onChange={handleChange}
            />
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            style={loading ? styles.btnDisabled : styles.btn}
            disabled={loading}
          >
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p style={styles.switchText}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <span
            style={styles.switchLink}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? ' Login' : ' Register'}
          </span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f4f8',
    fontFamily: 'sans-serif'
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
  },
  logo: { textAlign: 'center', marginBottom: '24px' },
  logoText: { fontSize: '32px', fontWeight: '700', margin: 0, color: '#1a1a2e' },
  logoAI: { color: '#4f46e5' },
  logoSub: { color: '#6b7280', fontSize: '14px', marginTop: '4px' },
  toggleRow: {
    display: 'flex',
    background: '#f3f4f6',
    borderRadius: '8px',
    padding: '4px',
    marginBottom: '16px'
  },
  toggleActive: {
    flex: 1, padding: '8px', border: 'none',
    borderRadius: '6px', background: '#4f46e5',
    color: '#fff', fontWeight: '600', cursor: 'pointer'
  },
  toggleInactive: {
    flex: 1, padding: '8px', border: 'none',
    borderRadius: '6px', background: 'transparent',
    color: '#6b7280', cursor: 'pointer'
  },
  roleRow: {
    display: 'flex', gap: '8px', marginBottom: '20px'
  },
  roleActive: {
    flex: 1, padding: '8px', border: '2px solid #4f46e5',
    borderRadius: '8px', background: '#eef2ff',
    color: '#4f46e5', fontWeight: '600', cursor: 'pointer'
  },
  roleInactive: {
    flex: 1, padding: '8px', border: '1px solid #e5e7eb',
    borderRadius: '8px', background: '#fff',
    color: '#6b7280', cursor: 'pointer'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    padding: '12px 16px', borderRadius: '8px',
    border: '1px solid #e5e7eb', fontSize: '14px',
    outline: 'none', width: '100%', boxSizing: 'border-box'
  },
  btn: {
    padding: '12px', background: '#4f46e5',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', fontWeight: '600', cursor: 'pointer',
    marginTop: '8px'
  },
  btnDisabled: {
    padding: '12px', background: '#a5b4fc',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', cursor: 'not-allowed', marginTop: '8px'
  },
  error: { color: '#ef4444', fontSize: '13px', margin: 0 },
  switchText: { textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '16px' },
  switchLink: { color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }
};

export default Login;  