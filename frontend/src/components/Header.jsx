import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from '../assets/images/logo1.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const navigate = useNavigate();
  return (
    
    <AppBar position="sticky"  sx={{ bgcolor: '#004c5c' }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h4" component="div" >
          <Box component="img" 
             src={logo} 
             alt="Logo" 
             sx={{ height: 50, marginRight: 3 }}  >
               
          </Box>
          
        </Typography>
        <Typography variant='h4'sx={{ flexGrow: 2}}>InstaLearn</Typography>
        
        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {/* <Link to="/"> */}
            <Button  onClick={() => navigate('/')} color="inherit" sx={{ mx: 1 }}>Home</Button>
          {/* </Link> */}
          {/* <Link to="/about"> */}
            <Button  onClick={() => navigate('/about')} color="inherit" sx={{ mx: 1 }}>About</Button>
          {/* </Link> */}
          {/* <Link to="/about"> */}
            <Button  onClick={() => navigate('/contact') } color="inherit"sx={{ mx: 1 }}>Contact</Button>
          {/* </Link> */}
        </Box>
        
        {/* Login Button */}
        <Button onClick={() => navigate('/login')} variant="outlined" color="inherit" sx={{ marginLeft: 6 ,marginRight:4}}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
    
  );
};

export default Header;
