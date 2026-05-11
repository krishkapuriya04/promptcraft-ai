import { PricingCard, SectionTitle } from "..";
import { pricingPlans } from "../../../data/landingContent";

export default function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Pricing"
          title="Simple pricing that scales with your team"
          description="Start for free and upgrade when your website generation volume grows."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} {...plan} delay={index * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
