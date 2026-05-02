"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import {
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthLayout from "@/app/components/auth/AuthLayout";

type AuthErrorResponse = {
  message?: string;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      alert("✅ Login successful!");
      localStorage.setItem("token", res.data.token);
      window.location.href = "/Dashboard";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AuthErrorResponse>;
        setMessage(
          axiosError.response?.data?.message || "Invalid email or password"
        );
        return;
      }

      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dff4ff_0%,#f7fbff_34%,#f4f7fb_68%,#eef2f7_100%)] text-slate-900">
      <AuthHeader
        activePage="login"
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={() => setMobileMenuOpen((open) => !open)}
        onCloseMenu={() => setMobileMenuOpen(false)}
      />

      <AuthLayout
        badge="Secure access"
        title="Sign in to continue your clinical workflow."
        description="Access the dashboard, review AI-assisted staging output, and return to patient analysis with a cleaner, more focused login experience."
        points={[
          "Focused medical product presentation",
          "Cleaner path into the dashboard",
          "Readable form layout with stronger hierarchy",
        ]}
        accentLabel="Access mode"
        accentValue="Clinician Login"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-[2rem] border border-slate-200/80 bg-white/82 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur md:p-10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.3)]">
              <LogIn className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Login
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h2>
            </div>
          </div>

          <p className="mt-5 text-base font-medium leading-7 text-slate-600">
            Sign in to access your account and continue reviewing platform data.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-950 outline-none transition focus:border-sky-400 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-slate-950 outline-none transition focus:border-sky-400 focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-sky-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <p className="text-sm font-medium text-slate-600">
                  Secure sign-in flow for platform access
                </p>
              </div>
            </div>

            {message ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-semibold text-red-700"
              >
                {message}
              </motion.div>
            ) : null}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-300 px-6 py-4 text-base font-bold text-slate-950 transition hover:shadow-[0_18px_35px_rgba(56,189,248,0.3)]"
            >
              <LogIn className="h-5 w-5" />
              Login
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/Signup" className="font-bold text-sky-700 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </AuthLayout>
    </div>
  );
}
