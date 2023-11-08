import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewCertainProductComponent = () => {
  const { id } = useParams();
  const [certainProducts, setCertainProduct] = useState([]);
  useEffect(() => {
    const url = `http://localhost:8000/product/${id}`;
    axios.get(url).then((response) => {
      setCertainProduct(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <h3>Certain Product</h3>
      <img width="200px" src={certainProducts.imageLink} alt="hair" />
      <p>Name: {certainProducts.name}</p>
      <p>$ {certainProducts.price}</p>
      <p>ratings: {certainProducts.ratings}</p>
    </div>
  );
};

export default ViewCertainProductComponent;
