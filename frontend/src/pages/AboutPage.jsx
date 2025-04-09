import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ThemeProvider, 
  createTheme,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  School,
  Assessment,
  Payment,
  QrCodeScanner,
  LibraryBooks,
  Dashboard,
  People,
  CheckCircle,
  AutoAwesome,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004C5C',
      light: '#33707D',
      dark: '#003540',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF7D00',
      light: '#FF9833',
      dark: '#B25700',
    },
    background: {
      default: '#F5F7F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#004C5C',
      secondary: '#5C7B84',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h2: {
      fontWeight: 700,
      fontFamily: '"Playfair Display", serif',
    },
    h4: {
      fontWeight: 600,
      fontFamily: '"Playfair Display", serif',
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.6,
    },
  },
});

const AboutPage = () => {
  const [question, setQuestion] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Question submitted:', question);
    setQuestion('');
  };

  return (
    <div>
      <Header />
      
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Hero Section */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                mb: 3,
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                lineHeight: 1.2
              }}
            >
              About InstaLearn
            </Typography>
            <Typography 
              variant="h5" 
              component="p" 
              sx={{ 
                maxWidth: '800px',
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              A unified platform revolutionizing educational management for tuition centers
            </Typography>
          </Box>

          {/* Mission Section */}
          <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, mb: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              InstaLearn was developed by Group 17 at the University of Ruhuna to address critical challenges in educational management. Our mission is to transform traditional tuition center operations through digital innovation.
            </Typography>
            <Typography variant="body1" paragraph>
              We recognized the inefficiencies in manual attendance tracking, disorganized question paper management, and cumbersome payment processes - problems that negatively impact both educators and students.
            </Typography>
            <Typography variant="body1" paragraph>
              Our solution integrates advanced features like QR-based attendance, centralized question banks, and automated payment tracking into one seamless platform.
            </Typography>
          </Paper>

          {/* Features Section */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                textAlign: 'center',
                mb: 6
              }}
            >
              Key Features
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  icon: <QrCodeScanner color="primary" sx={{ fontSize: 48 }} />,
                  title: "QR Attendance",
                  text: "Eliminate manual tracking with our QR code system that records attendance in seconds"
                },
                {
                  icon: <LibraryBooks color="primary" sx={{ fontSize: 48 }} />,
                  title: "Question Bank",
                  text: "Centralized repository with automated paper generation based on customizable criteria"
                },
                {
                  icon: <Payment color="primary" sx={{ fontSize: 48 }} />,
                  title: "Payment System",
                  text: "Secure online payments with automated tracking and receipt generation"
                },
                {
                  icon: <Assessment color="primary" sx={{ fontSize: 48 }} />,
                  title: "Performance Analytics",
                  text: "Comprehensive dashboards to track student progress and identify learning gaps"
                },
                {
                  icon: <Dashboard color="primary" sx={{ fontSize: 48 }} />,
                  title: "Unified Dashboard",
                  text: "Role-specific interfaces for admins, teachers, students, and parents"
                },
                {
                  icon: <People color="primary" sx={{ fontSize: 48 }} />,
                  title: "Stakeholder Portal",
                  text: "Dedicated access points for all users with appropriate permissions"
                }
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper sx={{ 
                    p: 4, 
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.text}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Team Section */}
          <Paper elevation={0} sx={{ 
            p: { xs: 4, md: 6 }, 
            mb: 8,
            backgroundColor: 'primary.main',
            color: 'white',
            backgroundImage: 'linear-gradient(135deg, #004C5C 0%, #003540 100%)'
          }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              Development Team
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 4 }}>
              InstaLearn was developed by Group 17 from the Department of Computer Science, University of Ruhuna
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                "W.M.M.N. Wijekoon",
                "P.H.D. Madushika",
                "B.L.S.T. Madhuwantha",
                "P.V.N. Madhushan",
                "D.A. Muthumali"
              ].map((member, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ 
                    p: 3,
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    textAlign: 'center'
                  }}>
                    <Typography variant="h6">{member}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
              Supervised by: Dr. Sugandima Vidanagamachchi & Mr. Malaka Pathirana
            </Typography>
          </Paper>

          {/* Contact Section */}
          <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, mb: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              Contact Us
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LocationOn color="primary" sx={{ mr: 2, fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6">Address</Typography>
                    <Typography variant="body1">
                      Department of Computer Science, University of Ruhuna
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Email color="primary" sx={{ mr: 2, fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6">Email</Typography>
                    <Typography variant="body1">
                      instalearn@ruh.ac.lk
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone color="primary" sx={{ mr: 2, fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6">Phone</Typography>
                    <Typography variant="body1">
                      +94 41 222 2681
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Have questions?
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Message"
                    variant="outlined"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Send Message
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
      
      <Footer />
    </div>
  );
};

export default AboutPage;