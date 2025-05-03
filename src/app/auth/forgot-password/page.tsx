"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon } from "@/components/ui/icons";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const email = formData.get("email") as string;
    
    try {
      // Validate email
      forgotPasswordSchema.parse({ email });
      
      // In a real application, this would call an API to send a password reset email
      // For this demo, we'll just simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setEmail(email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0]?.message || "Please enter a valid email address");
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error("Password reset error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link 
              href="/auth/login" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-2xl space-y-6">
          {!success ? (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <LockIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <p className="text-center text-gray-600 dark:text-gray-300">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form action={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-green-600 dark:text-green-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Check your email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We've sent a password reset link to
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {email}
                </p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  If you don't see it, check your spam folder or
                  <button 
                    onClick={() => setSuccess(false)}
                    className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    try another email
                  </button>
                </p>
              </div>
              
              <div className="mt-6">
                <Link href="/auth/login">
                  <Button 
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-full"
                    variant="outline"
                  >
                    Back to sign in
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}