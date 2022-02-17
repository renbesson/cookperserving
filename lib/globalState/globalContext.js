import { createContext } from "react";

const initialCustomSnackbar = { isOpen: false, message: ``, severity: "info" };

export const GlobalContext = createContext({
  initialCustomSnackbar,
});
