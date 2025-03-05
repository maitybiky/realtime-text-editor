"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FcInvite } from "react-icons/fc";
import { GoDotFill } from "react-icons/go";
import CommonModal from "./CommonModal";
import { CiLogin } from "react-icons/ci";
import Login from "./Login";
import { addMember } from "@/lib/api/docs";
import { store } from "@/util/localstorage";

const Navbar = ({ activeDoc }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState("");
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/getUser", {
        method: "GET",
      });

      if (response.status === 401) {
        setIsLoggedIn(false);
        setShowLoginModal(true);
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const onClose = () => {
    setShowLoginModal(false);
    setShowInviteModal(false);
  };

  const handleInviteMembers = () => {
    console.log("activeDoc :>> ", activeDoc);
    addMember(activeDoc._id, email);
    setShowInviteModal(false);
  };
  console.log("activeDoc :>> ", activeDoc);
  return (
    <header className="bg-gradient-to-r w-full fixed top-0 z-5 from-green-800 via-green-700 to-green-600 text-white py-4 px-6 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        {/* <LightningBoltIcon className="w-8 h-8 text-yellow-300 animate-pulse" /> */}
        <h1 className="text-2xl font-bold tracking-wide">FunkyEdit</h1>
      </div>

      {/* Collaboration Info */}
      <div className="flex items-center space-x-4">
        {/* <UsersIcon className="w-6 h-6" /> */}
        <span className="text-lg font-medium">Live Editing</span>
      </div>

      {/* Current Users List */}
      <div className="flex items-center space-x-2">
        {["Alice", "Bob", "Charlie"].map((user, index) => (
          <div key={index} className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {/* <UserCircleIcon className="w-5 h-5 text-white" /> */}
            <span className="text-sm font-medium">{user}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <button className="flex items-center space-x-2 bg-black bg-opacity-40 hover:bg-opacity-60 px-4 py-2 rounded-lg transition-all duration-300">
        {/* <SaveIcon className="w-5 h-5" /> */}
        <span>Save</span>
      </button>
    </header>
  );
  return (
    <>
      <nav className="border fixed top-0 z-5 border-gray-300 w-full h-20 px-10 flex flex-row justify-between items-center overflow-hidden">
        <ul className="flex flex-row items-center gap-16">
          <li className="font-bold uppercase text-xl flex gap-3">
            <Image
              height={60}
              width={60}
              className="rounded-full object-cover"
              src={
                "https://w7.pngwing.com/pngs/700/156/png-transparent-organization-professional-logo-junior-frontend-developer-freelancer-internal-revenue-service-blue-text-trademark.png"
              }
              alt="logo"
            />
            Section - 2
          </li>
        </ul>
        <ul className="flex flex-row items-center gap-10">
          <li className="flex flex-row items-center gap-1">
            <GoDotFill size={25} fill="green" />
            <p>{activeDoc?.collaborators?.map((it) => it?.userId?.userName)?.join(",")}</p>
          </li>
          <li className="flex items-center gap-1">
            <Image
              className="rounded-full h-8 w-8 object-cover cursor-pointer"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
              alt="avatar"
              width={20}
              height={20}
            />
            <Image
              className="rounded-full h-8 w-8 object-cover cursor-pointer"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
              alt="avatar"
              width={20}
              height={20}
            />
            <Image
              className="rounded-full h-8 w-8 object-cover cursor-pointer"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
              alt="avatar"
              width={20}
              height={20}
            />
            <span className="text-lg font-semibold">
              + {activeDoc?.collaborators?.length}
            </span>
          </li>
          <li
            onClick={() => setShowInviteModal(true)}
            className="bg-gray-200 text_and_icon_button_background w-full flex items-center gap-2 p-2 rounded-md"
          >
            <FcInvite size={25} fill="gray" />
            <span>Invite members</span>
          </li>

          <li className="flex flex-row items-center gap-3">
            {isLoggedIn ? (
              <>
                <Image
                  className="rounded-full h-12 w-12 object-cover cursor-pointer"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
                  alt="avatar"
                  width={30}
                  height={30}
                />
                <p>{store().getItem("userData")?.email}</p>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-gray-200 text_and_icon_button_background w-full flex items-center gap-2 p-2 rounded-md"
              >
                <CiLogin size={25} fill="gray" />
                <span>Login</span>
              </button>
            )}
          </li>
        </ul>
      </nav>

      {showLoginModal && <Login onClose={onClose} />}

      {showInviteModal && (
        <CommonModal
          onClose={onClose}
          Header={<h1 className="text-2xl font-semibold">Invite Members</h1>}
          Body={
            <div className="w-full flex gap-5">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter email address..."
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <button
                onClick={handleInviteMembers}
                className="bg-gray-200 text_and_icon_button_background w-full flex items-center gap-2 p-2 rounded-md"
              >
                <FcInvite size={25} fill="gray" />
                <span>Invite</span>
              </button>
            </div>
          }
        />
      )}
    </>
  );
};

export default Navbar;
