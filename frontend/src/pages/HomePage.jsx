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
import qpool from "../assets/images/qpool.png"
import progress from "../assets/images/progress.png"
import payment from "../assets/images/payment.png"
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
    slidesToShow: 2,
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
      title: "Teacher",
      description: "Manage attendance, create exams, track student progress",
    },
    {
      icon: <SchoolIcon style={{ fontSize: 50 }} />,
      title: "Student",
      description: "Manage attendance, create exams, track student progress",
    },
    {
      icon: <GroupIcon style={{ fontSize: 50 }} />,
      title: "Parent",
      description: "Monitor child's academic performance and payments",
    },
  ];

  return ( 
    
    <div>
      <div className="header" >
        <Header />
      </div>
      <div className="bg-[#5BB9BD]">
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
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text contrast
        zIndex: 1,
      },
    }}
  >
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        color: "white", // Light text for better contrast
        textAlign: "center",
        maxWidth: "800px",
        px: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "2.5rem", md: "4rem" },
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
          lineHeight: 1.2,
          mb: 3,
          animation: "fadeIn 1.5s ease-in-out", // Subtle fade-in animation
        }}
      >
        One Platform, <br />
        Endless Learning Opportunities
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "16px", md: "20px" },
          fontWeight: 400,
          fontFamily: "'Poppins', sans-serif",
          mb: 4,
          animation: "fadeIn 2s ease-in-out", // Delayed fade-in animation
        }}
      >
        An Education Institute Management System streamlines administration by
        integrating enrollment, attendance, fees, and performance tracking into
        one platform.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          animation: "fadeInUp 1s ease-in-out", // Fade-in with upward motion
        }}
      >
        <Button
          onClick={() => navigate("/about")}
          variant="contained"
          sx={{
            backgroundColor: "#FF6B6B", // Vibrant button color
            color: "white",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "12px 24px",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FF5252", // Slightly darker on hover
              transform: "scale(1.05)", // Subtle scale effect on hover
            },
            transition: "all 0.3s ease",
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  </Box>
</div>
      <div align="center"><h4>Our Key Features</h4></div>
      <div className="feature">
      <Paper 
  elevation={3} 
  sx={{ 
    p: 2.5, 
    mb: 1, 
    background: 'linear-gradient(135deg, #84D4D8 0%, #6ABAC0 100%)',
    overflow: 'hidden',
    position: 'relative',
    maxWidth: '100%', // Ensure the Paper doesn't exceed the screen width
    mx: 'auto', // Center the Paper horizontally
  }}
>
  <Slider {...settings}>
    {[qr, qpool, payment, progress].map((img, index) => (
      <div key={index}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 350, // Adjusted maxWidth for better proportion
            height: { xs: 320, sm: 360 }, // Adjusted height for better proportion
            mx: 'auto',
            bgcolor: 'rgba(0,0,0,0.9)',
            p: { xs: 1.5, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 3,
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 8
            },
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '90%',
              minHeight: 180, // Adjusted minHeight for better proportion
              position: 'relative',
              mb: 1,
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'rgba(255,255,255,0.05)',
              '&:hover img': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <img 
              src={img} 
              alt="Feature"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                padding: 2,
                boxSizing: 'border-box'
              }}
            />
          </Box>

          <Box sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: 1 
          }}>
            <Typography variant="h6" color="white" sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' }, // Adjusted font size
              fontWeight: 600,
              lineHeight: 1.2,
              mb: 0.5,
              textShadow: '0 2px 2px rgba(0,0,0,0.3)'
            }}>
              {['QR Tracking', 'Question Pool', 'Online Payments', 'Progress Tracking'][index]}
            </Typography>
            
            <Typography variant="body2" color="rgba(255,255,255,0.85)" sx={{
              fontSize: { xs: '0.7rem', sm: '0.8rem' }, // Adjusted font size
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {[
                'Instant scanning for real-time tracking updates',
                'Smart categorization and exam paper generation',
                'Secure transactions with auto-reminders',
                'Live dashboard for all stakeholders'
              ][index]}
            </Typography>
          </Box>
        </Box>
      </div>
    ))}
  </Slider>
</Paper>
      </div>
      
      <div align="center"><h4><br/>Designed For</h4></div>
      <div className="dashbords" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
  <Grid container spacing={3} justifyContent="center">
    {cards.map((card, index) => (
      <Grid item key={index} xs={12} sm={4}>
        <Card
          style={{
            backgroundColor: index === 1 ? "#E5EAEA" : "white",
            color: "black",
            textAlign: "center",
            borderRadius: "16px",
            padding: "20px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for transform and shadow
            transform: "scale(1)", // Default scale
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Default shadow
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"; // Scale up on hover
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"; // Increase shadow on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"; // Reset scale
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Reset shadow
          }}
        >
          <CardContent>
            <div style={{ transition: "transform 0.3s ease" }}>
              {card.icon}
            </div>
            <Typography
              variant="body1"
              style={{ marginTop: "10px", fontSize: "16px" }}
            >
              <b>{card.title}</b>
              <br />
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
      </div>
      
      
      
      <div className="footer"><br/><br/><Footer/></div>
      </div>
    </div>
  );
};

export default Homepage;
