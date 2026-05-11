import { motion } from "framer-motion";

export default function PreviewLoadingOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
      <div className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
        <div className="flex items-center gap-3">
          <motion.span
            className="h-3 w-3 rounded-full bg-brand-300"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <p className="text-sm text-slate-200">Rendering live preview...</p>
        </div>
      </div>
    </div>
  );
}
