"use client";

import React, { useActionState } from "react";
import CredentialsAuthButton from "./credentials-auth-button";
import Link from "next/link";
import FormError from "./form-error";
import { Label } from "./label";
import { Input } from "./input";
import { register } from "@/actions/auth";
import InputError from "./input-error";


const RegisterForm = () => {
  const [state, formAction] = useActionState(register, null);
  return (
    <form action={formAction} className="space-y-6">
        <FormError error={state?.errors?.general} />
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={state?.values?.name}
          className={`mt-1 ${
            state?.errors?.name ? "border-red-500 dark:border-red-500" : ""
          }`}
        />
        <InputError error={state?.errors?.name} />
      </div>

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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          defaultValue={state?.values?.password}
          className={`mt-1 ${
            state?.errors?.password ? "border-red-500 dark:border-red-500" : ""
          }`}
        />
        <InputError error={state?.errors?.password} />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          defaultValue={state?.values?.confirmPassword}
          className={`mt-1 ${
            state?.errors?.confirmPassword
              ? "border-red-500 dark:border-red-500"
              : ""
          }`}
        />
        <InputError error={state?.errors?.confirmPassword} />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        By signing up, you agree to our{" "}
        <Link
          href="/terms"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </div>

      <CredentialsAuthButton text="Register" />
    </form>
  );
};

export default RegisterForm;
