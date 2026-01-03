"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[#006BAA]"
        >
          <Image
            src="/images/home-repair.png"
            alt="GharCare Logo"
            width={32}
            height={32}
            priority
          />
          <span>GharCare</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-[#006BAA]">
            Home
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-[#006BAA]">
            Services
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#006BAA]">
            About Us
          </Link>

          <Link
            href="/login"
            className="ml-4 px-5 py-2 rounded-lg bg-[#006BAA] text-white hover:bg-[#01508d] transition"
          >
            Login
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About Us
            </Link>

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 text-center px-4 py-2 rounded-lg bg-[#006BAA] text-white"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
