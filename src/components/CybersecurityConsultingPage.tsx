import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  GraduationCap,
  Menu,
  MessageSquareCode,
  Route,
  ScanSearch,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Logo from "./Logo";
import FooterSection from "./FooterSection";
import ServiceLanguageToggle from "./ServiceLanguageToggle";

interface CybersecurityConsultingPageProps {
  onBack: () => void;
  onContact: () => void;
}

function RiskConsultingIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 720 520" role="img" aria-label="Consultant en cybersécurité présentant une matrice de risques et une feuille de route" className="h-full w-full">
      <defs>
        <linearGradient id="consulting-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fafbf9" /><stop offset="100%" stopColor="#eef5ef" />
        </linearGradient>
        <filter id="consulting-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#0a1b33" floodOpacity=".12" />
        </filter>
      </defs>
      <rect width="720" height="520" rx="44" fill="url(#consulting-bg)" />
      <g opacity=".25" stroke="#91b49c">
        <path d="M0 104h720M0 208h720M0 312h720M0 416h720" />
        <path d="M120 0v520M240 0v520M360 0v520M480 0v520M600 0v520" />
      </g>

      <g filter="url(#consulting-shadow)">
        <rect x="268" y="64" width="384" height="320" rx="32" fill="#ffffff" />
        <rect x="292" y="88" width="336" height="44" rx="15" fill="#0a1b33" />
        <rect x="292" y="153" width="178" height="200" rx="20" fill="#f3f7f4" />
        <rect x="490" y="153" width="138" height="92" rx="20" fill="#f6f3ed" />
        <rect x="490" y="261" width="138" height="92" rx="20" fill="#edf6f2" />

        {[
          { x: 312, y: 174, color: "#75bf99" },
          { x: 370, y: 174, color: "#d7bd68" },
          { x: 428, y: 174, color: "#e68572" },
          { x: 312, y: 232, color: "#b7d8c3" },
          { x: 370, y: 232, color: "#75bf99" },
          { x: 428, y: 232, color: "#d7bd68" },
          { x: 312, y: 290, color: "#dce9df" },
          { x: 370, y: 290, color: "#b7d8c3" },
          { x: 428, y: 290, color: "#75bf99" },
        ].map((cell) => <rect key={`${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width="42" height="42" rx="10" fill={cell.color} />)}

        <path d="M512 216l23-25 23 13 38-30" fill="none" stroke="#0b7c9e" strokeWidth="5" strokeLinecap="round" />
        <circle cx="596" cy="174" r="6" fill="#0b7c9e" />
        <rect x="514" y="286" width="82" height="9" rx="4.5" fill="#82c5a0" />
        <rect x="514" y="310" width="56" height="8" rx="4" fill="#c8ddd0" />
      </g>

      <g transform="translate(44 154)" filter="url(#consulting-shadow)">
        <circle cx="94" cy="70" r="50" fill="#0a1b33" />
        <ellipse cx="94" cy="74" rx="34" ry="38" fill="#ad745d" />
        <path d="M61 72c2-38 64-49 69 2-14-13-25-17-38-17-12 0-21 4-31 15Z" fill="#172b3c" />
        <path d="M34 208c5-70 40-103 60-103s55 33 60 103Z" fill="#0b7c9e" />
        <path d="M70 112l24 36 24-36" fill="#eef7f3" />
        <path d="M141 154l84-38" stroke="#0a1b33" strokeWidth="8" strokeLinecap="round" />
        <circle cx="226" cy="116" r="11" fill="#0a1b33" />
      </g>

      <g transform="translate(434 377)" filter="url(#consulting-shadow)">
        <rect width="212" height="82" rx="24" fill="#ffffff" />
        <circle cx="34" cy="41" r="12" fill="#22c55e" />
        <rect x="58" y="25" width="116" height="10" rx="5" fill="#d5e3d9" />
        <rect x="58" y="48" width="80" height="8" rx="4" fill="#edf3ef" />
      </g>

      {!compact && (
        <g>
          <rect x="36" y="35" width="190" height="38" rx="19" fill="#ffffff" opacity=".95" />
          <circle cx="59" cy="54" r="6" fill="#d7bd68" />
          <text x="76" y="59" fill="#0a1b33" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600">Risques prioritaires</text>
        </g>
      )}
    </svg>
  );
}

function ConsultingWorkflowIllustration() {
  const steps = [
    { number: "01", label: "Audit", x: 28 },
    { number: "02", label: "Stratégie", x: 260 },
    { number: "03", label: "Formation", x: 492 },
  ];
  return (
    <svg viewBox="0 0 700 320" role="img" aria-label="Workflow de conseil: audit, stratégie et formation des équipes" className="h-full w-full">
      <defs>
        <linearGradient id="consulting-flow-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071529" /><stop offset="100%" stopColor="#244d3a" />
        </linearGradient>
      </defs>
      <rect width="700" height="320" rx="38" fill="url(#consulting-flow-bg)" />
      <path d="M190 160h70M422 160h70" stroke="#82c5a0" strokeWidth="3" strokeDasharray="8 9" />
      {steps.map((step, index) => (
        <g key={step.number}>
          <rect x={step.x} y="84" width="180" height="152" rx="28" fill="#ffffff" fillOpacity=".075" stroke="#ffffff" strokeOpacity=".15" />
          <circle cx={step.x + 40} cy="124" r="20" fill={index === 1 ? "#82c5a0" : "#ffffff"} fillOpacity={index === 1 ? 1 : .12} />
          <text x={step.x + 40} y="130" textAnchor="middle" fill={index === 1 ? "#071529" : "#ffffff"} fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700">{step.number}</text>
          <text x={step.x + 24} y="185" fill="#ffffff" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="600">{step.label}</text>
          <rect x={step.x + 24} y="202" width={index === 1 ? 100 : 78} height="6" rx="3" fill="#82c5a0" fillOpacity=".65" />
        </g>
      ))}
    </svg>
  );
}

export default function CybersecurityConsultingPage({ onBack, onContact }: CybersecurityConsultingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = "Conseil en Cybersécurité | The Shield Corporation";
    description?.setAttribute("content", "Conseil en cybersécurité: évaluation des risques, stratégie personnalisée, gouvernance, formation et sensibilisation des équipes.");
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.setAttribute("content", previousDescription);
    };
  }, []);

  const benefits = [
    { title: "Évaluation complète", text: "Nous cartographions les risques techniques, humains et organisationnels de votre entreprise.", icon: ScanSearch },
    { title: "Plan stratégique personnalisé", text: "Les priorités, budgets et responsabilités sont traduits en feuille de route réaliste.", icon: Route },
    { title: "Formation et sensibilisation", text: "Vos équipes développent les réflexes nécessaires pour réduire durablement le risque humain.", icon: GraduationCap },
  ];
  const process = [
    { title: "Audit", text: "Nous analysons les systèmes, pratiques, responsabilités et exigences réglementaires de votre organisation." },
    { title: "Élaboration de la stratégie", text: "Nous construisons un plan priorisé qui relie chaque mesure de sécurité à un enjeu métier." },
    { title: "Formation et suivi", text: "Nous accompagnons les équipes, mesurons les progrès et ajustons la feuille de route dans le temps." },
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
          <button onClick={onContact} className="hidden cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[12px] font-semibold text-white active:scale-95 md:inline-flex">Planifier une consultation <ArrowRight className="h-4 w-4" /></button>
          <button onClick={() => setIsMenuOpen((open) => !open)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-50 md:hidden" aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-[82px] rounded-[26px] border border-slate-200 bg-white p-3 shadow-xl md:hidden">
            {["presentation", "benefices", "processus"].map((id) => <button key={id} onClick={() => { setIsMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }} className="block w-full cursor-pointer rounded-2xl px-4 py-3 text-left text-[13px] font-semibold capitalize hover:bg-slate-50">{id}</button>)}
            <button onClick={onContact} className="mt-2 w-full cursor-pointer rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white">Planifier une consultation</button>
          </div>
        )}
      </header>

      <main>
        <section className="px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center overflow-hidden rounded-[40px] border border-slate-200/60 bg-white px-7 py-12 shadow-[0_40px_100px_-30px_rgba(10,27,51,0.12)] md:grid-cols-12 md:rounded-[48px] md:px-14 lg:px-20">
            <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-emerald-100/55 blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 space-y-7 md:col-span-6">
              <button onClick={onBack} className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-slate-text hover:text-navy"><ArrowLeft className="h-4 w-4" />Retour aux services</button>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-700/15 bg-emerald-700/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700"><MessageSquareCode className="h-3.5 w-3.5" />Stratégie cyber</div>
              <div className="space-y-5">
                <h1 className="max-w-[680px] font-display text-[42px] font-bold leading-[1.03] tracking-[-0.035em] sm:text-[54px] lg:text-[68px]">Conseil en Cybersécurité</h1>
                <p className="max-w-[570px] text-[16px] leading-relaxed text-slate-text md:text-[18px]">Stratégies et recommandations pour protéger votre entreprise.</p>
              </div>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg hover:bg-navy-dark active:scale-95"><Users className="h-4 w-4" />Planifier une consultation</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 mt-10 h-[360px] md:col-span-6 md:mt-0 md:h-[500px]"><RiskConsultingIllustration /></motion.div>
          </div>
        </section>

        <section id="presentation" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white p-3 shadow-[0_24px_70px_-35px_rgba(10,27,51,0.22)] lg:order-1"><div className="h-[350px] overflow-hidden rounded-[28px]"><RiskConsultingIllustration compact /></div></div>
            <div className="order-1 space-y-6 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white"><ClipboardCheck className="h-5 w-5" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">La cybersécurité alignée sur vos enjeux métier</h2>
              <p className="max-w-[620px] text-[15px] leading-8 text-slate-text md:text-[16px]">Nous évaluons vos systèmes, formons vos équipes et proposons des stratégies pour réduire les risques cyber.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Gouvernance", "Gestion des risques", "Conformité", "Sensibilisation"].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold">{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="benefices" className="scroll-mt-28 border-y border-slate-200/50 bg-slate-50/70 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[720px] space-y-4 md:mb-16">
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Des décisions plus claires face au risque cyber</h2>
              <p className="text-[15px] leading-relaxed text-slate-text">Nous transformons les constats techniques en priorités compréhensibles pour les équipes et la direction.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[34px] border border-slate-200 bg-slate-200 md:grid-cols-3">
              {benefits.map(({ title, text, icon: Icon }) => (
                <article key={title} className="min-h-[280px] bg-white p-7 md:p-9">
                  <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700/8 text-emerald-700"><Icon className="h-5 w-5" /></div>
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
                <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Notre accompagnement conseil</h2>
                <p className="text-[15px] leading-relaxed text-slate-text">Le diagnostic devient une feuille de route, puis des pratiques durables dans l’organisation.</p>
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
            <div className="mt-14 overflow-hidden rounded-[38px]"><ConsultingWorkflowIllustration /></div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-navy px-7 py-14 text-white md:px-16 md:py-20">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-emerald-300/5" />
            <div className="relative z-10 max-w-[800px] space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Check className="h-5 w-5 text-emerald-300" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[50px]">Faites de la cybersécurité une décision maîtrisée.</h2>
              <p className="max-w-[620px] text-[15px] leading-relaxed text-white/65">Échangez avec nos consultants pour clarifier vos risques et vos prochaines priorités.</p>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-navy active:scale-95">Contactez nos experts <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
