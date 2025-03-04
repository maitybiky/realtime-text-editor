"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { store } from "@/util/localstorage";

const socket = io("http://192.168.1.5:5000");
const DocsEditor = ({ activeDoc }) => {
  const docsId = activeDoc?._id;
  const userId = store().getItem("userData")?._id;

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (!docsId) return;

    socket.emit("join-workspace", docsId);

    if (quill) {
      if (activeDoc?.content) {
        quill.updateContents(activeDoc?.content);
      }

      // Listen for changes from other users
      quill.on("text-change", (delta, oldDelta, source) => {
        const fullDelta = quill?.getContents();

        const data = {
          userId,
          delta,
          docsId,
          fullDelta,
        };
        if (source === "user") {
          socket.emit("send-changes", data);
        }
      });

      // Apply received changes
      socket.on("receive-changes", (delta) => {
        console.log('delta :>> ', delta);
        quill.setContents(delta);
        quill.setSelection(quill.getLength());
      });
    }

    return () => {
      socket.off("receive-changes");
    };
  }, [quill, docsId]);

  return (
    <div className="w-full h-full relative z-0">
      <div ref={quillRef} />
    </div>
  );
};

export default DocsEditor;
