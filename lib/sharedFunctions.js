import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { firestore, storage } from "./firebase";

//////////////////////////////////////////////////////////////////

export async function addToFirestore(path, uid, docObj) {
  const docRef = doc(firestore, path, uid);
  return await setDoc(docRef, docObj)
    .then(() => {
      return {
        isOpen: true,
        message: `Doc added sucessfully`,
        severity: "success",
      };
    })
    .catch((error) => {
      return {
        isOpen: true,
        message: `Error adding doc: "${error.message}"!`,
        severity: "error",
      };
    });
}

//////////////////////////////////////////////////////////////////

export function deleteFromFirestore(path, uid) {
  const firestoreRef = doc(firestore, path, uid);
  return deleteDoc(firestoreRef)
    .then(() => ({
      isOpen: true,
      message: `Doc deleted sucessfully`,
      severity: "success",
    }))
    .catch((error) => ({
      isOpen: true,
      message: `Error deleting doc: ${error}`,
      severity: "error",
    }));
}

//////////////////////////////////////////////////////////////////

export async function addToStorage(path, file) {
  const imgRef = ref(storage, path);
  await uploadBytes(imgRef, file);
  return await getDownloadURL(imgRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.error(error);
    });
}

//////////////////////////////////////////////////////////////////

export async function deleteFromStorage(path) {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef)
    .then(() => ({
      isOpen: true,
      message: `File deleted sucessfully`,
      severity: "success",
    }))
    .catch((error) => ({
      isOpen: true,
      message: `Error deleting file: ${error}`,
      severity: "error",
    }));
}

//////////////////////////////////////////////////////////////////
