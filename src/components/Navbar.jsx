import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiDotsNine } from "react-icons/pi";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border fixed top-0 border-gray-300 w-full h-20 px-10 flex flex-row justify-between items-center overflow-hidden">
      <ul className="flex flex-row items-center gap-16">
        <li className="font-bold uppercase text-xl">Section - 2</li>
        <li className="text_button_background">
          <p>Coming Soon...</p>
        </li>
      </ul>
      <ul className="flex flex-row items-center gap-10">
        <li>
          <PiDotsNine size={25} fill="gray" />
        </li>
        <li className="rounded_button_background flex justify-center items-center">
          <IoMdNotificationsOutline size={25} fill="gray" />
        </li>

        <li className="flex flex-row items-center gap-3">
          <Image
            className="rounded-full h-12 w-12 object-cover cursor-pointer"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
            alt="avatar"
            width={30}
            height={30}
          />
          <p>Mukesh Gupta</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
