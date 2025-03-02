import {
  TextField,
  Typography,
  Button,
  Grid,
  Container,
  Link,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { useState } from "react";
import logo from "../assets/images/logo1.png";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
   const [showPassword, setShowPassword] = useState(false);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:8085/api/auth/login", {
  //       userName: username,
  //       userPassword: password,
  //     });

  //     const { data } = response;
  //     console.log("User role:", data);
  //     if (data === "ADMIN") navigate("/admin-dashboard");
  //     else if (data === "TEACHER") navigate("/teacher-dashboard");
  //     else if (data === "STUDENT") navigate("/student-dashboard");
  //     else navigate("/");
  //   } catch (error) {
  //     alert("Invalid credentials!");
  //   }
  // };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8085/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: username, userPassword: password }),
    });

    const token = await response.text();
    console.log("token: " + token);
    if (token !== "Invalid credentials") {
      localStorage.setItem("jwtToken", token);
      console.log("test" );
      alert("Login successful!");
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      const userRole = decoded.role;
      console.log("User role:", userRole);

      // Navigate based on role
      switch (userRole) {
        case "ADMIN":
          navigate("/admin-dashboard");
          break;
        case "TEACHER":
          navigate("/teacher-dashboard");
          break;
        case "STUDENT":
          navigate("/student-dashboard");
          break;
        case "PARENT":
          navigate("/parent-dashboard");
          break;
        default:
          navigate("/unauthorized");
    } 
    }else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: { xs: "10px", md: "20px" },
          right: { xs: "10px", md: "20px" },
          color: "black",
          zIndex: 2,
        }}
        onClick={() => navigate(-1)}
      >
        <CloseIcon />
      </IconButton>

      <Grid
        container
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          maxWidth: "800px", // Reduced overall container width
        }}
      >
        {/* Left Side - Logo (Reduced Size) */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#004c5c",
            padding: "20px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Grid>

        {/* Right Side - Login Form (Compact Design) */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "10px", md: "30px" }, // Reduced padding
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "320px", // Further reduced width for the form
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#333",
                marginBottom: "16px", // Reduced margin
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "1.75rem" }, // Adjusted font size
              }}
            >
              Login to Your Account
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: "16px" }} // Reduced margin
                required
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: "16px" }} // Reduced margin
                required
              />

              <Box sx={{ textAlign: "right", marginBottom: "16px" }}>
                <Link
                  href="#forgot"
                  sx={{
                    fontSize: "14px",
                    color: "#007BFF",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#FF6B6B",
                  color: "white",
                  padding: "10px", // Reduced padding
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px", // Adjusted font size
                  "&:hover": {
                    backgroundColor: "#FF5252",
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Login Now
              </Button>
            </form>

            <Typography
              sx={{
                textAlign: "center",
                marginTop: "16px", // Reduced margin
                fontSize: "14px",
                color: "#666",
              }}
            >
              Don't have an account?{" "}
              <Link
                href="/contact"
                sx={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Contact Administrator
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;