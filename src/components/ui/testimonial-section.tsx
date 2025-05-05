import React from 'react'

type Props = {}

const TestimonialSection = (props: Props) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-blue-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xl font-bold">
                  A
                </div>
              </div>
            </div>
            <blockquote className="text-xl md:text-2xl italic font-medium text-gray-700 dark:text-gray-300 mb-6">
              "Service AI has transformed how we handle customer inquiries. Our response time decreased by 80% while maintaining high customer satisfaction."
            </blockquote>
            <p className="text-lg font-semibold">Alex Chen</p>
            <p className="text-gray-600 dark:text-gray-400">Customer Success Manager, TechSolutions Inc.</p>
          </div>
        </div>
      </div>
  )
}

export default TestimonialSection