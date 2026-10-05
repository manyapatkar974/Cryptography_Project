import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Fade,
  Paper,
  Stack,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Email,
  Phone,
  Business,
  Visibility,
  VisibilityOff,
  Lock,
  Person,
  CheckCircle,
  HowToReg,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { authAPI } from '../services/api';

const MotionPaper = motion(Paper);

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone_number: '',
    department: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (name, value) => {
    const errors = { ...fieldErrors };
    switch (name) {
      case 'full_name':
        if (!value.trim()) {
          errors.full_name = 'Full name is required';
        } else if (value.trim().length < 2) {
          errors.full_name = 'Full name must be at least 2 characters';
        } else {
          delete errors.full_name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (!value) {
          errors.password = 'Password is required';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else {
          delete errors.password;
        }
        if (formData.confirmPassword) {
          if (value !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
          } else {
            delete errors.confirmPassword;
          }
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        } else {
          delete errors.confirmPassword;
        }
        break;
      default:
        break;
    }
    setFieldErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
    if (name === 'full_name' || name === 'email' || name === 'password' || name === 'confirmPassword') {
      validateField(name, value);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: 'Enter password', color: 'default' };
    if (password.length < 6) return { strength: 25, text: 'Weak', color: 'error' };
    if (password.length < 8) return { strength: 50, text: 'Fair', color: 'warning' };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 100, text: 'Strong', color: 'success' };
    }
    return { strength: 75, text: 'Good', color: 'info' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    try {
      const registrationData = {
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone_number: formData.phone_number || null,
        department: formData.department || null,
      };

      const response = await authAPI.register(registrationData);
      const { access_token, user } = response.data;
      
      login(user, access_token);
      navigate('/face-capture');
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error.response?.status === 400) {
        if (error.response?.data?.detail?.includes('already')) {
          errorMessage = 'This email is already registered. Please use a different email or try logging in.';
        } else {
          errorMessage = error.response?.data?.detail || 'Invalid input. Please check all fields and try again.';
        }
      } else if (error.response?.status === 422) {
        errorMessage = 'Invalid email format. Please enter a valid email address.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later or contact support.';
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = `Connection error: ${error.message}. Please check your internet connection.`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: 'rgba(7, 10, 15, 0.7)',
      border: '1px solid rgba(0, 224, 198, 0.3)',
      color: '#F3F4F6',
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.88rem',
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        py: 1.3,
        color: '#F3F4F6',
        '&::placeholder': {
          color: '#64748b',
          opacity: 1,
        },
      },
      '&:hover': {
        background: 'rgba(7, 10, 15, 0.9)',
        border: '1px solid rgba(255, 176, 0, 0.4)',
      },
      '&.Mui-focused': {
        background: '#070A0F',
        boxShadow: '0 0 15px rgba(0, 224, 198, 0.3)',
        border: '1px solid #00E0C6',
      },
    },
    '& .MuiFormHelperText-root': {
      color: '#FFB000',
      fontSize: '0.75rem',
      mt: 0.5,
    },
  };

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
        <MotionPaper
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          elevation={0}
          sx={{
            p: { xs: 3.5, sm: 4.5 },
            borderRadius: '24px',
            background: 'rgba(13, 19, 31, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 224, 198, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 224, 198, 0.15)',
          }}
        >
          {/* Header Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2.5,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0, 224, 198, 0.2) 0%, rgba(255, 176, 0, 0.25) 100%)',
              border: '2px solid #00E0C6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(0, 224, 198, 0.35)',
            }}
          >
            <HowToReg sx={{ fontSize: 32, color: '#00E0C6' }} />
          </Box>

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3.5 }}>
            <Typography
              variant="h4"
              fontWeight="900"
              gutterBottom
              sx={{
                color: '#00E0C6',
                letterSpacing: '-0.02em',
                fontFamily: '"JetBrains Mono", "Inter", sans-serif',
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                mb: 0.8,
              }}
            >
              Create your account
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: '#9CA3AF',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              Join Cryptography Smart Attendance System
            </Typography>
          </Box>

          {/* Alert Message */}
          {error && (
            <Fade in timeout={400}>
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: '12px',
                  background: 'rgba(255, 176, 0, 0.15)',
                  border: '1px solid rgba(255, 176, 0, 0.4)',
                  color: '#FFB000',
                  '& .MuiAlert-icon': { color: '#FFB000' },
                }}
              >
                <Typography variant="body2" fontWeight="600" sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem' }}>
                  {error}
                </Typography>
              </Alert>
            </Fade>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} autoComplete="off">
            <Stack spacing={2}>
              {/* Full Name */}
              <TextField
                fullWidth
                name="full_name"
                placeholder="Full name *"
                value={formData.full_name}
                onChange={handleChange}
                required
                disabled={loading}
                autoFocus
                autoComplete="new-name"
                inputProps={{
                  autoComplete: 'new-name',
                }}
                error={!!fieldErrors.full_name}
                helperText={fieldErrors.full_name || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#00E0C6', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />

              {/* Email */}
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="Email address *"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="new-email"
                inputProps={{
                  autoComplete: 'new-email',
                }}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#00E0C6', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />

              {/* Phone & Department Row */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  name="phone_number"
                  placeholder="Phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="new-phone"
                  inputProps={{
                    autoComplete: 'new-phone',
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: '#FFB000', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
                
                <TextField
                  fullWidth
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="new-department"
                  inputProps={{
                    autoComplete: 'new-department',
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: '#FFB000', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Stack>

              {/* Password */}
              <Box>
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="new-password"
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                  error={!!fieldErrors.password}
                  helperText={fieldErrors.password || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#00E0C6', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: '#64748b',
                            '&:hover': { color: '#00E0C6' },
                          }}
                        >
                          {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={passwordStrength.strength} 
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: 'rgba(7, 10, 15, 0.7)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 2,
                              backgroundColor: 
                                passwordStrength.color === 'error' ? '#ef4444' :
                                passwordStrength.color === 'warning' ? '#FFB000' :
                                passwordStrength.color === 'info' ? '#00E0C6' :
                                passwordStrength.color === 'success' ? '#00E0C6' : '#64748b'
                            }
                          }}
                        />
                      </Box>
                      <Chip 
                        label={passwordStrength.text}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          height: 18,
                          backgroundColor: 'rgba(0, 224, 198, 0.15)',
                          color: '#00E0C6',
                          border: '1px solid rgba(0, 224, 198, 0.3)',
                          fontWeight: '700'
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Confirm Password */}
              <Box>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password *"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="new-password"
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                  error={!!fieldErrors.confirmPassword}
                  helperText={fieldErrors.confirmPassword || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#FFB000', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{
                            color: '#64748b',
                            '&:hover': { color: '#00E0C6' },
                          }}
                        >
                          {showConfirmPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && formData.password && (
                  <Box sx={{ mt: 1 }}>
                    {formData.password === formData.confirmPassword ? (
                      <Chip 
                        icon={<CheckCircle sx={{ fontSize: 14, color: '#00E0C6' }} />}
                        label="Passwords match" 
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          height: 20,
                          backgroundColor: 'rgba(0, 224, 198, 0.15)',
                          color: '#00E0C6',
                          border: '1px solid rgba(0, 224, 198, 0.3)',
                          fontWeight: '700',
                          '& .MuiChip-icon': { color: '#00E0C6' }
                        }}
                      />
                    ) : (
                      <Chip 
                        label="Passwords don't match" 
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          height: 20,
                          backgroundColor: 'rgba(255, 176, 0, 0.15)',
                          color: '#FFB000',
                          border: '1px solid rgba(255, 176, 0, 0.3)',
                          fontWeight: '700'
                        }}
                      />
                    )}
                  </Box>
                )}
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                sx={{
                  py: 1.6,
                  mt: 1,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #00E0C6 0%, #0F766E 100%)',
                  color: '#070A0F',
                  fontWeight: '900',
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  fontFamily: '"Inter", sans-serif',
                  boxShadow: '0 8px 24px rgba(0, 224, 198, 0.35)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0F766E 0%, #115E59 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(0, 224, 198, 0.45)',
                  },
                  '&:disabled': {
                    background: 'rgba(51, 65, 85, 0.5)',
                    color: '#64748b',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </Stack>
          </Box>

          {/* Footer Link */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#9CA3AF',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.85rem',
              }}
            >
              Already have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#FFB000',
                  textDecoration: 'none',
                  fontWeight: '700',
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </MotionPaper>
      </Container>
    </Box>
  );
};

export default Register;