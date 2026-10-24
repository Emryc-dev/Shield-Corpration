import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cloud,
  Coins,
  Gauge,
  Menu,
  RefreshCw,
  Server,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import Logo from "./Logo";
import FooterSection from "./FooterSection";
import ServiceLanguageToggle from "./ServiceLanguageToggle";

interface CloudComputingPageProps {
  onBack: () => void;
  onContact: () => void;
}

function CloudInfrastructureIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 720 520" role="img" aria-label="Infrastructure cloud reliant plusieurs serveurs sécurisés et régions répliquées" className="h-full w-full">
      <defs>
        <linearGradient id="cloud-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8fbfd" />
          <stop offset="100%" stopColor="#eaf4fb" />
        </linearGradient>
        <linearGradient id="cloud-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1b33" />
          <stop offset="100%" stopColor="#17678b" />
        </linearGradient>
        <filter id="cloud-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#0a1b33" floodOpacity=".12" />
        </filter>
      </defs>
      <rect width="720" height="520" rx="44" fill="url(#cloud-bg)" />
      <g opacity=".3" stroke="#8eb5ce">
        <path d="M0 104h720M0 208h720M0 312h720M0 416h720" />
        <path d="M120 0v520M240 0v520M360 0v520M480 0v520M600 0v520" />
      </g>

      <g fill="none" stroke="#3ea6d2" strokeWidth="4" strokeLinecap="round">
        <path d="M208 174C272 174 286 220 326 234" />
        <path d="M512 174C448 174 434 220 394 234" />
        <path d="M207 382C274 382 286 315 326 298" />
        <path d="M513 382C446 382 434 315 394 298" />
      </g>
      <g fill="#3ea6d2">
        <circle cx="265" cy="192" r="5" /><circle cx="455" cy="192" r="5" />
        <circle cx="266" cy="345" r="5" /><circle cx="454" cy="345" r="5" />
      </g>

      <g filter="url(#cloud-shadow)">
        <circle cx="360" cy="265" r="112" fill="url(#cloud-core)" />
        <path d="M300 286c-25 0-40-16-40-37 0-20 15-36 37-38 9-27 32-45 62-45 36 0 65 24 72 57 25 2 44 21 44 45 0 26-22 46-51 46H301c-24 0-43-11-43-28Z" fill="#ffffff" fillOpacity=".94" />
        <path d="M333 246h54M360 219v54" stroke="#0b7c9e" strokeWidth="9" strokeLinecap="round" />
      </g>

      {[
        { x: 52, y: 112, label: "EU-1" },
        { x: 498, y: 112, label: "AF-1" },
        { x: 52, y: 337, label: "US-1" },
        { x: 498, y: 337, label: "BACKUP" },
      ].map((node, index) => (
        <g key={node.label} filter="url(#cloud-shadow)">
          <rect x={node.x} y={node.y} width="170" height="92" rx="25" fill="#ffffff" />
          <rect x={node.x + 22} y={node.y + 22} width="88" height="12" rx="6" fill="#d9e9f1" />
          <rect x={node.x + 22} y={node.y + 50} width="116" height="10" rx="5" fill="#edf4f7" />
          <circle cx={node.x + 143} cy={node.y + 28} r="6" fill={index === 3 ? "#38bdf8" : "#22c55e"} />
          <text x={node.x + 22} y={node.y + 79} fill="#64748b" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700">{node.label}</text>
        </g>
      ))}

      {!compact && (
        <g>
          <rect x="36" y="35" width="184" height="38" rx="19" fill="#ffffff" opacity=".95" />
          <circle cx="59" cy="54" r="6" fill="#22c55e" />
          <text x="76" y="59" fill="#0a1b33" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600">Toutes régions actives</text>
        </g>
      )}
    </svg>
  );
}

function CloudWorkflowIllustration() {
  const steps = [
    { number: "01", label: "Analyse", x: 28 },
    { number: "02", label: "Migration", x: 260 },
    { number: "03", label: "Support", x: 492 },
  ];
  return (
    <svg viewBox="0 0 700 320" role="img" aria-label="Workflow cloud: analyse, migration et support continu" className="h-full w-full">
      <defs>
        <linearGradient id="cloud-flow-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071529" /><stop offset="100%" stopColor="#0c4e70" />
        </linearGradient>
      </defs>
      <rect width="700" height="320" rx="38" fill="url(#cloud-flow-bg)" />
      <path d="M190 160h70M422 160h70" stroke="#60c7ed" strokeWidth="3" strokeDasharray="8 9" />
      {steps.map((step, index) => (
        <g key={step.number}>
          <rect x={step.x} y="84" width="180" height="152" rx="28" fill="#ffffff" fillOpacity=".075" stroke="#ffffff" strokeOpacity=".15" />
          <circle cx={step.x + 40} cy="124" r="20" fill={index === 1 ? "#60c7ed" : "#ffffff"} fillOpacity={index === 1 ? 1 : .12} />
          <text x={step.x + 40} y="130" textAnchor="middle" fill={index === 1 ? "#071529" : "#ffffff"} fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700">{step.number}</text>
          <text x={step.x + 24} y="185" fill="#ffffff" fontFamily="Outfit, sans-serif" fontSize="21" fontWeight="600">{step.label}</text>
          <rect x={step.x + 24} y="202" width={index === 1 ? 104 : 78} height="6" rx="3" fill="#60c7ed" fillOpacity=".65" />
        </g>
      ))}
    </svg>
  );
}

