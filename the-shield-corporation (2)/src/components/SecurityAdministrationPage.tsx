import React from "react";
import { motion } from "motion/react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Check,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Menu,
  MessageCircle,
  ScanSearch,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import Logo from "./Logo";
import FooterSection from "./FooterSection";
import ServiceLanguageToggle from "./ServiceLanguageToggle";
import { companyContact } from "../config/contact";

interface SecurityAdministrationPageProps {
  onBack: () => void;
  onContact: () => void;
}

function SecurityShieldIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 720 520"
      role="img"
      aria-label="Bouclier numérique protégeant des serveurs et des accès informatiques"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="security-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7fbfc" />
          <stop offset="100%" stopColor="#e6f5f2" />
        </linearGradient>
        <linearGradient id="security-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1b33" />
          <stop offset="100%" stopColor="#0b7c9e" />
        </linearGradient>
        <filter id="security-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#0a1b33" floodOpacity=".12" />
        </filter>
      </defs>

      <rect width="720" height="520" rx="44" fill="url(#security-bg)" />
      <g opacity=".32" stroke="#84b8b4">
        <path d="M0 104h720M0 208h720M0 312h720M0 416h720" />
        <path d="M120 0v520M240 0v520M360 0v520M480 0v520M600 0v520" />
      </g>

      <g fill="none" stroke="#41b8ad" strokeWidth="3" strokeDasharray="7 9">
        <path d="M178 164C248 164 260 226 310 239" />
        <path d="M542 164C472 164 460 226 410 239" />
        <path d="M178 372C248 372 260 310 310 296" />
        <path d="M542 372C472 372 460 310 410 296" />
      </g>

      <g filter="url(#security-shadow)">
        <path d="M360 113l116 46v86c0 88-53 144-116 174-63-30-116-86-116-174v-86l116-46Z" fill="url(#security-shield)" />
        <path d="M360 151l79 31v61c0 59-34 101-79 126-45-25-79-67-79-126v-61l79-31Z" fill="#ffffff" fillOpacity=".08" stroke="#ffffff" strokeOpacity=".28" />
        <rect x="326" y="233" width="68" height="70" rx="18" fill="#e8fbf8" />
        <path d="M340 233v-18c0-28 40-28 40 0v18" fill="none" stroke="#0b7c9e" strokeWidth="10" strokeLinecap="round" />
        <circle cx="360" cy="263" r="8" fill="#0a1b33" />
        <path d="M360 269v13" stroke="#0a1b33" strokeWidth="6" strokeLinecap="round" />
      </g>

      {[
        { x: 58, y: 105, status: "#22c55e" },
        { x: 490, y: 105, status: "#22c55e" },
        { x: 58, y: 334, status: "#38bdf8" },
        { x: 490, y: 334, status: "#22c55e" },
      ].map((server, index) => (
        <g key={index} filter="url(#security-shadow)">
          <rect x={server.x} y={server.y} width="172" height="82" rx="23" fill="#ffffff" />
          <rect x={server.x + 24} y={server.y + 22} width="88" height="12" rx="6" fill="#dcebee" />
          <rect x={server.x + 24} y={server.y + 48} width="112" height="10" rx="5" fill="#edf4f5" />
          <circle cx={server.x + 145} cy={server.y + 28} r="6" fill={server.status} />
          <circle cx={server.x + 145} cy={server.y + 54} r="4" fill="#b7cdd2" />
        </g>
      ))}

      {!compact && (
        <g>
          <rect x="38" y="35" width="176" height="38" rx="19" fill="#ffffff" opacity=".94" />
          <circle cx="61" cy="54" r="6" fill="#22c55e" />
          <text x="78" y="59" fill="#0a1b33" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600">
            Périmètre protégé
          </text>
        </g>
      )}
    </svg>
  );
}

