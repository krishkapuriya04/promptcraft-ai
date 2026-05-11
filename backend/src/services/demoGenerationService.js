function getThemeShell(theme) {
  const shells = {
    Dark: {
      page: "bg-slate-950 text-slate-100",
      nav: "border-white/10 bg-slate-950/90 backdrop-blur",
      card: "border-white/10 bg-white/[0.04]",
      accent: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/30",
      muted: "text-slate-400",
      ring: "ring-white/10",
    },
    Light: {
      page: "bg-slate-50 text-slate-900",
      nav: "border-slate-200 bg-white/95 backdrop-blur",
      card: "border-slate-200 bg-white shadow-sm",
      accent: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md",
      muted: "text-slate-600",
      ring: "ring-slate-200",
    },
    "Modern Gradient": {
      page: "bg-gradient-to-b from-slate-950 via-violet-950/70 to-fuchsia-950/40 text-white",
      nav: "border-white/10 bg-black/25 backdrop-blur-md",
      card: "border-white/15 bg-white/[0.07] backdrop-blur-md",
      accent:
        "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-900/40 hover:from-violet-400 hover:to-fuchsia-400",
      muted: "text-violet-100/85",
      ring: "ring-white/15",
    },
    Minimal: {
      page: "bg-white text-slate-900",
      nav: "border-slate-100 bg-white",
      card: "border border-slate-100 bg-slate-50/80",
      accent: "bg-slate-900 text-white hover:bg-slate-800",
      muted: "text-slate-500",
      ring: "ring-slate-200",
    },
    Glassmorphism: {
      page: "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white",
      nav: "border-white/20 bg-white/10 backdrop-blur-xl",
      card: "border-white/20 bg-white/10 backdrop-blur-xl shadow-xl shadow-black/20",
      accent: "border border-white/25 bg-white/15 text-white hover:bg-white/25 backdrop-blur",
      muted: "text-slate-300",
      ring: "ring-white/20",
    },
  };
  return shells[theme] || shells.Dark;
}

function scoreTemplate(tpl, prompt, category) {
  const text = `${prompt} ${category}`.toLowerCase();
  let score = 0;
  for (const kw of tpl.keywords) {
    if (text.includes(kw)) score += 3;
  }
  if (tpl.displayCategory.toLowerCase() === String(category).toLowerCase()) score += 10;
  if (tpl.categoryAliases) {
    for (const alias of tpl.categoryAliases) {
      if (String(category).toLowerCase() === alias.toLowerCase()) score += 7;
    }
  }
  return score;
}

function selectTemplate(prompt, category) {
  let best = TEMPLATES[0];
  let bestScore = -1;
  for (const tpl of TEMPLATES) {
    const s = scoreTemplate(tpl, prompt, category);
    if (s > bestScore) {
      bestScore = s;
      best = tpl;
    }
  }
  if (bestScore <= 0) {
    const byCategory = TEMPLATES.find(
      (t) =>
        t.displayCategory === category ||
        (t.categoryAliases && t.categoryAliases.includes(category))
    );
    return byCategory || TEMPLATES.find((t) => t.id === "saas");
  }
  return best;
}

