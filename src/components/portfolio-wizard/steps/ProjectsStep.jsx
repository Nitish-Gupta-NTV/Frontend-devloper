/*import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveProjects } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptyEntry = { title: "", description: "", techStack: "", repoUrl: "", liveUrl: "" };

export default function ProjectsStep({ stepNumber, totalSteps }) {
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
      // techStack is typed comma-separated in the UI; split into an array for the backend.
      const payload = data.entries.map((entry) => ({
        ...entry,
        techStack: entry.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }));
      await saveProjects(payload);
      completeStep(4);
    } catch (err) {
      setServerError(err?.response?.data?.message || "Could not save. Try again.");
    }
  };

  return (
    <StepCard stepNumber={stepNumber} totalSteps={totalSteps} subtitle="what you've built" title="Projects">
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
            {serverError}
          </p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="mb-5 rounded-md border border-[#232838] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-[#8B93A6]">project {index + 1}</span>
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

            <FormField label="title" error={errors.entries?.[index]?.title}>
              <input
                className={inputClass}
                placeholder="Portfolio Generator"
                {...register(`entries.${index}.title`, { required: "Required" })}
              />
            </FormField>

            <FormField label="description">
              <textarea
                rows={3}
                className={inputClass}
                placeholder="What it does, your role"
                {...register(`entries.${index}.description`)}
              />
            </FormField>

            <FormField label="tech stack (comma separated)">
              <input
                className={inputClass}
                placeholder="React, Spring Boot, MySQL"
                {...register(`entries.${index}.techStack`)}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="repo url">
                <input className={inputClass} placeholder="https://github.com/..." {...register(`entries.${index}.repoUrl`)} />
              </FormField>
              <FormField label="live url">
                <input className={inputClass} placeholder="https://..." {...register(`entries.${index}.liveUrl`)} />
              </FormField>
            </div>
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
import { saveProjects } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptyProject = {
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  featured: false,
};

export default function ProjectsStep({ stepNumber, totalSteps }) {
  const completeStep = usePortfolioWizardStore((s) => s.completeStep);

  const [serverError, setServerError] = useState("");
  const [savedProjects, setSavedProjects] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: emptyProject,
  });

  const onSubmit = async (data) => {
    setServerError("");

    // Convert comma-separated tech stack into skills array
    const skills = data.techStack
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .map((skill) => ({
        skillsname: skill,
        levels: "Intermediate",
      }));

    const payload = {
      title: data.title,
      description: data.description,
      github_url: data.githubUrl || null,
      live_url: data.liveUrl || null,
      image_url: data.imageUrl || null,
      featured: data.featured,
      skills: skills,
    };

    console.log("Project payload:", payload);

    try {
      const response = await saveProjects(payload);

      console.log("Project saved:", response.data);

      // Add project to local saved list
      setSavedProjects((prev) => [...prev, payload]);

      // Hide form after successful save
      setShowForm(false);

      // Clear form for next project
      reset(emptyProject);

    } catch (err) {
      console.error("Project save error:", err);

      setServerError(
        err?.response?.data?.message ||
          "Could not save project. Try again."
      );
    }
  };

  const handleAddAnother = () => {
    setServerError("");
    reset(emptyProject);
    setShowForm(true);
  };

  const handleContinue = () => {
    // Only move to next step when user explicitly clicks Continue
    completeStep(4);
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      subtitle="things you've built"
      title="Projects"
    >
      {/* Error */}
      {serverError && (
        <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
          {serverError}
        </p>
      )}

      {/* ================= SAVED PROJECTS ================= */}
      {savedProjects.length > 0 && (
        <div className="mb-6">

          <div className="mb-3 font-mono text-xs text-[#8B93A6]">
            saved projects
          </div>

          {savedProjects.map((project, index) => (
            <div
              key={index}
              className="mb-3 rounded-md border border-[#232838] bg-[#11141D] p-4"
            >
              <div className="flex items-start justify-between">

                <div>
                  <h3 className="font-mono text-sm font-semibold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-[#8B93A6]">
                    {project.description}
                  </p>

                  {project.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="rounded-md bg-[#4ADE9D]/10 px-2 py-1 font-mono text-[10px] text-[#4ADE9D]"
                        >
                          {skill.skillsname}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <span className="rounded-md bg-[#4ADE9D]/10 px-2 py-1 font-mono text-[10px] text-[#4ADE9D]">
                  saved
                </span>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= PROJECT FORM ================= */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-5 rounded-md border border-[#232838] p-4">

            <div className="mb-4">
              <span className="font-mono text-xs text-[#8B93A6]">
                {savedProjects.length === 0
                  ? "project 1"
                  : `project ${savedProjects.length + 1}`}
              </span>
            </div>

            {/* Title */}
            <FormField
              label="title"
              error={errors.title}
            >
              <input
                className={inputClass}
                placeholder="Portfolio Generator"
                {...register("title", {
                  required: "Required",
                })}
              />
            </FormField>

            {/* Description */}
            <FormField label="description">
              <textarea
                rows={3}
                className={inputClass}
                placeholder="What it does, your role"
                {...register("description")}
              />
            </FormField>

            {/* Tech Stack */}
            <FormField label="tech stack (comma separated)">
              <input
                className={inputClass}
                placeholder="React, Spring Boot, MySQL"
                {...register("techStack")}
              />
            </FormField>

            {/* GitHub + Live URL */}
            <div className="grid grid-cols-2 gap-3">

              <FormField label="github url">
                <input
                  className={inputClass}
                  placeholder="https://github.com/..."
                  {...register("githubUrl")}
                />
              </FormField>

              <FormField label="live url">
                <input
                  className={inputClass}
                  placeholder="https://..."
                  {...register("liveUrl")}
                />
              </FormField>

            </div>

            {/* Image URL */}
            <FormField label="image url">
              <input
                className={inputClass}
                placeholder="https://mycdn.com/project-image.png"
                {...register("imageUrl")}
              />
            </FormField>

            {/* Featured */}
            <label className="mb-4 flex items-center gap-2 font-mono text-xs text-[#8B93A6]">
              <input
                type="checkbox"
                {...register("featured")}
              />
              featured project
            </label>

          </div>

          {/* Save Project */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
          >
            {isSubmitting
              ? "saving…"
              : "$ save project"}
          </button>

        </form>
      )}

      {/* ================= AFTER SAVE ================= */}
      {savedProjects.length > 0 && !showForm && (
        <div className="mt-5">

          <div className="mb-4 text-center font-mono text-xs text-[#8B93A6]">
            Project saved successfully.
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