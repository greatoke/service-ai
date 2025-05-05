import WithoutAuth from '@/components/without-auth';
import { AuthHeader } from '@/components/ui/auth-header';
import React from 'react'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
type Props = {
    children: React.ReactNode
}

const AuthLayout = async (props: Props) => {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <AuthHeader />
        {props.children}
      </div>
  );
};

export default AuthLayout;
