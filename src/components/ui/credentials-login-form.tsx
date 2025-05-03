"use client";
import React, { useActionState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import Link from "next/link";
import CredentialsSigninButton from "./credentials-signin-button";
import { login } from "@/actions/auth";

type Props = {};

const CredentialsLoginForm = (props: Props) => {
  const [state, formAction] = useActionState(login, null);
  console.log("state", state);
  return (
    <form action={formAction} className="space-y-6">
        {state?.errors?.general && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
              {state?.errors?.general}
            </div>
          )}
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state?.values?.email}
          className={`mt-1 ${
            state?.errors?.email ? "border-red-500 dark:border-red-500" : ""
          }`}
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {state?.errors?.email}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.values?.password}
          autoComplete="current-password"
          required
          className={`mt-1 ${
            state?.errors?.password ? "border-red-500 dark:border-red-500" : ""
          }`}
        />
        {state?.errors?.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {state?.errors?.password}
          </p>
        )}
      </div>

      <CredentialsSigninButton />
    </form>
  );
};

export default CredentialsLoginForm;
