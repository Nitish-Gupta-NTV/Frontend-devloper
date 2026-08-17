import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure

const POLL_INTERVAL_MS = 1000000;

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function fetchUnread() {
      try {
        const res = await axiosClient.get("/api/developer/portfolio/messages/unread-count");
        if (!cancelled) setUnreadCount(res.data.unreadCount);
      } catch {
        // portfolio might not exist yet — ignore
      }
    }

    fetchUnread();
    const interval = setInterval(fetchUnread, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      onClick={() => navigate("/dashboard/messages")}
      className="relative p-2 rounded-lg hover:bg-[#1C2230] transition-colors"
      aria-label="Messages"
    >
      <Bell size={18} className="text-[#9CA3AF]" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[#EF4444] text-white text-[10px] font-medium">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}