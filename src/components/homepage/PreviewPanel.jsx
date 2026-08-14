import { motion } from "framer-motion";

export default function PreviewPanel() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#232838] bg-[#12151C] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-[#232838] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F09595]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FAC775]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#9FE1CB]" />
        </div>
        <span className="ml-2 truncate rounded bg-[#0A0C10] px-3 py-1 font-mono text-xs text-[#8B93A6]">
          aditirao.portfolio.gen
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex min-h-[180px] flex-col justify-center gap-3 px-6 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2B84B] font-mono text-sm font-bold text-[#1A1305]">
            AR
          </div>
          <div>
            <p className="font-sans text-base font-semibold text-[#E8EAED]">Aditi Rao</p>
            <p className="font-mono text-xs text-[#8B93A6]">Backend Engineer</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {["Java", "Spring Boot", "React"].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#2E3444] px-3 py-1 font-mono text-[11px] text-[#9FE1CB]"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="pt-1 font-mono text-xs text-[#8B93A6]">6 projects &middot; live portfolio</p>
      </motion.div>
    </div>
  );
}