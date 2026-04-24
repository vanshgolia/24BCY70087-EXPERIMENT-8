// src/components/UserProfile.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import RoleMenu from './RoleMenu';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const { auth, logout }      = useAuth();
  const navigate              = useNavigate();

  useEffect(() => {
    api.get('/profile')
      .then(({ data }) => setProfile(data))
      .catch(() => {
        logout();
        navigate('/login');
      });
  }, [logout, navigate]);

  if (!profile) return <p style={{ textAlign: 'center', marginTop: 80 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 480, margin: '80px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>👤 User Profile</h2>
      <RoleMenu />
      <p><strong>Message:</strong> {profile.message}</p>
      <p><strong>Role:</strong> <span style={{ background: auth?.role === 'admin' ? '#1976d2' : '#4caf50', color: '#fff', padding: '2px 10px', borderRadius: 12 }}>{profile.role}</span></p>
      <p><strong>Permissions:</strong> {(profile.permissions || []).join(', ') || 'None'}</p>
      {auth?.role === 'admin' && (
        <button onClick={() => navigate('/admin')} style={{ marginTop: 12, padding: '8px 16px', cursor: 'pointer', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>
          Go to Admin Dashboard
        </button>
      )}
      <br /><br />
      <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer', background: '#e53935', color: '#fff', border: 'none', borderRadius: 4 }}>
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
