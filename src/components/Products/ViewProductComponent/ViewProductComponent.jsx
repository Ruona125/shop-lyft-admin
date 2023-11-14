import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./product-style.css";
import Box from "@mui/material/Box";

const ViewProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "http://localhost:8000/product";
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "-10em",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Products</h2>
      <br />
      {products.length === 0 ? (
        <div className="no-products-message">
          <center>
            <Link to={`/create-product`} style={{ textDecoration: "none", color: "#000" }}>
              <p className="no-prod-message">No products available</p>
              <br />
              <p className="func-button">Create Product</p>
            </Link>
          </center>
        </div>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
                <div className="image-wrapper">
                  <img width="200px" src={product.imageLinks[0]} alt="hair" />
                </div>
                <div className="details-wrapper">
                  <p style={{ fontFamily: "Edu TAS Beginner, cursive", color: "grey" }}>
                    {product.category}
                  </p>
                  <p style={{ fontFamily: "Edu TAS Beginner, cursive" }}>{product.name}</p>
                  <p style={{ fontFamily: "Edu TAS Beginner, cursive" }}>${product.price}</p>
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
        </Slider>
      )}
    </div>
  );
};

export default ViewProductComponent;
 