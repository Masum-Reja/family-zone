import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import TextField from "./Form/TextField";
export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const triggerResetEmail = async () => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("Password reset email sent");
      await sendPasswordResetEmail(auth, email);
    } else {
      alert("Please enter valid email");
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="resetPassword-main flex flex-col gap-4">
      <TextField
        type="email"
        placeholder="Enter your valid Email"
        onChange={handleChange}
      />
      <button
        onClick={triggerResetEmail}
        className="bg-cyan-500 px-3 py-3 mx-6 text-gray-100 rounded"
        type="button"
      >
        Reset password
      </button>
    </div>
  );
};
