import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./Form/Button";
import GoogleSignIn from "./Form/GoogleSignIn";
import TextField from "./Form/TextField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/config/firebase";
import logo from "../assets/img/familyzone-logo-2.png";
import { ResetPassword } from "./ResetPassword";
import { AiFillCloseCircle } from "react-icons/ai";

const SignIn = () => {
  const [err, setErr] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();
  const [userTextField, setUserTextField] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <main className="h-screen w-full bg-gray-100 mt-[-24px]">
      <div className="flex flex-col justify-center items-center h-screen ">
        <div className="w-96 my-6 p-4 rounded-md shadow-lg pb-10 bg-gradient-to-b from-cyan-500  to-gray-100">
          <form className=" " onSubmit={handleSubmit}>
            <div className="py-6 ">
              <div className="flex justify-center items-center pb-6">
                <img className="w-44 " src={logo} alt={logo} />
              </div>
              <div className="items-center flex justify-center">
                <p
                  tabIndex={0}
                  aria-label="Login to your account"
                  className="text-2xl font-bold leading-6 text-gray-100"
                >
                  Sign In
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <TextField type="email" placeholder="email" />
              <TextField type="password" placeholder="password" />
            </div>
            <Button text="Sign In" />
            {/* <GoogleSignIn text="Sign In With Google" /> */}
          </form>

          <div className="text-center pt-2">
            <p className="text-sm mt-4 font-medium leading-none text-gray-500">
              Dont have account?{" "}
              <Link to="/create-room">
                <span
                  tabIndex={0}
                  role="link"
                  aria-label="Sign up here"
                  className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
                >
                  {" "}
                  Create room & sign up
                </span>
              </Link>
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="text-base text-cyan-500 text-center my-4 hover:underline "
            >
              Forgot Password ?
            </button>
          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none py-6 text-center">
                    <div className="flex justify-end pr-5 mt-[-10px]">
                      <button onClick={() => setShowModal(false)}>
                        <AiFillCloseCircle></AiFillCloseCircle>
                      </button>
                    </div>
                    <h1 className="">Reset Your Password</h1>

                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <ResetPassword />
                    </div>
                    {/*footer*/}
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default SignIn;
