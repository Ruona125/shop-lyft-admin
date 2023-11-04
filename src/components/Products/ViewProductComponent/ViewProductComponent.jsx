import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewProductComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8000/product";
    axios.get(url).then((response) => {
      setProducts(response.data);
      //   console.log(response.data);
    });
  }, []);

//   const handleDelete = (productId) => {
//     const url = `http://localhost:8000/product/${productId}`;
    
//     axios
//       .delete(url)
//       .then(() => {
//         // Remove the deleted product from the state
//         setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
//       })
//       .catch((error) => {
//         console.error("Error deleting product: " + error);
//       });
//   };

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
            {/* <button onClick={() => handleDelete(product._id)}>Delete</button> */}

          </Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export default ViewProductComponent;
