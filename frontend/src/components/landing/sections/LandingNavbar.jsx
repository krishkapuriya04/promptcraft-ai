import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import { ROUTES } from "../../../constants/routes";
import { navItems } from "../../../data/landingContent";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
        <a href="#home" className="text-lg font-semibold tracking-tight text-white">
          PromptCraft AI
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to={ROUTES.SIGNUP}>
            <Button>Get Started</Button>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border border-white/20 p-2 text-white md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-slate-950 md:hidden"
          >
            <div className="space-y-4 px-4 py-5">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="block text-sm text-slate-200" onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              ))}
              <div className="flex gap-3 pt-1">
                <Link to={ROUTES.LOGIN} className="flex-1">
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.SIGNUP} className="flex-1">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
