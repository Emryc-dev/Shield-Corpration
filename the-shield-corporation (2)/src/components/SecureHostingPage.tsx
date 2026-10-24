import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  DatabaseBackup,
  Gauge,
  Headphones,
  LockKeyhole,
  Menu,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import Logo from "./Logo";
import FooterSection from "./FooterSection";
import ServiceLanguageToggle from "./ServiceLanguageToggle";

interface SecureHostingPageProps {
  onBack: () => void;
  onContact: () => void;
}

function SecureServerIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 720 520" role="img" aria-label="Serveur d’hébergement sécurisé protégé par un cadenas numérique et des sauvegardes" className="h-full w-full">
      <defs>
        <linearGradient id="hosting-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fafbf9" />
          <stop offset="100%" stopColor="#f4f1e7" />
        </linearGradient>
        <linearGradient id="hosting-rack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071529" />
          <stop offset="100%" stopColor="#26374a" />
        </linearGradient>
        <filter id="hosting-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#0a1b33" floodOpacity=".13" />
        </filter>
      </defs>
      <rect width="720" height="520" rx="44" fill="url(#hosting-bg)" />
      <g opacity=".26" stroke="#b7aa79">
        <path d="M0 104h720M0 208h720M0 312h720M0 416h720" />
        <path d="M120 0v520M240 0v520M360 0v520M480 0v520M600 0v520" />
      </g>

      <g filter="url(#hosting-shadow)">
        <rect x="228" y="76" width="264" height="380" rx="36" fill="url(#hosting-rack)" />
        <rect x="254" y="108" width="212" height="72" rx="18" fill="#ffffff" fillOpacity=".08" stroke="#ffffff" strokeOpacity=".12" />
        <rect x="254" y="195" width="212" height="72" rx="18" fill="#ffffff" fillOpacity=".08" stroke="#ffffff" strokeOpacity=".12" />
        <rect x="254" y="282" width="212" height="72" rx="18" fill="#ffffff" fillOpacity=".08" stroke="#ffffff" strokeOpacity=".12" />
        <rect x="254" y="369" width="212" height="55" rx="18" fill="#ffffff" fillOpacity=".08" stroke="#ffffff" strokeOpacity=".12" />
        {[128, 215, 302, 389].map((y, index) => (
          <g key={y}>
            <rect x="280" y={y} width={index === 3 ? 92 : 126} height="10" rx="5" fill="#d5bd63" fillOpacity={index === 3 ? .45 : .8} />
            <circle cx="434" cy={y + 5} r="6" fill="#22c55e" />
          </g>
        ))}
      </g>

      <g transform="translate(420 165)" filter="url(#hosting-shadow)">
        <circle cx="96" cy="96" r="84" fill="#ffffff" />
        <path d="M52 91h88v74H52Z" fill="#0b7c9e" />
        <path d="M68 91V68c0-39 56-39 56 0v23" fill="none" stroke="#0a1b33" strokeWidth="14" strokeLinecap="round" />
        <circle cx="96" cy="124" r="10" fill="#ffffff" />
        <path d="M96 133v14" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
      </g>

      <g transform="translate(58 126)" filter="url(#hosting-shadow)">
        <rect width="154" height="112" rx="26" fill="#ffffff" />
        <path d="M42 61c0-20 16-36 36-36s36 16 36 36" fill="none" stroke="#d5bd63" strokeWidth="8" strokeLinecap="round" />
        <path d="M33 61h18v28H33ZM105 61h18v28h-18Z" fill="#0a1b33" />
        <path d="M114 88c0 10-9 17-22 17H78" fill="none" stroke="#0a1b33" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g transform="translate(62 326)" filter="url(#hosting-shadow)">
        <rect width="154" height="108" rx="26" fill="#ffffff" />
        <path d="M47 55a31 31 0 0 1 52-22" fill="none" stroke="#0b7c9e" strokeWidth="7" strokeLinecap="round" />
        <path d="m99 23 1 24-23-5" fill="#0b7c9e" />
        <path d="M107 55a31 31 0 0 1-52 22" fill="none" stroke="#0a1b33" strokeWidth="7" strokeLinecap="round" />
        <path d="m55 87-1-24 23 5" fill="#0a1b33" />
      </g>

      {!compact && (
        <g>
          <rect x="36" y="35" width="190" height="38" rx="19" fill="#ffffff" opacity=".95" />
          <circle cx="59" cy="54" r="6" fill="#22c55e" />
          <text x="76" y="59" fill="#0a1b33" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600">Protection active 24/7</text>
        </g>
      )}
    </svg>
  );
}

