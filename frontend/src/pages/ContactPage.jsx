import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Box, Typography, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import img2 from "../assets/images/aboutUs_2.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const ContactPopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function


  useEffect(() => {
    // Automatically open the modal when the component is mounted
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    navigate("/")

  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Contact Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon sx={{ fontSize: 30, color: '#000' }} />
                <Box ml={1}>
                  <Typography variant="body1" fontWeight="bold" color="textPrimary">
                    Address
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    Department of Computer Science, University of Ruhuna
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <EmailIcon sx={{ fontSize: 30, color: '#000' }} />
                <Box ml={1}>
                  <Typography variant="body1" fontWeight="bold" color="textPrimary">
                    Email
                  </Typography>
                  <Link href="mailto:support@studenthousing.com" color="inherit">
                    <Typography variant="body2" color="textPrimary">
                      support@studenthousing.com
                    </Typography>
                  </Link>
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <PhoneIcon sx={{ fontSize: 30, color: '#000' }} />
                <Box ml={1}>
                  <Typography variant="body1" fontWeight="bold" color="textPrimary">
                    Phone
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    (123) 456-7890
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <img 
                src={img2} 
                alt="Contact illustration" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', maxHeight: '150px' }} 
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactPopup;
