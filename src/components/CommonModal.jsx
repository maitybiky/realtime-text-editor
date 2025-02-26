"use client";
import { IoMdClose } from "react-icons/io";

const CommonModal = ({ Header, Body, Footer, onClose }) => {
  return (
    <>
      <section className="fixed top-0 left-0 w-screen h-screen bg-[rgba(226,232,240,0.46)] z-10">
        <section className="w-[50%] fixed z-10 left-[35rem] h-[80%] top-28 bottom-[10%] border border-gray-300 bg-white rounded-lg shadow-lg">
          <header className="p-3 px-5 border-b border-gray-300 w-full flex justify-between items-center">
            {Header}
            <IoMdClose
              onClick={onClose}
              className="cursor-pointer"
              size={25}
              fill="gray"
            />
          </header>
          <main className="p-5">{Body}</main>
          <footer className="p-5">{Footer}</footer>
        </section>
      </section>
    </>
  );
};

export default CommonModal;
