import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function AnimatedModalWrapper({ isOpen, children }) {
  const reduced = useReducedMotion();

  const backdropMotion = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const panelMotion = reduced
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 } };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div {...backdropMotion} className="fixed inset-0 z-[90] bg-slate-950/80">
          <motion.div {...panelMotion}>{children}</motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
