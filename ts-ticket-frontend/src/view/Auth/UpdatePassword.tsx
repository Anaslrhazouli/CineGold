import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Snackbar, 
  Alert, 
  Box, 
  Typography, 
  Paper, 
  Avatar,
  InputAdornment,
  alpha
} from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import LockIcon from '@mui/icons-material/Lock';
import PasswordIcon from '@mui/icons-material/Password';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = "https://nwjetzftjnpmemcmlnyp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53amV0emZ0am5wbWVtY21sbnlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDI5MzUsImV4cCI6MjA1NTk3ODkzNX0._ItqMFvW6D93d7SFkoByJz-LZvubeMuv6I1O7TcF0xQ";

const supabase = createClient(supabaseUrl, supabaseKey);

const UpdatePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setSnackbarMsg('Passwords do not match');
      setSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setSnackbarMsg(error.message);
        setSeverity('error');
      } else {
        setSnackbarMsg('Password updated successfully!');
        setSeverity('success');
      }
    } catch (err: any) {
      setSnackbarMsg(err?.message || 'Failed to update password');
      setSeverity('error');
    }
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 72px)', // Adjusted for navbar height
        background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        color: '#fff',
        overflow: 'hidden'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 450,
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
              background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)', 
              width: 64, 
              height: 64, 
              fontSize: '1.5rem',
              boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              mx: 'auto',
              mb: 2
            }}
          >
            <PasswordIcon fontSize="large" />
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
            Set New Password
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#c3d0ff', fontFamily: '"Montserrat", sans-serif' }}
          >
            Please enter your new password below
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="New Password"
            type="password"
            fullWidth
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            label="Confirm Password"
            type="password"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            startIcon={<PasswordIcon />}
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
            Update Password
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <ArrowBackIcon fontSize="small" sx={{ color: '#b6c9e7' }} />
              <span
                style={{ 
                  color: '#FFD54F', 
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </span>
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={severity}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdatePassword;