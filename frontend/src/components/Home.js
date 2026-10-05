import React from 'react';
import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import { Shield, Lock, HowToReg, CameraAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #070A0F 0%, #0D131F 50%, #0A0E17 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
        color: '#F3F4F6',
      }}
    >
      <Container maxWidth="sm">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: '24px',
              background: 'rgba(13, 19, 31, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 224, 198, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 176, 0, 0.15)',
              textAlign: 'center',
            }}
          >
            {/* Security Shield Icon */}
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255, 176, 0, 0.2) 0%, rgba(0, 224, 198, 0.25) 100%)',
                border: '2px solid #FFB000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0, 224, 198, 0.35)',
              }}
            >
              <Shield sx={{ fontSize: 44, color: '#00E0C6' }} />
            </Box>

            {/* Main Header Title */}
            <Typography
              variant="h3"
              fontWeight="900"
              sx={{
                color: '#FFB000',
                letterSpacing: '-0.03em',
                fontFamily: '"JetBrains Mono", "Inter", sans-serif',
                fontSize: { xs: '1.85rem', sm: '2.3rem' },
                mb: 1.5,
                textShadow: '0 0 15px rgba(255, 176, 0, 0.3)',
              }}
            >
              CRYPTOLAB <span style={{ color: '#00E0C6' }}>ATTENDANCE</span>
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                color: '#9CA3AF',
                fontFamily: '"Inter", sans-serif',
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                mb: 5,
                fontWeight: 500,
              }}
            >
              AES-256-GCM Cryptographic Biometric Security
            </Typography>

            {/* Three Action Buttons ONLY */}
            <Stack spacing={2.5}>
              {/* 1. SIGN IN */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Lock sx={{ color: '#070A0F' }} />}
                onClick={() => navigate('/login')}
                sx={{
                  py: 1.8,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #FFB000 0%, #D97706 100%)',
                  color: '#070A0F',
                  fontWeight: '900',
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontFamily: '"Inter", sans-serif',
                  boxShadow: '0 8px 24px rgba(255, 176, 0, 0.35)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(255, 176, 0, 0.45)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                🔐 SIGN IN
              </Button>

              {/* 2. SIGN UP */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<HowToReg />}
                onClick={() => navigate('/register')}
                sx={{
                  py: 1.8,
                  borderRadius: '14px',
                  borderColor: '#00E0C6',
                  color: '#00E0C6',
                  fontWeight: '900',
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontFamily: '"Inter", sans-serif',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    borderColor: '#00E0C6',
                    background: 'rgba(0, 224, 198, 0.12)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 0 20px rgba(0, 224, 198, 0.3)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                📝 SIGN UP
              </Button>

              {/* 3. MARK ATTENDANCE */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<CameraAlt sx={{ color: '#070A0F' }} />}
                onClick={() => navigate('/mark-attendance')}
                sx={{
                  py: 1.8,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #00E0C6 0%, #0F766E 100%)',
                  color: '#070A0F',
                  fontWeight: '900',
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontFamily: '"Inter", sans-serif',
                  boxShadow: '0 8px 24px rgba(0, 224, 198, 0.35)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(0, 224, 198, 0.45)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                📷 MARK ATTENDANCE
              </Button>
            </Stack>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Home;
