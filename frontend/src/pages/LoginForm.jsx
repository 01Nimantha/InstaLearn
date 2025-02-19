import {
    //Box,
    TextField,
    Typography,
    Button,
    Grid,
    Container,
    Link
  } from "@mui/material";
  
  import {  useState } from "react";
  import logo from "../assets/images/logo1.png" 
  import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
  import InputAdornment from "@mui/material/InputAdornment";
  import IconButton from "@mui/material/IconButton";
  import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
  import CloseIcon from '@mui/icons-material/Close';
  import { useNavigate } from "react-router-dom";
  import axios from "axios";

  
  const LoginForm = () => {
    const [firstPassShow, setFirstPassShow] = useState(false);
    const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
  
      const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8085/api/auth/login", {
                userName,
                userPassword
            });
  
            const { data } = response;
            console.log("User role:", data);
            if (data === ADMIN) navigate("/admin-dashboard");
            else if (data === TEACHER) navigate("/teacher-dashboard");
            else if (data === STUDENT) navigate("/student-dashboard");
            else navigate("/");
  
        } catch (error) {
            alert("Invalid credentials!");
        }
    };
  
  
    return (
      <Container  
      maxWidth={"md"}
  
      sx={{
        bgcolor: "black",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:"10px",
        marginBottom:"10px",
        flexDirection:"column",
        position:"relative"    
      }}
      >
         <IconButton
          sx={
            {
              position:"absolute",color: 'white',
              right:{
                xs:"10px",
                md:"10px",
                sm:"10px",
                lg:"10px"
              },
              top:{
                xs:"10px",
                md:"10px",
                sm:"10px",
                lg:"10px"
              },
        
            }
          }
          onClick={() => navigate(-1)}>
          <CloseIcon/>
        </IconButton>
        
        <Grid
          container
          className="container"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "auto",
            padding: "10px"
            
          }}
        >
         
        
          <Grid
            item
            xs={12}
            md={5}
            sm={6}
            className="imageSide"
            sx={{
              bgcolor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height:"100%"
            }}
          >
            <img
              src={logo}
              alt="sideimages"
              style={{ marginTop: "100px", maxWidth: "100%", height: "auto" }}
            />
          </Grid>
          <Grid 
            item
            xs={12}
            sm={6}
            md={6}
            className="signinSide"
            sx={{
              bgcolor: "white",
              marginTop: "77px",
              marginBottom: "78px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height:"100%",
              position:"relative"
            }}
            
          >
            <Typography
              sx={{ color: "#1A1A1A", fontSize: "16px", fontWeight: "600" }}
            >
              Login to your account
            </Typography>
            
            <form onSubmit={handleLogin}>
            <div style={{ marginTop: "30px", width: "100%" }}>
              <Typography>UserName:</Typography>
              <TextField
                className="custom-textfield"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                fullWidth
                variant="outlined"
                size="small"
                required
              />
            </div>
            
  
             <div style={{ marginTop: "30px", width: "100%" }}>
              <Typography>Password:</Typography>
              <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setFirstPassShow(!firstPassShow);
                        }}
                      >
                        {firstPassShow ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="custom-textfield"
                
                type={firstPassShow ? "text" : "password"}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Password"
                required
               
              />
              
               
            </div>
            <div>
            
            <Link
                href="#forgot"
                sx={{
                  position: "absolute",
                  right: "30px",
                  top: "250px",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  color: "#007BFF",
                }}
              >
                Forgot?
              </Link>
            </div>
            
            <div style={{ marginTop: "45px", width: "100%" }}>
              <Button type="submit" sx={{ bgcolor: "#9EC9F7", width: "100%" }}>Login Now</Button>
            </div>
            </form>
            
            <div className="register">
              <Typography
                sx={{ justifyContent: "space-between", marginTop: "10px" }}
                className="loggintext"
              >
                <span>Don't have an account?</span>
                <a
                  style={{
                    cursor: "pointer",
                    marginLeft: "4px",
                    color: "blue",
                    textDecoration: "none",
                  }}
                  href="/about"
                >
                  Contact Administrator
                </a>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default LoginForm;
  
  
  
  
  
  
  