import React from 'react';
import LoginForm from './components/LoginForm';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <LoginForm />
      </Container>
    </>
  );
}

export default App;
