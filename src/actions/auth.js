import { googleProvider } from "../firebase/firebase";
import { getAuth, signInWithPopup, signOut } from "firebase/auth"
export const login = (uid) => ({
  type: "LOGIN",
  uid,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const startLogin = () => {
  return async () => {
    signInWithPopup(getAuth(), googleProvider)
    .then(d => {
      // console.log("chcking after login: ", d);
    }).catch(e => {
      console.log("error during login", e);
    })
  };
};

export const startLogout = () => {
  return () => {
    // console.log("checking logOut");
    return signOut(getAuth())
  };
};
