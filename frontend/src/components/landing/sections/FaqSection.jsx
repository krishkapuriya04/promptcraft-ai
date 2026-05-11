import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "..";
import { faqs } from "../../../data/landingContent";

export default function FaqSection() {
  const [activeQuestion, setActiveQuestion] = useState(faqs[0].question);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="FAQ"
          title="Everything you need to know"
          description="Clear answers on capabilities, team workflows, and code quality."
        />
        <div className="mt-10 space-y-3">
          {faqs.map((faq) => {
            const isOpen = faq.question === activeQuestion;
            return (
              <article key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.03]">
                <button
                  type="button"
                  onClick={() => setActiveQuestion(isOpen ? "" : faq.question)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-white md:text-base">{faq.question}</span>
                  <span className="text-brand-200">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-slate-300">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
