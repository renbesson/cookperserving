import { useState } from "react";

import { useCollection } from "react-firebase-hooks/firestore";

import { Grid, CssBaseline, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { collection } from "firebase/firestore";
import { firestore } from "../lib/firebase";

import CustomSnackbar from "../components/CustomSnackbar";
import IngredientCard from "../components/IngredientCard";

const theme = createTheme();

export default function addProduct({ userData }) {
  const { loadingUser, user } = userData;
  const [snapshot, loading, error] = useCollection(
    collection(firestore, `users/${user && user.uid}/ingredients/`)
  );
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  return user ? (
    <ThemeProvider theme={theme}>
      <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <CssBaseline />
      <Container sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          {!loading &&
            snapshot.docs.map((ingredient, index) => (
              <IngredientCard key={index} ingredient={ingredient.data()} />
            ))}
        </Grid>
      </Container>
    </ThemeProvider>
  ) : (
    <p>Log in to continue</p>
  );
}
