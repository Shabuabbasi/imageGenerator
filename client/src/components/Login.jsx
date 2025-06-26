import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { assets } from "../assets/assets";



const Login = ({ setShowLogin, setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("Login");
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(
    /\/$/,
    ""
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (state === "Signup") {
        const { data } = await axios.post(`${backendUrl}/api/users/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/users/login`, {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 relative w-full max-w-md"
      >
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
        />

        <h2 className="text-2xl font-bold text-center">
          {state === "Login" ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={onSubmitHandler}>
          {state === "Signup" && (
            <div className="border border-gray-300 px-6 py-3 flex items-center gap-3 rounded-full mt-6">
              <img
                src={assets.profile_icon}
                alt="Name"
                className="w-5 h-5"
              />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full name"
                className="w-full focus:outline-none"
                required
              />
            </div>
          )}

          <div className="border border-gray-300 px-6 py-3 flex items-center gap-3 rounded-full mt-4">
            <img src={assets.email_icon} alt="Email" className="w-5 h-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email address"
              className="w-full focus:outline-none"
              required
            />
          </div>

          <div className="border border-gray-300 px-6 py-3 flex items-center gap-3 rounded-full mt-4">
            <img src={assets.lock_icon} alt="Password" className="w-5 h-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="w-full focus:outline-none"
              minLength={6}
              required
            />
          </div>

          {state === "Login" && (
            <p className="text-sm text-red-600 my-4 cursor-pointer">
              Forgot password?
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-600 w-full text-white py-3 rounded-full font-medium mt-2 hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : state === "Login" ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {state === "Login" ? (
          <p className="mt-5 text-center text-gray-600">
            Don't have an account?
            <span
              className="text-yellow-600 font-medium ml-1 cursor-pointer"
              onClick={() => setState("Signup")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-gray-600">
            Already have an account?
            <span
              className="text-yellow-600 font-medium ml-1 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
