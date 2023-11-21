import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authActions";

const AuthHandlerComponent = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now();

      if (
        decodedToken &&
        decodedToken.exp &&
        currentTime >= decodedToken.exp * 1000
      ) {
        dispatch(logoutUser());
        navigate("/");
      }
    } catch (error) {
      console.log("error decoding token");
    }
  }
};

export default AuthHandlerComponent;
