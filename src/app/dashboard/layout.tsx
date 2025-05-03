import { ReactNode } from "react"
import WithAuth from "@/components/with-auth"
import { DashboardHeader } from "@/components/ui/dashboard-header"

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <WithAuth>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardHeader />
                <main className="container mx-auto px-4 py-6">
                    {children}
                </main>
            </div>
        </WithAuth>
    )
}