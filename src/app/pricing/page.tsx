import NavigationBar from "@/components/ui/landing-navigation";
import PricingSection from "@/components/ui/pricing-section";
import CTASection from "@/components/ui/cta-section";
import FooterSection from "@/components/ui/footer-section";

export const metadata = {
  title: "Pricing - Service AI",
  description: "Explore Service AI's transparent pricing plans for every business need. From free starter plans to enterprise solutions.",
};

export default function PricingPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      {/* Navigation */}
      <NavigationBar />

      {/* Main Content */}
      <main>
        {/* Pricing Section */}
        <PricingSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}