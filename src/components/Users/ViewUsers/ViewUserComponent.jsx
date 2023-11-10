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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const ViewUserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8000/users";
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users: " + error);
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>UserName</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>isAdmin</StyledTableCell>
                <StyledTableCell>UserName</StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      <div>
        <ul>
          <TableBody>
            {users.map((user) => (
              <li key={user._id}>
                <StyledTableRow>
                  <StyledTableCell>Username: {user.username}</StyledTableCell>
                  <StyledTableCell>Email: {user.email}</StyledTableCell>
                  <StyledTableCell>
                    isAdmin: {user.isAdmin ? "Yes" : "No"}
                  </StyledTableCell>
                  <StyledTableCell>
                    Created At: {user.createdAt}
                  </StyledTableCell>
                </StyledTableRow>
              </li>
            ))}
          </TableBody>
        </ul>
      </div>
    </div>
  );
};

export default ViewUserComponent;
