import React from 'react';
import { Grid, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Facebook, LinkedIn, GitHub } from '@mui/icons-material';
import logo from '../assets/images/logo1.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box component="footer" sx={{ backgroundColor: 'black', p: { xs: 3, md: 5 }, textAlign: { xs: 'center', md: 'left' } }}>
      <Grid container spacing={3}>
        {/* Logo and Newsletter */}
        <Grid item xs={12} md={4}>
          <Box>
            <img src={logo} alt="logo" style={{ width: '6rem' }} />
            <Typography variant="body1" mt={2} color='white'>
              Stay up to date on our latest features and releases by joining our newsletter.
            </Typography>
            <Box component="form" className="subscribe-form" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}>
              <TextField 
                variant="outlined"
                placeholder="Your Email Address" 
                sx={{ mb: { xs: 2, sm: 0 }, mr: { sm: 2 }, width: { xs: '100%', sm: 'auto' } ,"& .MuiOutlinedInput-root": {
      color: "white", // Text color
      "& fieldset": {
        borderColor: "white", // White border
      },
      "&:hover fieldset": {
        borderColor: "white", // White border on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "white", // White border on focus
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "white", // White placeholder color
      opacity: 1, // Ensure full visibility of placeholder
    },}} 
              />
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#333', width: { xs: '100%', sm: 'auto' } }}>
                Subscribe
              </Button>
            </Box>
          </Box>
        </Grid>
        
        {/* Main Sections: About Us, Quick Links, Contact Us */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            
            {/* About Us Column */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h4" gutterBottom color='white'>
                About Us
              </Typography>
              <Typography variant="body2" color='white'>
                We are a company dedicated to providing the best platform to connect students with affordable accommodation options.
              </Typography>
            </Grid>

            {/* Quick Links Column */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h4" gutterBottom color='white'> 
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                <li>
                  
                    <Button variant="text" color='primary'onClick={() => navigate('/contact')}>
                      Contact Us
                    </Button>
                  
                </li>
                <li>
                  
                    <Button variant="text" color='primary'onClick={() => navigate('/about')}>
                      About
                    </Button>
                  
                </li>
                <li>
                  
                    <Button variant="text" color='primary'onClick={() => navigate('/about')}>
                      Learn More
                    </Button>
                  
                </li>
                
                <li>
                  
                    <Button variant="text" color='primary'onClick={() => navigate('/about')}>
                      Terms & Policies
                    </Button>
                  
                </li>
                <li>
                  
                    <Button variant="text" color='primary'onClick={() => navigate('/about')}>
                      Q&A
                    </Button>
                  
                </li>
              </Box>
            </Grid>

            {/* Contact Us Column */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h4" gutterBottom color='white'>
                Contact Us
              </Typography>
             

              {/* Social Links */}
              <Box component="ul" sx={{ color:'white' ,listStyle: 'none',mt: 2, display: 'flex',flexDirection: 'column', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <li>
                <IconButton aria-label="Facebook" href="https://facebook.com">
                <Facebook sx={{ color: "#0A66C2" }} />
                </IconButton>
                </li>
                <li>
                <IconButton aria-label="LinkedIn" href="https://linkedin.com">
                <LinkedIn sx={{ color: "#0A66C2" }} />
                </IconButton>
                </li>
                <li>
                <IconButton aria-label="GitHub" href="https://github.com">
                <GitHub sx={{ color: "#0A66C2" }} />
                </IconButton>
                </li>
              </Box>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
