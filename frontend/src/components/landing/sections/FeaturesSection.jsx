import { FeatureCard, SectionTitle } from "..";
import { featureItems } from "../../../data/landingContent";

function IconSpark() {
  return <span aria-hidden="true">✦</span>;
}

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Features"
          title="Built for teams who ship premium digital experiences"
          description="PromptCraft AI combines generation, refinement, and export into one streamlined workflow."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureItems.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={<IconSpark />}
              title={feature.title}
              description={feature.description}
              delay={index * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
