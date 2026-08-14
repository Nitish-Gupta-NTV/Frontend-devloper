import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveSkills } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptySkill = { name: "", proficiency: "Intermediate" };
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function SkillsStep({ stepNumber, totalSteps }) {
  const completeStep = usePortfolioWizardStore((s) => s.completeStep);
  const [serverError, setServerError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", defaultValues: { skills: [emptySkill] } });
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const onSubmit = async (data) => {
  setServerError("");

  try {
    await saveSkills({
      skills: data.skills.map((skill) => ({
        skills: skill.name,
      })),
    });

    completeStep(2);
  } catch (err) {
    setServerError(
      err?.response?.data?.message || "Could not save. Try again."
    );
  }
};

  return (
    <StepCard stepNumber={stepNumber} totalSteps={totalSteps} subtitle="what you're good at" title="Skills">
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
            {serverError}
          </p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="mb-3 flex items-end gap-2">
            <div className="flex-1">
              <FormField label={index === 0 ? "skill" : undefined} error={errors.skills?.[index]?.name}>
                <input
                  className={inputClass}
                  placeholder="React"
                  {...register(`skills.${index}.name`, { required: "Required" })}
                />
              </FormField>
            </div>
            <div className="w-36">
              <FormField label={index === 0 ? "level" : undefined}>
                <select className={inputClass} {...register(`skills.${index}.proficiency`)}>
                  {LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="mb-4 font-mono text-xs text-[#F09595] hover:text-[#F5B0B0]"
              >
                &times;
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append(emptySkill)}
          className="mb-6 font-mono text-xs text-[#4ADE9D] hover:text-[#6EF0B6]"
        >
          + add another
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
        >
          {isSubmitting ? "saving…" : "$ save & continue"}
        </button>
      </form>
    </StepCard>
  );
}