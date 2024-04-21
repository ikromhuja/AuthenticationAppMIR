import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/useGlobalContext";
function useSignup() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(GlobalContext);
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        dispatch({ type: "SIGN_IN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        // ...
      });
  };
  const signupWithPasswordAndEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return { signUpWithGoogle, signupWithPasswordAndEmail, user, error };
}

export default useSignup;
