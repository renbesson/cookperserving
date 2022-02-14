import "../styles/globals.css";
import NavBar from "../components/NavBar";

import { UserContext } from "../lib/userContext";
import { useUserData } from "../customHooks/useUserData";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <NavBar />
      <Component {...pageProps} userData={userData} />
    </UserContext.Provider>
  );
}

export default MyApp;
