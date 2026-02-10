"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import LogoutModal from "@/app/_components/LogoutModal";

export default function Header() {
  const { logout } = useAuth();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // CONFIRM LOGOUT
  const handleConfirmLogout = () => {
    logout();
    setIsLogoutOpen(false);
    toast.success("Logout successful");
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 py-3 bg-white shadow">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-8 h-8 object-contain rounded-full"
          />
          <h1 className="text-lg font-semibold text-gray-800">Admin</h1>
        </div>

        {/* Logout button */}
        <button
          onClick={() => setIsLogoutOpen(true)}
          className="px-4 py-1 text-red-500 hover:text-red-600 transition cursor-pointer"
        >
          <LogOut size={17} />
        </button>
      </header>

      {/* LOGOUT MODAL */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Logout"
        description="Are you sure you want to log out of your account?"
      />
    </>
  );
}
