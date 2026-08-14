import { motion } from "framer-motion";
//import { STEPS } from "../../data/homeContent";
import { STEPS } from "../../page/data/homeContent"

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-mono text-2xl font-bold text-[#E8EAED]">How it works</h2>
      </div>
      <div className="space-y-4">
        {STEPS.map((step, idx) => (
          <motion.div
            key={step.cmd}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex items-start gap-4 rounded-lg border border-[#232838] bg-[#12151C] p-5"
          >
            <span className="mt-0.5 font-mono text-xs text-[#3A4152]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-mono text-sm font-semibold text-[#F2B84B]">{step.cmd}</p>
              <p className="mt-1 font-sans text-sm text-[#8B93A6]">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}