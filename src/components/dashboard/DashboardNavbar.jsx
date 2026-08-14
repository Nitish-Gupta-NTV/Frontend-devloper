import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

export default function DashboardNavbar() {
  return (
    <header className="border-b border-[#232838] bg-[#0A0C10]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-mono text-sm font-semibold text-[#E8EAED]">
          <span className="text-[#F2B84B]">&gt;</span>
          portfolio<span className="text-[#4ADE9D]">.gen</span>
        </Link>
        <ProfileDropdown />
      </div>
    </header>
  );
}