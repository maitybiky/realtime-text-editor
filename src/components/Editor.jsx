"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
const DocsEditor = () => {
  const { quill, quillRef } = useQuill();

  console.log(quill);
  console.log(quillRef);

  useEffect(() => {
    socket.emit("join-workspace", "test-room");

    if (quill) {
      quill.updateContents([{ insert: "hello world" }]);

      // Listen for changes from other users
      quill.on("text-change", (delta, oldDelta, source) => {
        const data = { userId: "surajit", delta ,workspaceId:"test-room"};
        if (source === "user") {
          socket.emit("send-changes", data);
        }
      });

      // Apply received changes
      socket.on("receive-changes", ({delta}) => {
        console.log('delta', delta)
        quill.updateContents(delta);
      });
    }

    return () => {
      socket.off("receive-changes");
    };
  }, [quill]);

  return (
    <div className="w-full h-full relative z-0">
      <div ref={quillRef} />
    </div>
  );
};

export default DocsEditor;
