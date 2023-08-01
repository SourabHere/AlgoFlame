import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/api";
import { background } from "@chakra-ui/react";
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

export default function LoginPage() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const navSignUp = () => {
    navigate(`/auth/signup`);
  };

  const check = () => {
    if (!email || !password || !role || !username) {
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      // Add toast
      return false;
    }

    return true;
  };

  const login = () => {
    if (check()) {
      const userData = {
        name: username,
        email: email,
        password: password,
      };

      if (role === "admin") {
        axios
          .post("/auth/v1/admin/login", userData)
          .then((response) => {
            // navigate(`/`)
            window.location.href = "/";
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else if (role === "user") {
        axios
          .post("/auth/v1/login", userData)
          .then((response) => {
            // navigate(`/`);
            window.location.href = "/";
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        // add toast here;
        console.log("add correct role");
      }
    }
  };

  const matches = useMediaQuery("(max-width:900px)");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* {!matches && ( */}
        <Grid
          className="img"
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
        {/* )} */}

        <Grid
          className="page"
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
              Log in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => {
                  setUsername(e.target.value);
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
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                autoComplete="role"
                autoFocus
                onChange={(e) => {
                  setRole(e.target.value);
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}
              >
                Log in
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => {
                      navSignUp();
                    }}
                    href=""
                  >
                    {"Don't have an account? Sign Up"}
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
