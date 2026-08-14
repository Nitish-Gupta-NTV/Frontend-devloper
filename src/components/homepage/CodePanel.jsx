import useTypewriter from "../../hooks/useTypewriter";
import { PROFILE_JSON } from "../../page/data/homeContent";
//import useTypewriter from "../hooks/useypewriter";
//import { PROFILE_JSON } from "../page/data/homeContent";
export default function CodePanel() {
  const typed = useTypewriter(PROFILE_JSON);
  const lines = typed.split("\n");

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#232838] bg-[#12151C] shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-[#232838] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F09595]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FAC775]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#9FE1CB]" />
        <span className="ml-2 font-mono text-xs text-[#8B93A6]">profile.json</span>
      </div>
      <pre className="min-h-[180px] px-4 py-4 font-mono text-[13px] leading-6 text-[#9FE1CB]">
        {lines.map((line, idx) => (
          <div key={idx}>
            <span className="mr-3 select-none text-[#3A4152]">{idx + 1}</span>
            <span className="text-[#E8EAED]">{line}</span>
          </div>
        ))}
        <span className="ml-6 inline-block h-4 w-2 animate-pulse bg-[#F2B84B] align-middle" />
      </pre>
    </div>
  );
}