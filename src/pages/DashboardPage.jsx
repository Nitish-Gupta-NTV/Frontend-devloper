import { Link, useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { useAuthStore } from "../context/authStore";

import { usePortfolioWizardStore, STEP_LABELS } from "../store/portfolioWizardStore";

const QUICK_LINKS = [
  { label: "Basic info", stepIndex: 0 },
  { label: "Education", stepIndex: 1 },
  { label: "Skills", stepIndex: 2 },
  { label: "Experience", stepIndex: 3 },
  { label: "Projects", stepIndex: 4 },
  { label: "Certifications", stepIndex: 5 },
  {label:"socialmedia",stepIndex:6},
  {label:"Review",stepIndex:7}
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const completedSteps = usePortfolioWizardStore((s) => s.completedSteps);
  const goToStep = usePortfolioWizardStore((s) => s.goToStep);

  const isComplete = completedSteps.length >= STEP_LABELS.length - 1; // all steps except review
  const hasStarted = completedSteps.length > 0;

  const goToWizardStep = (index) => {
    goToStep(index);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] font-sans">
      <DashboardNavbar />
      

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-mono text-2xl font-bold text-[#E8EAED]">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-1 font-sans text-sm text-[#8B93A6]">Manage your portfolio from here.</p>

        {/* Primary status card */}
        <div className="mt-8 rounded-lg border border-[#232838] bg-[#12151C] p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#F2B84B]">
                {isComplete ? "ready to generate" : hasStarted ? "in progress" : "not started"}
              </p>
              <h2 className="mt-1 font-mono text-lg font-semibold text-[#E8EAED]">
                {isComplete
                  ? "Your details are all set"
                  : hasStarted
                  ? "Pick up where you left off"
                  : "Build your portfolio"}
              </h2>
              <p className="mt-1 font-sans text-sm text-[#8B93A6]">
                {isComplete
                  ? "Head to review to generate your live portfolio link."
                  : "Walk through a few short steps: basic info, education, skills, experience, and projects."}
              </p>
            </div>

            <Link
              to="/onboarding"
              className="whitespace-nowrap rounded-md bg-[#F2B84B] px-5 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567]"
            >
              {isComplete ? "$ review & generate" : hasStarted ? "$ continue" : "$ get started"}
            </Link>
          </div>
        </div>

        {/* Quick links to individual sections */}
        <div className="mt-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#8B93A6]">Quick edit</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {QUICK_LINKS.map((link) => {
              const isDone = completedSteps.includes(link.stepIndex);
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => goToWizardStep(link.stepIndex)}
                  className="flex items-center justify-between rounded-md border border-[#232838] bg-[#12151C] px-4 py-3 text-left transition hover:border-[#4ADE9D]"
                >
                  <span className="font-mono text-sm text-[#E8EAED]">{link.label}</span>
                  <span className={`font-mono text-xs ${isDone ? "text-[#4ADE9D]" : "text-[#3A4152]"}`}>
                    {isDone ? "✓" : "—"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}