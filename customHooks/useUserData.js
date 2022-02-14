import { auth, firestore } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = auth.onAuthStateChanged(async (authUser) => {
      try {
        if (authUser) {
          // User is signed in.
          const docRef = doc(getFirestore(), "users", authUser.uid);

          onSnapshot(docRef, (doc) => {
            // Gets the info in the firestore doc for this specific UID
            setUser((prevUser) => {
              return { ...prevUser, ...doc.data() };
            });
          });
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        console.error(error);
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return { user, setUser, loadingUser };
}
