import React from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Building, Users, ArrowUpRight, MessageSquare, FileText, BarChart4 } from "lucide-react";
import { redirect } from "next/navigation";
import CreateOrganizationForm from "@/components/ui/create-organization-form";
import { Organization } from "@prisma/client";
export default async function DashboardPage() {
  const session = await auth();
  
  const organizations = await prisma.organization.findMany({
    where: {
      memberships: {
        some: {
          userId: session?.user?.id as string,
        },
      },
    },
  }) as Organization[];

  if (organizations.length === 0) {
    return (
      <CreateOrganizationForm />
    )
  }
  else{
    redirect(`/dashboard/${organizations[0].id}`)
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome, {session?.user?.name || 'User'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              This is your dashboard. You can manage your organizations and Service AI resources from here.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Your Organizations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">

                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                    {org.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {'No description provided'}
                  </p>
                  
                  <Link
                    href={`/dashboard/${org.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm hover:shadow transition-all text-sm"
                  >
                    <span>View Dashboard</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
            
            <div
              className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-6 min-h-[200px]"
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                Create New Organization
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                Create a new organization to collaborate with your team
              </p>
              <Link
                href="/dashboard/create-organization"
                className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm hover:shadow transition-all text-sm"
              >
                <span>Create Organization</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chatbots</h2>
            </div>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
              0 Active
            </span>
          </div>
          
          <div className="mt-4">
            <Link
              href="/dashboard/chatbots"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-sm hover:shadow transition-all text-sm"
            >
              <span>Create Chatbot</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Documents</h2>
            </div>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
              0 Files
            </span>
          </div>
          
          <div className="mt-4">
            <Link
              href="/dashboard/documents"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg shadow-sm hover:shadow transition-all text-sm"
            >
              <span>Upload Document</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <BarChart4 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics</h2>
            </div>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
              Overview
            </span>
          </div>
          
          <div className="mt-4">
            <Link
              href="/dashboard/analytics"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg shadow-sm hover:shadow transition-all text-sm"
            >
              <span>View Analytics</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
