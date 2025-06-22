import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  CardActions,
  Rating,
  alpha,
  Divider,
  Avatar
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getFilmById } from '../CRUD/FilmController';
import { getSeances } from '../CRUD/SeanceController';
import { getSalles } from '../CRUD/SalleController';
import { Film, Seance, Salle } from '../CRUD/Types';
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TheatersIcon from '@mui/icons-material/Theaters';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import MovieIcon from '@mui/icons-material/Movie';
import DirectorChairIcon from '@mui/icons-material/Weekend';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  const [seances, setSeances] = useState<Seance[]>([]);
  const [salles, setSalles] = useState<Salle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const handleBookFilm = (film: Film) => {
    // Store selected film in sessionStorage
    sessionStorage.setItem('selectedFilm', JSON.stringify(film));
    // Navigate to reservations page
    navigate('/client/reservation');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          setError('Movie ID is missing');
          setLoading(false);
          return;
        }
        
        // Fetch the specific film by ID
        const selectedFilm = await getFilmById(Number(id));
        
        if (!selectedFilm) {
          setError('Movie not found');
          setLoading(false);
          return;
        }
        
        setFilm(selectedFilm);
        
        // Fetch all halls to get their names
        const allSalles = await getSalles();
        setSalles(allSalles);
        
        // Fetch seances for this film
        const allSeances = await getSeances();
        const filmSeances = allSeances.filter(s => s.film_id === Number(id));
        setSeances(filmSeances);
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  // Find hall name by ID
  const getHallName = (salleId: number) => {
    const salle = salles.find(s => s.id === salleId);
    return salle ? salle.nom : `Hall ${salleId}`;
  };

  // Group seances by date for better organization
  const groupedSeances = seances.reduce((groups, seance) => {
    // Extract date from the full timestamp
    const date = seance.heure.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(seance);
    return groups;
  }, {} as Record<string, Seance[]>);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time to be more readable
  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${remainingMinutes}m`;
    }
  };

  return (
    <Box 
      sx={{         
        background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        color: '#fff', 
        py: { xs: 6, md: 8 },
        minHeight: '100vh'
      }}
    >
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress sx={{ color: '#FFD54F' }} />
        </Box>
      )}
      
      {error && (
        <Container>
          <Box sx={{ textAlign: 'center', my: 6 }}>
            <Typography variant="h6" color="error" gutterBottom fontFamily="Montserrat, sans-serif">
              {error}
            </Typography>
            <Button 
              variant="contained"
              sx={{ 
                mt: 2,
                fontFamily: 'Montserrat, sans-serif',
                textTransform: 'none',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                '&:hover': { 
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>
        </Container>
      )}
      
      {!loading && !error && film && (
        <Container>
          {/* Logo Header */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 6, 
              pt: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                sx={{ 
                  background: 'linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)', 
                  width: { xs: 40, md: 50 }, 
                  height: { xs: 40, md: 50 }, 
                  mr: 2, 
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 700,
                  boxShadow: '0 3px 10px rgba(255, 109, 0, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <MovieIcon />
              </Avatar>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  fontFamily: '"Montserrat", sans-serif',
                  letterSpacing: '0.03rem',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  background: 'linear-gradient(to right, #FFFFFF, #F0F2F5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Movie<span style={{ 
                  background: 'linear-gradient(135deg, #FFD54F 20%, #FFA000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Details</span>
              </Typography>
            </Box>
          </Box>

          {/* Movie Details Section */}
          <Paper 
            elevation={0}
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              mb: 6,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Grid container>
              {/* Movie Poster */}
              <Grid item xs={12} md={4}>
                <Box 
                  sx={{ 
                    height: { xs: '350px', md: '500px' },
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    component="img"
                    src={film.poster || 'https://www.semantus.fr/clap/static/images/poster-placeholder.png'}
                    alt={film.nom}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  {film.genre && (
                    <Chip 
                      label={film.genre} 
                      size="small"
                      sx={{ 
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        backgroundColor: alpha('#FFD54F', 0.9),
                        color: '#0F2027',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 600,
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  )}
                </Box>
              </Grid>
              
              {/* Movie Info */}
              <Grid item xs={12} md={8}>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      fontFamily: 'Montserrat, sans-serif',
                      color: '#ffffff',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      background: 'linear-gradient(to right, #FFFFFF, #c3d0ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {film.nom}
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3, 
                    flexWrap: 'wrap', 
                    gap: 3,
                    backgroundColor: alpha('#ffffff', 0.05),
                    borderRadius: '12px',
                    p: 2,
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    {film.annee && (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1
                      }}>
                        <DateRangeIcon sx={{ color: '#81a4ff' }} />
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#c3d0ff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 500
                          }}
                        >
                          {film.annee}
                        </Typography>
                      </Box>
                    )}
                    
                    {film.duree && (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1
                      }}>
                        <AccessTimeIcon sx={{ color: '#81a4ff' }} />
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#c3d0ff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 500
                          }}
                        >
                          {formatDuration(film.duree)}
                        </Typography>
                      </Box>
                    )}
                    
                    {/* Rating display */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating 
                          value={4.5} 
                          precision={0.5} 
                          readOnly 
                          size="small"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: '#FFD54F',
                            },
                            '& .MuiRating-iconEmpty': {
                              color: alpha('#FFD54F', 0.3),
                            }
                          }}
                        />
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#c3d0ff',
                          fontFamily: 'Montserrat, sans-serif'
                        }}
                      >
                        (4.5/5)
                      </Typography>
                    </Box>
                  </Box>
                  
                  {film.description && (
                    <Box sx={{ 
                      mb: 4,
                      backgroundColor: alpha('#ffffff', 0.02),
                      borderRadius: '12px',
                      p: 3,
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          mb: 2,
                          fontFamily: 'Montserrat, sans-serif',
                          color: '#81a4ff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <TheatersIcon sx={{ fontSize: '1.2rem' }} /> Synopsis
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          lineHeight: 1.7,
                          color: '#e0e0e0'
                        }}
                      >
                        {film.description || "No description available for this film."}
                      </Typography>
                    </Box>
                  )}
                  
                  {film.realisateur && (
                    <Box sx={{ 
                      mb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <DirectorChairIcon sx={{ color: '#81a4ff' }} />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          color: '#c3d0ff',
                          fontWeight: 500
                        }}
                      >
                        <strong>Director:</strong> {film.realisateur}
                      </Typography>
                    </Box>
                  )}
                  
                  <Button 
                    variant="contained" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)',
                      color: '#ffffff',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: '12px',
                      px: 4,
                      py: 1.2,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(255, 109, 0, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(255, 109, 0, 0.4)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={() => handleBookFilm(film)}
                  >
                    Book Tickets
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Seances Section */}
          <Box id="seances-section">
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#81a4ff', 
                  fontWeight: 500,
                  letterSpacing: 1.5,
                  mb: 1,
                  display: 'block',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                AVAILABLE SHOWTIMES
              </Typography>
              
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 600,
                  color: '#ffffff',
                  fontFamily: 'Montserrat, sans-serif',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  background: 'linear-gradient(to right, #FFFFFF, #c3d0ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Select a Showtime
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  maxWidth: '600px', 
                  mx: 'auto',
                  color: '#c3d0ff',
                  fontFamily: 'Montserrat, sans-serif',
                  mb: 3
                }}
              >
                Choose from our available showtimes and book your seats now.
              </Typography>
            </Box>
            
            {seances.length === 0 ? (
              <Box sx={{
                textAlign: 'center', 
                my: 6, 
                backgroundColor: alpha('#ffffff', 0.05),
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                p: 4,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  fontFamily="Montserrat, sans-serif"
                  color="#c3d0ff"
                >
                  No showtimes are currently available for this movie.
                </Typography>
                <Button 
                  variant="contained"
                  sx={{ 
                    mt: 2,
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'none',
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    '&:hover': { 
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
              </Box>
            ) : (
              <Box>
                {Object.keys(groupedSeances).map((date) => (
                  <Box key={date} sx={{ mb: 5 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 3,
                        fontFamily: 'Montserrat, sans-serif',
                        color: '#FFD54F',
                        borderBottom: '1px solid rgba(255, 213, 79, 0.3)',
                        pb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <DateRangeIcon /> {formatDate(date)}
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {groupedSeances[date].map((seance) => (
                        <Grid item xs={12} sm={6} md={4} key={seance.id}>
                          <Card 
                            sx={{ 
                              borderRadius: '16px',
                              overflow: 'hidden',
                              backgroundColor: alpha('#203A43', 0.6),
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                              }
                            }}
                            elevation={0}
                          >
                            <CardContent sx={{ p: 3 }}>
                              <Typography 
                                variant="h5" 
                                component="div" 
                                sx={{ 
                                  fontWeight: 700,
                                  mb: 3,
                                  color: '#ffffff',
                                  fontFamily: 'Montserrat, sans-serif',
                                  textAlign: 'center',
                                  background: 'linear-gradient(to right, #FFFFFF, #c3d0ff)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 1
                                }}
                              >
                                <AccessTimeIcon sx={{ color: '#FFD54F' }} /> {formatTime(seance.heure)}
                              </Typography>
                              
                              <Divider sx={{ borderColor: alpha('#ffffff', 0.1), my: 2 }} />
                              
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                mb: 2,
                                color: '#c3d0ff'
                              }}>
                                <Typography 
                                  variant="body2" 
                                  fontFamily="Montserrat, sans-serif"
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                  }}
                                >
                                  <LocalMoviesIcon sx={{ fontSize: '1rem' }} /> Theater
                                </Typography>
                                <Typography variant="body2" fontWeight={600} fontFamily="Montserrat, sans-serif">
                                  {getHallName(seance.salle_id)}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                color: '#c3d0ff'
                              }}>
                                <Typography 
                                  variant="body2" 
                                  fontFamily="Montserrat, sans-serif"
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                  }}
                                >
                                  <EventSeatIcon sx={{ fontSize: '1rem' }} /> Available Seats
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  fontWeight={600} 
                                  fontFamily="Montserrat, sans-serif"
                                  sx={{
                                    color: seance.seatleft > 10 ? '#81c784' : '#ff867f'
                                  }}
                                >
                                  {seance.seatleft !== undefined ? seance.seatleft : "N/A"}
                                </Typography>
                              </Box>
                            </CardContent>
                            
                            <CardActions sx={{ px: 3, pb: 3 }}>
                              <Button 
                                variant="contained" 
                                fullWidth
                                sx={{ 
                                  background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                                  fontFamily: 'Montserrat, sans-serif',
                                  fontWeight: 600,
                                  textTransform: 'none',
                                  borderRadius: '12px',
                                  py: 1.2,
                                  transition: 'all 0.3s ease',
                                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                  '&:hover': { 
                                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                    transform: 'translateY(-2px)'
                                  }
                                }}
                                onClick={() => handleBookFilm(film)}
                              >
                                Book Now
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default MovieDetails;