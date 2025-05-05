import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import CreateOrganizationForm from '@/components/ui/create-organization-form'

export default async function CreateOrganizationPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }
  
  // In a real implementation, we would check if the user already has an organization
  // If they do, redirect them to the dashboard
  // For demo purposes, we'll always show the create organization form
  // const userHasOrganization = await checkIfUserHasOrganization(session.user.id)
  // if (userHasOrganization) {
  //   redirect('/dashboard')
  // }
  
  return <CreateOrganizationForm />
} 