function HostingWorkflowIllustration() {
  const steps = [
    { number: "01", label: "Serveur", x: 28 },
    { number: "02", label: "Sécurité", x: 260 },
    { number: "03", label: "Support", x: 492 },
  ];
  return (
    <svg viewBox="0 0 700 320" role="img" aria-label="Étapes de l’hébergement sécurisé: choix du serveur, configuration de la sécurité et support" className="h-full w-full">
      <defs>
        <linearGradient id="hosting-flow-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071529" /><stop offset="100%" stopColor="#4a4430" />
        </linearGradient>
      </defs>
      <rect width="700" height="320" rx="38" fill="url(#hosting-flow-bg)" />
      <path d="M190 160h70M422 160h70" stroke="#d5bd63" strokeWidth="3" strokeDasharray="8 9" />
      {steps.map((step, index) => (
        <g key={step.number}>
          <rect x={step.x} y="84" width="180" height="152" rx="28" fill="#ffffff" fillOpacity=".075" stroke="#ffffff" strokeOpacity=".15" />
          <circle cx={step.x + 40} cy="124" r="20" fill={index === 1 ? "#d5bd63" : "#ffffff"} fillOpacity={index === 1 ? 1 : .12} />
          <text x={step.x + 40} y="130" textAnchor="middle" fill={index === 1 ? "#071529" : "#ffffff"} fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700">{step.number}</text>
          <text x={step.x + 24} y="185" fill="#ffffff" fontFamily="Outfit, sans-serif" fontSize="21" fontWeight="600">{step.label}</text>
          <rect x={step.x + 24} y="202" width={index === 1 ? 96 : 78} height="6" rx="3" fill="#d5bd63" fillOpacity=".65" />
        </g>
      ))}
    </svg>
  );
}

