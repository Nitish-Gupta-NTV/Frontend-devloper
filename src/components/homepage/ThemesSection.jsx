import { motion } from "framer-motion";
//import { THEMES } from "../../data/homeContent";
import { THEMES } from "../../page/data/homeContent"

export default function ThemesSection() {
  return (
    <section id="themes" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-mono text-2xl font-bold text-[#E8EAED]">Three themes, one flag away</h2>
        <p className="mt-2 font-sans text-sm text-[#8B93A6]">Switch anytime — your content stays the same.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {THEMES.map((theme, idx) => (
          <motion.div
            key={theme.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="overflow-hidden rounded-lg border border-[#232838] bg-[#12151C]"
          >
            <div className="flex h-28 flex-col justify-end p-4" style={{ background: theme.bg }}>
              <div className="h-2 w-16 rounded-full" style={{ backgroundColor: theme.accent }} />
              <div
                className="mt-2 h-2 w-24 rounded-full opacity-60"
                style={{ backgroundColor: theme.text }}
              />
            </div>
            <div className="p-4">
              <p className="font-mono text-sm font-semibold text-[#E8EAED]">{theme.name}</p>
              <p className="mt-1 font-sans text-xs text-[#8B93A6]">{theme.desc}</p>
              <a
                href={`/demo?theme=${theme.slug}`}
                className="mt-3 inline-block font-mono text-xs text-[#4ADE9D] transition hover:text-[#6EF0B6]"
              >
                Preview &rarr;
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}