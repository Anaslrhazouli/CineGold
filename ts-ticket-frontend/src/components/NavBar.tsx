import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Button,
    Box,
    Avatar,
    Divider,
    alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MovieIcon from '@mui/icons-material/Movie';
import EventIcon from '@mui/icons-material/Event';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PeopleIcon from '@mui/icons-material/People';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonIcon from '@mui/icons-material/Person';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const [activeLink, setActiveLink] = useState('');

    // Define pages with their icons
    const getPages = () => {
        if (isAdmin) {
            return [
                { name: 'Home', path: 'client/home', icon: <HomeIcon sx={{ fontSize: '1.2rem' }} /> },
                { name: 'Rooms', path: 'admin/salles', icon: <MeetingRoomIcon sx={{ fontSize: '1.2rem' }} /> },
                { name: 'Movies', path: 'admin/films', icon: <MovieIcon sx={{ fontSize: '1.2rem' }} /> },
                { name: 'Screenings', path: 'admin/seances', icon: <EventIcon sx={{ fontSize: '1.2rem' }} /> },
                { name: 'Bookings', path: 'admin/bookings', icon: <BookOnlineIcon sx={{ fontSize: '1.2rem' }} /> },
                { name: 'Users', path: 'admin/users', icon: <PeopleIcon sx={{ fontSize: '1.2rem' }} /> },
                { name: 'Contact', path: 'admin/contact', icon: <ContactMailIcon sx={{ fontSize: '1.2rem' }} /> },
            ];
        } else if (isAuthenticated) {
            return [
                { name: 'Home', path: 'client/home', icon: <HomeIcon sx={{ fontSize: '1.2rem' }} /> },
                { name: 'Profile', path: 'client/profile', icon: <PersonIcon sx={{ fontSize: '1.2rem' }} /> },
            ];
        } else {
            return [
                { name: 'Home', path: 'client/home', icon: <HomeIcon sx={{ fontSize: '1.2rem' }} /> },
                { name: 'Register', path: 'client/register', icon: <HowToRegIcon sx={{ fontSize: '1.2rem' }} /> }
            ];
        }
    };

    const pages = getPages();

    useEffect(() => {
        // Set active link based on current path
        const path = window.location.pathname.substring(1);
        setActiveLink(path);
        
        setIsAuthenticated(!!localStorage.getItem('token'));
        
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
            setIsAdmin(localStorage.getItem('isAdmin') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Setup a token check interval
        const tokenCheckInterval = setInterval(() => {
            setIsAuthenticated(!!localStorage.getItem('token'));
            setIsAdmin(localStorage.getItem('isAdmin') === 'true');
        }, 1000); // Check every second

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(tokenCheckInterval);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('user_id');
        setIsAuthenticated(false);
        setIsAdmin(false);
        window.location.href = '/login'; 
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorEl(null);
    };

    const isActive = (path: string) => {
        return activeLink.includes(path.toLowerCase());
    };

    return (
        <>
            <AppBar 
                position="fixed" 
                elevation={0} 
                sx={{ 
                    background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ height: 72 }}>
                        {/* Logo for desktop */}
                        <Box 
                            sx={{ 
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                            }}
                        >
                            <Avatar 
                                sx={{ 
                                    background: 'linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)', 
                                    width: 38, 
                                    height: 38, 
                                    mr: 1.5, 
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    boxShadow: '0 3px 10px rgba(255, 109, 0, 0.3)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                CG
                            </Avatar>
                            <Typography 
                                variant="h5" 
                                noWrap 
                                component={Link}
                                to="/"
                                sx={{ 
                                    mr: 5, 
                                    fontWeight: 700, 
                                    color: '#ffffff', 
                                    alignItems: 'center',
                                    fontFamily: '"Montserrat", sans-serif',
                                    letterSpacing: '0.03rem',
                                    textDecoration: 'none',
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    fontSize: '1.5rem',
                                    background: 'linear-gradient(to right, #FFFFFF, #F0F2F5)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    transition: 'all 0.3s ease',
                                    "&:hover": {
                                        transform: 'scale(1.02)',
                                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                                    }
                                }}
                            >
                                Cine<span style={{ 
                                    background: 'linear-gradient(135deg, #FFD54F 20%, #FFA000 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>Gold</span>
                            </Typography>
                        </Box>

                        {/* Mobile menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton 
                                size="large" 
                                aria-label="menu" 
                                aria-controls="menu-appbar" 
                                aria-haspopup="true" 
                                onClick={handleOpenNavMenu} 
                                sx={{ 
                                    color: '#ffffff',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    "&:hover": {
                                        backgroundColor: 'rgba(255, 255, 255, 0.12)'
                                    }
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseNavMenu}
                                sx={{ 
                                    display: { xs: 'block', md: 'none' }, 
                                    '& .MuiPaper-root': { 
                                        borderRadius: '16px', 
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)', 
                                        mt: 1.5,
                                        backgroundColor: 'rgba(19, 47, 76, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        overflow: 'hidden'
                                    } 
                                }}
                            >
                                {pages.map((page) => {
                                    const isPageActive = isActive(page.path);
                                    return (
                                        <MenuItem 
                                            key={page.name} 
                                            onClick={handleCloseNavMenu}
                                            component={Link}
                                            to={`/${page.path.toLowerCase()}`}
                                            sx={{
                                                py: 1.5,
                                                px: 2.5,
                                                my: 0.2,
                                                mx: 1,
                                                borderRadius: '10px',
                                                backgroundColor: isPageActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                                transition: 'all 0.25s ease',
                                                "&:hover": {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                }
                                            }}
                                        >
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                color: isPageActive ? '#FFFFFF' : '#c3d0ff' 
                                            }}>
                                                <Box sx={{ 
                                                    mr: 2, 
                                                    display: 'flex', 
                                                    alignItems: 'center',
                                                    color: isPageActive ? '#FFD54F' : '#c3d0ff'
                                                }}>
                                                    {page.icon}
                                                </Box>
                                                <Typography 
                                                    sx={{ 
                                                        fontFamily: '"Montserrat", sans-serif',
                                                        fontWeight: isPageActive ? 600 : 500,
                                                        fontSize: '0.95rem',
                                                    }}
                                                >
                                                    {page.name}
                                                </Typography>
                                                {isPageActive && (
                                                    <Box 
                                                        sx={{ 
                                                            width: '6px', 
                                                            height: '6px', 
                                                            borderRadius: '50%', 
                                                            backgroundColor: '#FFD54F',
                                                            ml: 1
                                                        }} 
                                                    />
                                                )}
                                            </Box>
                                        </MenuItem>
                                    );
                                })}
                                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
                                {isAuthenticated ? (
                                    <MenuItem 
                                        onClick={handleLogout}
                                        sx={{
                                            py: 1.5,
                                            px: 2.5,
                                            my: 0.2,
                                            mx: 1,
                                            borderRadius: '10px',
                                            transition: 'all 0.25s ease',
                                            "&:hover": {
                                                backgroundColor: 'rgba(255, 82, 82, 0.1)',
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#ff867f' }}>
                                            <LogoutIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
                                            <Typography 
                                                sx={{ 
                                                    fontFamily: '"Montserrat", sans-serif',
                                                    fontWeight: 500,
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                Logout
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                ) : (
                                    <MenuItem 
                                        component={Link} 
                                        to="/login"
                                        sx={{
                                            py: 1.5,
                                            px: 2.5,
                                            my: 0.2,
                                            mx: 1,
                                            borderRadius: '10px',
                                            transition: 'all 0.25s ease',
                                            "&:hover": {
                                                backgroundColor: 'rgba(66, 165, 245, 0.1)',
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#42a5f5' }}>
                                            <LoginIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
                                            <Typography 
                                                sx={{ 
                                                    fontFamily: '"Montserrat", sans-serif',
                                                    fontWeight: 500,
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                Login
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>

                        {/* Logo for mobile */}
                        <Box 
                            sx={{ 
                                display: { xs: 'flex', md: 'none' },
                                alignItems: 'center',
                                flexGrow: 1,
                            }}
                        >
                            <Avatar 
                                sx={{ 
                                    background: 'linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)', 
                                    width: 36, 
                                    height: 36, 
                                    mr: 1.5, 
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    boxShadow: '0 3px 10px rgba(255, 109, 0, 0.3)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                }}
                            >
                                CG
                            </Avatar>
                            <Typography 
                                variant="h6" 
                                noWrap 
                                component={Link}
                                to="/"
                                sx={{ 
                                    fontWeight: 700, 
                                    color: '#ffffff', 
                                    alignItems: 'center',
                                    fontFamily: '"Montserrat", sans-serif',
                                    letterSpacing: '0.02rem',
                                    textDecoration: 'none',
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
                        </Box>

                        {/* Desktop menu */}
                        <Box sx={{ 
                            flexGrow: 1, 
                            display: { xs: 'none', md: 'flex' }, 
                            justifyContent: 'center',
                            mx: 3,
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                bgcolor: alpha('#ffffff', 0.04), 
                                borderRadius: '16px',
                                overflow: 'hidden',
                                padding: '4px',
                                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                            }}>
                                {pages.map((page) => {
                                    const isPageActive = isActive(page.path);
                                    return (
                                        <Button 
                                            key={page.name}
                                            component={Link} 
                                            to={`/${page.path.toLowerCase()}`}
                                            onClick={() => setActiveLink(page.path.toLowerCase())}
                                            sx={{ 
                                                mx: 0.5, 
                                                color: isPageActive ? '#ffffff' : '#b6c9e7', 
                                                fontSize: '0.95rem', 
                                                textTransform: 'none', 
                                                fontWeight: isPageActive ? 600 : 500, 
                                                fontFamily: '"Montserrat", sans-serif',
                                                position: 'relative',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 1.2,
                                                padding: '8px 16px',
                                                borderRadius: '12px',
                                                backgroundColor: isPageActive ? alpha('#ffffff', 0.08) : 'transparent',
                                                transition: 'all 0.25s ease',
                                                '&:hover': { 
                                                    backgroundColor: alpha('#ffffff', 0.12), 
                                                    color: '#ffffff',
                                                    transform: 'translateY(-1px)',
                                                },
                                            }}
                                            disableRipple
                                        >
                                            <Box 
                                                sx={{ 
                                                    color: isPageActive ? '#FFD54F' : 'inherit',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {page.icon}
                                            </Box>
                                            {page.name}
                                            {isPageActive && (
                                                <Box 
                                                    sx={{ 
                                                        width: '6px', 
                                                        height: '6px', 
                                                        borderRadius: '50%', 
                                                        backgroundColor: '#FFD54F', 
                                                        ml: 0.5 
                                                    }} 
                                                />
                                            )}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Box>

                        {/* Login/Logout button for desktop */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {isAuthenticated ? (
                                <Button 
                                    sx={{ 
                                        color: '#ffffff', 
                                        borderRadius: '12px', 
                                        textTransform: 'none', 
                                        fontWeight: 600, 
                                        fontFamily: '"Montserrat", sans-serif',
                                        display: 'flex',
                                        gap: 1,
                                        py: 1,
                                        px: 2.5,
                                        backgroundColor: alpha('#ff5252', 0.1),
                                        border: '1px solid rgba(255, 138, 128, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { 
                                            backgroundColor: alpha('#ff5252', 0.2), 
                                            borderColor: 'rgba(255, 138, 128, 0.5)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(255, 82, 82, 0.25)'
                                        } 
                                    }} 
                                    onClick={handleLogout}
                                    startIcon={<LogoutIcon />}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button 
                                    sx={{ 
                                        background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)', 
                                        color: 'white', 
                                        borderRadius: '12px', 
                                        textTransform: 'none', 
                                        fontWeight: 600, 
                                        fontFamily: '"Montserrat", sans-serif',
                                        py: 1,
                                        px: 3,
                                        display: 'flex',
                                        gap: 1,
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                        '&:hover': { 
                                            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                            transform: 'translateY(-2px)'
                                        } 
                                    }} 
                                    variant="contained" 
                                    component={Link} 
                                    to="/login"
                                    startIcon={<LoginIcon />}
                                >
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* Toolbar placeholder to push content below the navbar */}
            <Toolbar sx={{ height: 72 }} />
        </>
    );
};

export default Navbar;