import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Avatar,
  alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserWithBookings } from '../CRUD/Types';

const API_URL = 'http://localhost:5000';

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserWithBookings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      setError('No user ID found');
      setOpenSnackbar(true);
      return;
    }
    fetchUserProfile(userId);
  }, [userId]);

  const fetchUserProfile = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      setUserData(response.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to load user profile');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError(null);
  };

  const handleChangePassword = () => {
    navigate('/reset-password');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        color: '#fff', 
        py: 8, 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative gradient elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(66, 165, 245, 0.15) 0%, rgba(66, 165, 245, 0) 70%)',
          filter: 'blur(60px)',
          zIndex: 1
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 213, 79, 0.1) 0%, rgba(255, 213, 79, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 1
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                backgroundColor: alpha('#ffffff', 0.05),
                borderRadius: '16px', 
                p: 4, 
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <Avatar
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: 'auto', 
                  mb: 3,
                  border: '4px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                }}
                src="https://t3.ftcdn.net/jpg/03/94/89/90/360_F_394899054_4TMgw6eiMYUfozaZU3Kgr5e0LdH4ZrsU.jpg"
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  color: '#ffffff',
                  fontWeight: 600,
                  mb: 1
                }}
              >
                {userData?.nom}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  color: '#b6c9e7', 
                  mb: 3,
                  opacity: 0.9
                }}
              >
                {userData?.email}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleChangePassword}
                sx={{
                  borderRadius: '12px',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#b6c9e7',
                  fontFamily: 'Montserrat, sans-serif',
                  textTransform: 'none',
                  fontWeight: 500,
                  py: 1,
                  px: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#ffffff',
                    color: '#ffffff',
                    background: alpha('#ffffff', 0.05),
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Change Password
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: 'Montserrat, sans-serif', 
                fontWeight: 700, 
                mb: 4,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Booking <Box 
                component="span" 
                sx={{ 
                  background: 'linear-gradient(135deg, #FFD54F 20%, #FFA000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block' 
                }}
              >
                History
              </Box>
            </Typography>

            {userData?.reservations && userData.reservations.length > 0 ? (
              userData.reservations.map((booking) => (
                <Box 
                  key={booking.id} 
                  sx={{ 
                    mb: 5, 
                    backgroundColor: alpha('#ffffff', 0.05), 
                    p: 3, 
                    borderRadius: '16px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#fff', 
                      fontFamily: 'Montserrat, sans-serif', 
                      mb: 2,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        backgroundColor: alpha('#42a5f5', 0.15),
                        color: '#42a5f5',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        mr: 2,
                        letterSpacing: 0.5
                      }}
                    >
                      Booking {booking.id}
                    </Box>
                    {formatDate(booking.seance?.heure || booking.date_reservation)}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      {booking.seance?.film?.poster && (
                        <Card 
                          sx={{ 
                            height: '100%', 
                            borderRadius: '12px', 
                            overflow: 'hidden',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={booking.seance.film.poster}
                            alt={booking.seance.film.nom}
                            sx={{ 
                              height: '100%', 
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              }
                            }}
                          />
                        </Card>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontFamily: 'Montserrat, sans-serif', 
                          color: '#fff', 
                          mb: 1,
                          fontWeight: 600
                        }}
                      >
                        {booking.seance?.film?.nom}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: 'Montserrat, sans-serif', 
                          color: '#b6c9e7',
                          opacity: 0.9
                        }}
                      >
                        {booking.seance?.salle?.nom}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: '#b6c9e7', 
                        fontFamily: 'Montserrat, sans-serif', 
                        mb: 1,
                        fontWeight: 600
                      }}
                    >
                      Tickets:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {booking.tickets.map((ticket) => (
                        <Box
                          key={ticket.id}
                          sx={{
                            backgroundColor: alpha('#42a5f5', 0.15),
                            border: '1px solid rgba(66, 165, 245, 0.3)',
                            borderRadius: '12px',
                            px: 3,
                            py: 2,
                            minWidth: '160px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            color: '#fff',
                            fontFamily: 'Montserrat, sans-serif',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                              backgroundColor: alpha('#42a5f5', 0.2),
                            }
                          }}
                        >
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontFamily: 'Montserrat, sans-serif',
                              fontWeight: 600,
                              color: '#42a5f5'
                            }}
                          >
                            {ticket.type}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{  
                              fontFamily: 'Montserrat, sans-serif',
                              mt: 1
                            }}
                          >
                            Seat {ticket.num_siege}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{  
                              fontFamily: 'Montserrat, sans-serif',
                              fontWeight: 600,
                              mt: 1,
                              color: '#FFD54F'
                            }}
                          >
                            {ticket.price} $
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box 
                sx={{ 
                  backgroundColor: alpha('#ffffff', 0.05), 
                  p: 4, 
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <Typography 
                  sx={{ 
                    fontFamily: 'Montserrat, sans-serif', 
                    color: '#b6c9e7',
                    fontSize: '1.1rem'
                  }}
                >
                  No bookings found.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                    color: '#ffffff',
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '12px',
                    py: 1,
                    px: 3,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                  onClick={() => navigate('/client/home')}
                >
                  Browse Movies
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="error" 
            sx={{ 
              width: '100%',
              fontFamily: 'Montserrat, sans-serif',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default UserProfile;