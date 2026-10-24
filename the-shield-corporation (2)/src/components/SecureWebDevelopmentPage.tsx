import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Gauge,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import Logo from "./Logo";
import FooterSection from "./FooterSection";
import ServiceLanguageToggle from "./ServiceLanguageToggle";

interface SecureWebDevelopmentPageProps {
  onBack: () => void;
  onContact: () => void;
}

function SecureCodeIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 720 520" role="img" aria-label="Éditeur de code sécurisé avec cadenas numérique et aperçu d’application web" className="h-full w-full">
      <defs>
        <linearGradient id="dev-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#faf9fc" /><stop offset="100%" stopColor="#f5edf7" />
        </linearGradient>
        <linearGradient id="dev-editor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071529" /><stop offset="100%" stopColor="#302845" />
        </linearGradient>
        <filter id="dev-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#0a1b33" floodOpacity=".13" />
        </filter>
      </defs>
      <rect width="720" height="520" rx="44" fill="url(#dev-bg)" />
      <g opacity=".25" stroke="#b7a0bd">
        <path d="M0 104h720M0 208h720M0 312h720M0 416h720" />
        <path d="M120 0v520M240 0v520M360 0v520M480 0v520M600 0v520" />
      </g>

      <g filter="url(#dev-shadow)">
        <rect x="55" y="72" width="430" height="340" rx="32" fill="url(#dev-editor)" />
        <rect x="55" y="72" width="430" height="52" rx="32" fill="#ffffff" fillOpacity=".07" />
        <rect x="55" y="105" width="430" height="19" fill="#ffffff" fillOpacity=".07" />
        <circle cx="86" cy="98" r="6" fill="#ef6a67" /><circle cx="107" cy="98" r="6" fill="#f4bd50" /><circle cx="128" cy="98" r="6" fill="#54c79d" />
        <rect x="81" y="149" width="88" height="238" rx="18" fill="#ffffff" fillOpacity=".055" />
        <g strokeLinecap="round">
          <path d="M197 168h72M286 168h44" stroke="#c38cce" strokeWidth="9" />
          <path d="M197 201h116M329 201h72" stroke="#55c9bc" strokeWidth="9" />
          <path d="M217 234h92M324 234h48" stroke="#91a8ba" strokeWidth="9" />
          <path d="M217 267h145" stroke="#c38cce" strokeWidth="9" />
          <path d="M197 300h66M279 300h111" stroke="#55c9bc" strokeWidth="9" />
          <path d="M217 333h118M351 333h45" stroke="#91a8ba" strokeWidth="9" />
          <path d="M197 366h88" stroke="#c38cce" strokeWidth="9" />
        </g>
        {[169, 202, 235, 268, 301, 334, 367].map((y, index) => <text key={y} x="103" y={y + 4} fill="#778da0" fontFamily="Inter, sans-serif" fontSize="12">{String(index + 1).padStart(2, "0")}</text>)}
      </g>

      <g transform="translate(396 160)" filter="url(#dev-shadow)">
        <rect width="267" height="220" rx="30" fill="#ffffff" />
        <rect width="267" height="44" rx="30" fill="#0b7c9e" />
        <rect y="28" width="267" height="16" fill="#0b7c9e" />
        <rect x="24" y="72" width="104" height="16" rx="8" fill="#0a1b33" />
        <rect x="24" y="103" width="178" height="9" rx="4.5" fill="#dce4ea" />
        <rect x="24" y="126" width="142" height="9" rx="4.5" fill="#dce4ea" />
        <rect x="24" y="158" width="82" height="32" rx="16" fill="#0a1b33" />
        <circle cx="213" cy="142" r="31" fill="#edf6f4" />
        <path d="M197 142l11 11 22-25" fill="none" stroke="#0b7c9e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g transform="translate(505 50)" filter="url(#dev-shadow)">
        <circle cx="70" cy="70" r="60" fill="#ffffff" />
        <rect x="35" y="66" width="70" height="58" rx="15" fill="#9b58aa" />
        <path d="M49 66V48c0-30 42-30 42 0v18" fill="none" stroke="#0a1b33" strokeWidth="11" strokeLinecap="round" />
        <circle cx="70" cy="91" r="8" fill="#ffffff" />
      </g>

      {!compact && (
        <g>
          <rect x="36" y="35" width="182" height="38" rx="19" fill="#ffffff" opacity=".95" />
          <circle cx="59" cy="54" r="6" fill="#22c55e" />
          <text x="76" y="59" fill="#0a1b33" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600">Build sécurisé validé</text>
        </g>
      )}
    </svg>
  );
}

