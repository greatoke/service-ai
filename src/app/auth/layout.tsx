import WithoutAuth from '@/components/without-auth';
import { AuthHeader } from '@/components/ui/auth-header';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const AuthLayout = (props: Props) => {
  return (
    <WithoutAuth>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <AuthHeader />
        {props.children}
      </div>
    </WithoutAuth>
  );
};

export default AuthLayout;
