"use client"

import React, {} from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";
import { GitHubIcon } from "./icons";
import { Loader2 } from "lucide-react";


type Props = {};

const GithubSubmitButton = (props: Props) => {
    const {pending} = useFormStatus()
  return (
    <Button
      type="submit"
      variant="outline"
      disabled={pending}
      className="w-full border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center py-4 transition-all hover:shadow-md"
    >
      {pending ? <Loader2 className="animate-spin"/>: <GitHubIcon className="mr-2 h-5 w-5" />}
      GitHub
    </Button>
  );
};

export default GithubSubmitButton;
