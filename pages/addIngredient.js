import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomSnackbar from "../components/CustomSnackbar";

import { customAlphabet } from "nanoid";
import FileInput from "../components/FileInput";
import { addToFirestore, addToStorage } from "../lib/sharedFunctions";
import { useUserData } from "../customHooks/useUserData";

const theme = createTheme();

const nanoid = customAlphabet("0123456789", 6);

const initialValue = {
  name: "",
  weight: "",
  volume: "",
  price: "",
};

export default function AddIngredient({ userData }) {
  const { loadingUser, user } = userData;
  const [newUid, setNewUid] = useState(nanoid());
  const [ingredient, setIngredient] = useState(initialValue);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });
  const [imageFromChild, setImageFromChild] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (imageFromChild) {
      const path = `users/${user.uid}/ingredients`;
      const imgFileName = `${newUid}.${imageFromChild.name.split(".").pop()}`;
      const imgPath = `${path}/${imgFileName}`;

      await addToStorage(imgPath, imageFromChild).then((url) => {
        addToFirestore(path, newUid, {
          ...ingredient,
          imgPath,
          imgURL: url,
          imgFileName,
          uid: newUid,
        }).then((obj) => setSnackbar(obj));
      });
    } else
      await addToFirestore(path, newUid, {
        ...ingredient,
        imgURL: "",
      });
    setIngredient(initialValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Ingredient
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={ingredient.name}
              onChange={(e) =>
                setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  name: e.target.value,
                }))
              }
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              value={ingredient.weight}
              onChange={(e) =>
                setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  weight: e.target.value,
                }))
              }
              margin="normal"
              required
              fullWidth
              name="weight"
              label="Weight"
              id="weight"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              autoComplete="weight"
            />
            <TextField
              value={ingredient.volume}
              onChange={(e) =>
                setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  volume: e.target.value,
                }))
              }
              margin="normal"
              required
              fullWidth
              name="volume"
              label="Volume"
              id="volume"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              autoComplete="volume"
            />
            <TextField
              value={ingredient.price}
              onChange={(e) =>
                setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  price: e.target.value,
                }))
              }
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              id="price"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              autoComplete="price"
            />
            <FileInput setImageFromChild={setImageFromChild} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
