import React from "react";
import { motion } from "motion/react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Gauge,
  Menu,
  Network,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import Logo from "./Logo";
import FooterSection from "./FooterSection";
import ServiceLanguageToggle from "./ServiceLanguageToggle";

interface NetworkAdministrationPageProps {
  onBack: () => void;
  onContact: () => void;
}

function NetworkMapIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 720 520"
      role="img"
      aria-label="Infrastructure réseau sécurisée reliant serveurs, cloud et postes de travail"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="net-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fbfd" />
          <stop offset="100%" stopColor="#e8f5f8" />
        </linearGradient>
        <linearGradient id="net-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0b7c9e" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <filter id="net-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#0a1b33" floodOpacity=".1" />
        </filter>
      </defs>

      <rect width="720" height="520" rx="44" fill="url(#net-bg)" />
      <g opacity=".35" stroke="#8fb9c6" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, index) => (
          <path key={`v-${index}`} d={`M${40 + index * 58} 0V520`} />
        ))}
        {Array.from({ length: 9 }).map((_, index) => (
          <path key={`h-${index}`} d={`M0 ${30 + index * 58}H720`} />
        ))}
      </g>

      <g fill="none" stroke="url(#net-line)" strokeWidth="4" strokeLinecap="round">
        <path d="M175 160C250 160 258 252 350 252" />
        <path d="M545 145C455 145 450 252 350 252" />
        <path d="M160 390C235 390 260 286 350 252" />
        <path d="M560 382C468 382 453 286 350 252" />
      </g>

      <g fill="#0b7c9e">
        <circle cx="240" cy="188" r="5" />
        <circle cx="476" cy="176" r="5" />
        <circle cx="238" cy="337" r="5" />
        <circle cx="479" cy="334" r="5" />
      </g>

      <g filter="url(#net-shadow)">
        <rect x="278" y="180" width="144" height="144" rx="34" fill="#0a1b33" />
        <rect x="312" y="210" width="76" height="18" rx="9" fill="#38bdf8" opacity=".9" />
        <rect x="312" y="244" width="76" height="18" rx="9" fill="#ffffff" opacity=".9" />
        <rect x="312" y="278" width="76" height="18" rx="9" fill="#0b7c9e" />
        <circle cx="372" cy="219" r="3" fill="#e5fbff" />
        <circle cx="372" cy="253" r="3" fill="#0b7c9e" />
        <circle cx="372" cy="287" r="3" fill="#e5fbff" />
      </g>

      <g filter="url(#net-shadow)">
        <rect x="90" y="105" width="170" height="108" rx="26" fill="#ffffff" />
        <rect x="112" y="128" width="126" height="54" rx="10" fill="#e8f5f8" stroke="#b7d8e1" />
        <path d="M131 165l24-18 19 10 32-22 13 10" fill="none" stroke="#0b7c9e" strokeWidth="4" />
        <circle cx="219" cy="145" r="5" fill="#38bdf8" />
      </g>

      <g filter="url(#net-shadow)">
        <rect x="462" y="90" width="168" height="110" rx="28" fill="#ffffff" />
        <path d="M507 154c-18 0-27-11-27-24 0-13 10-23 24-24 6-14 19-22 35-22 20 0 36 13 40 31 14 1 25 12 25 26 0 14-12 26-28 26h-69c-15 0-27-6-27-13Z" fill="#e8f5f8" />
        <path d="M527 130h32M543 114v32" stroke="#0b7c9e" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g filter="url(#net-shadow)">
        <rect x="76" y="342" width="175" height="102" rx="28" fill="#ffffff" />
        <rect x="103" y="366" width="70" height="47" rx="8" fill="#e8f5f8" stroke="#b7d8e1" />
        <path d="M124 425h29M138 413v12" stroke="#0a1b33" strokeWidth="5" strokeLinecap="round" />
        <rect x="188" y="369" width="37" height="10" rx="5" fill="#0b7c9e" />
        <rect x="188" y="388" width="25" height="8" rx="4" fill="#b7d8e1" />
      </g>

      <g filter="url(#net-shadow)">
        <rect x="472" y="332" width="174" height="105" rx="28" fill="#ffffff" />
        <path d="M559 354l34 14v24c0 20-14 34-34 42-20-8-34-22-34-42v-24l34-14Z" fill="#0b7c9e" />
        <path d="m545 392 10 10 20-23" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {!compact && (
        <g>
          <rect x="36" y="36" width="150" height="36" rx="18" fill="#ffffff" opacity=".92" />
          <circle cx="58" cy="54" r="6" fill="#22c55e" />
          <text x="74" y="59" fill="#0a1b33" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600">
            Réseau opérationnel
          </text>
        </g>
      )}
    </svg>
  );
}

