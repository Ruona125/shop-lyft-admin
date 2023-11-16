import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./certain-product-syles.css";
const ViewCertainProductComponent = () => {
  const { id } = useParams();
  const [certainProducts, setCertainProduct] = useState({ imageLinks: [] });
  const [ratings, setRatings] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/product/${id}`);
        setCertainProduct(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchRating = async () => {
      try {
        const apiUrl = `http://localhost:8000/rating/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        };
        const response = await axios.get(apiUrl, { headers });
        setRatings(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const apiUrl = `http://localhost:8000/review/${id}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        };
        const response = await axios.get(apiUrl, { headers });
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
    fetchRating();
    fetchReviews();
  }, [id]); // Include 'id' in the dependency array

  return (
    <div>
      
      {/* <h3>Certain Product</h3> */}

      <div className="main-prod-wrapper">
        <div className="details-wrapper-product">
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
                  className="certain-img-style"
                  src={link}
                  alt={`hair-${index}`}
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="prod-details">
          <p className="prod-det">Name: {certainProducts.name}</p>
          <p className="prod-det">$ {certainProducts.price}</p>
          <p className="prod-det">Ratings: {ratings.averageRating}</p>
          <p className="prod-det">Description: {certainProducts.description}</p>
          <h3>Reviews:</h3>
          {reviews.map((review) => (
            <p key={review._id} className="prod-det">
              {review.reviews}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCertainProductComponent;
