import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewUserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8000/users";
    const headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      };
    axios
      .get(apiUrl, {headers})
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
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <h3>Username: {user.username}</h3>
            <p>Email: {user.email}</p>
            <p>isAdmin: {user.isAdmin ? "Yes" : "No"}</p>
            <p>Created At: {user.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUserComponent;
