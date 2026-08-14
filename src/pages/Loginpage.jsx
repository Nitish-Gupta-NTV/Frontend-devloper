import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuthStore } from "../context/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (formData) => {
    console.log("logined button is clicked ");
    setServerError("");
    try {

      const data = await login({
        user_name:formData.user_name,
        email: formData.email,
        password: formData.password,
      });
      // Adjust this shape to match your backend's actual login response
      setAuth({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      navigate("/dashboard");
      // this line nedd to reomove after the testing 
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
          <span className="ml-2 font-mono text-xs text-[#8B93A6]">sign-in.sh</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-[#F2B84B]">
            welcome back
          </p>
          <h1 className="mb-6 font-mono text-xl font-bold text-[#E8EAED]">Sign in</h1>

          {serverError && (
            <p className="mb-4 rounded-md border border-[#F09595]/40 bg-[#F09595]/10 px-3 py-2 font-mono text-xs text-[#F09595]">
              {serverError}
            </p>
          )}

          
          
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

          <label className="mb-6 block">
            <span className="mb-1.5 block font-mono text-xs text-[#8B93A6]">password</span>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full rounded-md border border-[#2E3444] bg-[#0A0C10] px-3 py-2.5 font-mono text-sm text-[#E8EAED] outline-none transition focus:border-[#4ADE9D]"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="mt-1 block font-mono text-xs text-[#F09595]">{errors.password.message}</span>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#F2B84B] px-4 py-2.5 font-mono text-sm font-semibold text-[#1A1305] transition hover:bg-[#F5C567] disabled:opacity-60"
          >
            {isSubmitting ? "signing in…" : "$ sign in"}
          </button>

          <p className="mt-5 text-center font-mono text-xs text-[#8B93A6]">
            no account?{" "}
            <Link to="/signup" className="text-[#4ADE9D] hover:text-[#6EF0B6]">
              create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}