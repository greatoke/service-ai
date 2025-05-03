'use client'

import React from 'react'
import { Button } from './button';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

type Props = {
  text: string;
}

const CredentialsAuthButton = (props: Props) => {
    const {pending} = useFormStatus();
  return (
    <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all hover:shadow-lg"
        disabled={pending}
      >
        {pending ? <Loader2 className='animate-spin' /> : props.text}
      </Button>
  )
}

export default CredentialsAuthButton;