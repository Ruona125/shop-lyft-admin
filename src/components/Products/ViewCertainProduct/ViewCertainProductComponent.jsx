import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ViewCertainProductComponent = () => {
  const { id } = useParams();
  const [certainProducts, setCertainProduct] = useState({ imageLinks: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/product/${id}`);
        setCertainProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, [id]); // Include 'id' in the dependency array

  return (
    <div>
      <h3>Certain Product</h3>

      <div className="details-wrapper">
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          dynamicHeight={false}
          emulateTouch={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={2000}
        >
          {certainProducts.imageLinks?.map((link, index) => (
            <div key={index}>
              <img
                width="70px"
                height="200px"
                src={link}
                alt={`hair-${index}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <p>Name: {certainProducts.name}</p>
      <p>$ {certainProducts.price}</p>
      <p>Ratings: {certainProducts.ratings}</p>
    </div>
  );
};

export default ViewCertainProductComponent;
