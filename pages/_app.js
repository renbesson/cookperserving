import "../styles/globals.css";
import NavBar from "../components/NavBar";

import { UserState } from "../lib/userContext";
import { GlobalState } from "../lib/globalState/GlobalState";
import CustomSnackbar from "../components/CustomSnackbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { SnackbarProvider } from "notistack";

export default function MyApp({ Component, pageProps }) {
  const [user, loadingUser, error] = useAuthState(auth);

  return (
    <UserState>
      <SnackbarProvider maxSnack={3}>
        <GlobalState>
          <CustomSnackbar />
          <NavBar />
          <Component {...pageProps} userData={{ user, loadingUser, error }} />
        </GlobalState>
      </SnackbarProvider>
    </UserState>
  );
}
