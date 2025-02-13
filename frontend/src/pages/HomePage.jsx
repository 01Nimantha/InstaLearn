import React from "react";
import Header from "../components/Header";
import background from "../assets/images/logo.jpg";
import { Box, Typography, Button,Paper } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QrCodeIcon from '@mui/icons-material/QrCode';
import { QrCode } from "@mui/icons-material";
import qr from "../assets/images/qr.png";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import { Card, CardContent, Grid } from "@mui/material";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';


// Custom Previous Arrow
const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "-30px",
        zIndex: 2,
        cursor: "pointer",
      }}
    >
      <ArrowBackIosIcon sx={{ color: "black", fontSize: "30px" }} />
    </Box>
  );
};

// Custom Next Arrow
const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        position: "absolute",
        right: "-30px",
        zIndex: 2,
        cursor: "pointer",
      }}
    >
      <ArrowForwardIosIcon sx={{ color: "black", fontSize: "30px" }} />
    </Box>
  );
};

const Homepage = () => {
  const navigate = useNavigate();
  const settings = {
    centerMode: true,
    centerPadding: "150px",
    slidesToShow: 1.5,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
          arrows: true,
        },
      },
    ],
  };

  const cards = [
    {
      icon: <PeopleIcon style={{ fontSize: 50 }} />,
      title: "View grades, attendance, and personal dashboard",
    },
    {
      icon: <SchoolIcon style={{ fontSize: 50 }} />,
      title: "Manage attendance, create exams, track student progress",
    },
    {
      icon: <GroupIcon style={{ fontSize: 50 }} />,
      title: "Monitor child's academic performance and payments",
    },
  ];

  return ( 
    
    <div>
      <div className="header" >
        <Header />
      </div>
      <div className="learnmore">
      <Box
  sx={{
    position: "relative",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${background})`, // Reuse the background image
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "brightness(50%) contrast(100%)", // Apply filter only to the overlay
      zIndex: 1,
    },
  }}
>
  <Box
    sx={{
      position: "relative",
      zIndex: 2, // Ensure content is above the darkened background
      color: "black", // Adjust text color if needed
      textAlign: "center",
      p: 2,
    }}
  >
    <Typography sx={{ padding: "350px" }}>
      <span>
        <b>
        An Education Institute Management System is a modern solution...</b>
      </span>
      <Box sx={{ display: "flex", justifyContent: "center", p: "50px" }}>
        <Typography align="center">
          <Button onClick={() => navigate('/about')} variant="outlined" color="inherit">
            Learn More
          </Button>
        </Typography>
      </Box>
    </Typography>
  </Box>
</Box>

      </div>
      <div align="center"><h4>Our Key Features</h4></div>
      <div className="feature">
        <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: '#e8eaf6' }}>
        <Slider {...settings}>
          <div>
            <Box sx={{ width: 400, height: 400, bgcolor: "black", p: 2 ,justifyContent: "center",alignItems: "center"}}>
              <img src={qr} width={200} height={200} align="center"/>
              {/* <div><span align="center" color="white"><h5>QR Code Tracking</h5></span></div> */}
              
            </Box>
          </div>
          <div>
            <Box sx={{ width: 400, height: 400, bgcolor: "black", p: 2 }}></Box>
          </div>
          <div>
            <Box sx={{ width: 400, height: 400, bgcolor: "black", p: 2 }}></Box>
          </div>
          <div>
          <Box sx={{ width: 400, height: 400, bgcolor: "black", p: 2 }}></Box>
          </div>
        </Slider>
        <br/>
        </Paper>
      </div>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <div align="center"><h4><br/>Designed For</h4></div>
      <div className="dashbords" >
        <Grid container spacing={3} justifyContent="center">
      {cards.map((card, index) => (
        <Grid item key={index} xs={12} sm={4}>
          <Card
            style={{
              backgroundColor: index === 1 ? "#AEE9E6" : "#2AA99D",
              color: "white",
              textAlign: "center",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <CardContent>
              {card.icon}
              <Typography
                variant="body1"
                style={{ marginTop: "10px", fontSize: "16px" }}
              >
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  
          
        

      </div>
      </Paper>
      
      <div className="footer"><br/><br/><Footer/></div>
    </div>
  );
};

export default Homepage;
