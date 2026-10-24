import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bug,
  Check,
  Code2,
  FileCheck2,
  Gauge,
  Menu,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import Logo from "./Logo";
import FooterSection from "./FooterSection";
import ServiceLanguageToggle from "./ServiceLanguageToggle";

interface WebApplicationAuditPageProps {
  onBack: () => void;
  onContact: () => void;
}

function WebAuditIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 720 520"
      role="img"
      aria-label="Interface d’application web analysée avec alertes de sécurité et indicateurs de performance"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="web-audit-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fbfd" />
          <stop offset="100%" stopColor="#f2edf8" />
        </linearGradient>
        <linearGradient id="web-audit-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1b33" />
          <stop offset="100%" stopColor="#24375a" />
        </linearGradient>
        <filter id="web-audit-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#0a1b33" floodOpacity=".12" />
        </filter>
      </defs>

      <rect width="720" height="520" rx="44" fill="url(#web-audit-bg)" />
      <g opacity=".25" stroke="#a99bc3">
        <path d="M0 104h720M0 208h720M0 312h720M0 416h720" />
        <path d="M120 0v520M240 0v520M360 0v520M480 0v520M600 0v520" />
      </g>

      <g filter="url(#web-audit-shadow)">
        <rect x="72" y="77" width="576" height="365" rx="34" fill="#ffffff" />
        <rect x="72" y="77" width="576" height="56" rx="34" fill="url(#web-audit-panel)" />
        <rect x="72" y="112" width="576" height="21" fill="url(#web-audit-panel)" />
        <circle cx="106" cy="105" r="6" fill="#ef6a67" />
        <circle cx="127" cy="105" r="6" fill="#f4bd50" />
        <circle cx="148" cy="105" r="6" fill="#54c79d" />
        <rect x="195" y="93" width="344" height="24" rx="12" fill="#ffffff" fillOpacity=".1" />

        <rect x="99" y="158" width="150" height="249" rx="20" fill="#f5f7fa" />
        <rect x="273" y="158" width="348" height="105" rx="20" fill="#f6f3fa" />
        <rect x="273" y="282" width="213" height="125" rx="20" fill="#f5f7fa" />
        <rect x="505" y="282" width="116" height="125" rx="20" fill="#fff4f2" stroke="#ef7a6d" strokeOpacity=".32" />

        <rect x="122" y="184" width="84" height="10" rx="5" fill="#0b7c9e" />
        <rect x="122" y="217" width="98" height="8" rx="4" fill="#d5dde6" />
        <rect x="122" y="245" width="78" height="8" rx="4" fill="#d5dde6" />
        <rect x="122" y="273" width="105" height="8" rx="4" fill="#d5dde6" />
        <rect x="122" y="301" width="88" height="8" rx="4" fill="#d5dde6" />

        <path d="M303 229l45-35 42 17 55-29 58 42 82-47" fill="none" stroke="#7857a8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="348" cy="194" r="6" fill="#7857a8" />
        <circle cx="445" cy="182" r="6" fill="#7857a8" />
        <circle cx="585" cy="177" r="6" fill="#7857a8" />

        <circle cx="376" cy="344" r="39" fill="none" stroke="#dce3e9" strokeWidth="12" />
        <path d="M376 305a39 39 0 0 1 36 54" fill="none" stroke="#44bcae" strokeWidth="12" strokeLinecap="round" />
        <text x="376" y="351" textAnchor="middle" fill="#0a1b33" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700">92</text>

        <path d="M544 321h38l11 19-11 19h-38l-11-19Z" fill="#ef7a6d" />
        <path d="M563 331v13M563 351v1" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        <rect x="531" y="378" width="64" height="8" rx="4" fill="#efb5ad" />
      </g>

      <g transform="translate(530 44)" filter="url(#web-audit-shadow)">
        <circle cx="67" cy="67" r="56" fill="#0a1b33" />
        <circle cx="67" cy="67" r="34" fill="none" stroke="#b58dde" strokeWidth="7" />
        <path d="M91 91l32 32" stroke="#0a1b33" strokeWidth="14" strokeLinecap="round" />
        <path d="M48 68l13 13 27-31" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {!compact && (
        <g>
          <rect x="36" y="35" width="176" height="38" rx="19" fill="#ffffff" opacity=".95" />
          <circle cx="59" cy="54" r="6" fill="#ef7a6d" />
          <text x="76" y="59" fill="#0a1b33" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600">
            3 alertes détectées
          </text>
        </g>
      )}
    </svg>
  );
}

