import WithoutAuth from '@/components/without-auth';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const AuthLayout = (props: Props) => {
  return (
    <WithoutAuth>
      {props.children}
    </WithoutAuth>
  );
};

export default AuthLayout;
