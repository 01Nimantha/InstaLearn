import React from 'react';
import { Grid, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Facebook, LinkedIn, GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
  <Box component="footer" sx={{ 
    backgroundColor: '#002b36', 
    py: { xs: 4, md: 6 },
    px: { xs: 2, md: 4 },
    borderTop: '1px solid rgba(255,255,255,0.1)',
    mt: 'auto'
  }}>
    <Grid container spacing={4} justifyContent="space-between">
      {/* Logo and Newsletter */}
      <Grid item xs={12} md={5} lg={4}>
        <Box sx={{ maxWidth: 400, mx: { xs: 'auto', md: 0 } }}>
          <Typography variant="h6" color="white" mb={2} sx={{ 
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: 0.5
          }}>
            Join Our Newsletter
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.8)" mb={3}>
            Get exclusive updates about new features and special offers
          </Typography>
          <Box component="form" sx={{ 
            display: 'flex', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Email address"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.7)",
                  opacity: 1,
                },
              }}
            />
            <Button 
              variant="contained" 
              sx={{ 
                flexShrink: 0,
                backgroundColor: '#00a3a3',
                '&:hover': { backgroundColor: '#008b8b' },
                textTransform: 'none',
                px: 3,
                fontWeight: 500
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Links Section */}
      <Grid item xs={12} md={7} lg={6}>
        <Grid container spacing={3}>
          {/* About Column */}
          <Grid item xs={12} sm={6} md={5}>
            <Typography variant="h6" color="white" mb={2} sx={{
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: 0.5,
              opacity: 0.9
            }}>
              About Us
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.8)" fontSize="0.875rem">
              Connecting students with affordable housing solutions through innovative technology and dedicated support.
            </Typography>
          </Grid>

          {/* Quick Links Column */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="white" mb={2} sx={{
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: 0.5,
              opacity: 0.9
            }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ 
  listStyle: 'none', 
  p: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 1
}}>
  {['Contact Us', 'About', 'Learn More', 'Terms & Policies', 'Q&A'].map((link) => (
    <li key={link}>
      <Button
        fullWidth
        size="small"
        onClick={() => {
          if (link === 'Contact Us') {
            navigate('/contact');
          } // Specific navigation for Contact Us
           else {
            navigate('/about'); // Default behavior for other links
          }
        }}
        sx={{
          justifyContent: 'flex-start',
          color: 'rgba(255,255,255,0.8)',
          textTransform: 'none',
          fontSize: '0.875rem',
          fontWeight: 400,
          px: 0,
          '&:hover': {
            color: 'white',
            backgroundColor: 'transparent',
            textDecoration: 'underline'
          }
        }}
      >
        {link}
      </Button>
    </li>
  ))}
</Box>
          </Grid>

          {/* Social Links Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="white" mb={2} sx={{
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: 0.5,
              opacity: 0.9
            }}>
              Follow Us
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', // Align icons vertically
              gap: 1.5, // Space between icons
              alignItems: 'flex-start' // Align to the left
            }}>
              <IconButton aria-label="Facebook" sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                '&:hover': { color: '#1877f2' },
                p: 0 // Remove padding for better alignment
              }}>
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton aria-label="LinkedIn" sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                '&:hover': { color: '#0a66c2' },
                p: 0 // Remove padding for better alignment
              }}>
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton aria-label="GitHub" sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                '&:hover': { color: 'white' },
                p: 0 // Remove padding for better alignment
              }}>
                <GitHub fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    {/* Copyright */}
    <Box sx={{ 
      mt: 2,
      pt: 1,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      textAlign: 'center'
    }}>
      <Typography variant="body2" color="rgba(255,255,255,0.6)" fontSize="0.75rem">
        © {new Date().getFullYear()} Student Housing. All rights reserved.
      </Typography>
    </Box>
  </Box>
);
}

export default Footer;
