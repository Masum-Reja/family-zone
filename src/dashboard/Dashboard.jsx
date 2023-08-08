import React from "react";
import { Router } from "react-router-dom";
import PrivateRoute from "../route/PrivateRoute";
import AuthProvider from "../service/AuthProvider";
import SignIn from "../service/SignIn";
import MyFiles from "../viewer/components/MyFiles";

const Dashboard = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <PrivateRoute path="/my-files" element={<MyFiles />}></PrivateRoute>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default Dashboard;
