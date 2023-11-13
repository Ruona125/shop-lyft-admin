import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
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
          height: "100vh", // Adjust this value to your preference
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
    <>
      <div style={{ textAlign: "center" }}>
        <h2>Products</h2>
        <br />
        <div className="product-container">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProductComponent;
