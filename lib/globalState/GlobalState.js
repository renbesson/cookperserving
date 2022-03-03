import { useReducer } from "react";

import { globalReducer } from "./globalReducer";
import { ENABLE_SNACKBAR, DISABLE_SNACKBAR } from "./globalActions";
import { GlobalContext } from "./globalContext";

const customSnackbarState = { isOpen: false, message: ``, severity: "info" };

export const GlobalState = (props) => {
  const initialState = { customSnackbarState };

  const [state, dispatch] = useReducer(globalReducer, initialState);

  const enableSnackbar = (snackbar) => {
    dispatch({
      type: ENABLE_SNACKBAR,
      payload: snackbar,
    });
  };

  const disableSnackbar = () => {
    dispatch({
      type: DISABLE_SNACKBAR,
    });
  };

  return (
    <GlobalContext.Provider value={{ state, enableSnackbar, disableSnackbar }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