function WorkflowIllustration() {
  const steps = [
    { number: "01", label: "Audit", x: 34 },
    { number: "02", label: "Optimisation", x: 270 },
    { number: "03", label: "Monitoring", x: 506 },
  ];

  return (
    <svg
      viewBox="0 0 720 330"
      role="img"
      aria-label="Workflow en trois étapes: audit, optimisation et monitoring"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="workflow-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1b33" />
          <stop offset="100%" stopColor="#0b3851" />
        </linearGradient>
      </defs>
      <rect width="720" height="330" rx="38" fill="url(#workflow-bg)" />
      <path d="M153 166H270M389 166h117" stroke="#5ed5f0" strokeWidth="3" strokeDasharray="8 10" />
      {steps.map((step, index) => (
        <g key={step.number}>
          <rect x={step.x} y="91" width="180" height="150" rx="28" fill="#ffffff" fillOpacity=".08" stroke="#ffffff" strokeOpacity=".16" />
          <circle cx={step.x + 40} cy="131" r="20" fill={index === 1 ? "#5ed5f0" : "#ffffff"} fillOpacity={index === 1 ? 1 : .12} />
          <text x={step.x + 40} y="137" textAnchor="middle" fill={index === 1 ? "#0a1b33" : "#ffffff"} fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700">
            {step.number}
          </text>
          <text x={step.x + 24} y="190" fill="#ffffff" fontFamily="Outfit, sans-serif" fontSize="21" fontWeight="600">
            {step.label}
          </text>
          <rect x={step.x + 24} y="207" width={index === 1 ? 114 : 86} height="6" rx="3" fill="#5ed5f0" fillOpacity=".55" />
        </g>
      ))}
    </svg>
  );
}

