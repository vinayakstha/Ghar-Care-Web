"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const handleLogout = () => {
    // your logout logic here
    console.log("Logged out!");
  };
  const { logout } = useAuth();

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white shadow">
      <div className="flex items-center gap-3">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-8 h-8 object-contain rounded-full"
        />
        <h1 className="text-lg font-semibold text-gray-800">Admin</h1>
      </div>

      {/* Right: Logout button */}
      <button
        onClick={logout}
        className="px-4 py-1 text-red-500 font-medium text-sm cursor-pointer"
      >
        <LogOut size={17} />
      </button>
    </header>
  );
}
