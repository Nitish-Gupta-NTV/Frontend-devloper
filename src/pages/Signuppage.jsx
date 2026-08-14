import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";
import { useAuthStore } from "../context/authStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const password = watch("password");

const onSubmit = async (formData) => {
    console.log("submit is callled ")
  setServerError("");

  try {
    const data = await signup({
      user_name: formData.user_name,
      password: formData.password,
      role: formData.role,
      name: formData.name,
      phone_number: Number(formData.phone_number),
      email: formData.email,
    });

    setAuth({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    navigate("/login");
  } catch (err) {
    console.error("Backend status:", err?.response?.status); 
    console.error("Backend response:", err?.response?.data);
    const backendmessage=typeof err?.response?.data==="string"? 
    err.response.data : err?.response?.data?.message 
    || err?.response?.data?.error 
    || "Signup failed. Please try again.";
                 
    setServerError(
      backendmessage
    );
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0C10] px-6 font-sans">
      <div className="w-full max-w-sm overflow-hidden rounded-lg border border-[#232838] bg-[#12151C] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-[#232838] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F09595]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FAC775]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#9FE1CB]" />
          <span className="ml-2 font-mono text-xs text-[#8B93A6]">sign-up.sh</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-[#F2B84B]">
            get started
          </p>
          <h1 className="mb-6 font-mono text-xl font-bold text-[#E8EAED]">Create account</h1>

          {serverError && (
            <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
              {serverError}
            </p>
          )}
          <label className="mb-4 block">
  <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">
    role
  </span>

  <select
    className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D]"
    {...register("role", {
      required: "Please select a role",
    })}
  >
    <option value="">Select role</option>
    <option value="developer">Developer</option>
    <option value="admin">Admin</option>
  </select>

  {errors.role && (
    <span className="mt-1 block font-mono text-xs text-[#F09595]">
      {errors.role.message}
    </span>
  )}
</label>

          <label className="mb-4 block">
            <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">name</span>
            <input
              type="text"
              autoComplete="name"
              className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D]"
              placeholder="Aditi Rao"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="mt-1 block font-mono text-xs text-[#F09595]">{errors.name.message}</span>
            )}
          </label>
                                   <label className="mb-4 block">
  <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">
    username
  </span>

  <input
    type="text"
    autoComplete="username"
    className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D]"
    placeholder="test02"
    {...register("user_name", {
      required: "Username is required",
    })}
  />

  {errors.user_name && (
    <span className="mt-1 block font-mono text-xs text-[#F09595]">
      {errors.user_name.message}
    </span>
  )}
</label>

          <label className="mb-4 block">
            <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">email</span>
            <input
              type="email"
              autoComplete="email"
              className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D]"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
            />
            {errors.email && (
              <span className="mt-1 block font-mono text-xs text-[#F09595]">{errors.email.message}</span>
            )}
          </label>

          <label className="mb-4 block">
            <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">password</span>
            <input
              type="password"
              autoComplete="new-password"
              className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D]"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
            />
            {errors.password && (
              <span className="mt-1 block font-mono text-xs text-[#F09595]">{errors.password.message}</span>
            )}
          </label>                     
                                           <label className="mb-4 block">
  <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">
    phone number
  </span>

  <input
    type="tel"
    autoComplete="tel"
    className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D]"
    placeholder="8081004919"
    {...register("phone_number", {
      required: "Phone number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Enter a valid 10-digit phone number",
      },
    })}
  />

  {errors.phone_number && (
    <span className="mt-1 block font-mono text-xs text-[#F09595]">
      {errors.phone_number.message}
    </span>
  )}
</label>

          <label className="mb-6 block">
            <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">confirm password</span>
            <input
              type="password"
              autoComplete="new-password"
              className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D]"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className="mt-1 block font-mono text-xs text-[#F09595]">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
          >
            {isSubmitting ? "creating account…" : "$ create account"}
          </button>

          <p className="mt-5 text-center font-mono text-xs text-[#8B93A6]">
            already have an account?{" "}
            <Link to="/login" className="text-[#4ADE9D] hover:text-[#6EF0B6]">
              sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}