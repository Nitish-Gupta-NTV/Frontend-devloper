/*import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveExperience } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

//const emptyEntry = { company: "", role: "", startDate: "", endDate: "", current: false, description: "" };
const emptyEntry = { company: "", position: "", startdate: "", enddate: "", currentworking: false, description: "" };


export default function ExperienceStep({ stepNumber, totalSteps }) {
  const completeStep = usePortfolioWizardStore((s) => s.completeStep);
  const [serverError, setServerError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", defaultValues: { entries: [emptyEntry] } });
  const { fields, append, remove } = useFieldArray({ control, name: "entries" });

  const onSubmit = async (data) => {
    console.log("this is the payload "+data)
    setServerError("");
    try {
      await saveExperience(data.entries);
      completeStep(3);
    } catch (err) {
      setServerError(err?.response?.data?.message || "Could not save. Try again.");
    }
  };

  return (
    <StepCard stepNumber={stepNumber} totalSteps={totalSteps} subtitle="where you've worked" title="Experience">
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
            {serverError}
          </p>
        )}

        {fields.map((field, index) => {
          const isCurrent = watch(`entries.${index}.current`);
          return (
            <div key={field.id} className="mb-5 rounded-md border border-[#232838] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs text-[#8B93A6]">entry {index + 1}</span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="font-mono text-xs text-[#F09595] hover:text-[#F5B0B0]"
                  >
                    remove
                  </button>
                )}
              </div>

              <FormField label="company" error={errors.entries?.[index]?.company}>
                <input
                  className={inputClass}
                  placeholder="Company Name "
                  {...register(`entries.${index}.company`, { required: "Required" })}
                />
              </FormField>

              <FormField label="role" error={errors.entries?.[index]?.role}>
                <input
                  className={inputClass}
                  placeholder="Software Engineer"
                  {...register(`entries.${index}.role`, { required: "Required" })}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="start date">
                  <input type="month" className={inputClass} {...register(`entries.${index}.startDate`)} />
                </FormField>
                <FormField label="end date">
                  <input type="month" disabled={isCurrent} className={inputClass} {...register(`entries.${index}.endDate`)} />
                </FormField>
              </div>

              <label className="mb-4 flex items-center gap-2 font-mono text-xs text-[#8B93A6]">
                <input type="checkbox" {...register(`entries.${index}.current`)} />
                currently working here
              </label>

              <FormField label="description">
                <textarea
                  rows={3}
                  className={inputClass}
                  placeholder="What you did there"
                  {...register(`entries.${index}.description`)}
                />
              </FormField>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => append(emptyEntry)}
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
}*/



import { useState } from "react";
import { useForm } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveExperience } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptyEntry = {
  company: "",
  position: "",
  startdate: "",
  enddate: "",
  currentworking: false,
  description: "",
};

