export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E8EAED] px-6 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 font-mono text-sm text-[#4ADE9D]">
            $ cat about.md
          </p>

          <h1 className="font-mono text-4xl font-bold md:text-5xl">
            About Developer Portfolio Generator
          </h1>

          <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-[#8B93A6]">
            Create a professional developer portfolio without spending hours
            designing and coding everything from scratch.
          </p>
        </div>

        {/* About */}
        <div className="grid gap-8 md:grid-cols-2">

          <div className="rounded-lg border border-[#2E3444] bg-[#0F1218] p-6">
            <p className="mb-4 font-mono text-sm text-[#F2B84B]">
              // what we do
            </p>

            <h2 className="mb-4 font-mono text-2xl font-bold">
              Build your portfolio faster
            </h2>

            <p className="font-mono text-sm leading-7 text-[#8B93A6]">
              Developer Portfolio Generator allows developers to create,
              customize and manage their professional portfolio from one
              platform.
            </p>
          </div>

          <div className="rounded-lg border border-[#2E3444] bg-[#0F1218] p-6">
            <p className="mb-4 font-mono text-sm text-[#F2B84B]">
              // why use it
            </p>

            <h2 className="mb-4 font-mono text-2xl font-bold">
              Simple. Fast. Developer focused.
            </h2>

            <p className="font-mono text-sm leading-7 text-[#8B93A6]">
              Add your skills, projects, experience and social links, select
              a portfolio theme and generate a professional developer
              portfolio.
            </p>
          </div>

        </div>

        {/* Features */}
        <div className="mt-12">
          <p className="mb-6 font-mono text-sm text-[#4ADE9D]">
            // features
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-lg border border-[#2E3444] p-5">
              <h3 className="font-mono font-bold">01. Profile</h3>
              <p className="mt-2 font-mono text-xs leading-6 text-[#8B93A6]">
                Create and manage your developer profile.
              </p>
            </div>

            <div className="rounded-lg border border-[#2E3444] p-5">
              <h3 className="font-mono font-bold">02. Projects</h3>
              <p className="mt-2 font-mono text-xs leading-6 text-[#8B93A6]">
                Showcase your best projects and technologies.
              </p>
            </div>

            <div className="rounded-lg border border-[#2E3444] p-5">
              <h3 className="font-mono font-bold">03. Themes</h3>
              <p className="mt-2 font-mono text-xs leading-6 text-[#8B93A6]">
                Choose a professional portfolio design.
              </p>
            </div>

            <div className="rounded-lg border border-[#2E3444] p-5">
              <h3 className="font-mono font-bold">04. Share</h3>
              <p className="mt-2 font-mono text-xs leading-6 text-[#8B93A6]">
                Publish and share your portfolio with recruiters.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}