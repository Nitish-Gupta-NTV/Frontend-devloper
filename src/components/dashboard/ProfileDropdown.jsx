import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../context/authStore";
//import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient"; 
//import toast from "react-hot-toast";
export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [error,setError]=useState(null);
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

  const handleLogout = async () => {
  try {
    const res = await axiosClient.post("/api/logout");

    if (res.status >= 200 && res.status < 300) {
      clearAuth();
      navigate("/login");

      toast.success(res.data?.message || "Logout successfully");
    }
  } catch (error) {
    console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  console.log("HEADERS:", error.response?.headers);
    toast.error(
      error.response?.data?.message || "Logout failed. Please try again."
    );
  }
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