export default function CloudComputingPage({ onBack, onContact }: CloudComputingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = "Solutions Cloud Professionnelles | The Shield Corporation";
    description?.setAttribute("content", "Solutions cloud professionnelles: migration, scalabilité, haute disponibilité, sécurité et support continu de vos infrastructures.");
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.setAttribute("content", previousDescription);
    };
  }, []);

  const benefits = [
    { title: "Scalabilité instantanée", text: "Les ressources évoluent avec votre activité, sans immobiliser votre infrastructure.", icon: Zap },
    { title: "Haute disponibilité", text: "La réplication et la redondance maintiennent vos services accessibles.", icon: RefreshCw },
    { title: "Sécurité renforcée", text: "Les accès, données et environnements sont cloisonnés et surveillés.", icon: ShieldCheck },
    { title: "Réduction des coûts", text: "Vous adaptez les dépenses aux ressources réellement utilisées.", icon: Coins },
  ];
  const process = [
    { title: "Analyse des besoins", text: "Nous étudions vos applications, volumes, contraintes métiers, coûts et exigences de disponibilité." },
    { title: "Migration cloud", text: "Nous préparons, transférons et validons les charges de travail avec un plan limitant les interruptions." },
    { title: "Monitoring et support", text: "Nous suivons les performances, la sécurité et les coûts pour maintenir un environnement cloud sain." },
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
            Découvrir nos solutions <ArrowRight className="h-4 w-4" />
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
            <button onClick={onContact} className="mt-2 w-full cursor-pointer rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white">Découvrir nos solutions cloud</button>
          </div>
        )}
      </header>

      <main>
        <section className="px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center overflow-hidden rounded-[40px] border border-slate-200/60 bg-white px-7 py-12 shadow-[0_40px_100px_-30px_rgba(10,27,51,0.12)] md:grid-cols-12 md:rounded-[48px] md:px-14 lg:px-20">
            <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 space-y-7 md:col-span-6">
              <button onClick={onBack} className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-slate-text hover:text-navy"><ArrowLeft className="h-4 w-4" />Retour aux services</button>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-700/15 bg-sky-700/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-sky-700"><Cloud className="h-3.5 w-3.5" />Infrastructure cloud</div>
              <div className="space-y-5">
                <h1 className="max-w-[680px] font-display text-[42px] font-bold leading-[1.03] tracking-[-0.035em] sm:text-[54px] lg:text-[68px]">Solutions Cloud Professionnelles</h1>
                <p className="max-w-[560px] text-[16px] leading-relaxed text-slate-text md:text-[18px]">Flexible, scalable et sécurisé pour votre entreprise.</p>
              </div>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg hover:bg-navy-dark active:scale-95"><Cloud className="h-4 w-4" />Découvrir nos solutions cloud</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 mt-10 h-[360px] md:col-span-6 md:mt-0 md:h-[500px]"><CloudInfrastructureIllustration /></motion.div>
          </div>
        </section>

        <section id="presentation" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white p-3 shadow-[0_24px_70px_-35px_rgba(10,27,51,0.22)] lg:order-1"><div className="h-[350px] overflow-hidden rounded-[28px]"><CloudInfrastructureIllustration compact /></div></div>
            <div className="order-1 space-y-6 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white"><Server className="h-5 w-5" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Votre infrastructure, disponible partout</h2>
              <p className="max-w-[620px] text-[15px] leading-8 text-slate-text md:text-[16px]">Nous migrons et gérons vos infrastructures dans le cloud, garantissant performance, sécurité et disponibilité.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Cloud public", "Cloud privé", "Multi-cloud", "Sauvegarde distante"].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold">{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="benefices" className="scroll-mt-28 border-y border-slate-200/50 bg-slate-50/70 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[720px] space-y-4 md:mb-16">
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Une infrastructure qui suit votre croissance</h2>
              <p className="text-[15px] leading-relaxed text-slate-text">Le cloud rend vos capacités plus souples tout en renforçant la continuité de service.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[34px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ title, text, icon: Icon }) => (
                <article key={title} className="min-h-[260px] bg-white p-7 md:p-8">
                  <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-700/8 text-sky-700"><Icon className="h-5 w-5" /></div>
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
                <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Notre parcours de migration</h2>
                <p className="text-[15px] leading-relaxed text-slate-text">Chaque transition est planifiée, testée et suivie pour préserver la continuité métier.</p>
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
            <div className="mt-14 overflow-hidden rounded-[38px]"><CloudWorkflowIllustration /></div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-navy px-7 py-14 text-white md:px-16 md:py-20">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-sky-300/5" />
            <div className="relative z-10 max-w-[800px] space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Check className="h-5 w-5 text-sky-300" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[50px]">Construisez un cloud adapté à votre activité.</h2>
              <p className="max-w-[620px] text-[15px] leading-relaxed text-white/65">Évaluez vos besoins de migration, de disponibilité et de maîtrise des coûts avec notre équipe.</p>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-navy active:scale-95">Contacter un expert cloud <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
