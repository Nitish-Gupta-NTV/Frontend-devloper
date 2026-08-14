import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Clock } from "lucide-react";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure

const POLL_INTERVAL_MS = 5000;

function timeAgo(dateStr) {
  if (!dateStr) return "No views yet";
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AnalyticsWidget() {
  const [data, setData] = useState(null);
  const prevCount = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAnalytics() {
      try {
        const res = await axiosClient.get("/api/responces/analytics");
        if (!cancelled) {
          prevCount.current = data?.viewCount ?? null;
          setData(res.data);
        }
      } catch {
        // portfolio might not exist yet — fail silently, widget just stays empty
      }
    }

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return null;

  const justIncreased = prevCount.current !== null && data.viewCount > prevCount.current;

  return (
    <div className="rounded-xl border border-[#1C2230] bg-[#0E121B] p-5 flex items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center">
          <Eye size={18} className="text-[#4F46E5]" />
        </div>
        <div>
          <p className="text-xs text-[#6B7280] uppercase tracking-wide">Portfolio views</p>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={data.viewCount}
              initial={justIncreased ? { opacity: 0, y: -8 } : false}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold text-[#E7E9EE] tabular-nums"
            >
              {data.viewCount}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-px h-10 bg-[#1C2230]" />

      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
        <Clock size={14} />
        {timeAgo(data.lastViewedAt)}
      </div>

      {/* subtle live indicator */}
      <span className="ml-auto flex items-center gap-1.5 text-xs text-[#4ADE80]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        Live
      </span>
    </div>
  );
}