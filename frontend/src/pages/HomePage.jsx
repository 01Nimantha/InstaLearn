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
      filter: "brightness(50%) contrast(70%)", // Apply filter only to the overlay
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
        An Education Institute Management System is a modern solution designed to streamline 
      and enhance the administration of educational institutions. This system integrates 
      various functionalities such as student enrollment, attendance tracking, fee management, 
      and academic performance monitoring into a single platform. </b>
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
            <Box
      sx={{
        width: 400,
        height: 400,
        bgcolor: "black",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <img src={qr} width={200} height={200} alt="QR Code" />
      <Typography variant="h5" color="white" mt={2}>
        QR Code Tracking
      </Typography>
      <Typography variant="body2" color="gray" mt={1} px={2}>
        Scan the QR code to track real-time details efficiently and securely.
      </Typography>
    </Box>
          </div>
          <div>
          <Box
      sx={{
        width: 400,
        height: 400,
        bgcolor: "black",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <img src={qpool} width={200} height={200} alt="QPool" />
      <Typography variant="h5" color="white" mt={2}>
        Question Pool 
      </Typography>
      <Typography variant="body2" color="gray" mt={1} px={2}>
        Easily upload,categorize and generate exam papers.
      </Typography>
    </Box>
          </div>
          <div>
          <Box
      sx={{
        width: 400,
        height: 400,
        bgcolor: "black",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <img src={payment} width={200} height={200} alt="Payment" />
      <Typography variant="h5" color="white" mt={2}>
        Online Payment
      </Typography>
      <Typography variant="body2" color="gray" mt={1} px={2}>
        Secure payment gateway with automated reminders
      </Typography>
    </Box>
          </div>
          <div>
          <Box
      sx={{
        width: 400,
        height: 400,
        bgcolor: "black",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <img src={progress} width={200} height={200} alt="Progress" />
      <Typography variant="h5" color="white" mt={2}>
        Progress Traking 
      </Typography>
      <Typography variant="body2" color="gray" mt={1} px={2}>
        Real-time dashboard for students,parents and  teachers
      </Typography>
    </Box>
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
              color: "black,",
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
                <b>{card.title}</b><br/>
                {card.description}
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
