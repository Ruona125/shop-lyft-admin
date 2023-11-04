import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewOrderComponent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8000/user/order";
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }

    axios
      .get(apiUrl, {headers})
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders: " + error);
      });
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <h3>Order Status: {order.status}</h3>
            <p>User ID: {order.userId}</p>
            <p>Username: {order.user.username}</p>
            <p>Email: {order.user.email}</p>
            <h4>Product Details:</h4>
            <p>Name: {order.productDetails.name}</p>
            <p>Price: ${order.productDetails.price}</p>
            <p>Description: {order.productDetails.description}</p>
            <img
              src={order.productDetails.image}
              alt="Product"
              style={{ maxWidth: "200px" }}
            />
            <p>Category: {order.productDetails.category}</p>
            <p>Ratings: {order.productDetails.ratings}</p>
            <p>Quantity: {order.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewOrderComponent;
