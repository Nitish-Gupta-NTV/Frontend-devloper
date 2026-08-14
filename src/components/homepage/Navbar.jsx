// Swap the <a> tags for <Link to="..."> from react-router-dom once wired into your router.
export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#232838] bg-[#0A0C10]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 font-mono text-sm font-semibold text-[#E8EAED]">
          <span className="text-[#F2B84B]">&gt;</span>
          portfolio<span className="text-[#4ADE9D]">.gen</span>
        </a>
        <nav className="hidden items-center gap-8 font-mono text-sm text-[#8B93A6] md:flex">
          <a href="#themes" className="transition hover:text-[#E8EAED]">themes</a>
          <a href="#how-it-works" className="transition hover:text-[#E8EAED]">how it works</a>
          <a href="/login" className="transition hover:text-[#E8EAED]">sign in</a>
        </nav>
        <a
          href="/signup"
          className="rounded-md bg-[#F2B84B] px-4 py-2 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567]"
        >
          Get started
        </a>
      </div>
    </header>
  );
}