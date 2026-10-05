import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  MoreVert,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuEl, setMobileMenuEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMobileMenuOpen = (event) => setMobileMenuEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuEl(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const navigateToPage = (path) => {
    navigate(path);
    handleMenuClose();
    handleMobileMenuClose();
  };

  const isActivePage = (path) => location.pathname === path;

  const navigationItems = [
    { path: '/mark-attendance', label: 'Mark Attendance' },
    { path: '/dashboard', label: 'Dashboard' },
    ...(user?.role === 'admin' ? [{ path: '/admin', label: 'Admin' }] : []),
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'rgba(7, 10, 15, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 224, 198, 0.2)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.6)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: 72 }}>
        {/* Brand / Logo */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FFB000 0%, #00E0C6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#070A0F',
              fontWeight: '900',
              fontSize: '1.2rem',
              boxShadow: '0 0 15px rgba(255, 176, 0, 0.4)',
            }}
          >
            S
          </Box>
          <Typography
            variant="h6"
            fontWeight="900"
            sx={{
              color: '#FFB000',
              letterSpacing: '-0.02em',
              fontFamily: '"JetBrains Mono", "Inter", sans-serif',
              textShadow: '0 0 12px rgba(255, 176, 0, 0.3)',
            }}
          >
            CRYPTOLAB <span style={{ color: '#00E0C6' }}>ATTENDANCE</span>
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && !user && (
          <Box sx={{ flexGrow: 1 }} />
        )}

        {!isMobile && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mx: 6, flexGrow: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigateToPage(item.path)}
                sx={{
                  px: 3,
                  py: 1.2,
                  borderRadius: '10px',
                  fontWeight: 600,
                  textTransform: 'none',
                  color: isActivePage(item.path) ? '#00E0C6' : '#9CA3AF',
                  background: isActivePage(item.path) ? 'rgba(0, 224, 198, 0.12)' : 'transparent',
                  border: isActivePage(item.path) ? '1px solid rgba(0, 224, 198, 0.3)' : '1px solid transparent',
                  '&:hover': { background: 'rgba(255, 176, 0, 0.15)', color: '#FFB000', borderColor: 'rgba(255, 176, 0, 0.3)' },
                  transition: 'all 0.2s ease',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* User Section */}
        {user ? (
          <Box display="flex" alignItems="center" gap={2}>
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" fontWeight="700" sx={{ color: '#F3F4F6' }}>
                    {user.full_name.split(' ')[0]}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#00E0C6', fontFamily: 'monospace' }}>
                    {user.role === 'admin' ? '● ADMIN' : '● USER'}
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    p: 0.5,
                    background: 'rgba(0, 224, 198, 0.15)',
                    border: '1px solid rgba(0, 224, 198, 0.3)',
                    '&:hover': { background: 'rgba(255, 176, 0, 0.2)', borderColor: '#FFB000' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36, height: 36,
                      background: 'linear-gradient(135deg, #FFB000 0%, #D97706 100%)',
                      color: '#070A0F',
                      fontSize: '0.9rem', fontWeight: 'bold',
                    }}
                  >
                    {user.full_name.charAt(0)}
                  </Avatar>
                </IconButton>
              </Box>
            )}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuOpen}
                sx={{ color: '#00E0C6', background: 'rgba(0, 224, 198, 0.1)' }}
              >
                <MoreVert />
              </IconButton>
            )}
          </Box>
        ) : (
          <Stack direction="row" spacing={1.5}>
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuOpen}
                sx={{ color: '#00E0C6' }}
              >
                <MoreVert />
              </IconButton>
            )}
            {!isMobile && (
              <>
                <Button
                  onClick={() => navigateToPage('/login')}
                  sx={{
                    color: '#00E0C6',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2.5,
                    border: '1px solid rgba(0, 224, 198, 0.3)',
                    borderRadius: '10px',
                    '&:hover': { background: 'rgba(0, 224, 198, 0.15)', borderColor: '#00E0C6' },
                  }}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigateToPage('/register')}
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 800,
                    px: 3,
                    background: 'linear-gradient(135deg, #FFB000 0%, #D97706 100%)',
                    color: '#070A0F',
                    boxShadow: '0 0 15px rgba(255, 176, 0, 0.3)',
                    '&:hover': { background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' },
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Stack>
        )}

        {/* Desktop User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1,
              borderRadius: '14px',
              background: '#0D131F',
              border: '1px solid rgba(0, 224, 198, 0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              minWidth: 240,
              color: '#F3F4F6',
              '& .MuiMenuItem-root': {
                px: 3, py: 1.5, borderRadius: '8px', mx: 1, my: 0.5,
                '&:hover': { background: 'rgba(0, 224, 198, 0.15)', color: '#00E0C6' },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 224, 198, 0.15)' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, #FFB000, #D97706)', color: '#070A0F', fontWeight: 'bold' }}>
                {user?.full_name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="700" sx={{ color: '#F3F4F6' }}>
                  {user?.full_name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#00E0C6', fontFamily: 'monospace' }}>
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
          <MenuItem onClick={() => navigateToPage('/profile')}>
            <Typography fontWeight="600">My Profile</Typography>
          </MenuItem>
          <Divider sx={{ mx: 1, my: 0.5, borderColor: 'rgba(0, 224, 198, 0.15)' }} />
          <MenuItem onClick={handleLogout} sx={{ color: '#FFB000' }}>
            <Typography fontWeight="600">Sign out</Typography>
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuEl}
          open={Boolean(mobileMenuEl)}
          onClose={handleMobileMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1, borderRadius: '14px', background: '#0D131F', border: '1px solid rgba(0, 224, 198, 0.3)',
              minWidth: 260, color: '#F3F4F6',
              '& .MuiMenuItem-root': {
                px: 3, py: 1.5, borderRadius: '8px', mx: 1, my: 0.5,
                '&:hover': { background: 'rgba(0, 224, 198, 0.15)', color: '#00E0C6' },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {user ? (
            <>
              <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 224, 198, 0.15)' }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, #FFB000, #D97706)', color: '#070A0F', fontWeight: 'bold' }}>
                    {user?.full_name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="700" sx={{ color: '#F3F4F6' }}>{user?.full_name}</Typography>
                    <Typography variant="caption" sx={{ color: '#00E0C6', fontFamily: 'monospace' }}>
                      {user?.role === 'admin' ? '● ADMIN' : '● USER'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {navigationItems.map((item) => (
                <MenuItem key={item.path} onClick={() => navigateToPage(item.path)}>
                  <Typography fontWeight={600}>{item.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={() => navigateToPage('/profile')}>
                <Typography fontWeight={600}>My Profile</Typography>
              </MenuItem>
              <Divider sx={{ mx: 1, my: 1, borderColor: 'rgba(0, 224, 198, 0.15)' }} />
              <MenuItem onClick={handleLogout} sx={{ color: '#FFB000' }}>
                <Typography fontWeight="600">Sign out</Typography>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => navigateToPage('/login')}>
                <Typography fontWeight="600" sx={{ color: '#00E0C6' }}>Sign in</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigateToPage('/register')}>
                <Typography fontWeight="600" sx={{ color: '#FFB000' }}>Sign up</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigateToPage('/mark-attendance')}>
                <Typography fontWeight="600">Mark Attendance</Typography>
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
