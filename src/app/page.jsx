"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SiFiledotio } from "react-icons/si";
import DocsEditor from "@/components/Editor";

const HomePage = () => {
  const [activeDoc, setActiveDoc] = useState();
  return (
    <>
      <Navbar activeDoc={activeDoc} />
      <Sidebar 
      setActiveDoc={setActiveDoc} 
      activeDoc = {activeDoc} 
      />
      {activeDoc ? (
        <section className="ml-80 mt-20 h-[83vh] overflow-hidden">
          <DocsEditor activeDoc={activeDoc} />
        </section>
      ) : (
        <div className=" overflow-hidden ml-20 flex gap-10 flex-col items-center justify-center h-[100vh] w-full">
          <SiFiledotio size={300} style={{ color: "grey" }} />
          <p className="text-3xl text-slate-500 ">Tap on file to open</p>
        </div>
      )}
    </>
  );
};

export default HomePage;
