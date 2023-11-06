// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./viewproductstyle.css"

// const ViewOrderComponent = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const apiUrl = "http://localhost:8000/user/order";
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("token")
//     }

//     axios
//       .get(apiUrl, {headers})
//       .then((response) => {
//         setOrders(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching orders: " + error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Orders</h2>
//       <ul className="background-paper">
//         {orders.map((order) => (
//           <li key={order._id}>
//             <h3>Order Status: {order.status}</h3>
//             <p>Order ID: {order._id}</p>
//             <p>User ID: {order.userId}</p>
//             <p>Username: {order.user.username}</p>
//             <p>Email: {order.user.email}</p>
//             <h4>Product Details:</h4>
//             <p>Name: {order.productDetails.name}</p>
//             <p>Price: ${order.productDetails.price}</p>
//             <p>Description: {order.productDetails.description}</p>
//             {/* <img
//               src={order.productDetails.image}
//               alt="Product"
//               style={{ maxWidth: "200px" }}
//             /> */}
//             <p>Category: {order.productDetails.category}</p>
//             <p>Ratings: {order.productDetails.ratings}</p>
//             <p>Quantity: {order.quantity}</p>
//             <p>Total Amount: {order.productDetails.price * order.quantity}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ViewOrderComponent;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, TableContainer, Table, TableHead, TableRow, TableBody } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ViewOrderComponent() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <p>Orders</p>
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
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>{row.productDetails.name}</StyledTableCell>
              <StyledTableCell>{row.productDetails.category}</StyledTableCell>
              <StyledTableCell>{row.quantity}</StyledTableCell>
              <StyledTableCell>${row.productDetails.price}</StyledTableCell>
              <StyledTableCell>${row.productDetails.price * row.quantity}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default ViewOrderComponent

