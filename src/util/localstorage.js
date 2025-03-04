"use client";

export const store = () => {
  return {
    setItem: (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
    getItem: (key) => {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    },
  };
};
