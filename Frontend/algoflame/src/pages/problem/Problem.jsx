import { useState, useEffect } from "react";
import * as React from "react";
import "./problem.css";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const Problem = () => {
  let SEC_HTTPS = true;
  let SEC_BASE = "compilers.widgets.sphere-engine.com";
  (function (d, s, id) {
    let SEC = window.SEC || (window.SEC = []);
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src =
      (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "sphere-engine-compilers-jssdk");

  const { id } = useParams();

  const widget = process.env.REACT_APP_DATA_WIDGET;

  const cards = ["1"];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/v1/problems/${id}`);
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("error in fetching data", error);
      }
    };

    fetchData();
  }, []);

  // console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {data.name}
                {/* name */}
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                paragraph
              >
                {data.description}
                {/* question */}
              </Typography>
            </Container>
          </Box>
          <Container
            sx={{
              py: 8,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
            maxWidth="md"
          >
            <Grid container spacing={4}>
              <Grid xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>INPUT data : {data.inputData}</Typography>
                    <Typography>OUTPUT data : {data.outputData}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>INPUT : {data.exampleTestCaseInput}</Typography>
                    <Typography>
                      OUTPUT : {data.exampleTestCaseOutput}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </main>
      </ThemeProvider>

      <div className="editor">
        <div
          className="sec-widget"
          data-widget={widget}
          style={{ minWidth: "100px;" }}
        ></div>
      </div>
    </>
  );
};

export default Problem;
