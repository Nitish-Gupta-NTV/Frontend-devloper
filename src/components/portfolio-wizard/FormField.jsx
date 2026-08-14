export const inputClass =
  "w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D] disabled:opacity-40";

export default function FormField({ label, error, children }) {
  return (
    <label className="mb-4 block">
      {label && <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">{label}</span>}
      {children}
      {error && <span className="mt-1 block font-mono text-xs text-[#F09595]">{error.message}</span>}
    </label>
  );
}