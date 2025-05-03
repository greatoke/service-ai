"use server";

import { signIn } from "@/auth";

import { signInSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (data: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    signInSchema.parse({ email, password });
    const result = await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirect: true,
    });

    console.log("result", result);
    return {
      success: "Signed in successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });

      return {
        errors,
        values: {
          email,
          password,
        },
      };
    }
    if (error instanceof AuthError ) {
      console.error("error +++", Object.values(error));
      return {
        errors: {
          general: "Invalid email or password",
        },
        values: {
          email,
          password,
        },
      };
    }
  }
};
