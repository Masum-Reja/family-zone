import React, { createContext } from "react";
import useFirebase from "./useFirebase";

//create an auth context
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const authData = useFirebase();

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
