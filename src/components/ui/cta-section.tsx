import React from 'react'
import { Button } from './button'

type Props = {}

const CTASection = (props: Props) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your customer service?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using Service AI to automate
            support and enhance customer experiences.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 py-6 text-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Start Your Free Trial
          </Button>
        </div>
      </div>
  )
}

export default CTASection