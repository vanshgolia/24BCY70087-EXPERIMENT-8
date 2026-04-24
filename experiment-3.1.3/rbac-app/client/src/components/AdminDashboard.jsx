// src/components/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import RoleMenu from './RoleMenu';

function AdminDashboard() {
  const [data, setData]   = useState(null);
  const [error, setError] = useState('');
  const { logout }        = useAuth();
  const navigate          = useNavigate();

  useEffect(() => {
    api.get('/admin')
      .then(({ data }) => setData(data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load'));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '60px auto', padding: 24, border: '1px solid #1976d2', borderRadius: 8 }}>
      <h2 style={{ color: '#1976d2' }}>🛡️ Admin Dashboard</h2>
      <RoleMenu />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <>
          <p>{data.message}</p>
          <h3>All Users</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#e3f2fd' }}>
                <th style={{ padding: 8, border: '1px solid #ccc' }}>ID</th>
                <th style={{ padding: 8, border: '1px solid #ccc' }}>Username</th>
                <th style={{ padding: 8, border: '1px solid #ccc' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(u => (
                <tr key={u.id}>
                  <td style={{ padding: 8, border: '1px solid #ccc', textAlign: 'center' }}>{u.id}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{u.username}</td>
                  <td style={{ padding: 8, border: '1px solid #ccc' }}>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
        <button onClick={() => navigate('/profile')} style={{ padding: '8px 16px', cursor: 'pointer' }}>My Profile</button>
        <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer', background: '#e53935', color: '#fff', border: 'none', borderRadius: 4 }}>Logout</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
