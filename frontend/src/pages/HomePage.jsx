import { useState, useEffect, useRef } from "react"
import Header from "../components/Header"
import background from "../assets/images/logo.jpg"
import { Box, Typography, Button, Card, CardContent, Grid, useMediaQuery, Container, Fade, Zoom } from "@mui/material"
import { useTheme, alpha } from "@mui/material/styles"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import PeopleIcon from "@mui/icons-material/People"
import SchoolIcon from "@mui/icons-material/School"
import GroupIcon from "@mui/icons-material/Group"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

// Import images
import qr from "../assets/images/qr.png"
import qpool from "../assets/images/qpool.png"
import progress from "../assets/images/progress.png"
import payment from "../assets/images/payment.png"

// Custom Arrow Components with Enhanced Styling
const CustomArrow = ({ direction, onClick }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        [direction === "prev" ? "left" : "right"]: isSmallScreen ? "-10px" : "-25px",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
        width: isSmallScreen ? "40px" : "50px",
        height: isSmallScreen ? "40px" : "50px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          backgroundColor: "#5BB9BD",
          color: "white",
          transform: "translateY(-50%) scale(1.1)",
          boxShadow: "0 6px 20px rgba(91, 185, 189, 0.4)",
        },
      }}
    >
      {direction === "prev" ? (
        <ArrowBackIosIcon
          sx={{
            fontSize: isSmallScreen ? "18px" : "22px",
            color: "inherit",
            ml: direction === "prev" ? "4px" : 0,
          }}
        />
      ) : (
        <ArrowForwardIosIcon
          sx={{
            fontSize: isSmallScreen ? "18px" : "22px",
            color: "inherit",
            ml: direction === "next" ? "2px" : 0,
          }}
        />
      )}
    </Box>
  )
}

