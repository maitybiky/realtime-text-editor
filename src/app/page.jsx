import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DocsEditor from "@/components/Editor";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <section className="ml-80 mt-20 h-[83vh] overflow-hidden">
        <DocsEditor />
      </section>
    </>
  );
};

export default HomePage;
