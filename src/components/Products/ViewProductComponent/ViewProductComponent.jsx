import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./product-style.css";

const ViewProductComponent = () => {
  const [products, setProducts] = useState([]);

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
      <h2>Products</h2>
      <br />
      <div className="product-container">
        {products.map((product) => (
          <div key={product._id}>
            <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
              <div className="img-wrapper">
              <img width="200px" src={product.imageLink} alt="hair" />
              </div>
              <p style={{fontFamily:'Edu TAS Beginner, cursive', color:"grey"}}>{product.category}</p>
              <p style={{fontFamily:'Edu TAS Beginner, cursive'}}>{product.name}</p>
              <p style={{fontFamily:'Edu TAS Beginner, cursive'}}>{product.price}</p>
              {/* <button onClick={() => handleDelete(product._id)}>Delete</button> */}
            </Link>
            <Link to={`/modify-product/${product._id}`} style={{textDecoration:"none", color:"#000"}}>
              <p className="func-button">Modify</p>
            </Link>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProductComponent;
