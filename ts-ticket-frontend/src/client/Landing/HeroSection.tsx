import React from 'react';
import { Box, Typography, Button, Container, Stack, alpha } from '@mui/material';
 
const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: `
          linear-gradient(
            135deg,
            rgba(15, 32, 39, 0.92),
            rgba(44, 83, 100, 0.85),
            rgba(32, 58, 67, 0.88)
          ),
          url("https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: '#fff',
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 6px 30px rgba(0, 0, 0, 0.35)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        transition: 'all 0.3s ease-in-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none'
        }
      }}
    >
      {/* Simple gradient background element */}
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
     
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6
        }}>
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              pr: { md: 4 }
            }}
          >
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
              Premium Cinema Experience
            </Box>
           
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                lineHeight: 1.2,
                fontFamily: 'Montserrat, sans-serif',
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Welcome to <Box 
                component="span" 
                sx={{ 
                  background: 'linear-gradient(135deg, #FFD54F 20%, #FFA000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block' 
                }}
              >
                CineGold
              </Box>
            </Typography>
           
            <Typography
              variant="h5"
              sx={{
                mb: 5,
                fontWeight: 300,
                maxWidth: '600px',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                opacity: 0.9,
                fontFamily: 'Poppins, sans-serif',
                color: '#b6c9e7'
              }}
            >
               Immerse yourself in cinema magic with our seamless booking platform — where technology meets comfort.
            </Typography>
           
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Book Now
              </Button>
 
              <Button
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#b6c9e7',
                  fontWeight: 500,
                  fontFamily: 'Montserrat, sans-serif',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#ffffff',
                    color: '#ffffff',
                    background: alpha('#ffffff', 0.05),
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Explore Movies
              </Button>
            </Stack>
           
            {/* Simple metrics */}
            <Stack
              direction="row"
              spacing={4}
              sx={{
                mt: 6,
                display: { xs: 'none', md: 'flex' }
              }}
            >
              {[
                { label: 'Premium Theaters', value: '12+' },
                { label: 'Movies Available', value: '50+' },
                { label: 'Happy Customers', value: '15K+' }
              ].map((item, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      color: '#FFD54F',
                      mb: 1,
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.7,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      fontSize: '0.75rem',
                      fontFamily: 'Montserrat, sans-serif',
                      color: '#b6c9e7'
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
         
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              position: 'relative',
              display: { xs: 'none', sm: 'block' },
              height: { md: '450px' }
            }}
          >
            {/* Clean and minimalist main image */}
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1640127249305-793865c2efe1?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '100%',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
                }
              }}
            />
              {/* Floating ticket */}
              <Box
              sx={{
                position: 'absolute',
                bottom: '10%',
                left: '-10%',
                width: '150px',
                height: '80px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px',
                transform: 'rotate(-10deg)',
                animation: 'float2 5s ease-in-out infinite',
                '@keyframes float2': {
                  '0%': {
                    transform: 'rotate(-10deg) translateY(0)'
                  },
                  '50%': {
                    transform: 'rotate(-8deg) translateY(-10px)'
                  },
                  '100%': {
                    transform: 'rotate(-10deg) translateY(0)'
                  }
                },
                zIndex: 3,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #FF9100, #FF6D00)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff'
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>VIP TICKET</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>SEAT A1</Typography>
              </Box>
            </Box>
           
            {/* Floating popcorn */}
            <Box
              sx={{
                position: 'absolute',
                top: '1%',
                right: '-5%',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                animation: 'float3 7s ease-in-out infinite',
                '@keyframes float3': {
                  '0%': {
                    transform: 'rotate(5deg) translateY(0)'
                   },
                  '50%': {
                    transform: 'rotate(10deg) translateY(-15px)'
                  },
                  '100%': {
                    transform: 'rotate(5deg) translateY(0)'
                  }
                },
                zIndex: 3,
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              🍿
            </Box>
           
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(66, 165, 245, 0.3) 0%, rgba(66, 165, 245, 0) 70%)',
                borderRadius: '50%',
                bottom: '-60px',
                left: '-60px',
                filter: 'blur(30px)',
                zIndex: 1
              }}
            />
            {/* Simple decorative element */}
            <Box
              sx={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255, 213, 79, 0.2) 0%, rgba(255, 213, 79, 0) 70%)',
                borderRadius: '50%',
                top: '-40px',
                right: '-40px',
                filter: 'blur(30px)',
                zIndex: 1
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
 
export default HeroSection;