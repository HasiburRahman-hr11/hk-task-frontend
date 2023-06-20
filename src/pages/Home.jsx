import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NewForm from "../components/NewForm";
import axios from "axios";
import Loading from "../components/Loading";

const Home = () => {
  const [allSectors, setAllSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllSector = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/sector/all");
        setAllSectors(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllSector();
  }, []);
  return (
    <>
      <Header />
      <Box component="section" sx={{ pb: "50px" }}>
        {loading ? (
          <Loading />
        ) : (
          <Container>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                textAlign: "center",
                mb: "3rem",
                mt: "2rem",
                fontSize: {
                  md: "3rem",
                  xs: "2rem",
                },
              }}
            >
              Please Feel The From Below
            </Typography>
            <NewForm allSectors={allSectors} />
          </Container>
        )}
      </Box>
    </>
  );
};

export default Home;