const Homepage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [activeSlide, setActiveSlide] = useState(0)
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    roles: false,
  })
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollY = useRef(0)

  // Handle scroll for animations and header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Handle header visibility based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down & past threshold - hide header
        setShowHeader(false)
      } else {
        // Scrolling up or at top - show header
        setShowHeader(true)
      }

      lastScrollY.current = currentScrollY

      // Handle section animations
      const heroSection = document.getElementById("hero-section")
      const featuresSection = document.getElementById("features-section")
      const rolesSection = document.getElementById("roles-section")

      const isElementVisible = (element, offset = 100) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= window.innerHeight - offset
      }

      setIsVisible({
        hero: isElementVisible(heroSection, 0),
        features: isElementVisible(featuresSection),
        roles: isElementVisible(rolesSection),
      })
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: isSmallScreen ? 1 : isMediumScreen ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    beforeChange: (current, next) => setActiveSlide(next),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            margin: "0",
            padding: "0",
            display: "flex",
            gap: "10px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: isSmallScreen ? "10px" : "12px",
          height: isSmallScreen ? "10px" : "12px",
          borderRadius: "50%",
          backgroundColor: i === activeSlide ? "#5BB9BD" : "rgba(91, 185, 189, 0.2)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          border: i === activeSlide ? "none" : "1px solid rgba(91, 185, 189, 0.3)",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  }

  const features = [
    {
      image: qr,
      title: "QR Tracking",
      description: "Instant scanning for real-time tracking updates with our advanced QR technology",
      color: "#5BB9BD",
      benefits: ["Instant attendance tracking", "Paperless check-in", "Real-time updates"],
    },
    {
      image: qpool,
      title: "Question Pool",
      description: "Smart categorization and automated exam paper generation system",
      color: "#6C5CE7",
      benefits: ["Diverse question types", "Automatic grading", "Custom difficulty levels"],
    },
    {
      image: payment,
      title: "Online Payments",
      description: "Secure transactions with automatic payment reminders and receipts",
      color: "#00B894",
      benefits: ["Multiple payment methods", "Automatic receipts", "Payment history"],
    },
    {
      image: progress,
      title: "Progress Tracking",
      description: "Comprehensive live dashboard for monitoring academic progress",
      color: "#FD79A8",
      benefits: ["Visual performance graphs", "Goal setting", "Improvement analytics"],
    },
  ]

  const roles = [
    {
      icon: <PeopleIcon style={{ fontSize: 50 }} />,
      title: "Teacher",
      description: "Manage attendance, create exams, track student progress with our intuitive tools",
      color: "#5BB9BD",
      benefits: ["Simplified grading", "Automated attendance", "Exam creation tools"],
    },
    {
      icon: <SchoolIcon style={{ fontSize: 50 }} />,
      title: "Student",
      description: "Access materials, submit assignments, view grades and track your learning journey",
      color: "#6C5CE7",
      benefits: ["24/7 resource access", "Assignment reminders", "Progress visualization"],
    },
    {
      icon: <GroupIcon style={{ fontSize: 50 }} />,
      title: "Parent",
      description: "Monitor your child's academic performance, attendance and manage payments easily",
      color: "#00B894",
      benefits: ["Real-time notifications", "Direct messaging", "Payment management"],
    },
  ]

  return (
    <Box
      sx={{
        overflowX: "hidden",
        backgroundColor: "#f9f9f9",
        scrollBehavior: "smooth",
        position: "relative",
        pt: showHeader ? 0 : 0, // Adjust if needed based on header height
      }}
    >
      {/* Header with show/hide animation */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
          boxShadow: showHeader ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <Header />
      </Box>

      {/* Hero Section */}
      <Box
        id="hero-section"
        sx={{
          position: "relative",
          height: { xs: "90vh", md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          color: "white",
          textAlign: "center",
          px: { xs: 2, sm: 4 },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "linear-gradient(to top, rgba(249,249,249,1), transparent)",
            zIndex: 1,
          },
        }}
      >
        <Fade in={isVisible.hero} timeout={1000}>
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              One Platform,{" "}
              <Box
                component="span"
                sx={{
                  color: "#5BB9BD",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-5px",
                    left: 0,
                    width: "100%",
                    height: "4px",
                    backgroundColor: "#5BB9BD",
                    borderRadius: "2px",
                  },
                }}
              >
                Endless Learning
              </Box>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.35rem" },
                mb: 5,
                opacity: 0.9,
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              An integrated education management system that streamlines administration, learning, and communication for
              all stakeholders in the educational ecosystem.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 3 },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => navigate("/about")}
                variant="contained"
                sx={{
                  backgroundColor: "#5BB9BD",
                  color: "white",
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                  fontWeight: 600,
                  px: { xs: 4, sm: 5 },
                  py: 1.75,
                  borderRadius: "50px",
                  boxShadow: "0 4px 20px rgba(91, 185, 189, 0.5)",
                  "&:hover": {
                    backgroundColor: "#4aa8ac",
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 25px rgba(91, 185, 189, 0.7)",
                  },
                  transition: "all 0.3s ease",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Explore Features
              </Button>
              <Button
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                sx={{
                  color: "white",
                  borderColor: "white",
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                  fontWeight: 500,
                  px: { xs: 4, sm: 5 },
                  py: 1.75,
                  borderRadius: "50px",
                  "&:hover": {
                    borderColor: "#5BB9BD",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  transition: "all 0.3s ease",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Watch Demo
              </Button>
            </Box>
          </Container>
        </Fade>
      </Box>

      {/* Features Slider Section */}
      <Box
        id="features-section"
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, sm: 4 },
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <Fade in={isVisible.features} timeout={800}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 700,
                mb: { xs: 2, md: 3 },
                color: "#2d3436",
                position: "relative",
              }}
            >
              Key Features
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#636e72",
                mb: 6,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Discover the powerful tools that make our platform the preferred choice for educational institutions
              worldwide
            </Typography>

            <Box
              sx={{
                maxWidth: "1200px",
                mx: "auto",
                position: "relative",
                ".slick-slide": {
                  px: 2,
                  py: 1,
                },
                ".slick-list": {
                  overflow: "visible",
                  mx: { xs: -2, sm: -3 },
                },
                mb: 6,
              }}
            >
              <Slider {...sliderSettings}>
                {features.map((feature, index) => (
                  <Box key={index} sx={{ outline: "none" }}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        height: "100%",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: `0 20px 40px rgba(0,0,0,0.12), 0 0 0 3px ${feature.color}30`,
                          "& .feature-image": {
                            transform: "scale(1.05)",
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          height: { xs: "160px", sm: "200px" },
                          overflow: "hidden",
                          "&:after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "60%",
                            background: `linear-gradient(to top, ${feature.color}20, transparent)`,
                          },
                        }}
                      >
                        <img
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          className="feature-image"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            transition: "transform 0.8s ease",
                          }}
                        />
                      </Box>
                      <CardContent
                        sx={{
                          backgroundColor: "white",
                          p: { xs: 2, sm: 2.5 },
                          position: "relative",
                          "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            backgroundColor: feature.color,
                          },
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            mb: 1.5,
                            color: "#2d3436",
                            fontSize: { xs: "1.25rem", sm: "1.5rem" },
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#636e72",
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            mb: 2,
                          }}
                        >
                          {feature.description}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                          {feature.benefits.map((benefit, i) => (
                            <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <CheckCircleIcon sx={{ color: feature.color, mr: 1, fontSize: "0.9rem" }} />
                              <Typography variant="body2" sx={{ color: "#636e72" }}>
                                {benefit}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Container>
        </Fade>
      </Box>

      {/* Designed For Section */}
      <Box
        id="roles-section"
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, sm: 4 },
          backgroundColor: "#f8f9fa",
          backgroundImage: "radial-gradient(#5BB9BD10 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "linear-gradient(to bottom, rgba(255,255,255,1), transparent)",
            zIndex: 1,
          },
        }}
      >
        <Fade in={isVisible.roles} timeout={800}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 700,
                mb: { xs: 2, md: 3 },
                color: "#2d3436",
                position: "relative",
              }}
            >
              Designed For
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#636e72",
                mb: 6,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Our platform caters to the unique needs of every stakeholder in the educational ecosystem
            </Typography>

            <Grid
              container
              spacing={4}
              sx={{
                maxWidth: "1200px",
                mx: "auto",
                px: { xs: 0, sm: 2 },
              }}
            >
              {roles.map((role, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Zoom in={isVisible.roles} style={{ transitionDelay: `${index * 150}ms` }}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        p: { xs: 3, sm: 4 },
                        borderRadius: 3,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                        transition: "all 0.4s ease",
                        backgroundColor: "white",
                        borderTop: `4px solid ${role.color}`,
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 15px 35px rgba(0,0,0,0.1), 0 0 0 2px ${role.color}20`,
                          "& .role-icon-container": {
                            backgroundColor: role.color,
                            color: "white",
                            transform: "scale(1.05)",
                          },
                        },
                      }}
                    >
                      <Box
                        className="role-icon-container"
                        sx={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          backgroundColor: `${role.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 3,
                          color: role.color,
                          transition: "all 0.3s ease",
                          "& svg": {
                            transition: "all 0.3s ease",
                          },
                        }}
                      >
                        {role.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#2d3436",
                          fontSize: { xs: "1.3rem", sm: "1.5rem" },
                        }}
                      >
                        {role.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#636e72",
                          fontSize: { xs: "0.95rem", sm: "1.05rem" },
                          mb: 3,
                        }}
                      >
                        {role.description}
                      </Typography>

                      <Box sx={{ mb: 3, width: "100%" }}>
                        {role.benefits.map((benefit, i) => (
                          <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1, textAlign: "left" }}>
                            <CheckCircleIcon sx={{ color: role.color, mr: 1, fontSize: "0.9rem" }} />
                            <Typography variant="body2" sx={{ color: "#636e72" }}>
                              {benefit}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Fade>
      </Box>

      <Footer />
    </Box>
  )
}

export default Homepage

