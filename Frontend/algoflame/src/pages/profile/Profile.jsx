import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "./Profile.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Profile = () => {
  const { user, loading } = useAuth();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {!loading && user.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>role</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>{!loading && user.role}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Email</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>{!loading && user.email}</Item>
            </Grid>
          </Grid>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