export default function ExperienceStep({ stepNumber, totalSteps }) {
  const completeStep = usePortfolioWizardStore((s) => s.completeStep);

  const [serverError, setServerError] = useState("");
  const [savedExperiences, setSavedExperiences] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: emptyEntry,
  });

  const isCurrent = watch("currentworking");

  const onSubmit = async (data) => {
    setServerError("");

    const payload = {
      company: data.company,
      position: data.position,
      startdate: data.startdate
        ? `${data.startdate}-01`
        : null,
      enddate: data.currentworking
        ? null
        : data.enddate
          ? `${data.enddate}-01`
          : null,
      currentworking: data.currentworking,
      description: data.description,
    };

    console.log("Sending experience:", payload);

    try {
      const response = await saveExperience(payload);

      console.log("Experience saved:", response.data);

      // Keep track of saved experiences
      setSavedExperiences((prev) => [...prev, payload]);

      // Hide current form
      setShowForm(false);

      // Clear form for next experience
      reset(emptyEntry);

    } catch (err) {
      console.error("Experience save error:", err);

      setServerError(
        err?.response?.data?.message ||
          "Could not save experience. Try again."
      );
    }
  };

  const handleAddAnother = () => {
    setServerError("");
    reset(emptyEntry);
    setShowForm(true);
  };

  const handleContinue = () => {
    // Only complete the step here
    completeStep(3);
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      subtitle="where you've worked"
      title="Experience"
    >
      {/* Saved Experiences */}
      {savedExperiences.length > 0 && (
        <div className="mb-6">

          <div className="mb-3 font-mono text-xs text-[#8B93A6]">
            saved experiences
          </div>

          {savedExperiences.map((experience, index) => (
            <div
              key={index}
              className="mb-3 rounded-md border border-[#232838] bg-[#11141D] p-4"
            >
              <div className="flex items-start justify-between">

                <div>
                  <h3 className="font-mono text-sm font-semibold text-white">
                    {experience.position}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-[#8B93A6]">
                    {experience.company}
                  </p>

                  <p className="mt-2 font-mono text-xs text-[#6B7280]">
                    {experience.startdate?.substring(0, 7)}
                    {" → "}
                    {experience.currentworking
                      ? "Present"
                      : experience.enddate?.substring(0, 7)}
                  </p>
                </div>

                <span className="rounded-md bg-[#4ADE9D]/10 px-2 py-1 font-mono text-[10px] text-[#4ADE9D]">
                  saved
                </span>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {serverError && (
        <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
          {serverError}
        </p>
      )}

      {/* Experience Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-5 rounded-md border border-[#232838] p-4">

            <div className="mb-4">
              <span className="font-mono text-xs text-[#8B93A6]">
                {savedExperiences.length === 0
                  ? "experience 1"
                  : `experience ${savedExperiences.length + 1}`}
              </span>
            </div>

            {/* Company */}
            <FormField
              label="company"
              error={errors.company}
            >
              <input
                className={inputClass}
                placeholder="Company Name"
                {...register("company", {
                  required: "Required",
                })}
              />
            </FormField>

            {/* Position */}
            <FormField
              label="position"
              error={errors.position}
            >
              <input
                className={inputClass}
                placeholder="Senior Software Engineer"
                {...register("position", {
                  required: "Required",
                })}
              />
            </FormField>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">

              <FormField label="start date">
                <input
                  type="month"
                  className={inputClass}
                  {...register("startdate", {
                    required: "Required",
                  })}
                />
              </FormField>

              <FormField label="end date">
                <input
                  type="month"
                  disabled={isCurrent}
                  className={inputClass}
                  {...register("enddate")}
                />
              </FormField>

            </div>

            {/* Current working */}
            <label className="mb-4 flex items-center gap-2 font-mono text-xs text-[#8B93A6]">
              <input
                type="checkbox"
                {...register("currentworking")}
              />
              currently working here
            </label>

            {/* Description */}
            <FormField label="description">
              <textarea
                rows={3}
                className={inputClass}
                placeholder="What you did there"
                {...register("description")}
              />
            </FormField>

          </div>

          {/* Save Experience */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
          >
            {isSubmitting
              ? "saving…"
              : "$ save experience"}
          </button>

        </form>
      )}

      {/* After at least one experience is saved */}
      {savedExperiences.length > 0 && !showForm && (
        <div className="mt-5">

          <div className="mb-4 text-center font-mono text-xs text-[#8B93A6]">
            Experience saved successfully.
          </div>

          <div className="grid grid-cols-2 gap-3">

            {/* Add Another */}
            <button
              type="button"
              onClick={handleAddAnother}
              className="rounded-md border border-[#4ADE9D] px-4 py-2.5 font-mono text-sm font-semibold text-[#4ADE9D] transition hover:bg-[#4ADE9D]/10"
            >
              + add another
            </button>

            {/* Continue */}
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567]"
            >
              continue →
            </button>

          </div>

        </div>
      )}
    </StepCard>
  );
}