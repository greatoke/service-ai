import React from "react";
import Link from "next/link";
import { z } from "zod";
import { registerSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import GithubSubmitButton from "@/components/ui/github-submit-button";
import ContinueWith from "@/components/ui/continue-with";
import RegisterForm from "@/components/ui/register-form";

export default function RegisterPage() {

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
          

          <RegisterForm />

          <ContinueWith />

          <form
            action={async () => {
              "use server";
              signIn("github", { redirect: true, redirectTo: "/dashboard" });
            }}
          >
            <GithubSubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
