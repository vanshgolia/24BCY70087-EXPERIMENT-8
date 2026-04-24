import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_HIERARCHY = {
  user: 1,
  admin: 2,
};

function canAccess(role, requiredRole) {
  return (ROLE_HIERARCHY[role] || 0) >= (ROLE_HIERARCHY[requiredRole] || 0);
}

function RoleMenu() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const role = auth?.role;

  return (
    <div style={{ margin: '12px 0 20px' }}>
      <p style={{ marginBottom: 8, fontWeight: 600 }}>Menu</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {canAccess(role, 'user') && (
          <button onClick={() => navigate('/profile')} style={{ padding: '8px 14px', cursor: 'pointer' }}>
            Profile
          </button>
        )}
        {canAccess(role, 'admin') && (
          <button onClick={() => navigate('/admin')} style={{ padding: '8px 14px', cursor: 'pointer' }}>
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default RoleMenu;
