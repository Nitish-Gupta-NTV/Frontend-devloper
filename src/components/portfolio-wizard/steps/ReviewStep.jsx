import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepCard from "../StepCard";
import { generatePortfolio } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

export default function ReviewStep({ stepNumber, totalSteps }) {
  const navigate = useNavigate();
  const reset = usePortfolioWizardStore((s) => s.reset);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setIsGenerating(true);
    try {
      const portfolio = await generatePortfolio();
      reset();
      // Adjust this route to wherever you render the generated portfolio.
      navigate("/portfolio", { state: { portfolio } });
    } catch (err) {
      setError(err?.response?.data?.message || "Could not generate portfolio. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <StepCard stepNumber={stepNumber} totalSteps={totalSteps} subtitle="all set" title="Review & generate">
      <p className="mb-6 font-mono text-sm text-[#8B93A6]">
        Everything's saved. Hit generate to build your portfolio from what you've entered.
      </p>

      {error && (
        <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
      >
        {isGenerating ? "generating…" : "$ generate --deploy"}
      </button>
    </StepCard>
  );
}