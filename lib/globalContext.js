import { createContext } from "react";
export const GlobalContext = createContext({
  customSnackbar: { isOpen: false, message: ``, severity: "info" },
});
