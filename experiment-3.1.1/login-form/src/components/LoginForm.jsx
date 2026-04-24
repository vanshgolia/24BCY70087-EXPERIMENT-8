import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Paper, Typography, Box, TextField, Button,
  CircularProgress, Alert
} from '@mui/material';

// Simulated authentication service
const fakeAuth = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      email === 'admin@test.com' && password === 'password123'
        ? resolve({ user: email })
        : reject(new Error('Invalid credentials'));
    }, 1500);
  });

function LoginForm() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const emailField = register('email', {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
  });

  const passwordField = register('password', {
    required: 'Password is required',
    minLength: { value: 6, message: 'Min 6 characters' }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setStatus(null);
    try {
      await fakeAuth(data.email, data.password);
      setStatus({ type: 'success', msg: 'Login successful! Redirecting...' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" mb={1}>Welcome back</Typography>
      {status && (
        <Alert severity={status.type === 'success' ? 'success' : 'error'} sx={{ mb: 2 }}>
          {status.msg}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth label="Email" margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          name={emailField.name}
          inputRef={emailField.ref}
          onBlur={emailField.onBlur}
          value={formValues.email}
          onChange={(e) => {
            setFormValues((prev) => ({ ...prev, email: e.target.value }));
            emailField.onChange(e);
          }}
        />
        <TextField
          fullWidth type="password" label="Password" margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          name={passwordField.name}
          inputRef={passwordField.ref}
          onBlur={passwordField.onBlur}
          value={formValues.password}
          onChange={(e) => {
            setFormValues((prev) => ({ ...prev, password: e.target.value }));
            passwordField.onChange(e);
          }}
        />
        <Button
          type="submit" fullWidth variant="contained"
          disabled={loading} sx={{ mt: 2 }}
          startIcon={loading && <CircularProgress size={18} color="inherit" />}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginForm;
