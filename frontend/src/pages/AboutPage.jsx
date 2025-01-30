import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
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
  Link
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import img1 from "../assets/images/aboutUs_1.jpeg";
import img2 from "../assets/images/aboutUs_2.png";
import img3 from "../assets/images/aboutUs_3.png";



const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
      fontFamily: 'Playfair Display, serif', 
    },
    body1: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Roboto, Arial, sans-serif',
      fontSize: '0.925rem',
    },
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});


const AboutPage = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Question submitted:', question);
    setQuestion('');
  };
  return (
    <div>
      {/* <div className='header'> <Header/></div> */}
        

        <div>
        <ThemeProvider theme={theme}>
      <Box sx={{ px: { xs: '60px' ,lg : '100px' }, maxWidth: '100%', overflow: 'hidden' }}>
        <Box my={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }} id="about-us-section">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h4" component="h1" gutterBottom align="center">
                About Us
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" paragraph>
                    We are a dedicated platform connecting university students with quality boarding places. 
                    Our mission is to simplify the often stressful process of finding accommodation for students. 
                    We understand the unique needs of academic life and strive to provide safe, comfortable, 
                    and affordable housing options. Our team works tirelessly to verify listings, 
                    ensure fair practices, and foster a supportive community for students transitioning 
                    to university life. We're committed to making your housing search as smooth as possible, 
                    allowing you to focus on what matters most - your education and university experience.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <img 
                      src={img1} 
                      alt="Housing illustration" 
                      style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: '#e3f2fd' }} id="learn-more-section">
            <Typography variant="h6" gutterBottom align="left">
              Learn More
            </Typography>
            <Typography variant="body2" gutterBottom align="justify">
              Discover how our platform works to connect you with the perfect boarding place. 
              We offer a wide range of verified listings, from shared apartments to private rooms, 
              all tailored to student needs. Our advanced search filters help you find accommodation 
              that fits your budget, preferred location, and amenities. We also provide resources on 
              tenant rights, safety tips, and community integration to ensure a positive living experience. 
              Join thousands of students who have found their ideal university home through our service.
            </Typography>
          </Paper>
          
        </Box>
      </Box>
        </ThemeProvider>
  
        </div>
        <div><Footer/></div>
        
    </div>
  )
}

export default AboutPage