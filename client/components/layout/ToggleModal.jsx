"use client";
import React, { useState } from "react";

const ToggleModel = ({ isOpen, onToggle, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-md p-8">
        {children}
        <button
          onClick={onToggle}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ToggleModel;
