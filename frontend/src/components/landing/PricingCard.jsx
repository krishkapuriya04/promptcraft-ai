import { motion } from "framer-motion";
import Button from "../common/Button";

export default function PricingCard({
  name,
  price,
  description,
  features,
  ctaLabel,
  highlighted = false,
  delay = 0,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
      className={`rounded-2xl border p-6 backdrop-blur-xl ${
        highlighted ? "border-brand-400/40 bg-brand-600/10 shadow-2xl shadow-brand-700/20" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <p className="text-sm font-semibold text-brand-200">{name}</p>
      <div className="mt-3 flex items-end gap-2">
        <p className="text-4xl font-semibold text-white">{price}</p>
        <p className="pb-1 text-sm text-slate-400">/ month</p>
      </div>
      <p className="mt-3 text-sm text-slate-300">{description}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-200">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        className="mt-7 w-full"
        variant={highlighted ? "primary" : "secondary"}
        size="md"
      >
        {ctaLabel}
      </Button>
    </motion.article>
  );
}