function DevelopmentWorkflowIllustration() {
  const steps = [
    { number: "01", label: "Planifier", x: 28 },
    { number: "02", label: "Développer", x: 260 },
    { number: "03", label: "Livrer", x: 492 },
  ];
  return (
    <svg viewBox="0 0 700 320" role="img" aria-label="Workflow de développement sécurisé: planification, développement et livraison" className="h-full w-full">
      <defs>
        <linearGradient id="dev-flow-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071529" /><stop offset="100%" stopColor="#4b2852" />
        </linearGradient>
      </defs>
      <rect width="700" height="320" rx="38" fill="url(#dev-flow-bg)" />
      <path d="M190 160h70M422 160h70" stroke="#c38cce" strokeWidth="3" strokeDasharray="8 9" />
      {steps.map((step, index) => (
        <g key={step.number}>
          <rect x={step.x} y="84" width="180" height="152" rx="28" fill="#ffffff" fillOpacity=".075" stroke="#ffffff" strokeOpacity=".15" />
          <circle cx={step.x + 40} cy="124" r="20" fill={index === 1 ? "#c38cce" : "#ffffff"} fillOpacity={index === 1 ? 1 : .12} />
          <text x={step.x + 40} y="130" textAnchor="middle" fill={index === 1 ? "#071529" : "#ffffff"} fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700">{step.number}</text>
          <text x={step.x + 24} y="185" fill="#ffffff" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="600">{step.label}</text>
          <rect x={step.x + 24} y="202" width={index === 1 ? 110 : 78} height="6" rx="3" fill="#c38cce" fillOpacity=".65" />
        </g>
      ))}
    </svg>
  );
}

