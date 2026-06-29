import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Music, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/songs", label: "Songs" },
    { to: "/about", label: "About" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full px-6 md:px-12 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-medium text-gray-900 tracking-tight">
            MoodMusic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm transition-colors ${
                isActive(to)
                  ? "text-indigo-600 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/detector"
            className="px-4 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-1.5 rounded hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 p-4 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                isActive(to)
                  ? "bg-indigo-50 text-indigo-600 font-medium"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/detector"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded bg-indigo-600 text-white text-sm font-medium text-center hover:bg-indigo-700 transition-colors mt-1"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}