function buildGym(shell) {
  const sections = ["Navigation", "Hero", "Programs", "Trainers", "CTA", "Footer"];
  const code = `function GeneratedComponent() {
  return (
    <div className={"min-h-screen " + "${shell.page}"}>
      <header className={"border-b " + "${shell.nav}"}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-lg font-bold tracking-tight">IronPulse Gym</span>
          <nav className="hidden gap-6 text-sm md:flex ${shell.muted}">
            <a href="#programs" className="hover:text-white">Programs</a>
            <a href="#trainers" className="hover:text-white">Trainers</a>
            <a href="#join" className="hover:text-white">Join</a>
          </nav>
          <button type="button" className={"rounded-lg px-4 py-2 text-sm font-semibold " + "${shell.accent}"}>Book trial</button>
        </div>
      </header>
      <main>
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">Train smarter</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Strength that fits your life.</h1>
          <p className={"mt-4 max-w-2xl text-lg " + "${shell.muted}"}>Coached sessions, progressive programming, and a community that shows up for you.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className={"rounded-xl px-6 py-3 text-sm font-semibold " + "${shell.accent}"}>Start free week</button>
            <button type="button" className={"rounded-xl border px-6 py-3 text-sm font-semibold " + "${shell.card}"}>View schedule</button>
          </div>
        </section>
        <section id="programs" className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold">Programs</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {["Hypertrophy", "Conditioning", "Mobility"].map((label) => (
                <article key={label} className={"rounded-2xl border p-6 " + "${shell.card}"}>
                  <h3 className="text-lg font-semibold">{label}</h3>
                  <p className={"mt-2 text-sm " + "${shell.muted}"}>Structured blocks, tracked lifts, and weekly check-ins.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="trainers" className={"py-16 " + "${shell.card}"}>
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold">Coaches</h2>
            <p className={"mt-2 max-w-2xl " + "${shell.muted}"}>Certified trainers across powerlifting, Olympic lifting, and rehab-focused strength.</p>
          </div>
        </section>
        <section id="join" className="py-20 text-center">
          <h2 className="text-3xl font-bold">Ready when you are.</h2>
          <p className={"mt-2 " + "${shell.muted}"}>First session on us — no contract.</p>
          <button type="button" className={"mt-6 rounded-xl px-8 py-3 text-sm font-semibold " + "${shell.accent}"}>Claim your trial</button>
        </section>
      </main>
      <footer className={"border-t py-10 " + "${shell.nav}"}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm md:flex-row ${shell.muted}">
          <span>© IronPulse Gym</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </div>
  );
}`;
  return {
    title: "IronPulse Gym",
    description: "High-energy gym landing with programs, coaches, and conversion-focused CTAs.",
    code,
    sections,
  };
}

function buildSaaS(shell) {
  const sections = ["Nav", "Hero", "Logos", "Features", "Pricing", "Footer"];
  const code = `function GeneratedComponent() {
  return (
    <div className={"min-h-screen " + "${shell.page}"}>
      <header className={"border-b " + "${shell.nav}"}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-lg font-semibold">NimbusOps</span>
          <nav className={"hidden gap-6 text-sm md:flex " + "${shell.muted}"}>
            <a href="#features">Product</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <button type="button" className={"rounded-lg px-4 py-2 text-sm font-semibold " + "${shell.accent}"}>Get started</button>
        </div>
      </header>
      <main>
        <section className="mx-auto max-w-6xl px-4 py-20 text-center">
          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-sky-300">New · Analytics 2.0</span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">Ship reliable SaaS faster.</h1>
          <p className={"mx-auto mt-4 max-w-2xl text-lg " + "${shell.muted}"}>Observability, feature flags, and customer insights in one calm dashboard.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button type="button" className={"rounded-xl px-6 py-3 text-sm font-semibold " + "${shell.accent}"}>Start free trial</button>
            <button type="button" className={"rounded-xl border px-6 py-3 text-sm font-semibold " + "${shell.card}"}>Watch demo</button>
          </div>
        </section>
        <section className="border-y border-white/10 py-12">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">Trusted by product teams</p>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-8 text-sm font-semibold text-slate-500">
            {["Acme", "Northwind", "Globex", "Umbrella"].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </section>
        <section id="features" className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-2xl font-bold">Everything in sync</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Live metrics", d: "Latency, errors, and saturation in one view." },
              { t: "Safe releases", d: "Gradual rollouts with instant rollback." },
              { t: "Segment insights", d: "Understand power users vs churn risk." },
            ].map((f) => (
              <article key={f.t} className={"rounded-2xl border p-6 " + "${shell.card}"}>
                <h3 className="text-lg font-semibold">{f.t}</h3>
                <p className={"mt-2 text-sm " + "${shell.muted}"}>{f.d}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="pricing" className={"py-20 " + "${shell.card}"}>
          <div className="mx-auto max-w-lg rounded-3xl border border-white/15 bg-slate-950/40 p-8 text-center">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className={"mt-2 text-4xl font-bold " + "${shell.muted}"}>$49<span className="text-base font-normal">/mo</span></p>
            <ul className={"mt-6 space-y-2 text-left text-sm " + "${shell.muted}"}>
              <li>✓ Unlimited projects</li>
              <li>✓ SSO & audit logs</li>
              <li>✓ Priority support</li>
            </ul>
            <button type="button" className={"mt-8 w-full rounded-xl py-3 text-sm font-semibold " + "${shell.accent}"}>Upgrade</button>
          </div>
        </section>
      </main>
      <footer className={"border-t py-10 " + "${shell.nav}"}>
        <div className={"mx-auto max-w-6xl px-4 text-center text-sm " + "${shell.muted}"}>© NimbusOps · Security · Status</div>
      </footer>
    </div>
  );
}`;
  return {
    title: "NimbusOps SaaS",
    description: "Product-led SaaS marketing page with hero, social proof, features, and pricing.",
    code,
    sections,
  };
}

