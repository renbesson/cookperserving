import { ENABLE_SNACKBAR, DISABLE_SNACKBAR } from "./globalActions";

export const globalReducer = (state, action) => {
  switch (action.type) {
    case ENABLE_SNACKBAR:
      return { ...state, customSnackbarState: action.payload };
    case DISABLE_SNACKBAR:
      return { isOpen: false, message: "", severity: "info" };
  }
};
