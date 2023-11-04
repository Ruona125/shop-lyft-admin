import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux/es";
import { Link } from "react-router-dom";


const ViewProductComponent = () => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "http://localhost:8000/product";
    axios.get(url).then((response) => {
      setProducts(response.data);
      //   console.log(response.data);
    });
  }, []);

 

  return (
    <div style={{ textAlign: "center" }}>
      {/* <p>{user.email}</p> */}
      <h3>Products</h3>
      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/product/${product._id}`}>
          <img width="200px" src={product.image} alt="hair" />
          <p>Name: {product.name}</p>
          <p>${product.price}</p>
          <p>ratings: {product.ratings}</p>
          </Link>
          <br />
         
        </div>
      ))}
    </div>
  );
};

export default ViewProductComponent;
