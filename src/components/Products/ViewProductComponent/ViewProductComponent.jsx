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
    });
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>Products</h2>
        <br />
        <div className="product-container">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="image-wrapper">
                  <img width="200px" src={product.imageLink} alt="hair" />
                </div>
                <div className="details-wrapper">
                  <p
                    style={{
                      fontFamily: "Edu TAS Beginner, cursive",
                      color: "grey",
                    }}
                  >
                    {product.category}
                  </p>
                  <p style={{ fontFamily: "Edu TAS Beginner, cursive" }}>
                    {product.name}
                  </p>
                  <p style={{ fontFamily: "Edu TAS Beginner, cursive" }}>
                    ${product.price}
                  </p>
                  <Link
                    to={`/modify-product/${product._id}`}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <p className="func-button">Modify</p>
                    <br />
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewProductComponent;
