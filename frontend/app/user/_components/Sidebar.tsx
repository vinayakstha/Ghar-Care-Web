"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Briefcase, User, Bookmark, Heart } from "lucide-react";

const sidebarItems = [
  { name: "Services", icon: Briefcase, path: "/user/services" },
  { name: "My Bookings", icon: Bookmark, path: "/user/my-bookings" },
  { name: "Favourites", icon: Heart, path: "/user/favourites" },
  { name: "Profile", icon: User, path: "/user/profile" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-[#006BAA] text-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Hamburger */}
      <div
        className={`flex items-center ${
          isOpen ? "justify-start px-4" : "justify-center"
        } h-16 cursor-pointer hover:bg-[#01508d]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col mt-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded hover:bg-[#01508d] transition-colors ${
                !isOpen && "justify-center"
              }`}
            >
              <Icon size={20} />
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
