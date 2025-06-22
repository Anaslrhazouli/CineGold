import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Link, 
  Stack, 
  Divider, 
  Button,
  useMediaQuery,
  useTheme,
  alpha
} from '@mui/material';

// Footer links organized by section
const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', url: '#' },
      { name: 'Our Theaters', url: '#' },
      { name: 'Careers', url: '#' },
      { name: 'Contact Us', url: '#' },
    ]
  },
  {
    title: 'Movies',
    links: [
      { name: 'Now Showing', url: '#' },
      { name: 'Coming Soon', url: '#' },
      { name: 'Promotions', url: '#' },
      { name: 'Gift Cards', url: '#' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Help Center', url: '#' },
      { name: 'FAQs', url: '#' },
      { name: 'Privacy Policy', url: '#' },
      { name: 'Terms of Service', url: '#' },
    ]
  }
];

// Social media icons
const socialLinks = [
  { name: 'Facebook', icon: 'F', url: '#' },
  { name: 'Twitter', icon: 'T', url: '#' },
  { name: 'Instagram', icon: 'I', url: '#' },
  { name: 'YouTube', icon: 'Y', url: '#' },
];

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box 
      sx={{         
        background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        color: '#fff',
        py: { xs: 6, md: 8 },
        position: 'relative',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Decorative gradient elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          right: '5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(66, 165, 245, 0.1) 0%, rgba(66, 165, 245, 0) 70%)',
          filter: 'blur(60px)',
          zIndex: 1
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 213, 79, 0.1) 0%, rgba(255, 213, 79, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 1
        }}
      />
      
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        {/* Main footer content */}
        <Grid container spacing={4}>
          {/* Logo and company description */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                fontFamily: 'Montserrat, sans-serif',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Cine<Box 
                component="span" 
                sx={{ 
                  background: 'linear-gradient(135deg, #FFD54F 20%, #FFA000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block' 
                }}
              >
                Gold
              </Box>
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 3,
                color: '#b6c9e7',
                fontFamily: 'Montserrat, sans-serif',
                maxWidth: '90%',
                fontWeight: 300,
                lineHeight: 1.6
              }}
            >
              Experience the magic of cinema with CineGold. Bringing you the best movies, comfort, and entertainment since 2005.
            </Typography>
            
            <Button 
              variant="outlined" 
              sx={{ 
                fontFamily: 'Montserrat, sans-serif',
                textTransform: 'none',
                borderRadius: '12px',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#b6c9e7',
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
              Download Our App
            </Button>
          </Grid>
          
          {/* Footer links */}
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={6} md={2.6} key={section.title}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#ffffff'
                }}
              >
                {section.title}
              </Typography>
              
              <Stack spacing={1.5}>
                {section.links.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.url} 
                    underline="hover"
                    sx={{ 
                      color: '#b6c9e7',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      '&:hover': {
                        color: '#ffffff',
                        transform: 'translateX(3px)',
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 4 }} />
        
        {/* Bottom row with copyright and social links */}
        <Grid 
          container 
          justifyContent="space-between" 
          alignItems="center"
          spacing={2}
          direction={isMobile ? 'column-reverse' : 'row'}
        >
          <Grid item xs={12} md={6}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontFamily: 'Montserrat, sans-serif',
                color: '#b6c9e7',
                opacity: 0.9,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              © 2025 CineGold. All rights reserved.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack 
              direction="row" 
              spacing={2} 
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              mb={isMobile ? 2 : 0}
            >
              {socialLinks.map((social) => (
                <Box
                  key={social.name}
                  component={Link}
                  href={social.url}
                  aria-label={social.name}
                  sx={{ 
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    backgroundColor: alpha('#42a5f5', 0.15),
                    textDecoration: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    '&:hover': {
                      backgroundColor: alpha('#42a5f5', 0.25),
                      transform: 'translateY(-3px)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    }
                  }}
                >
                  {social.icon}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
        
        {/* Newsletter subscription */}
        <Box 
          sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: '16px', 
            backgroundColor: alpha('#ffffff', 0.05),
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 0.5,
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Stay Updated
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#b6c9e7',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 300,
                }}
              >
                Subscribe to our newsletter for exclusive movie news and promotions.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="form" 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1
                }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: alpha('#ffffff', 0.05),
                    color: '#fff',
                    outline: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)',
                    color: '#ffffff',
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '12px',
                    py: 1.25,
                    px: 3,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;