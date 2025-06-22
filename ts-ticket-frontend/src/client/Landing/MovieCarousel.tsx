import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardMedia, 
  Grid,
  Button,
  CardContent,
  CardActions,
  Chip,
  useMediaQuery,
  useTheme,
  CircularProgress,
  alpha
} from '@mui/material';
import { getFilms, getFilmById } from '../../CRUD/FilmController.ts';
import { Film } from '../../CRUD/Types.ts';
import { useNavigate } from "react-router-dom";

const MovieCarousel: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const handleBookFilm = (film: Film) => {
    // Store selected film in sessionStorage
    sessionStorage.setItem('selectedFilm', JSON.stringify(film));
    // Navigate to reservations page
    navigate('/client/reservation');
  }

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const data = await getFilms();
        
        // Load complete film details for each film
        const detailedFilms = await Promise.all(
          data.map(async (film) => {
            if (film.id) {
              return await getFilmById(film.id);
            }
            return film;
          })
        );
        
        setFilms(detailedFilms);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch films:', err);
        setError('Failed to load films. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);
  
  const visibleMovies = isMobile ? 1 : 3;
  let displayMovies: Film[] = [];
  
  if (films.length > 0) {
    displayMovies = films.slice(currentIndex, currentIndex + visibleMovies);
    
    if (displayMovies.length < visibleMovies) {
      const additional = films.slice(0, visibleMovies - displayMovies.length);
      displayMovies = [...displayMovies, ...additional];
    }
  }

  const nextSlide = () => {
    if (films.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= films.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (films.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? films.length - 1 : prevIndex - 1
    );
  };

  // Navigate to movie details page
  const handleViewDetails = (filmId: number) => {
    navigate(`/movie/${filmId}`);
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
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
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
          background: 'radial-gradient(circle, rgba(66, 165, 245, 0.2) 0%, rgba(66, 165, 245, 0) 70%)',
          filter: 'blur(60px)',
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
          background: 'radial-gradient(circle, rgba(255, 213, 79, 0.15) 0%, rgba(255, 213, 79, 0) 70%)',
          filter: 'blur(50px)',
        }}
      />
      
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              backgroundColor: alpha('#42a5f5', 0.15),
              color: '#42a5f5',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.875rem',
              fontWeight: 500,
              mb: 2,
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            NOW SHOWING
          </Box>
          
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: 'Montserrat, sans-serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Featured <Box 
              component="span" 
              sx={{ 
                background: 'linear-gradient(135deg, #FFD54F 20%, #FFA000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block' 
              }}
            >
              Films
            </Box>
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              color: '#b6c9e7',
              fontFamily: 'Montserrat, sans-serif',
              mb: 3,
              fontWeight: 300,
              opacity: 0.9
            }}
          >
            Explore our selection of films currently showing at our theaters.
          </Typography>
        </Box>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
            <CircularProgress sx={{ color: '#42a5f5' }} />
          </Box>
        )}
        
        {error && (
          <Box sx={{ textAlign: 'center', my: 6 }}>
            <Typography variant="h6" sx={{ color: '#ff867f' }} gutterBottom fontFamily="Montserrat, sans-serif">
              {error}
            </Typography>
            <Button 
              variant="contained"
              sx={{ 
                mt: 2,
                fontFamily: 'Montserrat, sans-serif',
                textTransform: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                color: '#ffffff',
                fontWeight: 600,
                py: 1,
                px: 3,
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Box>
        )}
        
        {!loading && !error && films.length === 0 && (
          <Box sx={{ textAlign: 'center', my: 6 }}>
            <Typography variant="h6" gutterBottom fontFamily="Montserrat, sans-serif" color="#b6c9e7">
              No films are currently available.
            </Typography>
          </Box>
        )}
        
        {!loading && !error && films.length > 0 && (
          <>
            <Grid container spacing={3}>
              {displayMovies.map((film) => (
                <Grid item xs={12} sm={6} md={4} key={film.id}>
                  <Card 
                    sx={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: alpha('#ffffff', 0.95),
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        overflow: 'hidden', 
                        pt: '140%',
                        cursor: 'pointer' 
                      }}
                      onClick={() => film.id && handleViewDetails(film.id)}
                    >
                      <CardMedia 
                        component="img" 
                        image={film.poster || 'https://www.semantus.fr/clap/static/images/poster-placeholder.png'} 
                        alt={film.nom}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                      
                      {film.genre && (
                        <Chip 
                          label={film.genre} 
                          size="small"
                          sx={{ 
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: alpha('#ffffff', 0.9),
                            color: '#1976d2',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            borderRadius: '8px'
                          }}
                        />
                      )}
                    </Box>
                    
                    <CardContent>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          fontWeight: 600,
                          mb: 1,
                          color: '#212529',
                          fontFamily: 'Montserrat, sans-serif',
                          cursor: 'pointer'
                        }}
                        onClick={() => film.id && handleViewDetails(film.id)}
                      >
                        {film.nom}
                      </Typography>
                      
                      {film.duree && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#6c757d',
                            fontFamily: 'Montserrat, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontWeight: 500
                          }}
                        >
                          <span>⏱</span> {formatDuration(film.duree)}
                        </Typography>
                      )}
                    </CardContent>
                    
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button 
                        variant="contained" 
                        fullWidth
                        sx={{ 
                          background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                          color: '#ffffff',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600,
                          textTransform: 'none',
                          borderRadius: '12px',
                          py: 1,
                          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                          transition: 'all 0.3s ease',
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
            
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: 2,
                mt: 5
              }}
            >
              <Button 
                onClick={prevSlide}
                variant="outlined"
                sx={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  textTransform: 'none',
                  borderRadius: '12px',
                  minWidth: '120px',
                  py: 1.25,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#b6c9e7',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#ffffff',
                    color: '#ffffff',
                    background: alpha('#ffffff', 0.05),
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Previous
              </Button>
              
              <Button 
                onClick={nextSlide}
                variant="contained"
                sx={{ 
                  background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                  color: '#ffffff',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '12px',
                  minWidth: '120px',
                  py: 1.25,
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default MovieCarousel;