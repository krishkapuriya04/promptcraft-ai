import { motion } from "framer-motion";

export default function GenerationLoader() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 animate-pulse rounded-full bg-brand-300" />
        <p className="text-sm text-slate-200">PromptCraft AI is generating your website...</p>
      </div>
      <div className="mt-4 space-y-3">
        {[0, 1, 2, 3].map((line) => (
          <motion.div
            key={line}
            className="h-3 rounded bg-white/10"
            initial={{ opacity: 0.45 }}
            animate={{ opacity: [0.45, 0.9, 0.45] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: line * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
