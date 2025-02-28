"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DocsEditor from "@/components/Editor";

const HomePage = () => {
  const [activeDoc, setActiveDoc] = useState();
  return (
    <>
      <Navbar />
      <Sidebar setActiveDoc={setActiveDoc} />
      <section className="ml-80 mt-20 h-[83vh] overflow-hidden">
        <DocsEditor activeDoc={activeDoc} />
      </section>
    </>
  );
};

export default HomePage;
