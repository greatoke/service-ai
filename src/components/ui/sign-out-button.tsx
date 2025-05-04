"use client";
import React, { useActionState, useState } from "react";
import { Button } from "./button";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

type Props = {};

const SignOutButton = (props: Props) => {
    const [isPending, setIsPending] = useState(false);
    const handleSignOut = async () => {
        setIsPending(true);
        await signOut();
        setIsPending(false);
    }
  return (
    <Button onClick={handleSignOut} className="text-sm md:text-base py-1 px-3 md:py-2 md:px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all hover:shadow-md">
      {isPending ? <Loader2 className="animate-spin mx-4" /> : "Sign Out"}
    </Button>
  );
};

export default SignOutButton;
