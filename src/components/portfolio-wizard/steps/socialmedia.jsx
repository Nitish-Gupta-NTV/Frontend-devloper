import { useState } from "react";
import { useForm } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveSocialMedia } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

const emptySocialMedia = {
  linkedine: "",
  github: "",
  coding_platform: "",
};

export default function SocialMediaStep({
  stepNumber,
  totalSteps,
}) {
  const completeStep = usePortfolioWizardStore(
    (s) => s.completeStep
  );

  const [serverError, setServerError] = useState("");
  const [savedSocialMedia, setSavedSocialMedia] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: emptySocialMedia,
  });

  const onSubmit = async (data) => {
    setServerError("");

    const payload = {
      linkedine: data.linkedine || null,
      github: data.github || null,
      coding_platform: data.coding_platform || null,
    };

    console.log(
      "Social media payload:",
      payload
    );

    try {
      const response = await saveSocialMedia(payload);

      console.log(
        "Social media saved:",
        response.data
      );

      // Keep locally saved entries
      setSavedSocialMedia((prev) => [
        ...prev,
        payload,
      ]);

      // Hide form
      setShowForm(false);

      // Reset for next entry
      reset(emptySocialMedia);

    } catch (err) {
      console.error(
        "Social media save error:",
        err
      );

      setServerError(
        err?.response?.data?.message ||
          "Could not save social media. Try again."
      );
    }
  };

  const handleAddAnother = () => {
    setServerError("");
    reset(emptySocialMedia);
    setShowForm(true);
  };

  const handleContinue = () => {
    completeStep(6);
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      subtitle="where people can find you"
      title="Social Media"
    >
      {/* ================= ERROR ================= */}

      {serverError && (
        <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
          {serverError}
        </p>
      )}

      {/* ================= SAVED SOCIAL MEDIA ================= */}

      {savedSocialMedia.length > 0 && (
        <div className="mb-6">

          <div className="mb-3 font-mono text-xs text-[#8B93A6]">
            saved social profiles
          </div>

          {savedSocialMedia.map(
            (social, index) => (
              <div
                key={index}
                className="mb-3 rounded-md border border-[#232838] bg-[#11141D] p-4"
              >
                <div className="flex items-start justify-between">

                  <div className="space-y-2">

                    {social.linkedine && (
                      <p className="font-mono text-xs text-[#E8EAED]">
                        <span className="text-[#8B93A6]">
                          LinkedIn:
                        </span>{" "}
                        {social.linkedine}
                      </p>
                    )}

                    {social.github && (
                      <p className="font-mono text-xs text-[#E8EAED]">
                        <span className="text-[#8B93A6]">
                          GitHub:
                        </span>{" "}
                        {social.github}
                      </p>
                    )}

                    {social.coding_platform && (
                      <p className="font-mono text-xs text-[#E8EAED]">
                        <span className="text-[#8B93A6]">
                          Coding:
                        </span>{" "}
                        {social.coding_platform}
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

      {/* ================= FORM ================= */}

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-5 rounded-md border border-[#232838] p-4">

            <div className="mb-4">
              <span className="font-mono text-xs text-[#8B93A6]">
                {savedSocialMedia.length === 0
                  ? "social profile 1"
                  : `social profile ${
                      savedSocialMedia.length + 1
                    }`}
              </span>
            </div>

            {/* LinkedIn */}

            <FormField
              label="linkedin"
              error={errors.linkedine}
            >
              <input
                type="url"
                className={inputClass}
                placeholder="https://linkedin.com/in/yourprofile"
                {...register("linkedine", {
                  pattern: {
                    value:
                      /^https?:\/\/.+/,
                    message:
                      "Enter a valid URL",
                  },
                })}
              />
            </FormField>

            {/* GitHub */}

            <FormField
              label="github"
              error={errors.github}
            >
              <input
                type="url"
                className={inputClass}
                placeholder="https://github.com/yourusername"
                {...register("github", {
                  pattern: {
                    value:
                      /^https?:\/\/.+/,
                    message:
                      "Enter a valid URL",
                  },
                })}
              />
            </FormField>

            {/* Coding Platform */}

            <FormField
              label="coding platform"
              error={errors.coding_platform}
            >
              <input
                type="url"
                className={inputClass}
                placeholder="https://leetcode.com/yourusername"
                {...register("coding_platform", {
                  pattern: {
                    value:
                      /^https?:\/\/.+/,
                    message:
                      "Enter a valid URL",
                  },
                })}
              />
            </FormField>

          </div>

          {/* Save */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
          >
            {isSubmitting
              ? "saving…"
              : "$ save social media"}
          </button>

        </form>
      )}

      {/* ================= AFTER SAVE ================= */}

      {savedSocialMedia.length > 0 &&
        !showForm && (
          <div className="mt-5">

            <div className="mb-4 text-center font-mono text-xs text-[#8B93A6]">
              Social media saved successfully.
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