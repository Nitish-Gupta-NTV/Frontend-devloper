import { motion } from "framer-motion";
import CodePanel from "./CodePanel";
import PreviewPanel from "./PreviewPanel";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#F2B84B]">
          for developers, by developers
        </p>
        <h1 className="font-mono text-3xl font-bold leading-tight text-[#E8EAED] sm:text-4xl md:text-5xl">
          Your code speaks for itself.
          <br />
          Now your portfolio can too.
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-sans text-base text-[#8B93A6]">
          Structure your projects, skills, and experience once. Get a polished,
          themed portfolio site — generated and deployed in minutes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/signup"
            className="rounded-md bg-[#F2B84B] px-6 py-3 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567]"
          >
            Get started &rarr;
          </a>
          <a
            href="/demo"
            className="rounded-md border border-[#2E3444] px-6 py-3 font-mono text-sm font-semibold text-[#E8EAED] transition hover:border-[#4ADE9D] hover:text-[#4ADE9D]"
          >
            View live demo
          </a>
          <a
            href="/login"
            className="px-4 py-3 font-mono text-sm text-[#8B93A6] transition hover:text-[#E8EAED]"
          >
            Sign in
          </a>
        </div>
      </motion.div>

      <div className="relative mx-auto mt-16 grid max-w-4xl grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        <CodePanel />
        <div className="flex justify-center">
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-2xl text-[#4ADE9D]"
          >
            &rarr;
          </motion.span>
        </div>
        <PreviewPanel />
      </div>
    </section>
  );
}