import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from '../assets/images/react.svg'

const Header = () => {
  return (
    <AppBar position="static"  sx={{ bgcolor: 'black' }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h4" component="div" >
          <Box component="img" 
             src={logo} 
             alt="Logo" 
             sx={{ height: 40, marginRight: 3 }}  >
               
          </Box>
          
        </Typography>
        <Typography variant='h6' sx={{ flexGrow: 2}}>InstaLearn</Typography>
        
        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" sx={{ mx: 1 }}>Home</Button>
          <Button color="inherit" sx={{ mx: 1 }}>About</Button>
          <Button color="inherit"sx={{ mx: 1 }}>Contact</Button>
        </Box>
        
        {/* Login Button */}
        <Button variant="outlined" color="inherit" sx={{ marginLeft: 2 }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
