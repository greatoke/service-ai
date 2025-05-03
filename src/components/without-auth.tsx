import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const WithoutAuth = async (props: Props) => {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return <>{props.children}</>;
};

export default WithoutAuth;
