/*import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveCertifications } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptyEntry = { name: "", issuingOrganization: "", issueDate: "", credentialUrl: "" };

export default function CertificationsStep({ stepNumber, totalSteps }) {
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
      await saveCertifications(data.entries);
      completeStep(5);
    } catch (err) {
      setServerError(err?.response?.data?.message || "Could not save. Try again.");
    }
  };

  const skip = () => completeStep(5);

  return (
    <StepCard stepNumber={stepNumber} totalSteps={totalSteps} subtitle="optional, but adds credibility" title="Certifications">
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
            {serverError}
          </p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="mb-5 rounded-md border border-[#232838] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-[#8B93A6]">cert {index + 1}</span>
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

            <FormField label="name" error={errors.entries?.[index]?.name}>
              <input
                className={inputClass}
                placeholder="AWS Certified Developer"
                {...register(`entries.${index}.name`, { required: "Required" })}
              />
            </FormField>

            <FormField label="issuing organization">
              <input
                className={inputClass}
                placeholder="Amazon Web Services"
                {...register(`entries.${index}.issuingOrganization`)}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="issue date">
                <input type="month" className={inputClass} {...register(`entries.${index}.issueDate`)} />
              </FormField>
              <FormField label="credential url">
                <input className={inputClass} placeholder="https://..." {...register(`entries.${index}.credentialUrl`)} />
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

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
          >
            {isSubmitting ? "saving…" : "$ save & continue"}
          </button>
          <button
            type="button"
            onClick={skip}
            className="rounded-md border border-[#2E3444] px-4 py-2.5 font-mono text-sm text-[#8B93A6] transition hover:text-[#E8EAED]"
          >
            skip
          </button>
        </div>
      </form>
    </StepCard>
  );
}*/


import { useState } from "react";
import { useForm } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveCertifications } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptyCertification = {
  title: "",
  descscribe: "",
  issuer: "",
  issued_date: "",
};

export default function CertificationsStep({
  stepNumber,
  totalSteps,
}) {
  const completeStep = usePortfolioWizardStore(
    (s) => s.completeStep
  );

  const [serverError, setServerError] = useState("");
  const [savedCertifications, setSavedCertifications] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: emptyCertification,
  });

  const onSubmit = async (data) => {
    setServerError("");

    const payload = {
      title: data.title,
      descscribe: data.descscribe,
      issuer: data.issuer,
      issued_date: data.issued_date
        ? `${data.issued_date}-01`
        : null,
    };

    console.log(
      "Certification payload:",
      payload
    );

    try {
      const response = await saveCertifications(payload);

      console.log(
        "Certification saved:",
        response.data
      );

      // Store locally so we can display saved certifications
      setSavedCertifications((prev) => [
        ...prev,
        payload,
      ]);

      // Hide form after successful save
      setShowForm(false);

      // Clear form for next certification
      reset(emptyCertification);

    } catch (err) {
      console.error(
        "Certification save error:",
        err
      );

      setServerError(
        err?.response?.data?.message ||
          "Could not save certification. Try again."
      );
    }
  };

  const handleAddAnother = () => {
    setServerError("");
    reset(emptyCertification);
    setShowForm(true);
  };

  const handleContinue = () => {
    completeStep(5);
  };

  const skip = () => {
    completeStep(5);
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      subtitle="your certifications"
      title="Certifications"
    >
      {/* ================= ERROR ================= */}

      {serverError && (
        <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
          {serverError}
        </p>
      )}

      {/* ================= SAVED CERTIFICATIONS ================= */}

      {savedCertifications.length > 0 && (
        <div className="mb-6">

          <div className="mb-3 font-mono text-xs text-[#8B93A6]">
            saved certifications
          </div>

          {savedCertifications.map(
            (certification, index) => (
              <div
                key={index}
                className="mb-3 rounded-md border border-[#232838] bg-[#11141D] p-4"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <h3 className="font-mono text-sm font-semibold text-white">
                      {certification.title}
                    </h3>

                    <p className="mt-1 font-mono text-xs text-[#8B93A6]">
                      {certification.issuer}
                    </p>

                    {certification.issued_date && (
                      <p className="mt-2 font-mono text-xs text-[#6B7280]">
                        Issued:{" "}
                        {certification.issued_date.substring(
                          0,
                          7
                        )}
                      </p>
                    )}
                  </div>

                  <span className="rounded-md bg-[#4ADE9D]/10 px-2 py-1 font-mono text-[10px] text-[#4ADE9D]">
                    saved
                  </span>

                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ================= CERTIFICATION FORM ================= */}

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-5 rounded-md border border-[#232838] p-4">

            <div className="mb-4">
              <span className="font-mono text-xs text-[#8B93A6]">
                {savedCertifications.length === 0
                  ? "certification 1"
                  : `certification ${
                      savedCertifications.length + 1
                    }`}
              </span>
            </div>

            {/* Title */}

            <FormField
              label="title"
              error={errors.title}
            >
              <input
                className={inputClass}
                placeholder="Java Certification"
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
                placeholder="Certification for advanced Java programming"
                {...register("descscribe")}
              />
            </FormField>

            {/* Issuer */}

            <FormField label="issuer">
              <input
                className={inputClass}
                placeholder="Oracle"
                {...register("issuer")}
              />
            </FormField>

            {/* Issued Date */}

            <FormField label="issued date">
              <input
                type="month"
                className={inputClass}
                {...register("issued_date")}
              />
            </FormField>

          </div>

          {/* Save Certification */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
          >
            {isSubmitting
              ? "saving…"
              : "$ save certification"}
          </button>

        </form>
      )}

      {/* ================= AFTER SAVE ================= */}

      {savedCertifications.length > 0 &&
        !showForm && (
          <div className="mt-5">

            <div className="mb-4 text-center font-mono text-xs text-[#8B93A6]">
              Certification saved successfully.
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

      {/* ================= SKIP ================= */}

      {savedCertifications.length === 0 &&
        !showForm && (
          <button
            type="button"
            onClick={skip}
            className="mt-4 w-full rounded-md border border-[#2E3444] px-4 py-2.5 font-mono text-sm text-[#8B93A6] transition hover:text-[#E8EAED]"
          >
            skip
          </button>
        )}

    </StepCard>
  );
}