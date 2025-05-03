"use client"

import React from 'react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './button'
import { signOut } from 'next-auth/react'

export function DashboardHeader() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Service AI
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button 
            variant="outline" 
            onClick={async () => {
              await signOut({ callbackUrl: '/' })
            }}
            className="rounded-full"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
} 