function buildRestaurant(shell) {
  const sections = ["Nav", "Hero", "Menu highlights", "Reservations", "Footer"];
  const code = `function GeneratedComponent() {
  return (
    <div className={"min-h-screen " + "${shell.page}"}>
      <header className={"border-b " + "${shell.nav}"}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="font-serif text-xl font-semibold">Laurel &amp; Stone</span>
          <button type="button" className={"rounded-lg px-4 py-2 text-sm font-semibold " + "${shell.accent}"}>Reserve</button>
        </div>
      </header>
      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400">Tonight&apos;s tasting menu</p>
            <h1 className="mt-3 text-4xl font-serif font-bold md:text-5xl">Seasonal plates, open fire.</h1>
            <p className={"mt-4 " + "${shell.muted}"}>Local farms, natural wine, and a dining room made for lingering.</p>
          </div>
          <div className={"rounded-3xl border p-8 " + "${shell.card}"}>
            <h2 className="text-lg font-semibold">Chef&apos;s picks</h2>
            <ul className={"mt-4 space-y-3 text-sm " + "${shell.muted}"}>
              <li>Charred brassicas · brown butter</li>
              <li>Wild halibut · citrus fennel</li>
              <li>Dark chocolate crémeux</li>
            </ul>
          </div>
        </section>
        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl font-serif font-bold">Reserve your table</h2>
            <p className={"mt-2 " + "${shell.muted}"}>Thu–Sun · 5 seatings</p>
            <button type="button" className={"mt-6 rounded-xl px-8 py-3 text-sm font-semibold " + "${shell.accent}"}>Book on OpenTable</button>
          </div>
        </section>
      </main>
      <footer className={"border-t py-8 text-center text-sm " + "${shell.muted}"}>123 Market St · laurelandstone.co</footer>
    </div>
  );
}`;
  return {
    title: "Laurel & Stone Restaurant",
    description: "Elegant restaurant landing with hero storytelling and reservation CTA.",
    code,
    sections,
  };
}

function buildPortfolio(shell) {
  const sections = ["Header", "Hero", "Work grid", "About", "Contact"];
  const code = `function GeneratedComponent() {
  return (
    <div className={"min-h-screen " + "${shell.page}"}>
      <header className={"border-b " + "${shell.nav}"}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
          <span className="text-sm font-semibold tracking-[0.2em]">AVERY CHEN</span>
          <a href="#contact" className={"text-sm " + "${shell.muted}"}>Contact</a>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Product design for teams who care about craft.</h1>
        <p className={"mt-6 max-w-2xl text-lg " + "${shell.muted}"}>Previously at Stripe-adjacent startups. Focused on design systems, onboarding, and clarity under complexity.</p>
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Selected work</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {["Fintech onboarding", "AI devtools", "Climate dashboard"].map((w) => (
              <article key={w} className={"aspect-video rounded-2xl border p-6 " + "${shell.card}"}>
                <h3 className="font-semibold">{w}</h3>
                <p className={"mt-2 text-sm " + "${shell.muted}"}>Case study · 2024</p>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" className="mt-20 border-t border-white/10 pt-12">
          <h2 className="text-xl font-bold">Let&apos;s collaborate</h2>
          <p className={"mt-2 " + "${shell.muted}"}>hello@averychen.design</p>
          <button type="button" className={"mt-4 rounded-lg px-5 py-2.5 text-sm font-semibold " + "${shell.accent}"}>Download résumé</button>
        </section>
      </main>
    </div>
  );
}`;
  return {
    title: "Avery Chen — Portfolio",
    description: "Minimal creative portfolio with work grid and contact band.",
    code,
    sections,
  };
}

