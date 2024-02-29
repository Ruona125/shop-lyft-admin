import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const CreateProductComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://64.23.187.18:8000/product";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);

    images.forEach((image, index) => {
      formData.append("images", image); // Use the same key for each file
    });

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("token"),
    };
    setLoading(true);

    try {
      const res = await axios.post(url, formData, { headers });
      if (res.status === 200) {
        setName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImages([]);
        setLoading(false);
        navigate("/products");
      } else {
        console.log("error sending data");
        setError("An error occurred, please try again");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("An error occurred, please try again");
    }
  };

  const fileSelected = (event) => {
    const selectedFiles = event.target.files;
    setImages([...selectedFiles]);
  };
  return (
    <div>
      <center>
        <h2>Create Product</h2>
        <br />

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
            <TextField
              id="outlined-basic"
              label="product name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                style: {
                  color: "#1976D2",
                  fontFamily: "Edu TAS Beginner, cursive",
                },
              }}
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
               id="outlined-multiline-static"
              label="description"
              variant="outlined"
              type="text"
              multiline
              value={description}
              rows={4}
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

            <input
              onChange={fileSelected}
              type="file"
              name="images"
              accept="image/*"
              multiple
              style={{ paddingBottom: "23px" }}
            />

            <center>
              {loading ? (
                <CircularProgress
                  style={{
                    color: "#1976D2",
                    fontFamily: "Edu TAS Beginner, cursive",
                  }}
                />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  className="login-button"
                  style={{
                    color: "#fff",
                    backgroundColor: "#1976D2",
                    marginTop: "23px",
                    fontFamily: "Edu TAS Beginner, cursive",
                  }}
                >
                  Create Product
                </Button>
              )}
              {error && (
                <p
                  style={{
                    color: "#1976D2",
                    fontFamily: "Edu TAS Beginner, cursive",
                  }}
                >
                  {error}
                </p>
              )}
            </center>
          </form>
        </Box>
      </center>
    </div>
  );
};

export default CreateProductComponent;
