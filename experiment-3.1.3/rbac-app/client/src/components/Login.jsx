// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

function Login() {
  const [form, setForm]   = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login }         = useAuth();
  const navigate          = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/login', form);
      login(data.token, data.role);
      navigate(data.role === 'admin' ? '/admin' : '/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: '80px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{ padding: 8, fontSize: 16 }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ padding: 8, fontSize: 16 }} />
        <button type="submit" style={{ padding: 10, fontSize: 16, cursor: 'pointer', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
          Sign In
        </button>
      </form>
      <div style={{ marginTop: 16, fontSize: 13, color: '#555' }}>
        <p><strong>Admin:</strong> admin / admin123</p>
        <p><strong>User:</strong> user / user123</p>
      </div>
    </div>
  );
}

export default Login;
