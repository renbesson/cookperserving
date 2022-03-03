import { Card, CardContent, CardMedia, Fab } from "@mui/material";
import { Grid, Chip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { deleteFromStorage, deleteFromFirestore } from "../lib/sharedFunctions";
import { UserContext } from "../lib/userContext";
import { GlobalContext } from "../lib/globalState/globalContext";

const cardStyle = {
  width: 300,
  position: "relative",
  "&:hover": {
    boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.8)",
  },
};

const fabStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
};

export default function IngredientCard({ ingredient }) {
  const { user, loadingUser } = useContext(UserContext);
  const { state, enableSnackbar } = useContext(GlobalContext);
  const [toggleDeleteBtn, setToggleDeleteBtn] = useState(false);

  const handleDelete = async () => {
    // Delete the image from firestorage
    if (ingredient.imgPath) {
      await deleteFromStorage(ingredient.imgPath)
        .then((obj) => {
          if (obj?.success)
            enableSnackbar({
              isOpen: true,
              message: `Doc deleted sucessfully`,
              severity: "success",
            });
          else
            enableSnackbar({
              isOpen: true,
              message: `Error deleting doc: ${obj?.error.message}`,
              severity: "error",
            });
        });
    }

    // Delete the document from firestore

    await deleteFromFirestore(
      `users/${user.uid}/ingredients`,
      ingredient.id
    ).then((obj) => {
      if (obj?.success)
        enableSnackbar({
          isOpen: true,
          message: `Doc deleted sucessfully`,
          severity: "success",
        });
      else
        enableSnackbar({
          isOpen: true,
          message: `Error deleting doc: ${obj?.error.message}`,
          severity: "error",
        });
    });
  };

  return (
    <Grid item>
      <Card
        sx={cardStyle}
        onMouseEnter={() => setToggleDeleteBtn(true)}
        onMouseLeave={() => setToggleDeleteBtn(false)}
      >
        {toggleDeleteBtn && (
          <Fab
            sx={fabStyle}
            size="small"
            color="secondary"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Fab>
        )}
        <CardMedia
          component="img"
          height="140"
          image={ingredient.imgURL ? ingredient.imgURL : "/reptile.jpg"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {ingredient.name}
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              {ingredient.weight !== "" && (
                <Chip label={`Weight: ${ingredient.weight}g`} />
              )}
            </Grid>
            <Grid item>
              {ingredient.volume !== "" && (
                <Chip label={`Volume: ${ingredient.volume}ml`} />
              )}
            </Grid>
            <Grid item>
              {ingredient.price !== "" && (
                <Chip label={`Price: $${ingredient.price}`} />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
