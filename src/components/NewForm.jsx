import React, { useEffect, useState } from "react";
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
// const allSectors = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];
function getStyles(name, sectors, theme) {
  return {
    fontWeight:
      sectors.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewForm = ({allSectors}) => {
  const theme = useTheme();
  const [name, setname] = useState("");
  const [sectors, setSectors] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

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
    console.log(formData);
  };
  return (
    <Box
      component="div"
      sx={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "3rem 3rem",
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
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default NewForm;
