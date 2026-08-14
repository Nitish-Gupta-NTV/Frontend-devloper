export default function StepCard({ stepNumber, totalSteps, title, subtitle, children }) {
  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-[#232838] bg-[#12151C] shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-[#232838] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F09595]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FAC775]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#9FE1CB]" />
        <span className="ml-2 font-mono text-xs text-[#8B93A6]">
          step {String(stepNumber).padStart(2, "0")}/{String(totalSteps).padStart(2, "0")} — {title.toLowerCase()}
        </span>
      </div>
      <div className="px-6 py-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-[#F2B84B]">{subtitle}</p>
        <h1 className="mb-6 font-mono text-xl font-bold text-[#E8EAED]">{title}</h1>
        {children}
      </div>
    </div>
  );
}