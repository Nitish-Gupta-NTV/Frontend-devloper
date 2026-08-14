export default function Footer() {
  return (
    <footer className="border-t border-[#232838] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs text-[#8B93A6] sm:flex-row">
        <span>&gt; portfolio.gen — built by developers, for developers</span>
        <div className="flex gap-6">
          <a href="/login" className="transition hover:text-[#E8EAED]">sign in</a>
          <a href="/signup" className="transition hover:text-[#E8EAED]">get started</a>
        </div>
      </div>
    </footer>
  );
}