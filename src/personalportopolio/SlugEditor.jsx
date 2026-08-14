import { useEffect, useRef, useState } from "react";
import { Check, X, Loader2, Link2 } from "lucide-react";
import axiosClient from "../api/axiosClient"; // adjust path to match your project structure

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export default function SlugEditor({ currentSlug, onSaved }) {
  const [value, setValue] = useState(currentSlug || "");
  const [status, setStatus] = useState("idle"); // idle | checking | available | taken | invalid | same
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    clearTimeout(debounceRef.current);

    if (value === currentSlug) {
      setStatus("same");
      return;
    }
    if (value.length < 3) {
      setStatus(value.length === 0 ? "idle" : "invalid");
      return;
    }
    if (!SLUG_PATTERN.test(value)) {
      setStatus("invalid");
      return;
    }

    setStatus("checking");
    debounceRef.current = setTimeout(async () => {
      try {
        
        //const res = await axiosClient.post("/api/developer/portfolio/slug/check", { params: { slug: value } });
        const res = await axiosClient.post(
  "/api/developer/portfolio/slug/check",
  { slug: value }
);
console.log("STATUS:", res.status);
console.log("DATA:", res.data);
        setStatus(res.data.available ? "available" : "taken");
      } catch {
        setStatus("invalid");
      }
    }, 400); // debounce so we're not hitting the API on every keystroke

    return () => clearTimeout(debounceRef.current);
  }, [value, currentSlug]);

  async function handleSave() {
    if (status !== "available") return;
    setSaving(true);
    try {
      await axiosClient.post("/api/developer/portfolio/slug",
  { slug: value });
      onSaved?.(value);
      setStatus("same");
    } catch (err) {
      setStatus(err.response?.status === 409 ? "taken" : "invalid");
    } finally {
      setSaving(false);
    }
  }

  const messages = {
    idle: null,
    checking: { text: "Checking availability...", color: "text-[#6B7280]" },
    available: { text: "Available", color: "text-[#4ADE80]" },
    taken: { text: "Already taken", color: "text-[#F87171]" },
    invalid: { text: "3-40 chars, lowercase letters/numbers/hyphens only", color: "text-[#F87171]" },
    same: { text: "This is your current URL", color: "text-[#6B7280]" },
  };
  const msg = messages[status];

  return (
    <div className="rounded-xl border border-[#1C2230] bg-[#0E121B] p-5">
      <label className="flex items-center gap-1.5 text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">
        <Link2 size={13} />
        Portfolio URL
      </label>

      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center rounded-lg border border-[#242A38] bg-[#0A0C10] px-3 focus-within:border-[#4F46E5] transition-colors">
          <span className="text-sm text-[#4B5563] font-mono shrink-0">yourapp.com/p/</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value.toLowerCase())}
            placeholder="your-custom-slug"
            className="flex-1 bg-transparent py-2.5 text-sm font-mono text-[#E7E9EE] outline-none min-w-0"
          />
          {status === "checking" && <Loader2 size={15} className="animate-spin text-[#6B7280] shrink-0" />}
          {status === "available" && <Check size={15} className="text-[#4ADE80] shrink-0" />}
          {(status === "taken" || status === "invalid") && <X size={15} className="text-[#F87171] shrink-0" />}
        </div>

        <button
          onClick={handleSave}
          disabled={status !== "available" || saving}
          className="px-4 py-2.5 rounded-lg text-sm font-medium bg-[#4F46E5] text-white hover:bg-[#4338CA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {msg && <p className={`text-xs mt-2 ${msg.color}`}>{msg.text}</p>}
    </div>
  );
}