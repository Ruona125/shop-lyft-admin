import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./certain-product-syles.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ViewCertainProductComponent = () => {
  const { id } = useParams();
  const [certainProducts, setCertainProduct] = useState({ imageLinks: [] });
  const [ratings, setRatings] = useState("");
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.bucollections.com/product/${id}`);
        setCertainProduct(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchRating = async () => {
      try {
        const apiUrl = `https://api.bucollections.com/rating/${id}`;
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
        const apiUrl = `https://api.bucollections.com/review/${id}`;
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
      <center>
        <h2>Product</h2>
      </center>
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
          <p className="prod-det">${certainProducts.price}</p>
          <p className="prod-det">Ratings: {ratings.averageRating}</p>
          <p className="prod-det">Description: {certainProducts.description}</p>
          {/* <h3>Reviews:</h3> */}
          {reviews.map((review) => (
            // <p key={review._id} className="prod-det">
            //   {review.reviews}
            // </p>
            <div key={review._id}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <h3 className="review-header">Reviews</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="prod-det reviews">
                    <ol>
                      <li>{review.reviews}</li>
                    </ol>
                  </p>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCertainProductComponent;
