// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/axios';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      setIsChecking(false);
      return;
    }

    api.get('/protected')
      .then(() => setIsValid(true))
      .catch(() => {
        localStorage.removeItem('token');
        setIsValid(false);
      })
      .finally(() => setIsChecking(false));
  }, [token]);

  if (isChecking) {
    return <p style={{ textAlign: 'center', marginTop: 80 }}>Checking session...</p>;
  }

  return isValid ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
