import React from "react";
import EditTools from "@/components/EditTools";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <section className="ml-80 mt-24 px-5 ">
        <EditTools />
      </section>
    </>
  );
};

export default HomePage;
