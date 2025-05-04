import { ReactNode } from "react"
import WithAuth from "@/components/with-auth"
import { DashboardLayoutWrapper } from "@/components/dashboard-layout-wrapper"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    const session = await auth();
    if (!session?.user) {
        redirect("/auth/login");
    }
    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        }
    })
    if (!user) {
        redirect("/auth/login");
    }
    const organizations = await prisma.organization.findMany({
        where: {
            memberships: {
                some: {
                    userId: user.id
                }
            }
        }
    })
    // if (organizations.length === 0) {
    //     redirect("/dashboard/create-organization");
    // }
    
    return (
        <WithAuth>
            <DashboardLayoutWrapper>
                {children}
            </DashboardLayoutWrapper>
        </WithAuth>
    )
}