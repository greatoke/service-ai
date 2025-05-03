"use client"
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const FeaturesSection = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef(null);

  // Simple intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  return (
    <div ref={featuresRef} className="container mx-auto px-4 py-16 md:py-24">
      <h2
        className={`text-2xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        Why choose Service AI
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="w-12 h-12 mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Image
              src="/file.svg"
              alt="Document icon"
              width={24}
              height={24}
              className="text-blue-600"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Train on Your Data</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Upload documents, PDFs, websites or connect to your data sources to
            create a custom knowledge base.
          </p>
        </div>

        {/* Feature 2 */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="w-12 h-12 mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <Image
              src="/globe.svg"
              alt="Globe icon"
              width={24}
              height={24}
              className="text-purple-600"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Deploy Anywhere</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Embed your AI assistant on websites, apps, or integrate with
            existing customer service platforms.
          </p>
        </div>

        {/* Feature 3 */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="w-12 h-12 mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <Image
              src="/window.svg"
              alt="Analytics icon"
              width={24}
              height={24}
              className="text-green-600"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analyze & Improve</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Track usage, monitor performance, and continuously improve your AI
            with conversation analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
