import {
  FeaturesSection,
  FaqSection,
  FooterSection,
  HeroSection,
  HowItWorksSection,
  LandingNavbar,
  PreviewShowcaseSection,
  PricingSection,
  TestimonialsSection,
  TrustedBySection,
} from "../components/landing/sections";
import SEOHeadManager from "../components/seo/SEOHeadManager";
import { ROUTES } from "../constants/routes";

export default function Home() {
  return (
    <>
      <SEOHeadManager
        title="AI website builder for modern teams"
        description="PromptCraft AI helps you generate, preview, export, and iterate production-grade web experiences with an enterprise-ready MERN workspace."
        path={ROUTES.HOME}
      />
      <div className="min-h-screen bg-slate-950 text-slate-100">
      <LandingNavbar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <HowItWorksSection />
        <PreviewShowcaseSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <FooterSection />
    </div>
    </>
  );
}
