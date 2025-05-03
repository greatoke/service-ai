import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit">Signin with GitHub</Button>
      </form>
    </div>
  );
};

export default LoginPage;
