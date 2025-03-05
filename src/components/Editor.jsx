"use client";
import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { store } from "@/util/localstorage";
import { getDocumentData } from "@/lib/api/docs";
import BackdropLoading from "./BackDrop";

const socket = io("http://localhost:5000");

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

const DocsEditor = ({ activeDoc, setActiveDoc }) => {
  const docsId = activeDoc?._id;
  const [currentDocDocData, setCurrentDocData] = useState();
  const [loading, setLoading] = useState(false);
  const userId = store().getItem("userData")?._id;
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (!activeDoc?._id) return;
    setLoading(true);
    getDocumentData(activeDoc._id)
      .then((res) => {
        setCurrentDocData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeDoc?._id]);
  useEffect(() => {
    if (!quill || loading || !currentDocDocData) return;
    const docsId = currentDocDocData?._id;
    // Join the new workspace
    socket.emit("join-workspace", docsId);

    // Remove previous event listeners before setting new ones
    socket.off("receive-changes");

    // Load document content
    quill.setContents(currentDocDocData?.content || []);

    // Debounced function to emit changes
    const emitChanges = debounce((data) => {
      socket.emit("send-changes", data);
      setActiveDoc((prev) => ({ ...prev, content: data.fullDelta }));
    }, 300);

    // Listen for text changes
    const handleTextChange = (delta, oldDelta, source) => {
      if (source === "user") {
        const fullDelta = quill.getContents();
        const data = { userId, delta, docsId, fullDelta };
        emitChanges(data);
      }
    };

    quill.on("text-change", handleTextChange);

    // Listen for incoming changes
    const handleReceiveChanges = (delta) => {
      quill.setContents(delta);

      quill.setSelection(quill.getLength());
    };

    socket.on("receive-changes", handleReceiveChanges);

    // Cleanup when component unmounts or docsId changes
    return () => {
      quill.off("text-change", handleTextChange);
      socket.off("receive-changes", handleReceiveChanges);
    };
  }, [quill, currentDocDocData, loading]);
  // if (loading) {
  //   return <h2>loading</h2>;
  // }
  return (
    <div className="w-full h-full relative z-0">
      {loading && <BackdropLoading />}
      <div ref={quillRef} />
    </div>
  );
};

export default DocsEditor;
