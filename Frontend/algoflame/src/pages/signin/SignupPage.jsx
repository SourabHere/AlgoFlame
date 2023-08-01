import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import backgroundimg from "../static/backgroundlogin2.png";
import { useMediaQuery } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        AlgoFlame
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignupPage() {
  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [email, setemail] = useState("");
  const [role, setUserRole] = useState("");
  const [password, setPassword] = useState("");

  const check = () => {
    if (!UserName || !email || !role || !password) {
      toast.error("Please fill all the required details");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      // Add toast
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const navLogIn = () => {
    navigate(`/auth/login`);
  };

  const createUser = () => {
    if (check()) {
      const userData = {
        name: UserName,
        email: email,
        role: role,
        password: password,
      };

      axios
        .post("http://127.0.0.1:4000/auth/v1/signup", userData)
        .then((response) => {
          // console.log(response.data);
          toast.success("User created successfully");
          window.location.href = "http://localhost:3000/";
        })
        .catch((error) => {
          toast.error("An error occured while creating the user");
          console.log("error", error);
        });
    }
  };

  const matches = useMediaQuery("(max-width:900px)");

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <Toaster />
      </div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: ["none", "none", "block"],
            backgroundImage: `url(${backgroundimg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoFocus
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                autoFocus
                onChange={(e) => {
                  setUserRole(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={createUser}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => {
                      navLogIn();
                    }}
                    href=""
                  >
                    {"Already have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
