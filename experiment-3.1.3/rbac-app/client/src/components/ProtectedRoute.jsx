// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_HIERARCHY = {
  user: 1,
  admin: 2,
};

function ProtectedRoute({ children, requiredRole }) {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/login" replace />;
  if (requiredRole && (ROLE_HIERARCHY[auth.role] || 0) < (ROLE_HIERARCHY[requiredRole] || 0)) {
    return <Navigate to="/access-denied" replace />;
  }
  return children;
}

export default ProtectedRoute;
