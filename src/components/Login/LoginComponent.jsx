import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.css"; // Import a custom CSS file for styling

function LoginComponent() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="center-container">
      <h2 className="login-header">Login</h2>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            name="email"
          />
          <br />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            name="password"
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "23px", fontFamily: "Edu TAS Beginner, cursive" }}
          >
            Login
          </Button>
        </form>
      )}
    </div>
  );
}

export default LoginComponent;
