"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { registerSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitHubIcon } from "@/components/ui/icons";
import { signIn } from "@/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setFormErrors({});
    setGeneralError(null);
    setIsSuccess(false);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Client-side validation
    try {
      registerSchema.parse({ name, email, password, confirmPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
        setIsLoading(false);
        return;
      }
    }

    try {
      // Make a call to register endpoint
    //   const response = await fetch("/api/auth/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name,
    //       email,
    //       password,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     setGeneralError(data.message || "Registration failed. Please try again.");
    //     setIsLoading(false);
    //     return;
    //   }

    //   // Show success message and redirect after a short delay
    //   setIsSuccess(true);
      
    //   // Auto sign in
    //   setTimeout(async () => {
    //     try {
    //       await signIn("credentials", {
    //         email,
    //         password,
    //         redirect: true,
    //         redirectTo: "/dashboard",
    //       });
    //     } catch (error) {
    //       console.error("Auto sign-in error:", error);
    //       // Redirect to login even if auto sign-in fails
    //       router.push("/auth/login");
    //     }
    //   }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link 
              href="/auth/login" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-2xl space-y-6">
          {generalError && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
              {generalError}
            </div>
          )}

          {isSuccess && (
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm">
              Registration successful! Signing you in...
            </div>
          )}

          <form className="space-y-6">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`mt-1 ${formErrors.name ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 ${formErrors.email ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 ${formErrors.password ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 ${formErrors.confirmPassword ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.confirmPassword}</p>
              )}
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <form
            action={async () => {
              setIsLoading(true);
              try {
                // await signIn("github", { redirect: true, redirectTo: "/dashboard" });
              } catch (error) {
                console.error("GitHub sign in error:", error);
                setGeneralError("Error signing in with GitHub. Please try again.");
                setIsLoading(false);
              }
            }}
          >
            <Button
              type="submit"
              variant="outline"
              disabled={isLoading}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center py-6 transition-all hover:shadow-md"
            >
              <GitHubIcon className="mr-2 h-5 w-5" />
              GitHub
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
