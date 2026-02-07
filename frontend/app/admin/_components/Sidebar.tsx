"use client";

import { useState } from "react";
import {
  Menu,
  House,
  Users,
  Grid,
  Briefcase,
  User,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Categories", icon: Grid, path: "/admin/categories" },
  { name: "Services", icon: Briefcase, path: "/admin/services" },
  { name: "Profile", icon: User, path: "/admin/profile" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-white text-gray-800 border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Hamburger */}
      <div
        className={`flex items-center ${
          isOpen ? "justify-start px-4" : "justify-center"
        } h-16 cursor-pointer hover:bg-gray-100`}
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
              className={`flex items-center gap-4 px-4 py-3 rounded hover:bg-gray-100 transition-colors ${
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
