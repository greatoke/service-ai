import React from "react";
import Link from "next/link";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitHubIcon } from "@/components/ui/icons";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import GithubSubmitButton from "@/components/ui/github-submit-button";
import CredentialsLoginForm from "@/components/ui/credentials-login-form";

export default function LoginPage() {

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link 
              href="/auth/register" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              create a new account
            </Link>
          </p>
        </div>
 
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-2xl space-y-6">
          
          <CredentialsLoginForm />

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
              "use server"
              await signIn("github", { redirect: true });
            }}
          >
            <GithubSubmitButton />
          </form>
        </div> 
      </div>
    </div>
  );
}