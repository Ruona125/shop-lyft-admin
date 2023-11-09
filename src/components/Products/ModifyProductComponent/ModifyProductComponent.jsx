import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";

const ModifyProductComponent = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
//   const [reviews, setReviews] = useState("");
  const [ratings, setRatings] = useState("");
  const [inStock, setInStock] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:8000/product/${id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios.get(url, { headers }).then((response) => {
      const { name, category, price, description, image, ratings, inStock } =
        response.data;
      setName(name);
      setCategory(category);
      setPrice(price);
      setRatings(ratings)
      setDescription(description);
      setImage(image);
      setInStock(inStock)
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/product/${id}`;
    const data = {
      name: name,
      category: category,
      price: price,
      description: description,
      image: image,
    //   reviews: reviews,
      ratings: ratings,
      inStock: inStock
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    setLoading(true);
    try {
      const res = await axios.put(url, data, { headers });
      if (res.status === 200) {
        setName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImage("");
        setInStock("")
        // setReviews("");
        setLoading(false);
        navigate("/products");
      } else {
        setError("error sending data");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("error sending data");
    }
  };
  return (
    <div>
      <h2>Modify Product</h2>

      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "25ch",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "blue",
            },
            "&:hover fieldset": {
              borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "blue",
            },
          },
          "& .MuiInputLabel-root": {
            color: "blue",
          },
        }}
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {/* <TextField
            id="outlined-basic"
            label="product name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "blue" } }}
          /> */}
          <p>{name}</p>
          <br />
          <br />

          <TextField
            id="outlined-basic"
            label="price"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputLabelProps={{ style: { color: "blue" } }}
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
            InputLabelProps={{ style: { color: "blue" } }}
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
            InputLabelProps={{ style: { color: "blue" } }}
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
            InputLabelProps={{ style: { color: "blue" } }}
          />

          <br />
          <br />

          {/* <TextField
            id="outlined-basic"
            label="image"
            variant="outlined"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            InputLabelProps={{ style: { color: "blue" } }}
          />
          <br />
          <br /> */}

          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">inStock</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inStock}
          label="inStock"
          onChange={(e) => setInStock(e.target.value)}
        >
          <MenuItem value="true">true</MenuItem>
          <MenuItem value="false">false</MenuItem>
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>

          </FormControl>
          <br />
          <br />

          {/* <TextField
            id="outlined-basic"
            label="reviews"
            variant="outlined"
            type="text"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            InputLabelProps={{ style: { color: "blue" } }}
          /> */}

          <center>
            {loading ? (
              <CircularProgress style={{ color: "blue" }} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                className="login-button"
                style={{
                  color: "#fff",
                  backgroundColor: "blue",
                  marginTop: "23px",
                }}
              >
                Modify Product
              </Button>
            )}
            {error && <p style={{ color: "blue" }}>{error}</p>}
          </center>
        </form>
      </Box>
    </div>
  );
};

export default ModifyProductComponent;