function WebAuditWorkflowIllustration() {
  const steps = [
    { number: "01", label: "Architecture", x: 28 },
    { number: "02", label: "Tests", x: 260 },
    { number: "03", label: "Rapport", x: 492 },
  ];

  return (
    <svg
      viewBox="0 0 700 320"
      role="img"
      aria-label="Diagramme d’audit web: analyse de l’architecture, tests de sécurité et rapport"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="web-flow-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071529" />
          <stop offset="100%" stopColor="#392c51" />
        </linearGradient>
      </defs>
      <rect width="700" height="320" rx="38" fill="url(#web-flow-bg)" />
      <path d="M190 160h70M422 160h70" stroke="#b58dde" strokeWidth="3" strokeDasharray="8 9" />
      {steps.map((step, index) => (
        <g key={step.number}>
          <rect x={step.x} y="84" width="180" height="152" rx="28" fill="#ffffff" fillOpacity=".075" stroke="#ffffff" strokeOpacity=".15" />
          <circle cx={step.x + 40} cy="124" r="20" fill={index === 1 ? "#b58dde" : "#ffffff"} fillOpacity={index === 1 ? 1 : .12} />
          <text x={step.x + 40} y="130" textAnchor="middle" fill={index === 1 ? "#071529" : "#ffffff"} fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700">{step.number}</text>
          <text x={step.x + 24} y="185" fill="#ffffff" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="600">{step.label}</text>
          <rect x={step.x + 24} y="202" width={index === 0 ? 112 : 78} height="6" rx="3" fill="#b58dde" fillOpacity=".65" />
        </g>
      ))}
    </svg>
  );
}