function SecurityWorkflowIllustration() {
  const steps = [
    { number: "01", label: "Risques", x: 28 },
    { number: "02", label: "Protection", x: 260 },
    { number: "03", label: "Alertes", x: 492 },
  ];

  return (
    <svg
      viewBox="0 0 700 320"
      role="img"
      aria-label="Workflow de sécurité: analyse des risques, configuration des protections et alertes"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="security-flow-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071529" />
          <stop offset="100%" stopColor="#0b4f58" />
        </linearGradient>
      </defs>
      <rect width="700" height="320" rx="38" fill="url(#security-flow-bg)" />
      <path d="M190 160h70M422 160h70" stroke="#55d7c8" strokeWidth="3" strokeDasharray="8 9" />
      {steps.map((step, index) => (
        <g key={step.number}>
          <rect x={step.x} y="84" width="180" height="152" rx="28" fill="#ffffff" fillOpacity=".075" stroke="#ffffff" strokeOpacity=".15" />
          <circle cx={step.x + 40} cy="124" r="20" fill={index === 1 ? "#55d7c8" : "#ffffff"} fillOpacity={index === 1 ? 1 : .12} />
          <text x={step.x + 40} y="130" textAnchor="middle" fill={index === 1 ? "#071529" : "#ffffff"} fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700">
            {step.number}
          </text>
          <text x={step.x + 24} y="185" fill="#ffffff" fontFamily="Outfit, sans-serif" fontSize="21" fontWeight="600">
            {step.label}
          </text>
          <rect x={step.x + 24} y="202" width={index === 1 ? 110 : 80} height="6" rx="3" fill="#55d7c8" fillOpacity=".6" />
        </g>
      ))}
    </svg>
  );
}

