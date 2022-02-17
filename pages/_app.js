import "../styles/globals.css";
import NavBar from "../components/NavBar";

import { UserContext } from "../lib/userContext";
import { GlobalState } from "../lib/globalState/GlobalState";
import { useUserData } from "../customHooks/useUserData";
import CustomSnackbar from "../components/CustomSnackbar";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <GlobalState>
        <CustomSnackbar />
        <NavBar />
        <Component {...pageProps} userData={userData} />
      </GlobalState>
    </UserContext.Provider>
  );
}

export default MyApp;
