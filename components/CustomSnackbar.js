import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../lib/globalState/globalContext";

export default function CustomSnackbar() {
  const { state, disableSnackbar } = useContext(GlobalContext);
  const handleClose = (event, reason) => {
    // Prevent the snackbar to close on click away
    if (reason === "clickaway") {
      return;
    }
    disableSnackbar();
  };

  return state ? (
    <Snackbar
      open={state?.customSnackbarState?.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      {state?.customSnackbarState?.severity && (
        <Alert
          onClose={handleClose}
          severity={state?.customSnackbarState?.severity}
          sx={{ width: "100%" }}
        >
          {state?.customSnackbarState?.message}
        </Alert>
      )}
    </Snackbar>
  ) : (
    <></>
  );
}
