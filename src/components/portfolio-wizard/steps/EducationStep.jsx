/*import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveEducation } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptyEntry = { institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", grade: "" };

export default function EducationStep({ stepNumber, totalSteps }) {
  const completeStep = usePortfolioWizardStore((s) => s.completeStep);
  const [serverError, setServerError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", defaultValues: { entries: [emptyEntry] } });
  const { fields, append, remove } = useFieldArray({ control, name: "entries" });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      await saveEducation(data.entries);
      completeStep(1);
    } catch (err) {
      setServerError(err?.response?.data?.message || "Could not save. Try again.");
    }
  };

  return (
    <StepCard stepNumber={stepNumber} totalSteps={totalSteps} subtitle="academic background" title="Education">
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
            {serverError}
          </p>
        )}

        {fields.map((field, index) => (
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

            <FormField label="High Schooloing instituation Name" error={errors.entries?.[index]?.institution}>
              <input
                className={inputClass}
                placeholder="MIT"
                {...register(`entries.${index}.institution`, { required: "Required" })}
              />
            </FormField>

            <FormField label="degree" error={errors.entries?.[index]?.degree}>
              <input
                className={inputClass}
                placeholder="B.Tech"
                {...register(`entries.${index}.degree`, { required: "Required" })}
              />
            </FormField>

            <FormField label="field of study">
              <input className={inputClass} placeholder="Computer Science" {...register(`entries.${index}.fieldOfStudy`)} />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="start date">
                <input type="month" className={inputClass} {...register(`entries.${index}.startDate`)} />
              </FormField>
              <FormField label="end date">
                <input type="month" className={inputClass} {...register(`entries.${index}.endDate`)} />
              </FormField>
            </div>

            <FormField label="grade / gpa">
              <input className={inputClass} placeholder="8.9 CGPA" {...register(`entries.${index}.grade`)} />
            </FormField>
          </div>
        ))}

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
import { saveEducation } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptyEntry = {
  educationLevel: "",
  educationame: "",
  institution: "",
  grade: "",
  passingYear: "",
  ongoing: false,
};

const educationLevels = [
  "High School",
  "Secondary School",
  "Bachelor's",
  "Postgraduate",
  "Other",
];

export default function EducationStep({ stepNumber, totalSteps }) {
  const completeStep = usePortfolioWizardStore((s) => s.completeStep);

  const [serverError, setServerError] = useState("");
  const [savedEducations, setSavedEducations] = useState([]);
  const [isSavingEducation, setIsSavingEducation] = useState(false);
  const [showNewEducation, setShowNewEducation] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: emptyEntry,
  });

  const ongoing = watch("ongoing");

  // Save ONE education
  const onSubmitEducation = async (data) => {
    setServerError("");
    setIsSavingEducation(true);

    const payload = {
      educationLevel: data.educationLevel,
      educationame: data.educationame,
      institution: data.institution,
      grade: data.grade,

      // Ongoing = null
      // Completed = selected passing year
      passingYear: data.ongoing
        ? null
        : data.passingYear
          ? Number(data.passingYear)
          : null,

      ongoing: data.ongoing,
    };

    console.log("Saving education:", payload);

    try {
      const result = await saveEducation(payload);

      console.log("Education saved:", result);

      // Add saved education to the UI
      setSavedEducations((previous) => [
        ...previous,
        payload,
      ]);

      // Hide current form
      setShowNewEducation(false);

      // Clear old form
      reset(emptyEntry);

    } catch (err) {
      console.error("Education save error:", err);
      console.error("Response:", err?.response?.data);

      setServerError(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message ||
              "Could not save education. Try again."
      );
    } finally {
      setIsSavingEducation(false);
    }
  };

  // Create a new education form
  const handleAddNewEducation = () => {
    setServerError("");
    reset(emptyEntry);
    setShowNewEducation(true);
  };

  // Continue to next wizard section
  const handleNextSection = () => {
    if (savedEducations.length === 0) {
      setServerError("Please add at least one education.");
      return;
    }

    completeStep(1);
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      subtitle="add your academic background"
      title="Education"
    >
      <div>

        {/* Server Error */}
        {serverError && (
          <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
            {serverError}
          </p>
        )}

        {/* ===================================================== */}
        {/* SAVED EDUCATIONS */}
        {/* ===================================================== */}

        {savedEducations.length > 0 && (
          <div className="mb-6">

            <p className="mb-3 font-mono text-xs uppercase tracking-wide text-[#8B93A6]">
              saved education
            </p>

            {savedEducations.map((education, index) => (
              <div
                key={index}
                className="mb-3 rounded-md border border-[#232838] bg-[#0D1016] p-4"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="font-mono text-sm font-semibold text-[#E8EAED]">
                      {education.educationame}
                    </p>

                    <p className="mt-1 font-mono text-xs text-[#8B93A6]">
                      {education.educationLevel}
                    </p>

                    <p className="mt-1 font-mono text-xs text-[#8B93A6]">
                      {education.institution}
                    </p>

                    <p className="mt-1 font-mono text-xs text-[#8B93A6]">
                      Grade: {education.grade}
                    </p>

                    <p className="mt-1 font-mono text-xs text-[#8B93A6]">
                      {education.ongoing
                        ? "Currently ongoing"
                        : `Passing year: ${education.passingYear}`}
                    </p>
                  </div>

                  {/* Saved indicator */}
                  <span className="rounded-md border border-[#4ADE9D]/30 bg-[#4ADE9D]/10 px-2 py-1 font-mono text-[10px] uppercase text-[#4ADE9D]">
                    ✓ saved
                  </span>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================================================== */}
        {/* NEW EDUCATION FORM */}
        {/* ===================================================== */}

        {showNewEducation && (
          <form onSubmit={handleSubmit(onSubmitEducation)}>

            <div className="mb-5 rounded-md border border-[#232838] p-4">

              <div className="mb-4">
                <span className="font-mono text-xs uppercase tracking-wide text-[#8B93A6]">
                  {savedEducations.length === 0
                    ? "education 1"
                    : `education ${savedEducations.length + 1}`}
                </span>
              </div>

              {/* Education Level */}
              <FormField
                label="education level"
                error={errors.educationLevel}
              >
                <select
                  className={inputClass}
                  {...register("educationLevel", {
                    required: "Education level is required",
                  })}
                >
                  <option value="">Select education level</option>

                  {educationLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Education Name */}
              <FormField
                label="education name"
                error={errors.educationame}
              >
                <input
                  className={inputClass}
                  placeholder="B.Tech Computer Science"
                  {...register("educationame", {
                    required: "Education name is required",
                  })}
                />
              </FormField>

              {/* Institution */}
              <FormField
                label="institution"
                error={errors.institution}
              >
                <input
                  className={inputClass}
                  placeholder="ABC University"
                  {...register("institution", {
                    required: "Institution is required",
                  })}
                />
              </FormField>

              {/* Grade */}
              <FormField
                label="grade / gpa"
                error={errors.grade}
              >
                <input
                  className={inputClass}
                  placeholder="8.5 CGPA / 85%"
                  {...register("grade", {
                    required: "Grade / GPA is required",
                  })}
                />
              </FormField>

              {/* Ongoing */}
              <div className="mb-4 mt-4">
                <label className="flex cursor-pointer items-center gap-2 font-mono text-xs text-[#8B93A6]">

                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#F2B84B]"
                    {...register("ongoing")}
                  />

                  I am currently studying this course

                </label>
              </div>

              {/* Passing Year */}
              <FormField
                label="passing year"
                error={errors.passingYear}
              >
                <input
                  type="number"
                  min="1950"
                  max="2026"
                  disabled={ongoing}
                  placeholder={
                    ongoing
                      ? "Currently ongoing"
                      : "2026"
                  }
                  className={`${inputClass} ${
                    ongoing
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  {...register("passingYear", {
                    required: !ongoing
                      ? "Passing year is required when education is completed"
                      : false,
                  })}
                />
              </FormField>

              {ongoing && (
                <p className="mt-1 font-mono text-xs text-[#4ADE9D]">
                  Passing year is not required while education is ongoing.
                </p>
              )}

              {/* Save Education */}
              <button
                type="submit"
                disabled={isSavingEducation}
                className="mt-4 w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
              >
                {isSavingEducation
                  ? "saving…"
                  : "$ save education"}
              </button>

            </div>

          </form>
        )}

        {/* ===================================================== */}
        {/* AFTER SAVING */}
        {/* ===================================================== */}

        {!showNewEducation && (
          <div className="flex flex-col gap-3">

            {/* Add another education */}
            <button
              type="button"
              onClick={handleAddNewEducation}
              className="w-full rounded-md border border-[#4ADE9D]/40 px-4 py-2.5 font-mono text-sm font-semibold text-[#4ADE9D] transition hover:bg-[#4ADE9D]/10"
            >
              + add new education
            </button>

            {/* Next section */}
            <button
              type="button"
              onClick={handleNextSection}
              className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567]"
            >
              $ next section →
            </button>

          </div>
        )}

      </div>
    </StepCard>
  );
}


      