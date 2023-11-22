import { useState, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
    fontFamily: 'Quicksand, sans-serif;'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Edu TAS Beginner, cursive',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // Hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const ViewUserComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching users: " + error);
        setLoading(false)
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Adjust this value to your preference
          marginTop: "-10em",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <center>
      <h2>Users</h2>
      </center>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              {/* <StyledTableCell>isAdmin</StyledTableCell> */}
              <StyledTableCell>Creation Date</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell>{user.username}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                {/* <StyledTableCell>{user.isAdmin ? "Yes" : "No"}</StyledTableCell> */}
                <StyledTableCell>{user.createdAt}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewUserComponent;
