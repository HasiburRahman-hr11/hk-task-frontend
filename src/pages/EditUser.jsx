import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import EditUserForm from "../components/EditUserForm";

const EditUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const params = useParams();
  const [allSectors, setAllSectors] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/user/get-user/${params.userId}`);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getUser();
  }, [params.userId]);
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
              Edit User Page
            </Typography>
            <EditUserForm user={user} setUser={setUser} allSectors={allSectors} />
          </Container>
        )}
      </Box>
    </>
  );
};

export default EditUser;
