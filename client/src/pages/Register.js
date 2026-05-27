import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    password: '', roll_number: '', phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#ff6b35' }}>
          📝 Student Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>First Name</label>
              <input
                name="first_name" value={form.first_name}
                onChange={handleChange} required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                placeholder="John"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Last Name</label>
              <input
                name="last_name" value={form.last_name}
                onChange={handleChange} required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                placeholder="Doe"
              />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Email</label>
            <input
              name="email" type="email" value={form.email}
              onChange={handleChange} required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="your@email.com"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Password</label>
            <input
              name="password" type="password" value={form.password}
              onChange={handleChange} required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="••••••••"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Roll Number</label>
            <input
              name="roll_number" value={form.roll_number}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="21CS001"
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Phone</label>
            <input
              name="phone" value={form.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="9999999999"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          Already have an account? <Link to="/login" style={{ color: '#ff6b35' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;