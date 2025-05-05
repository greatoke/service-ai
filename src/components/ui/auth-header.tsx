"use client"

import React from 'react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function AuthHeader() {
  return (
    <div className="w-full flex justify-between items-center p-4">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Service AI
        </span>
      </Link>
      <ThemeToggle />
    </div>
  )
} 