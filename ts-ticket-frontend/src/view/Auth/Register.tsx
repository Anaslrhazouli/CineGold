import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Snackbar,
  alpha,
  Paper,
  Avatar,
  InputAdornment,
  IconButton
} from '@mui/material';
import { registerUser } from '../../CRUD/AuthController';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register: React.FC = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(nom, email, password);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data && typeof err.response.data === 'object' && 'error' in err.response.data) {
          setError(err.response.data.error as string);
        } else {
          setError('Error registering account');
        }
      } else if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred');
      } else {
        setError('An unknown error occurred');
      }
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 72px)', // Adjusted for navbar height
        flexDirection: { xs: 'column', md: 'row' },
        background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        color: '#fff',
        overflow: 'hidden'
      }}
    >
      {/* Image Side */}
      <Box
        sx={{
          flexBasis: { md: '55%' },
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          p: 4
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cinema theater"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 40,
              left: 40,
              backgroundColor: 'rgba(19, 47, 76, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '24px 30px',
              borderRadius: '16px',
              maxWidth: '70%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: '#ffffff',
                fontFamily: '"Montserrat", sans-serif',
                letterSpacing: '0.02rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                background: 'linear-gradient(to right, #FFFFFF, #F0F2F5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Cine<span style={{ 
                background: 'linear-gradient(135deg, #FFD54F 20%, #FFA000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Gold</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#c3d0ff', mt: 2, fontFamily: '"Montserrat", sans-serif' }}>
              Join our community and unlock the complete cinematic experience with premium features and personalized recommendations.
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Form Side */}
      <Box
        sx={{
          flexBasis: { md: '45%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 3, sm: 6 }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 480,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            p: { xs: 3, sm: 5 },
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Avatar 
              sx={{ 
                background: 'linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)', 
                width: 64, 
                height: 64, 
                fontSize: '1.5rem',
                fontWeight: 700,
                boxShadow: '0 6px 16px rgba(255, 109, 0, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                mx: 'auto',
                mb: 2
              }}
            >
              CG
            </Avatar>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontFamily: '"Montserrat", sans-serif',
                color: '#ffffff',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#c3d0ff', fontFamily: '"Montserrat", sans-serif' }}
            >
              Start your movie journey with us
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              label="Name"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ 
                style: { color: '#b6c9e7' },
                shrink: true 
              }}
              InputProps={{ 
                style: { color: '#fff' },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#b6c9e7' }} />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.25)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#42a5f5'
                  },
                  backgroundColor: alpha('#ffffff', 0.02),
                  backdropFilter: 'blur(8px)'
                }
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ 
                style: { color: '#b6c9e7' },
                shrink: true 
              }}
              InputProps={{ 
                style: { color: '#fff' },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#b6c9e7' }} />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.25)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#42a5f5'
                  },
                  backgroundColor: alpha('#ffffff', 0.02),
                  backdropFilter: 'blur(8px)'
                }
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ 
                style: { color: '#b6c9e7' },
                shrink: true 
              }}
              InputProps={{ 
                style: { color: '#fff' },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#b6c9e7' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: '#b6c9e7' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.25)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#42a5f5'
                  },
                  backgroundColor: alpha('#ffffff', 0.02),
                  backdropFilter: 'blur(8px)'
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<PersonAddIcon />}
              sx={{
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                textTransform: 'none',
                fontSize: '1rem',
                fontFamily: 'Montserrat, sans-serif',
                boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.5)'
                }
              }}
            >
              Sign Up
            </Button>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 3,
                backgroundColor: alpha('#ffffff', 0.03),
                p: 2,
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#b6c9e7',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Already have an account?{' '}
                <span
                  style={{ 
                    color: '#FFD54F', 
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </span>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;