export default function SecureWebDevelopmentPage({ onBack, onContact }: SecureWebDevelopmentPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = "Développement Web Sécurisé | The Shield Corporation";
    description?.setAttribute("content", "Développement web sécurisé: sites et applications performants, sécurité intégrée dès la conception, conformité et tests avant livraison.");
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.setAttribute("content", previousDescription);
    };
  }, []);

  const benefits = [
    { title: "Protection dès la conception", text: "Les contrôles de sécurité sont intégrés à l’architecture, aux accès et aux flux de données.", icon: ShieldCheck },
    { title: "Code optimisé et fiable", text: "Une base claire, testée et maintenable améliore les performances et réduit les régressions.", icon: Gauge },
    { title: "Expérience utilisateur sécurisée", text: "Les parcours restent fluides tout en protégeant les comptes et les informations sensibles.", icon: Sparkles },
  ];
  const process = [
    { title: "Analyse et planification", text: "Nous définissons les objectifs, les utilisateurs, les données sensibles et les exigences de sécurité." },
    { title: "Développement sécurisé", text: "Nous construisons l’application avec des contrôles d’accès, validations et pratiques de code robustes." },
    { title: "Test et livraison", text: "Nous vérifions la qualité, les performances et la sécurité avant une mise en production maîtrisée." },
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
          <button onClick={onContact} className="hidden cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[12px] font-semibold text-white active:scale-95 md:inline-flex">Demander un devis <ArrowRight className="h-4 w-4" /></button>
          <button onClick={() => setIsMenuOpen((open) => !open)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-50 md:hidden" aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-[82px] rounded-[26px] border border-slate-200 bg-white p-3 shadow-xl md:hidden">
            {["presentation", "benefices", "processus"].map((id) => <button key={id} onClick={() => { setIsMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }} className="block w-full cursor-pointer rounded-2xl px-4 py-3 text-left text-[13px] font-semibold capitalize hover:bg-slate-50">{id}</button>)}
            <button onClick={onContact} className="mt-2 w-full cursor-pointer rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-white">Demander un devis</button>
          </div>
        )}
      </header>

      <main>
        <section className="px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
          <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center overflow-hidden rounded-[40px] border border-slate-200/60 bg-white px-7 py-12 shadow-[0_40px_100px_-30px_rgba(10,27,51,0.12)] md:grid-cols-12 md:rounded-[48px] md:px-14 lg:px-20">
            <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-fuchsia-100/50 blur-3xl" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 space-y-7 md:col-span-6">
              <button onClick={onBack} className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-slate-text hover:text-navy"><ArrowLeft className="h-4 w-4" />Retour aux services</button>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-700/15 bg-fuchsia-700/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-fuchsia-700"><Code2 className="h-3.5 w-3.5" />Security by design</div>
              <div className="space-y-5">
                <h1 className="max-w-[680px] font-display text-[42px] font-bold leading-[1.03] tracking-[-0.035em] sm:text-[54px] lg:text-[68px]">Développement Web Sécurisé</h1>
                <p className="max-w-[570px] text-[16px] leading-relaxed text-slate-text md:text-[18px]">Applications performantes et protégées dès leur création.</p>
              </div>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[13px] font-semibold text-white shadow-lg hover:bg-navy-dark active:scale-95"><LockKeyhole className="h-4 w-4" />Demander un devis</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .1, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 mt-10 h-[360px] md:col-span-6 md:mt-0 md:h-[500px]"><SecureCodeIllustration /></motion.div>
          </div>
        </section>

        <section id="presentation" className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 overflow-hidden rounded-[36px] border border-slate-200/70 bg-white p-3 shadow-[0_24px_70px_-35px_rgba(10,27,51,0.22)] lg:order-1"><div className="h-[350px] overflow-hidden rounded-[28px]"><SecureCodeIllustration compact /></div></div>
            <div className="order-1 space-y-6 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white"><Code2 className="h-5 w-5" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">La sécurité intégrée à chaque ligne de code</h2>
              <p className="max-w-[620px] text-[15px] leading-8 text-slate-text md:text-[16px]">Nous concevons vos sites et applications avec sécurité intégrée, conformité aux normes et performance optimale.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Applications métier", "Portails web", "API sécurisées", "DevSecOps"].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold">{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="benefices" className="scroll-mt-28 border-y border-slate-200/50 bg-slate-50/70 px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[720px] space-y-4 md:mb-16">
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Un produit fiable avant même sa mise en ligne</h2>
              <p className="text-[15px] leading-relaxed text-slate-text">Performance, qualité et protection avancent ensemble tout au long du développement.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[34px] border border-slate-200 bg-slate-200 md:grid-cols-3">
              {benefits.map(({ title, text, icon: Icon }) => (
                <article key={title} className="min-h-[280px] bg-white p-7 md:p-9">
                  <div className="mb-12 flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-700/8 text-fuchsia-700"><Icon className="h-5 w-5" /></div>
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
                <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[46px]">Notre cycle de développement</h2>
                <p className="text-[15px] leading-relaxed text-slate-text">Chaque étape apporte ses contrôles de qualité et de sécurité avant la livraison.</p>
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
            <div className="mt-14 overflow-hidden rounded-[38px]"><DevelopmentWorkflowIllustration /></div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-navy px-7 py-14 text-white md:px-16 md:py-20">
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-[70px] border-fuchsia-300/5" />
            <div className="relative z-10 max-w-[800px] space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Check className="h-5 w-5 text-fuchsia-300" /></div>
              <h2 className="font-display text-[34px] font-semibold leading-tight tracking-tight md:text-[50px]">Construisez une application prête à inspirer confiance.</h2>
              <p className="max-w-[620px] text-[15px] leading-relaxed text-white/65">Présentez-nous votre projet pour obtenir une première estimation de l’architecture, des délais et du niveau de sécurité.</p>
              <button onClick={onContact} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-navy active:scale-95">Demander un devis maintenant <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
