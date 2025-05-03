import { signIn } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <Button type="submit">Signin with GitHub</Button>
    </form>
  )
}

export default LoginPage