export default function WebApplicationAuditPage({ onBack, onContact }: WebApplicationAuditPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");

    document.title = "Audit d’Applications Web | The Shield Corporation";
    description?.setAttribute(
      "content",
      "Audit d’applications web: analyse du code, tests de sécurité, performance, expérience utilisateur et recommandations de correction.",
    );
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.setAttribute("content", previousDescription);
    };
  }, []);

  const benefits = [
    { title: "Performance optimisée", text: "Nous identifions les ralentissements et les points de friction techniques.", icon: Gauge },
    { title: "Sécurité renforcée", text: "Les failles applicatives, erreurs de configuration et risques d’exposition sont documentés.", icon: ShieldCheck },
    { title: "Expérience utilisateur améliorée", text: "Les parcours deviennent plus fiables, rapides et cohérents sur chaque appareil.", icon: Sparkles },
  ];

  const process = [
    { title: "Analyse du code et de l’architecture", text: "Nous examinons les composants, les dépendances, les flux de données et les choix d’architecture." },
    { title: "Tests de sécurité", text: "Nous contrôlons les accès, sessions, entrées utilisateur, API et scénarios applicatifs sensibles." },
    { title: "Rapport et recommandations", text: "Vous recevez des constats priorisés, des preuves et des recommandations directement exploitables." },
  ];

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4 md:px-8">
        <div className="flex w-full max-w-[1240px] items-center justify-between rounded-full border border-slate-200/60 bg-white/90 px-5 py-3 shadow-[0_18px_50px_rgba(10,27,51,0.07)] backdrop-blur-xl">
          <button onClick={onBack} aria-label="Retour à l’accueil" className="cursor-pointer"><Logo iconSize={32} theme="brand" /></button>
          <nav className="hidden items-center gap-7 text-[12px] font-semibold text-slate-text md:flex">
            <button onClick={() => document.getElementById("presentation")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">Le service</button>
            <button onClick={() => document.getElementById("benefices")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">Bénéfices</button>
            <button onClick={() => document.getElementById("processus")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">Notre méthode</button>
          </nav>
          <ServiceLanguageToggle />
          <button onClick={onContact} className="hidden cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[12px] font-semibold text-white active:scale-95 md:inline-flex">
            Demander un audit <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => setIsMenuOpen((open) => !open)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-50 md:hidden" aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-[82px] rounded-[26px] border border-slate-200 bg-white p-3 shadow-xl md:hidden">
            {["presentation", "benefices", "processus"].map((id) => (
              <button key={id} onClick={() => { setIsMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }} className="block w-full cursor-pointer rounded-2xl px-4 py-3 text-left text-[13px] font-semibold capitalize hover:bg-slate-50">{id}</button>
            ))}
            <button onClick={onContact} className="mt-2 w-full cursor-pointer rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white">Demander un audit</button>
          </div>
        )}
      </header>

      <main>
        <section className="px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center overflow-hidden rounded-[40px] border border-slate-200/60 bg-white px-7 py-12 shadow-[0_40px_100px_-30px_rgba(10,27,51,0.12)] md:grid-cols-12 md:rounded-[48px] md:px-14 lg:px-20">
            <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-violet-100/55 blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 space-y-7 md:col-span-6">
              <button onClick={onBack} className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-slate-text hover:text-navy"><ArrowLeft className="h-4 w-4" />Retour aux services</button>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-700/15 bg-violet-700/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-violet-700">
                <Bug className="h-3.5 w-3.5" />Qualité & sécurité applicative
              </div>
              <div className="space-y-5">
                <h1 className="max-w-[680px] font-display text-[42px] font-bold leading-[1.03] tracking-[-0.035em] sm:text-[54px] lg:text-[68px]">Audit d’Applications Web</h1>
                <p className="max-w-[570px] text-[16px] leading-relaxed text-slate-text md:text-[18px]">Assurez la sécurité, performance et fiabilité de vos applications.</p>
              </div>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg hover:bg-navy-dark active:scale-95">
                <ScanSearch className="h-4 w-4" />Demander un audit
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 mt-10 h-[360px] md:col-span-6 md:mt-0 md:h-[500px]">
              <WebAuditIllustration />
            </motion.div>
          </div>
        </section>

        <section id="presentation" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white p-3 shadow-[0_24px_70px_-35px_rgba(10,27,51,0.22)] lg:order-1">
              <div className="h-[350px] overflow-hidden rounded-[28px]"><WebAuditIllustration compact /></div>
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white"><Code2 className="h-5 w-5" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Une lecture complète de votre application</h2>
              <p className="max-w-[620px] text-[15px] leading-8 text-slate-text md:text-[16px]">Nous analysons votre application pour détecter bugs, failles de sécurité, et problèmes de performance, avec recommandations claires.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Front-end", "Back-end", "API", "Base de données"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="benefices" className="scroll-mt-28 border-y border-slate-200/50 bg-slate-50/70 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[720px] space-y-4 md:mb-16">
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Une application plus solide à chaque niveau</h2>
              <p className="text-[15px] leading-relaxed text-slate-text">L’audit transforme les défauts techniques en priorités de correction compréhensibles.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[34px] border border-slate-200 bg-slate-200 md:grid-cols-3">
              {benefits.map(({ title, text, icon: Icon }) => (
                <article key={title} className="min-h-[280px] bg-white p-7 md:p-9">
                  <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-700/8 text-violet-700"><Icon className="h-5 w-5" /></div>
                  <h3 className="mb-3 font-display text-[20px] font-semibold">{title}</h3>
                  <p className="text-[13px] leading-6 text-slate-text">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="processus" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="space-y-5 lg:col-span-5">
                <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Notre méthode d’audit</h2>
                <p className="text-[15px] leading-relaxed text-slate-text">Nous relions chaque constat à son impact et à une action de correction précise.</p>
              </div>
              <div className="space-y-7 lg:col-span-7">
                {process.map((step, index) => (
                  <article key={step.title} className="grid grid-cols-[48px_1fr] gap-5 border-b border-slate-200 pb-7 last:border-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-white">{String(index + 1).padStart(2, "0")}</div>
                    <div><h3 className="mb-2 font-display text-[20px] font-semibold">{step.title}</h3><p className="text-[14px] leading-7 text-slate-text">{step.text}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-14 overflow-hidden rounded-[38px]"><WebAuditWorkflowIllustration /></div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-navy px-7 py-14 text-white md:px-16 md:py-20">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-violet-300/5" />
            <div className="relative z-10 max-w-[800px] space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Check className="h-5 w-5 text-violet-300" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[50px]">Transformez les faiblesses de votre application en plan d’action.</h2>
              <p className="max-w-[620px] text-[15px] leading-relaxed text-white/65">Obtenez une évaluation claire de la sécurité, des performances et de la fiabilité de votre produit web.</p>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-navy active:scale-95">
                Demander un audit <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