function buildEcommerce(shell) {
  const sections = ["Top bar", "Hero", "Product grid", "Trust", "Footer"];
  const code = `function GeneratedComponent() {
  return (
    <div className={"min-h-screen " + "${shell.page}"}>
      <div className="border-b border-emerald-500/30 bg-emerald-950/30 py-2 text-center text-xs font-medium text-emerald-200">Free shipping over $75</div>
      <header className={"border-b " + "${shell.nav}"}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-lg font-bold">Field &amp; Thread</span>
          <button type="button" className={"rounded-lg px-4 py-2 text-sm font-semibold " + "${shell.accent}"}>Cart (2)</button>
        </div>
      </header>
      <main>
        <section className="mx-auto max-w-6xl px-4 py-14 md:flex md:items-center md:gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold md:text-5xl">Gear built for everyday miles.</h1>
            <p className={"mt-4 " + "${shell.muted}"}>Technical layers, recycled fabrics, lifetime repairs.</p>
            <button type="button" className={"mt-8 rounded-xl px-6 py-3 text-sm font-semibold " + "${shell.accent}"}>Shop new arrivals</button>
          </div>
          <div className={"mt-10 flex-1 rounded-3xl border p-10 text-center " + "${shell.card}"}>Hero image</div>
        </section>
        <section className="border-t border-white/10 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-xl font-bold">Bestsellers</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {["Trail shell $148", "Merino base $68", "Packable down $198"].map((p) => (
                <article key={p} className={"rounded-2xl border p-5 " + "${shell.card}"}>
                  <div className="aspect-[4/3] rounded-xl bg-slate-800/50" />
                  <p className="mt-4 font-semibold">{p}</p>
                  <button type="button" className={"mt-3 w-full rounded-lg py-2 text-sm " + "${shell.accent}"}>Add to cart</button>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={"py-12 text-center text-sm " + "${shell.muted}"}>★★★★★ 4.9 average · 12k reviews</section>
      </main>
      <footer className={"border-t py-8 text-center text-sm " + "${shell.muted}"}>Returns · Help · Careers</footer>
    </div>
  );
}`;
  return {
    title: "Field & Thread Shop",
    description: "E-commerce style landing with hero, product grid, and trust strip.",
    code,
    sections,
  };
}

const TEMPLATES = [
  {
    id: "gym",
    displayCategory: "Gym",
    keywords: ["gym", "fitness", "workout", "train", "coach", "lifting", "crossfit", "strength", "cardio"],
    categoryAliases: [],
    build: buildGym,
  },
  {
    id: "saas",
    displayCategory: "SaaS",
    keywords: ["saas", "software", "b2b", "platform", "dashboard", "api", "cloud", "subscription", "analytics", "devops"],
    categoryAliases: ["Startup"],
    build: buildSaaS,
  },
  {
    id: "restaurant",
    displayCategory: "Restaurant",
    keywords: ["restaurant", "food", "menu", "dining", "chef", "cafe", "bistro", "delivery", "kitchen", "wine"],
    categoryAliases: [],
    build: buildRestaurant,
  },
  {
    id: "portfolio",
    displayCategory: "Portfolio",
    keywords: ["portfolio", "designer", "developer", "photographer", "freelance", "resume", "cv", "showcase", "creative"],
    categoryAliases: ["Agency", "Blog"],
    build: buildPortfolio,
  },
  {
    id: "ecommerce",
    displayCategory: "Ecommerce",
    keywords: ["shop", "store", "ecommerce", "e-commerce", "cart", "checkout", "product", "retail", "marketplace", "buy"],
    categoryAliases: [],
    build: buildEcommerce,
  },
];

async function buildDemoGeneration({ prompt, category, theme }) {
  const shell = getThemeShell(theme);
  const tpl = selectTemplate(prompt, category);
  const built = tpl.build(shell);
  return {
    title: built.title,
    description: built.description,
    category,
    generatedCode: built.code,
    detectedSections: built.sections,
    demoMode: true,
  };
}

module.exports = { buildDemoGeneration };
