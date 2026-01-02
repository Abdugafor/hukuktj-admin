import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Login failed');
      }

      const data = await res.json();
      const token = data.accessToken || data.token || data.id || null;

      if (!token) throw new Error('No token returned from auth server');

      localStorage.setItem('token', token);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#111827' }}>
      <Paper
        elevation={6}
        className="p-10 w-full max-w-md rounded-2xl shadow-xl"
        sx={{ backgroundColor: '#1F2937' }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">
          Админ
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            sx={{
              backgroundColor: '#111827',
              borderRadius: '12px',
              input: { color: '#F9FAFB' },
              label: { color: '#9CA3AF' },
              '& .MuiFilledInput-underline:before': { borderBottom: 'none' },
              '& .MuiFilledInput-underline:after': { borderBottom: 'none' },
            }}
          />

          <TextField
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            sx={{
              backgroundColor: '#111827',
              borderRadius: '12px',
              input: { color: '#F9FAFB' },
              label: { color: '#9CA3AF' },
              '& .MuiFilledInput-underline:before': { borderBottom: 'none' },
              '& .MuiFilledInput-underline:after': { borderBottom: 'none' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#9CA3AF' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && <div className="text-red-500 font-medium">{error}</div>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              backgroundColor: '#2563EB',
              borderBottom: '15px',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '12px',
              py: 1.5,
              '&:hover': { backgroundColor: '#1D4ED8' },
            }}
          >
            {loading ? '...' : 'Ворид шудан'}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
