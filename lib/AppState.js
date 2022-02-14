import { createContext } from "react";

const GlobalContext = createContext({
  customSnackbar: { isOpen: false, message: ``, severity: "info" },
});

export const AppState = (props) => {
  return (
    <GlobalContext.Provider value={{ message: "This is from the context" }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
