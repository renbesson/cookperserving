import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../lib/globalState/globalContext";

export default function CustomSnackbar() {
  const { state } = useContext(GlobalContext);
  const handleClose = (event, reason) => {
    // Prevent the snackbar to close on click away
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };
  return (
    <Snackbar
      open={state.initialCustomSnackbar.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      {state.initialCustomSnackbar.severity && (
        <Alert
          onClose={handleClose}
          severity={state.initialCustomSnackbar.severity}
          sx={{ width: "100%" }}
        >
          {state.initialCustomSnackbar.message}
        </Alert>
      )}
    </Snackbar>
  );
}