export default function NetworkAdministrationPage({
  onBack,
  onContact,
}: NetworkAdministrationPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");

    document.title = "Administration Réseau Professionnelle | The Shield Corporation";
    description?.setAttribute(
      "content",
      "Administration réseau professionnelle: audit, configuration, optimisation, monitoring 24/7 et sécurisation de vos infrastructures.",
    );
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.setAttribute("content", previousDescription);
      }
    };
  }, []);

  const benefits = [
    { title: "Performance maximale", text: "Des flux optimisés pour soutenir vos usages critiques.", icon: Gauge },
    { title: "Surveillance 24/7", text: "Une visibilité continue sur la santé de votre infrastructure.", icon: Activity },
    { title: "Moins d’interruptions", text: "Les anomalies sont détectées avant qu’elles ne bloquent vos équipes.", icon: Clock3 },
    { title: "Sécurité renforcée", text: "Segmentation, contrôle des accès et durcissement des équipements.", icon: ShieldCheck },
  ];

  const process = [
    {
      title: "Audit et analyse",
      text: "Nous cartographions l’existant, les dépendances, les points de congestion et les risques de sécurité.",
    },
    {
      title: "Configuration et optimisation",
      text: "Nous corrigeons l’architecture, renforçons les accès et ajustons les performances selon vos priorités.",
    },
    {
      title: "Monitoring et support continu",
      text: "Nous suivons les indicateurs clés et intervenons rapidement pour maintenir la disponibilité du réseau.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-global font-sans text-navy">
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4 md:px-8">
        <div className="flex w-full max-w-[1240px] items-center justify-between rounded-full border border-slate-200/60 bg-white/90 px-5 py-3 shadow-[0_18px_50px_rgba(10,27,51,0.07)] backdrop-blur-xl">
          <button onClick={onBack} aria-label="Retour à l’accueil" className="cursor-pointer">
            <Logo iconSize={32} theme="brand" />
          </button>

          <nav className="hidden items-center gap-7 text-[12px] font-semibold text-slate-text md:flex">
            <button onClick={() => document.getElementById("presentation")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">
              Le service
            </button>
            <button onClick={() => document.getElementById("benefices")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">
              Bénéfices
            </button>
            <button onClick={() => document.getElementById("processus")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer hover:text-navy">
              Notre méthode
            </button>
          </nav>

          <ServiceLanguageToggle />

          <button
            onClick={onContact}
            className="hidden cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[12px] font-semibold text-white transition-transform active:scale-95 md:inline-flex"
          >
            Demander un audit
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-50 md:hidden"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-[82px] rounded-[26px] border border-slate-200 bg-white p-3 shadow-xl md:hidden">
            {["presentation", "benefices", "processus"].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block w-full cursor-pointer rounded-2xl px-4 py-3 text-left text-[13px] font-semibold capitalize hover:bg-slate-50"
              >
                {id}
              </button>
            ))}
            <button onClick={onContact} className="mt-2 w-full cursor-pointer rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white">
              Demander un audit réseau
            </button>
          </div>
        )}
      </header>

      <main>
        <section className="px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center overflow-hidden rounded-[40px] border border-slate-200/60 bg-white px-7 py-12 shadow-[0_40px_100px_-30px_rgba(10,27,51,0.12)] md:grid-cols-12 md:rounded-[48px] md:px-14 lg:px-20">
            <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 space-y-7 md:col-span-6"
            >
              <button onClick={onBack} className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-slate-text hover:text-navy">
                <ArrowLeft className="h-4 w-4" />
                Retour aux services
              </button>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0b7c9e]/15 bg-[#0b7c9e]/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#0b7c9e]">
                <Network className="h-3.5 w-3.5" />
                Infrastructure & connectivité
              </div>
              <div className="space-y-5">
                <h1 className="max-w-[690px] font-display text-[42px] font-bold leading-[1.03] tracking-[-0.035em] text-navy sm:text-[54px] lg:text-[68px]">
                  Administration Réseau Professionnelle
                </h1>
                <p className="max-w-[560px] text-[16px] leading-relaxed text-slate-text md:text-[18px]">
                  Optimisez, sécurisez et maintenez vos infrastructures réseau.
                </p>
              </div>
              <button
                onClick={onContact}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg transition-all hover:bg-navy-dark hover:shadow-xl active:scale-95"
              >
                <ShieldCheck className="h-4 w-4" />
                Demander un audit réseau
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mt-10 h-[360px] md:col-span-6 md:mt-0 md:h-[500px]"
            >
              <NetworkMapIllustration />
            </motion.div>
          </div>
        </section>

        <section id="presentation" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white p-3 shadow-[0_24px_70px_-35px_rgba(10,27,51,0.22)] lg:order-1">
              <div className="h-[350px] overflow-hidden rounded-[28px]">
                <NetworkMapIllustration compact />
              </div>
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                <Server className="h-5 w-5" />
              </div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">
                Un réseau fiable, pensé pour votre activité
              </h2>
              <p className="max-w-[620px] text-[15px] leading-8 text-slate-text md:text-[16px]">
                Nous assurons la configuration, la maintenance et l’optimisation de vos réseaux locaux et distants, garantissant performance et sécurité. Nos experts surveillent vos systèmes pour anticiper toute faille ou incident.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["LAN & WAN", "VPN sécurisé", "Segmentation réseau", "Haute disponibilité"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-navy">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="benefices" className="scroll-mt-28 border-y border-slate-200/50 bg-slate-50/70 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[700px] space-y-4 md:mb-16">
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">
                Les bénéfices pour votre entreprise
              </h2>
              <p className="text-[15px] leading-relaxed text-slate-text">
                Une infrastructure mieux maîtrisée réduit les risques techniques et redonne du temps à vos équipes.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[34px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ title, text, icon: Icon }) => (
                <article key={title} className="min-h-[250px] bg-white p-7 md:p-8">
                  <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b7c9e]/8 text-[#0b7c9e]">
                    <Icon className="h-5 w-5" />
                  </div>
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
                <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">
                  Comment nous travaillons
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-text">
                  Une méthode lisible, documentée et adaptée à la réalité de votre infrastructure.
                </p>
              </div>
              <div className="space-y-7 lg:col-span-7">
                {process.map((step, index) => (
                  <article key={step.title} className="grid grid-cols-[48px_1fr] gap-5 border-b border-slate-200 pb-7 last:border-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="mb-2 font-display text-[20px] font-semibold">{step.title}</h3>
                      <p className="text-[14px] leading-7 text-slate-text">{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-14 overflow-hidden rounded-[38px]">
              <WorkflowIllustration />
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-navy px-7 py-14 text-white md:px-16 md:py-20">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-white/5" />
            <div className="relative z-10 max-w-[760px] space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Check className="h-5 w-5 text-cyan-300" />
              </div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[50px]">
                Donnez à votre réseau la fiabilité qu’exige votre activité.
              </h2>
              <p className="max-w-[600px] text-[15px] leading-relaxed text-white/65">
                Échangez avec nos experts et obtenez une première lecture claire de vos priorités réseau.
              </p>
              <button
                onClick={onContact}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-navy transition-transform active:scale-95"
              >
                Contactez nos experts
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
