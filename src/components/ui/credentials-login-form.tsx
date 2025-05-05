"use client";
import React, { useActionState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import Link from "next/link";
import { login } from "@/actions/auth";
import InputError from "./input-error";
import FormError from "./form-error";
import CredentialsAuthButton from "./credentials-auth-button";
import { Button } from "./button";
import { getAllUsers } from "@/actions/user";


type Props = {};

const CredentialsLoginForm = (props: Props) => {
  const [state, formAction] = useActionState(login, null);

  return (
    <form action={formAction} className="space-y-6">
      <FormError error={state?.errors?.general} />
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
        <InputError error={state?.errors?.email} />
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
        <InputError error={state?.errors?.password} />
      </div>

      <CredentialsAuthButton text="Sign in" />
    </form>
  );
};

export default CredentialsLoginForm;
