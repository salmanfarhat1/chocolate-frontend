"use client";
import { useState } from "react";
import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Header() {
  const [open, setOpen] = useState(false);

  const scrollToFooter = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-[#48260D] shadow-sm border-b border-[#e8d5c4] text-[#c8a97e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold">
            Chocolate Shop
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#7a5a53] transition-colors font-medium">
              Collections
            </Link>
            <Link href="/create-chocolate" className="hover:text-[#7a5a53] transition-colors font-medium">
              Custom Chocolate
            </Link>
            <a href="#footer" onClick={scrollToFooter} className="hover:text-[#7a5a53] transition-colors font-medium cursor-pointer">
              Contact
            </a>
            <CartIcon />
          </nav>

          {/* Mobile: cart + hamburger */}
          <div className="flex sm:hidden items-center gap-4">
            <CartIcon />
            <button
              onClick={() => setOpen(!open)}
              className="text-[#c8a97e] focus:outline-none text-2xl"
              aria-label="Toggle menu"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="sm:hidden bg-[#48260D] border-t border-[#5a3528] px-4 py-4 flex flex-col gap-4 text-[#c8a97e]">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-[#7a5a53] transition-colors font-medium">
            Collections
          </Link>
          <Link href="/create-chocolate" onClick={() => setOpen(false)} className="hover:text-[#7a5a53] transition-colors font-medium">
            Custom Chocolate
          </Link>
          <a href="#footer" onClick={scrollToFooter} className="hover:text-[#7a5a53] transition-colors font-medium cursor-pointer">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}