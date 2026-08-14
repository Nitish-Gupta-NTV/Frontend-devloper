import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../context/authStore";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2B84B] font-mono text-xs font-bold text-[#1A1305] transition hover:bg-[#F5C567]"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 w-52 overflow-hidden rounded-lg border border-[#232838] bg-[#12151C] shadow-2xl">
          <div className="border-b border-[#232838] px-4 py-3">
            <p className="truncate font-sans text-sm font-medium text-[#E8EAED]">{user?.name || "Your account"}</p>
            <p className="truncate font-mono text-xs text-[#8B93A6]">{user?.email || ""}</p>
          </div>

          <nav className="py-1 font-mono text-sm">
            <Link
              to="/onboarding"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-[#E8EAED] transition hover:bg-[#1A1E29]"
            >
              Edit portfolio
            </Link>
            <Link
              to="/portfolio"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-[#E8EAED] transition hover:bg-[#1A1E29]"
            >
              View live portfolio
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-[#E8EAED] transition hover:bg-[#1A1E29]"
            >
              Account settings
            </Link>
          </nav>

          <div className="border-t border-[#232838] py-1">
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left font-mono text-sm text-[#F09595] transition hover:bg-[#1A1E29]"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}