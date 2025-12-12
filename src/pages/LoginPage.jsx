import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/authLocal';

/**
 * Login Page
 * * Handles user authentication.
 * Supports "Redirect Back" functionality: if a user was redirected here 
 * from a protected page, they are sent back there after login.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 'from' holds the URL the user was trying to visit before being redirected to login.
  // Defaults to home ('/') if no state exists.
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      // Attempt login via mock service
      loginUser({ email: form.email.trim(), password: form.password });
      
      // Success: Replace current history entry to prevent "Back" button loop
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 640 }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
