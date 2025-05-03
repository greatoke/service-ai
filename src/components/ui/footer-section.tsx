import Link from 'next/link'
import React from 'react'

type Props = {}

const FooterSection = (props: Props) => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Service AI
              </span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Documentation
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Service AI. All rights reserved.
          </div>
        </div>
      </footer>
  )
}

export default FooterSection