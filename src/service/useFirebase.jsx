import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  getIdToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

//initialize firebase  authentication

const useFirebase = () => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  // const history = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  //on State Change
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  // observer user state
  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("https://family-server.malihatabassum.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  useEffect(() => {
    fetch(`https://family-server.malihatabassum.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  //sign up functionality
  const signUpUser = (email, password, name, image) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        const newUser = { email, displayName: name };
        setUser(newUser);
        // save user to the database
        saveUser(email, name, "POST");

        updateProfile(auth.user, {
          displayName: name,
          photoURL: image,
        }).then(() => {
          swal("Good job!", "Account has been created!", "success");
          history("/");
        });
      })
      .catch((err) => swal("Something went wrong!", `${err.message}`, "error"));
  };

  //sign in functionality
  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        swal("Sign in Successful!", "Welcome back !", "success");
        history("/");
      })
      .catch((err) => swal("Something went wrong!", `${err.message}`, "error"));
  };

  //google sign in
  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        saveUser(user.email, user.displayName, "POST");
        swal("Good job!", "Account has been created!", "success");
        history("/");
      })
      .catch((err) => console.log(err.message));
  };

  // sign out
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        swal("Logout Successful!", "You are logged out!", "success");
        history("/sign-in");
      })
      .catch((err) => {
        swal("Something went wrong!", `${err.message}`, "error");
      });
  };

  return {
    user,
    admin,
    token,
    isLoading,
    signUpUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };
};

export default useFirebase;
