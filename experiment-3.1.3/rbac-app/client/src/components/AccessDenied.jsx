// src/components/AccessDenied.jsx
import { useNavigate } from 'react-router-dom';

function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h1>🚫 Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={() => navigate('/profile')} style={{ padding: '8px 20px', cursor: 'pointer' }}>
        Go to Profile
      </button>
    </div>
  );
}

export default AccessDenied;
