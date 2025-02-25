"use client"

import React, { useState } from "react";
import { HiMiniH1, HiMiniH2, HiMiniH3 } from "react-icons/hi2";
import { FaBold } from "react-icons/fa";
import { BsTypeItalic } from "react-icons/bs";
import { AiOutlineUnderline } from "react-icons/ai";
import { CiTextAlignJustify } from "react-icons/ci";
import { HiOutlineListBullet } from "react-icons/hi2";
import { MdOutlineFormatListNumbered } from "react-icons/md";

const EditTools = () => {
  const [fileName, setFileName] = useState("Untitled1.txt");

  return (
    <div className="flex flex-row justify-between w-full h-12 bg-gray-100 rounded-md">
      <div className="flex flex-row w-[50%] gap-28 items-center justify-between px-5 border-r border-gray-200">
        {/* <p className="w-[50%]">Unlitled1.tsx</p> */}
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-[50%] bg-transparent outline-none border-none"
          placeholder="Untitled1.txt"
        />
        <div className="flex flex-row justify-around items-center gap-10 w-[50%]">
          <HiMiniH1 fill="gray" size={25} />
          <HiMiniH2 fill="gray" size={25} />
          <HiMiniH3 fill="gray" size={25} />
        </div>
      </div>
      <div className="flex flex-row gap-10 items-center justify-around px-5 border-r border-gray-200 w-[25%]">
        <FaBold fill="gray" size={20} />
        <BsTypeItalic fill="gray" size={25} />
        <AiOutlineUnderline fill="gray" size={25} />
      </div>
      <div className="flex gap-10 flex-row items-center justify-around px-5 w-[25%]">
        <CiTextAlignJustify fill="gray" size={20} />
        <HiOutlineListBullet fill="gray" size={25} />
        <MdOutlineFormatListNumbered fill="gray" size={25} />
      </div>
    </div>
  );
};

export default EditTools;
