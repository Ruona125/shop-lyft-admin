import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
      setRatings(ratings);
      setDescription(description);
      setImage(image);
      setInStock(inStock);
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
      inStock: inStock,
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
        setInStock("");
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
      <center>
        <h2>Modify Product</h2>

        <Box
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "25ch",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976D2",
              },
              "&:hover fieldset": {
                borderColor: "#1976D2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976D2",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#1976D2",
            },
          }}
        >
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <br />
            <br />

            <TextField
              id="outlined-basic"
              label="price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputLabelProps={{
                style: {
                  color: "#1976D2",
                  fontFamily: "Edu TAS Beginner, cursive",
                },
              }}
            />
            <br />
            <br />

            {/* <TextField
              id="outlined-basic"
              label="ratings"
              variant="outlined"
              type="number"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
              InputLabelProps={{
                style: {
                  color: "#1976D2",
                  fontFamily: "Edu TAS Beginner, cursive",
                },
              }}
            />
            <br />
            <br /> */}

            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ fontFamily: "Edu TAS Beginner, cursive" }}
              >
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                style={{ fontFamily: "YourFontFamily, sans-serif" }}
              >
                <MenuItem
                  value="Hair"
                  style={{ fontFamily: "Edu TAS Beginner, cursive" }}
                >
                  Hair
                </MenuItem>
                <MenuItem
                  value="Gift Boxes"
                  style={{ fontFamily: "Edu TAS Beginner, cursive" }}
                >
                  Gift Boxes
                </MenuItem>
                <MenuItem
                  value="Hair Accessories"
                  style={{ fontFamily: "Edu TAS Beginner, cursive" }}
                >
                  Hair Accessories
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />

            <TextField
              id="outlined-basic"
              label="description"
              variant="outlined"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{
                style: {
                  color: "#1976D2",
                  fontFamily: "Edu TAS Beginner, cursive",
                },
              }}
            />

            <br />
            <br />

            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ fontFamily: "Edu TAS Beginner, cursive" }}
              >
                inStock
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inStock}
                label="inStock"
                onChange={(e) => setInStock(e.target.value)}
                style={{ fontFamily: "YourFontFamily, sans-serif" }}
              >
                <MenuItem
                  value="true"
                  style={{ fontFamily: "Edu TAS Beginner, cursive" }}
                >
                  true
                </MenuItem>
                <MenuItem
                  value="false"
                  style={{ fontFamily: "Edu TAS Beginner, cursive" }}
                >
                  false
                </MenuItem>
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
            <br />
            <br />

            <center>
              {loading ? (
                <CircularProgress style={{ color: "#1976D2" }} />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  className="login-button"
                  style={{
                    color: "#fff",
                    backgroundColor: "#1976D2",
                    marginTop: "23px",
                  }}
                >
                  Modify Product
                </Button>
              )}
              {error && <p style={{ color: "#1976D2" }}>{error}</p>}
            </center>
          </form>
        </Box>
      </center>
    </div>
  );
};

export default ModifyProductComponent;
