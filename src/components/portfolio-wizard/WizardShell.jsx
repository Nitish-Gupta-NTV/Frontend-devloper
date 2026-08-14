import { usePortfolioWizardStore, STEP_LABELS } from "../../store/portfolioWizardStore";
import BasicInfoStep from "./steps/BasicInfoStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import ExperienceStep from "./steps/ExperienceStep";
import ProjectsStep from "./steps/ProjectsStep";
import CertificationsStep from "./steps/CertificationsStep";
import ReviewStep from "./steps/ReviewStep";
import socialmedia from "./steps/socialmedia";

const STEP_COMPONENTS = [
  BasicInfoStep,
  EducationStep,
  SkillsStep,
  ExperienceStep,
  ProjectsStep,
  CertificationsStep,
  socialmedia,
  ReviewStep,
];

export default function WizardShell() {
  const currentStep = usePortfolioWizardStore((s) => s.currentStep);
  const completedSteps = usePortfolioWizardStore((s) => s.completedSteps);
  const goToStep = usePortfolioWizardStore((s) => s.goToStep);
  const goBack = usePortfolioWizardStore((s) => s.goBack);

  const StepComponent = STEP_COMPONENTS[currentStep];
  const furthestUnlocked = completedSteps.length ? Math.max(...completedSteps) + 1 : 0;

  return (
    <div className="min-h-screen bg-[#0A0C10] px-6 py-12 font-sans">
      <div className="mx-auto mb-10 flex max-w-xl flex-wrap items-center justify-center gap-1 font-mono text-[11px]">
        {STEP_LABELS.map((label, idx) => {
          const isDone = completedSteps.includes(idx);
          const isCurrent = idx === currentStep;
          const isClickable = isDone || idx <= furthestUnlocked;

          return (
            <button
              key={label}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && goToStep(idx)}
              className={`rounded px-2 py-1 transition ${
                isCurrent
                  ? "bg-[#F2B84B] font-semibold text-[#1A1305]"
                  : isDone
                  ? "text-[#4ADE9D]"
                  : "text-[#3A4152]"
              } ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              {String(idx + 1).padStart(2, "0")}.{label}
            </button>
          );
        })}
      </div>

      <StepComponent stepNumber={currentStep + 1} totalSteps={STEP_LABELS.length} />

      {currentStep > 0 && (
        <div className="mx-auto mt-4 max-w-xl">
          <button
            type="button"
            onClick={goBack}
            className="font-mono text-xs text-[#8B93A6] transition hover:text-[#E8EAED]"
          >
            &larr; back
          </button>
        </div>
      )}
    </div>
  );
}