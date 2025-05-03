import { ReactNode } from "react"
import WithAuth from "@/components/with-auth"
export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    return <WithAuth>{children}</WithAuth>
}