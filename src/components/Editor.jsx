"use client"

import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const DocsEditor = () => {
  const { quill, quillRef } = useQuill();

  console.log(quill);
  console.log(quillRef); 

  return (
    <div className="w-full h-full relative z-0">
      <div ref={quillRef} />
    </div>
  );
};

export default DocsEditor;
