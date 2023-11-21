import React, {useState, useEffect } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import { TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


const ModifyOrderComponent = () => {
  const [order, setOrders] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const url = `https://api.bucollections.com/order/${id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
    axios.get(url, {headers})
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [id]);
  return (
    <div>
      <h1>Order List</h1>
      <ul>
      {order ? (
        <div>
          <h2>Order ID: {order._id}</h2>
          <p>User ID: {order.userId}</p>
          <p>Status: {order.status}</p>
          <p>Created At: {order.createdAt}</p>
          <p>Updated At: {order.updatedAt}</p>
          <h3>Products:</h3>
          <ul>
          {order.products ? (
            <ul>
              {order.products.map((product) => (
                <li key={product._id}>
                  <p>Product ID: {product.productId}</p>
                  <p>Quantity: {product.quantity}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products available for this order.</p>
          )}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      </ul>
    </div>
  );
}

export default ModifyOrderComponent