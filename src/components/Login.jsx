"use client";

import React, { useState } from "react";
import CommonModal from "./CommonModal";
import Image from "next/image";
import API from "@/lib/axios";
import { store } from "@/util/localstorage";

const Login = ({ onClose }) => {
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const toggleModal = (name) => {
    console.log("name", name);
    if (name === "register") {
      setIsOpenRegisterModal(true);
    } else {
      setIsOpenRegisterModal(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !username) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await API.post("/auth/register", {
        email,
        password,
        username,
      });
      store().setItem("userData", response.data.user);
      alert("User registered successfully");
      onClose();
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
      store().setItem("userData", response.data.user);

      alert("User logged in successfully");
      onClose();
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {isOpenRegisterModal ? (
        <CommonModal
          onClose={onClose}
          Header={<p className="text-xl font-semibold">Register</p>}
          Body={
            <div className="flex flex-col gap-4 justify-center items-center">
              <Image
                height={80}
                width={100}
                className="rounded-full object-cover"
                src={
                  "https://w7.pngwing.com/pngs/700/156/png-transparent-organization-professional-logo-junior-frontend-developer-freelancer-internal-revenue-service-blue-text-trademark.png"
                }
                alt="logo"
              />
              <h1 className="text-2xl font-semibold">Welcome to ByteCrew</h1>
              <p className="text-center space-x-2">
                <span>For more intersting and excing projects visit</span>
                <a
                  className="text-blue-500 hover:underline"
                  href="bytecrew.tech"
                  target="_blank"
                >
                  bytecrew.tech
                </a>
              </p>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="border border-gray-300 p-2 mt-4 rounded-md w-[50%]"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded-md w-[50%]"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="border border-gray-300 p-2 mb-4 w-[50%] rounded-md"
              />
              <button
                onClick={handleRegister}
                className="bg-blue-500 text-white p-2 w-[60%] rounded-md"
              >
                Register
              </button>
              <p className="text-center mt-4">
                <span>Already have an account? </span>
                <span
                  onClick={toggleModal}
                  className="text-blue-500 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          }
        />
      ) : (
        <CommonModal
          onClose={onClose}
          Header={<p className="text-xl font-semibold">Login</p>}
          Body={
            <div className="flex flex-col gap-4 justify-center items-center">
              <Image
                height={80}
                width={100}
                className="rounded-full object-cover"
                src={
                  "https://w7.pngwing.com/pngs/700/156/png-transparent-organization-professional-logo-junior-frontend-developer-freelancer-internal-revenue-service-blue-text-trademark.png"
                }
                alt="logo"
              />
              <h1 className="text-2xl font-semibold">Welcome to ByteCrew</h1>
              <p className="text-center space-x-2">
                <span>For more intersting and excing projects visit</span>
                <a
                  className="text-blue-500 hover:underline"
                  href="bytecrew.tech"
                  target="_blank"
                >
                  bytecrew.tech
                </a>
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="border border-gray-300 p-2 mt-4 rounded-md w-[50%]"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="border border-gray-300 p-2 w-[50%] mb-4 rounded-md"
              />
              <button
                onClick={handleLogin}
                className="bg-blue-500 text-white p-2 w-[60%] rounded-md"
              >
                Login
              </button>
              <p className="text-center mt-4">
                <span>Don't have an account? </span>
                <span
                  onClick={() => toggleModal("register")}
                  className="text-blue-500 cursor-pointer"
                >
                  Register
                </span>
              </p>
            </div>
          }
        />
      )}
    </>
  );
};

export default Login;
