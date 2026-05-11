import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function AuthLayout({ title, subtitle, children, footerContent }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-7"
      >
        <Link to={ROUTES.HOME} className="text-sm font-semibold text-brand-200">
          PromptCraft AI
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
        <div className="mt-6">{children}</div>
        {footerContent ? <div className="mt-5 text-sm text-slate-300">{footerContent}</div> : null}
      </motion.section>
    </main>
  );
}