export default function SecureHostingPage({ onBack, onContact }: SecureHostingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = "Hébergement Web Sécurisé | The Shield Corporation";
    description?.setAttribute("content", "Hébergement web sécurisé avec serveurs haute performance, protection avancée, sauvegardes automatiques et support technique 24/7.");
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.setAttribute("content", previousDescription);
    };
  }, []);

  const benefits = [
    { title: "Protection contre les attaques", text: "Filtrage, durcissement et surveillance réduisent l’exposition de vos services.", icon: ShieldCheck },
    { title: "Sauvegardes automatiques", text: "Vos données sont copiées régulièrement pour accélérer toute restauration.", icon: DatabaseBackup },
    { title: "Performance optimale", text: "Des ressources dimensionnées maintiennent des temps de réponse rapides et stables.", icon: Gauge },
    { title: "Support technique 24/7", text: "Une assistance reste disponible pour traiter les alertes et incidents d’hébergement.", icon: Headphones },
  ];
  const process = [
    { title: "Choix du serveur", text: "Nous dimensionnons le stockage, la mémoire, le processeur et la bande passante selon vos usages." },
    { title: "Configuration et sécurité", text: "Nous installons, isolons et durcissons l’environnement avant la mise en production." },
    { title: "Suivi et support", text: "Nous surveillons la disponibilité, les sauvegardes et les performances pour intervenir rapidement." },
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
          <button onClick={onContact} className="hidden cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[12px] font-semibold text-white active:scale-95 md:inline-flex">Demander un hébergement <ArrowRight className="h-4 w-4" /></button>
          <button onClick={() => setIsMenuOpen((open) => !open)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-50 md:hidden" aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-[82px] rounded-[26px] border border-slate-200 bg-white p-3 shadow-xl md:hidden">
            {["presentation", "benefices", "processus"].map((id) => <button key={id} onClick={() => { setIsMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }} className="block w-full cursor-pointer rounded-2xl px-4 py-3 text-left text-[13px] font-semibold capitalize hover:bg-slate-50">{id}</button>)}
            <button onClick={onContact} className="mt-2 w-full cursor-pointer rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white">Demander un hébergement</button>
          </div>
        )}
      </header>

      <main>
        <section className="px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center overflow-hidden rounded-[40px] border border-slate-200/60 bg-white px-7 py-12 shadow-[0_40px_100px_-30px_rgba(10,27,51,0.12)] md:grid-cols-12 md:rounded-[48px] md:px-14 lg:px-20">
            <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-amber-100/55 blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 space-y-7 md:col-span-6">
              <button onClick={onBack} className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-slate-text hover:text-navy"><ArrowLeft className="h-4 w-4" />Retour aux services</button>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-700/15 bg-amber-700/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-700"><LockKeyhole className="h-3.5 w-3.5" />Serveurs protégés</div>
              <div className="space-y-5">
                <h1 className="max-w-[680px] font-display text-[42px] font-bold leading-[1.03] tracking-[-0.035em] sm:text-[54px] lg:text-[68px]">Hébergement Web Sécurisé</h1>
                <p className="max-w-[560px] text-[16px] leading-relaxed text-slate-text md:text-[18px]">Votre site et vos données protégés 24/7.</p>
              </div>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg hover:bg-navy-dark active:scale-95"><Server className="h-4 w-4" />Demander un hébergement</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 mt-10 h-[360px] md:col-span-6 md:mt-0 md:h-[500px]"><SecureServerIllustration /></motion.div>
          </div>
        </section>

        <section id="presentation" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white p-3 shadow-[0_24px_70px_-35px_rgba(10,27,51,0.22)] lg:order-1"><div className="h-[350px] overflow-hidden rounded-[28px]"><SecureServerIllustration compact /></div></div>
            <div className="order-1 space-y-6 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white"><Server className="h-5 w-5" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Un environnement fiable pour vos services critiques</h2>
              <p className="max-w-[620px] text-[15px] leading-8 text-slate-text md:text-[16px]">Nous fournissons des serveurs haute performance avec sécurité avancée, backups automatiques et support 24/7.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Protection DDoS", "Stockage chiffré", "Backups distants", "Monitoring actif"].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold">{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="benefices" className="scroll-mt-28 border-y border-slate-200/50 bg-slate-50/70 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[720px] space-y-4 md:mb-16">
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Votre hébergement reste disponible et défendu</h2>
              <p className="text-[15px] leading-relaxed text-slate-text">Nous réunissons protection, continuité et assistance dans un seul environnement administré.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[34px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ title, text, icon: Icon }) => (
                <article key={title} className="min-h-[260px] bg-white p-7 md:p-8">
                  <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-700/8 text-amber-700"><Icon className="h-5 w-5" /></div>
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
                <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">La mise en service, étape par étape</h2>
                <p className="text-[15px] leading-relaxed text-slate-text">Nous configurons chaque environnement selon la charge, le risque et la disponibilité attendue.</p>
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
            <div className="mt-14 overflow-hidden rounded-[38px]"><HostingWorkflowIllustration /></div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-navy px-7 py-14 text-white md:px-16 md:py-20">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-amber-300/5" />
            <div className="relative z-10 max-w-[800px] space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Check className="h-5 w-5 text-amber-300" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[50px]">Confiez votre site à un environnement conçu pour résister.</h2>
              <p className="max-w-[620px] text-[15px] leading-relaxed text-white/65">Dimensionnons votre serveur et votre niveau de protection selon les besoins réels de votre activité.</p>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-navy active:scale-95">Hébergez votre site sécurisé <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
