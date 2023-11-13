import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import "./viewOrder.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
    fontFamily: 'Quicksand, sans-serif'

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Edu TAS Beginner, cursive',  // Replace semicolon with a comma
  },
}));



const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ViewOrderComponent() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setUpdatedStatus(event.target.value);
  };

  const fetchData = () => {
    // Fetch the data from the API using Axios
    const apiUrl = "http://localhost:8000/user/order";
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setRows(response.data); // Update the rows state with the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        setError(err); // Set the error state if there's an error
        setLoading(false); // Set loading to false
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = () => {
    // Make a PUT request to update the status
    const apiUrl = `http://localhost:8000/order/${selectedRow._id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };

    axios
      .put(apiUrl, { status: updatedStatus }, { headers })
      .then((response) => {
        // Handle a successful update
        handleClose(); // Close the modal
        // Refresh the data after the update
        fetchData();
      })
      .catch((err) => {
        // Handle errors
        console.error("Error updating status:", err);
      });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Adjust this value to your preference
          marginTop: '-10em'
        }}
      >
        <CircularProgress />
        
        
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <center>
        <h2>Orders</h2>
      </center>
      <br />
      {/* <TextField style={{ marginRight: "0" }} id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Order ID</StyledTableCell> */}
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Sub total</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                {/* <StyledTableCell component="th" scope="row">
                  {row._id}
                </StyledTableCell> */}
                <StyledTableCell>{row.user.username}</StyledTableCell>
                <StyledTableCell>{row.user.email}</StyledTableCell>
                <StyledTableCell
                  style={{
                    color:
                      row.status === "delivered"
                        ? "green"
                        : row.status === "pending"
                        ? "red"
                        : "black",
                  }}
                >
                  {row.status}
                </StyledTableCell>

                <StyledTableCell>{row.productDetails.name}</StyledTableCell>
                <StyledTableCell>{row.productDetails.category}</StyledTableCell>
                <StyledTableCell>{row.quantity}</StyledTableCell>
                <StyledTableCell>${row.productDetails.price}</StyledTableCell>
                <StyledTableCell>
                  ${row.productDetails.price * row.quantity}
                </StyledTableCell>
                <StyledTableCell>
                  <EditIcon
                    onClick={() => {
                      setSelectedRow(row); // Update the selectedRow when the "Edit" icon is clicked
                      setUpdatedStatus(row.status); // Initialize updatedStatus with the "status" value
                      handleOpen();
                    }}
                    className="edit-icon"
                    
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* <TextField
              label="status"
              value={updatedStatus} // Use updatedStatus as the value
              type="text"
              onChange={(e) => setUpdatedStatus(e.target.value)} // Update updatedStatus
            /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={updatedStatus}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"pending"}>pending</MenuItem>
                <MenuItem value={"delivered"}>delivered</MenuItem>
              </Select>
            </FormControl>

            <Button onClick={handleUpdate}>Update</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ViewOrderComponent;
