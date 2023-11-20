import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import "./product-style.css";
import Box from "@mui/material/Box";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css"; // Add this line as well

const ViewProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "http://localhost:8000/admin/product";
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
    axios
      .get(url, {headers})
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

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Products</h2>
      <br />
      <br />
      {products.length === 0 ? (
        <div className="no-products-message">
          <center>
            <Link
              to={`/create-product`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <p className="no-prod-message">No products available</p>
              <br />
              <p className="func-button">Create Product</p>
            </Link>
          </center>
        </div>
      ) : (
        <div className="product-container-with-products">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <div className="details-wrapper">
                <Carousel
                  showArrows={true}
                  showStatus={false}
                  showThumbs={false}
                  dynamicHeight={false}
                  emulateTouch={true}
                  infiniteLoop={true}
                  autoPlay={true} // Set autoPlay to true
                  interval={2000} // Set the interval to 2 seconds
                >
                  {product.imageLinks.map((link, index) => (
                    <div key={index}>
                      <img
                        width="200px"
                        height="200px"
                        src={link}
                        alt={`Product ${index + 1}`}
                      />
                    </div>
                  ))}
                </Carousel>
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
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <p className="func-button">View Product</p>
                  <br />
                </Link>
                <br />
                <Link
                  to={`/modify-product/${product._id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <p className="func-button">Modify</p>
                  <br />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProductComponent;
