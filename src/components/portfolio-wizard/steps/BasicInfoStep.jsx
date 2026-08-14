/* import { useState } from "react";
import { useForm } from "react-hook-form";
import StepCard from "../StepCard";
import FormField, { inputClass } from "../FormField";
import { saveBasicInfo } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

export default function BasicInfoStep({ stepNumber, totalSteps }) {
  const completeStep = usePortfolioWizardStore((s) => s.completeStep);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  
  const onSubmit = async (data) => {
    setServerError("");
    console.log("1. Submit started", data);
    
    try {
      console.log("2. Calling saveBasicInfo...");
    const result=  await saveBasicInfo(data);
      console.log("STEP 2: saveBasicInfo finished", result); 
      console.log("STEP 3: before completeStep");
      completeStep(0);

      console.log("4. Calling completeStep...");
    } catch (err) {
      console.error("========== REAL ERROR =========="); 
      console.error("Error:", err); 
      console.error("Message:", err?.message); 
      console.error("Response:", err?.response); 
      console.error("Stack:", err?.stack);
       console.error("================================");
      setServerError(err?.response?.data?.message || "Could not save. Try again.");
    }
  };

  return (
    <StepCard stepNumber={stepNumber} totalSteps={totalSteps} subtitle="let's start with the basics" title="Basic info">
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
            {serverError}
          </p>
        )}

        <FormField label="full name" error={errors.fullName}>
          <input className={inputClass} placeholder="Aditi Rao" {...register("fullName", { required: "Name is required" })} />
        </FormField>

        <FormField label="headline" error={errors.headline}>
          <input
            className={inputClass}
            placeholder="Backend Engineer"
            {...register("headline", { required: "Headline is required" })}
          />
        </FormField>

        <FormField label="bio" error={errors.bio}>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="A short summary about you"
            {...register("bio", {
              required: "Bio is required",
              maxLength: { value: 500, message: "Keep it under 500 characters" },
            })}
          />
        </FormField>

        <FormField label="location">
          <input className={inputClass} placeholder=" Current Location(Jaipur, India)" {...register("location")} />
        </FormField>

        <FormField label="github url">
          <input className={inputClass} placeholder="https://github.com/username" {...register("githubUrl")} />
        </FormField>

        <FormField label="linkedin url">
          <input className={inputClass} placeholder="https://linkedin.com/in/username" {...register("linkedinUrl")} />
        </FormField>

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
import { saveBasicInfo } from "../../../api/portfolioApi";
import { usePortfolioWizardStore } from "../../../store/portfolioWizardStore";

export default function BasicInfoStep({ stepNumber, totalSteps }) {
  const completeStep = usePortfolioWizardStore((s) => s.completeStep);

  const [serverError, setServerError] = useState("");
  const [imagePreviewError, setImagePreviewError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setServerError("");

    // Backend will manage created_time and update_time.
    const payload = {
      headline: data.headline,
      location: data.location,
      bio: data.bio,
      about: data.about,
      profileimage: data.profileimage || "",
      theme_id: data.theme_id || null,
    };

    console.log("Payload being sent:", payload);

    try {
      console.log("1. Calling saveBasicInfo...");

      const result = await saveBasicInfo(payload);

      console.log("2. saveBasicInfo finished:", result);

      completeStep(0);

      console.log("3. completeStep called");
    } catch (err) {
      console.error("========== REAL ERROR ==========");
      console.error("Error:", err);
      console.error("Message:", err?.message);
      console.error("Response:", err?.response);
      console.error("Response data:", err?.response?.data);
      console.error("Stack:", err?.stack);
      console.error("================================");

      setServerError(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message ||
              "Could not save your information. Try again."
      );
    }
  };

  return (
    <StepCard
      stepNumber={stepNumber}
      totalSteps={totalSteps}
      subtitle="let's start with the basics"
      title="Basic info"
    >
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Server Error */}
        {serverError && (
          <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
            {serverError}
          </p>
        )}

       

        
        {/* Headline */}
        <FormField label="headline" error={errors.headline}>
          <input
            className={inputClass}
            placeholder="Backend Engineer"
            {...register("headline", {
              required: "Headline is required",
            })}
          />
        </FormField>

        {/* Bio */}
        <FormField label="bio" error={errors.bio}>
          <textarea
            rows={3}
            className={inputClass}
            placeholder="A short summary about you"
            {...register("bio", {
              required: "Bio is required",
              maxLength: {
                value: 500,
                message: "Keep it under 500 characters",
              },
            })}
          />
        </FormField>

        {/* About */}
        <FormField label="about" error={errors.about}>
          <textarea
            rows={5}
            className={inputClass}
            placeholder="I build scalable backend systems using Spring Boot..."
            {...register("about", {
              required: "About section is required",
              maxLength: {
                value: 1000,
                message: "Keep it under 1000 characters",
              },
            })}
          />
        </FormField>

        {/* Location */}
        <FormField label="location">
          <input
            className={inputClass}
            placeholder="Ghaziabad, New Delhi"
            {...register("location")}
          />
        </FormField>

        
       
         {/* Profile Image URL */}
        <FormField label="profile image url" error={errors.profileimage}>
          <input
            type="url"
            className={inputClass}
            placeholder="https://example.com/profile.jpg"
            {...register("profileimage", {
              pattern: {
                value: /^https?:\/\/.+/i,
                message: "Enter a valid image URL",
              },
            })}
            onChange={() => setImagePreviewError(false)}
          />
        </FormField>
         {/* Profile Image Preview */}
        <div className="mb-6 mt-2">

          {imagePreviewError ? (
            <p className="font-mono text-xs text-[#F09595]">
              Unable to load the profile image from this URL.
            </p>
          ) : (
            <input
              type="hidden"
              {...register("imagePreview")}
            />
          )}

          <p className="font-mono text-xs text-[#8B93A6]">
            Enter a publicly accessible image URL.
          </p>
        </div>


        {/* Submit */}
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

