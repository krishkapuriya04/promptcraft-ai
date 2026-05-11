export default function FooterSection() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">PromptCraft AI</p>
          <p className="mt-1 text-sm text-slate-400">Design and deploy AI websites faster.</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#pricing" className="transition hover:text-white">
            Pricing
          </a>
          <a href="#home" className="transition hover:text-white">
            Product
          </a>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <a href="https://x.com" className="transition hover:text-white" aria-label="X">
            X
          </a>
          <a href="https://github.com" className="transition hover:text-white" aria-label="GitHub">
            GitHub
          </a>
          <a href="https://linkedin.com" className="transition hover:text-white" aria-label="LinkedIn">
            LinkedIn
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 w-full max-w-7xl text-xs text-slate-500">
        Copyright © {new Date().getFullYear()} PromptCraft AI. All rights reserved.
      </p>
    </footer>
  );
}
