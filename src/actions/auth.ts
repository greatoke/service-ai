"use server";

import { signIn, signOut } from "@/auth";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

import { signInSchema, registerSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
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
        errors: errors,
        values: {
          email,
          password,
        },
      };
    }
    if (error instanceof AuthError ) {
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

export const register = async (data: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const name = formData.get("name") as string;
  try {
    registerSchema.parse({ email, password, confirmPassword, name });
    const hashed = await hashPassword(password);
    console.log("check hashed", await bcrypt.compare(password, hashed));
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return {
        errors: {
          email: "User with this email already exists!",
        },
        values: {
          email,
          password,
          confirmPassword,
          name,
        },
      };
    }
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    console.log("user", user);
    const result = await signIn("credentials", {
      email: user?.email as string,
      password: password as string,
      name: user?.name as string,
      redirect: true,
    });

    return {
      success: "Signed in successfully",
    };
  } catch (error) {
    console.log("error==> ", error);
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
          confirmPassword,
          name,
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
          confirmPassword,
          name,
        },
      };
    }
  }
};

export const logOut = async () => {
  try {
    await signOut();
    return {
      success: "Signed out successfully",
    };
  } catch (error) {
    console.log("error==> ", error);
    return {
      errors: {
        general: "Failed to sign out",
      },
    };
  }
};
