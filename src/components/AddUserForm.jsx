import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress'
import axios from "axios";
import {successNotify, errorNotify} from '../utils/toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, sectors, theme) {
  return {
    fontWeight:
      sectors.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddUserForm = ({ allSectors }) => {
  const theme = useTheme();
  const [name, setname] = useState("");
  const [sectors, setSectors] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isFormFilled = () => {
      if (name && sectors.length > 0 && termsAccepted) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    };
    isFormFilled();
  }, [name, sectors, termsAccepted]);

  const handleSectorsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSectors(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async () => {
    const formData = {
      name,
      sectors,
      termsAccepted,
    };
    if(!name && sectors.length === 0 && !termsAccepted){
      errorNotify('Fill The Form Correctly!');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/add-new",
        formData
      );

      if (data) {
        setIsSubmitting(false);
        navigate(`/user/${data._id}`);
        successNotify('Form Submitted Successfully.')
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      errorNotify('Something Went Wrong');
    }
  };
  return (
    <Box
      component="div"
      sx={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: {
          sm:"3rem 3rem",
          xs:"1rem 1rem"
        },
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Box component="div" sx={{ mb: "20px" }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
      </Box>
      <Box component="div" sx={{ mb: "20px" }}>
        <FormControl fullWidth required>
          <InputLabel id="sectors-label">Sectors</InputLabel>
          <Select
            labelId="sectors-label"
            id="sectors"
            multiple
            value={sectors}
            onChange={handleSectorsChange}
            input={<OutlinedInput label="Sectors" />}
            MenuProps={MenuProps}
            fullWidth
          >
            {allSectors.map((sector) => (
              <MenuItem
                key={sector?._id}
                value={sector?.value}
                style={getStyles(sector?.value, sectors, theme)}
              >
                <Checkbox checked={sectors.indexOf(sector?.value) > -1} />
                {sector?.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="div" sx={{ mb: "20px" }}>
        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={(e) => setTermsAccepted(e.target.checked)}
              checked={termsAccepted}
            />
          }
          label="Agree to terms"
        />
      </Box>
      <Box component="div" sx={{ textAlign: "center", mt: "30px" }}>
        <Button
          variant="contained"
          disabled={btnDisabled}
          onClick={handleSubmit}
          sx={{
            width:'110px',
            height:'40px'
          }}
        >
          {isSubmitting ? <CircularProgress sx={{
            color:'#fff',
            width:'23px !important',
            height:'23px !important'
          }} /> : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddUserForm;
