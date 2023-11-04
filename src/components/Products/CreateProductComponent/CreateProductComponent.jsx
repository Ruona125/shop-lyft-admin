import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const CreateProductComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [reviews, setReviews] = useState("");
  const [ratings, setRatings] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //   const token = useSelector((state) => state.auth.token)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/product";
    const data = {
      name: name,
      category: category,
      price: price,
      description: description,
      image: image,
      reviews: reviews,
      ratings: ratings,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    setLoading(true);

    try {
      const res = await axios.post(url, data, { headers });
      if (res.status === 200) {
        setName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImage("");
        setReviews("");
        setLoading(false);
        navigate("/products");
      } else {
        console.log("error sending data");
        setError("An error occurred, please try again");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("An error occurred, please try again");
    }
  };
  return (
    <div>
      <h2>Create Product</h2>

      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "25ch",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "red",
            },
            "&:hover fieldset": {
              borderColor: "red",
            },
            "&.Mui-focused fieldset": {
              borderColor: "red",
            },
          },
          "& .MuiInputLabel-root": {
            color: "red",
          },
        }}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="product name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "red" } }}
          />
          <br />
          <br />

          <TextField
            id="outlined-basic"
            label="price"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputLabelProps={{ style: { color: "red" } }}
          />
          <br />
          <br />

          <TextField
            id="outlined-basic"
            label="ratings"
            variant="outlined"
            type="number"
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
            InputLabelProps={{ style: { color: "red" } }}
          />
          <br />
          <br />

          <TextField
            id="outlined-basic"
            label="category"
            variant="outlined"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            InputLabelProps={{ style: { color: "red" } }}
          />
          <br />
          <br />

          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{ style: { color: "red" } }}
          />

          <br />
          <br />

          <TextField
            id="outlined-basic"
            label="image"
            variant="outlined"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            InputLabelProps={{ style: { color: "red" } }}
          />
          <br />
          <br />

          <TextField
            id="outlined-basic"
            label="reviews"
            variant="outlined"
            type="text"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            InputLabelProps={{ style: { color: "red" } }}
          />

          <center>
            {loading ? (
              <CircularProgress style={{ color: "red" }} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                className="login-button"
                style={{
                  color: "#fff",
                  backgroundColor: "red",
                  marginTop: "23px",
                }}
              >
                Create Product
              </Button>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </center>
        </form>
      </Box>
    </div>
  );
};

export default CreateProductComponent;