export default function SecurityAdministrationPage({
  onBack,
  onContact,
}: SecurityAdministrationPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");

    document.title = "Administration de la Sécurité IT | The Shield Corporation";
    description?.setAttribute(
      "content",
      "Administration de la sécurité IT: protection des systèmes, gestion des accès, monitoring, alertes et conformité réglementaire.",
    );
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.setAttribute("content", previousDescription);
      }
    };
  }, []);

  const handleWhatsApp = () => {
    const message = "Bonjour The Shield Corporation, je souhaite planifier une évaluation de la sécurité IT de mon infrastructure.";
    window.open(`https://wa.me/${companyContact.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const benefits = [
    { title: "Protection contre les cyberattaques", text: "Des défenses ajustées à vos actifs et à votre exposition réelle.", icon: ShieldCheck },
    { title: "Gestion des accès et droits", text: "Chaque utilisateur dispose uniquement des privilèges nécessaires.", icon: KeyRound },
    { title: "Surveillance proactive", text: "Les comportements suspects sont détectés et traités rapidement.", icon: Activity },
    { title: "Conformité réglementaire", text: "Des contrôles documentés pour soutenir vos exigences de conformité.", icon: BadgeCheck },
  ];

  const process = [
    { title: "Analyse des risques", text: "Nous identifions les actifs critiques, les vulnérabilités et les scénarios de menace prioritaires." },
    { title: "Configuration de la sécurité", text: "Nous renforçons les accès, les politiques, les pare-feu et les systèmes de protection des terminaux." },
    { title: "Monitoring et alertes", text: "Nous surveillons les événements de sécurité et organisons une réponse claire face aux anomalies." },
  ];

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4 md:px-8">
        <div className="flex w-full max-w-[1240px] items-center justify-between rounded-full border border-slate-200/60 bg-white/90 px-5 py-3 shadow-[0_18px_50px_rgba(10,27,51,0.07)] backdrop-blur-xl">
          <button onClick={onBack} aria-label="Retour à l’accueil" className="cursor-pointer">
            <Logo iconSize={32} theme="brand" />
          </button>
          <nav className="hidden items-center gap-7 text-[12px] font-semibold text-slate-text md:flex">
            <button onClick={() => document.getElementById("presentation")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">Le service</button>
            <button onClick={() => document.getElementById("benefices")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">Bénéfices</button>
            <button onClick={() => document.getElementById("processus")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">Notre méthode</button>
          </nav>
          <ServiceLanguageToggle />
          <button onClick={onContact} className="hidden cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[12px] font-semibold text-white active:scale-95 md:inline-flex">
            Planifier une évaluation
            <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => setIsMenuOpen((open) => !open)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-50 md:hidden" aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-[82px] rounded-[26px] border border-slate-200 bg-white p-3 shadow-xl md:hidden">
            {["presentation", "benefices", "processus"].map((id) => (
              <button key={id} onClick={() => { setIsMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }} className="block w-full cursor-pointer rounded-2xl px-4 py-3 text-left text-[13px] font-semibold capitalize hover:bg-slate-50">
                {id}
              </button>
            ))}
            <button onClick={onContact} className="mt-2 w-full cursor-pointer rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white">
              Planifier une évaluation
            </button>
          </div>
        )}
      </header>

      <main>
        <section className="px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center overflow-hidden rounded-[40px] border border-slate-200/60 bg-white px-7 py-12 shadow-[0_40px_100px_-30px_rgba(10,27,51,0.12)] md:grid-cols-12 md:rounded-[48px] md:px-14 lg:px-20">
            <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 space-y-7 md:col-span-6">
              <button onClick={onBack} className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-slate-text hover:text-navy">
                <ArrowLeft className="h-4 w-4" />
                Retour aux services
              </button>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-700/15 bg-emerald-700/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                <LockKeyhole className="h-3.5 w-3.5" />
                Gouvernance & protection
              </div>
              <div className="space-y-5">
                <h1 className="max-w-[680px] font-display text-[42px] font-bold leading-[1.03] tracking-[-0.035em] sm:text-[54px] lg:text-[68px]">
                  Administration de la Sécurité IT
                </h1>
                <p className="max-w-[560px] text-[16px] leading-relaxed text-slate-text md:text-[18px]">
                  Protégez vos données et vos systèmes contre toute menace.
                </p>
              </div>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg hover:bg-navy-dark active:scale-95">
                <ScanSearch className="h-4 w-4" />
                Planifier une évaluation sécurité
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 mt-10 h-[360px] md:col-span-6 md:mt-0 md:h-[500px]">
              <SecurityShieldIllustration />
            </motion.div>
          </div>
        </section>

        <section id="presentation" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white p-3 shadow-[0_24px_70px_-35px_rgba(10,27,51,0.22)] lg:order-1">
              <div className="h-[350px] overflow-hidden rounded-[28px]"><SecurityShieldIllustration compact /></div>
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white"><Server className="h-5 w-5" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Une sécurité administrée, pas seulement installée</h2>
              <p className="max-w-[620px] text-[15px] leading-8 text-slate-text md:text-[16px]">
                Nous mettons en place des mesures de sécurité avancées, monitorons vos systèmes et assurons la conformité aux normes.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Firewall", "MFA & identités", "EDR", "Politiques d’accès"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="benefices" className="scroll-mt-28 border-y border-slate-200/50 bg-slate-50/70 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[720px] space-y-4 md:mb-16">
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Une défense active sur tout votre périmètre</h2>
              <p className="text-[15px] leading-relaxed text-slate-text">La sécurité reste alignée sur vos utilisateurs, vos systèmes et vos obligations.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[34px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ title, text, icon: Icon }) => (
                <article key={title} className="min-h-[260px] bg-white p-7 md:p-8">
                  <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700/8 text-emerald-700"><Icon className="h-5 w-5" /></div>
                  <h3 className="mb-3 font-display text-[19px] font-semibold">{title}</h3>
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
                <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Notre processus de sécurisation</h2>
                <p className="text-[15px] leading-relaxed text-slate-text">Nous passons du risque observé à une protection mesurable et suivie.</p>
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
            <div className="mt-14 overflow-hidden rounded-[38px]"><SecurityWorkflowIllustration /></div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-navy px-7 py-14 text-white md:px-16 md:py-20">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-emerald-300/5" />
            <div className="relative z-10 max-w-[800px] space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Check className="h-5 w-5 text-emerald-300" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[50px]">Sécurisez votre infrastructure avant le prochain incident.</h2>
              <p className="max-w-[620px] text-[15px] leading-relaxed text-white/65">Nos experts évaluent votre exposition et définissent les protections prioritaires.</p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <button onClick={onContact} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-navy active:scale-95">
                  Sécurisez votre infrastructure
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={handleWhatsApp} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[13px] font-semibold text-white hover:bg-white/10 active:scale-95">
                  <MessageCircle className="h-4 w-4" />
                  Échanger sur WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
