import { ReactNode } from "react"
import WithAuth from "@/components/with-auth"
import { DashboardLayoutWrapper } from "@/components/dashboard-layout-wrapper"
import { getUserOrganizations } from "@/actions/organisation";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    const organizations = await getUserOrganizations();
    
    return (
        <WithAuth>
            <DashboardLayoutWrapper organization={organizations}>
                {children}
            </DashboardLayoutWrapper>
        </WithAuth>
    )
}