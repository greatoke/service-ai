import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-pulse" />
          <div
            className="absolute -bottom-8 -right-8 w-16 h-16 bg-purple-500/10 rounded-full animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            Train AI on Your Business Data
          </h1>
        </div>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-8 transition-all hover:scale-[1.01]">
          Create powerful AI chatbots that know your products, policies, and
          processes. No coding required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-lg transition-all hover:shadow hover:-translate-y-1"
          >
            <span className="mr-2">→</span> Watch Demo
          </Button>
        </div>
      </div>

      {/* Hero Illustration */}
      <div className="relative mx-auto max-w-5xl mt-8 group">
        <Image
          src="/hero-illustration.svg"
          alt="Service AI Illustration"
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />

        {/* Floating feature cards with micro-animations */}
        <div className="absolute top-1/4 -right-4 md:right-0 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-110 z-10 hidden md:block">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm font-medium">Instant Answers</span>
          </div>
        </div>

        <div className="absolute bottom-1/4 -left-4 md:left-0 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-300 hover:scale-110 z-10 hidden md:block">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
