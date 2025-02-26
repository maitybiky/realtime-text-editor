"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FcInvite } from "react-icons/fc";
import { GoDotFill } from "react-icons/go";
import CommonModal from "./CommonModal";
import { CiLogin } from "react-icons/ci";
import Login from "./Login";

const Navbar = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClose = () => {
    setShowLoginModal(false);
    setShowInviteModal(false);
  };

  const handleInviteMembers = () => {
    console.log("Invited members");
    setShowInviteModal(false);
  };

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
            <p>Mukesh, Veeru </p>
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
            <span className="text-lg font-semibold">+ 30 Joined</span>
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
                <p>Mukesh Gupta</p>
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
