import React from "react";

type Props = {
  error: string | undefined;
};

const FormError = ({ error }: Props) => {
  if (!error) return null;
  return (
    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
      {error}
    </div>
  );
};

export default FormError;