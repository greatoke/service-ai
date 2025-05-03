import NavigationBar from "@/components/ui/landing-navigation";
import HeroSection from "@/components/ui/hero-section";
import FeaturesSection from "@/components/ui/features-section";
import TestimonialSection from "@/components/ui/testimonial-section";
import CTASection from "@/components/ui/cta-section";
import FooterSection from "@/components/ui/footer-section";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
