import React from "react";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoMdDocument } from "react-icons/io";

const Sidebar = () => {
  return (
    <aside className="h-screen w-80 fixed left-0 top-20 border-r border-gray-300 bg-gray-100">
      <ul className="flex flex-col w-full gap-4 p-4">
        <li className="font-semibold text-xl">Your Documents</li>
        <li className="border border-gray-400 p-2 rounded-md w-full flex flex-row items-center gap-2">
          <CiSearch fill="gray" size={25} />
          <input
            placeholder="Search file..."
            className="border outline-none border-none w-full bg-transparent"
            type="text"
          />
        </li>
        <li className="w-full">
          <button className="bg-gray-200 text_and_icon_button_background w-full">
            <GoPlus fill="gray" size={25} />
            <span className="text-gray-600 font-semibold">New Document</span>
          </button>
        </li>
      </ul>
      <ul className="flex flex-col w-full gap-2 p-4 h-full overflow-y-auto">
        <li className="active_file flex justify-start gap-2 items-center bg-gray-50 p-3 shadow-md rounded-md border border-gray-300 cursor-pointer">
          <IoMdDocument fill="gray" size={25} />
          <span className="text-gray-500">Portfolio.txt</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
