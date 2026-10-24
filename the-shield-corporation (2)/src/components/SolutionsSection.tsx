import React from "react";
import { motion } from "motion/react";
import { ShieldAlert, Fingerprint, Activity, Code2, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { PointerGlow } from "./ui/pointer-glow";

interface SolutionItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  serviceId: string;
  tagline: { en: string; fr: string };
  desc: { en: string; fr: string };
  features: { en: string[]; fr: string[] };
}

const solutionsList: SolutionItem[] = [
  {
    id: "shield-defend",
    name: "ShieldDefend™",
    icon: ShieldAlert,
    serviceId: "sec-admin",
    tagline: {
      en: "Endpoint and access protection",
      fr: "Protection des accès et endpoints",
    },
    desc: {
      en: "A practical protection layer to control access, reduce application risks and detect unusual behavior across critical systems.",
      fr: "Une couche de protection concrète pour mieux contrôler les accès, réduire les risques applicatifs et détecter les comportements inhabituels.",
    },
    features: {
      en: ["Critical vulnerability risk reduction", "Suspicious behavior detection", "Structured server policies"],
      fr: ["Réduction des risques critiques", "Détection des comportements suspects", "Politiques serveur mieux structurées"],
    },
  },
  {
    id: "cloud-fortress",
    name: "CloudFortress",
    icon: Fingerprint,
    serviceId: "cloud-comp",
    tagline: {
      en: "Secure cloud isolation",
      fr: "Isolation cloud sécurisée",
    },
    desc: {
      en: "Structured isolation for cloud resources, virtual machines and containers, supported by clear access rules and strong encryption practices.",
      fr: "Une isolation structurée de vos ressources cloud, machines virtuelles et conteneurs, avec des règles d’accès claires.",
    },
    features: {
      en: ["Clear environment isolation", "Encryption best practices", "Adapted access control"],
      fr: ["Isolation claire des environnements", "Bonnes pratiques de chiffrement", "Contrôle d’accès adapté"],
    },
  },
  {
    id: "cyber-soc",
    name: "CyberSOC 24/7",
    icon: Activity,
    serviceId: "net-admin",
    tagline: {
      en: "Continuous system monitoring",
      fr: "Monitoring continu des systèmes",
    },
    desc: {
      en: "Monitoring that helps detect unusual access patterns, prioritize alerts and support faster response decisions.",
      fr: "Une surveillance qui aide à détecter les signaux inhabituels, prioriser les alertes et accélérer les décisions.",
    },
    features: {
      en: ["Continuous network monitoring", "Smarter alert prioritization", "Faster incident response"],
      fr: ["Monitoring réseau continu", "Priorisation intelligente des alertes", "Réponse plus rapide aux incidents"],
    },
  },
  {
    id: "secureweb-build",
    name: "SecureWeb Build",
    icon: Code2,
    serviceId: "sec-dev",
    tagline: {
      en: "Secure application stack",
      fr: "Stack applicative sécurisée",
    },
    desc: {
      en: "Reliable application delivery with clear architecture, security testing and practical remediation guidance.",
      fr: "Une livraison applicative fiable, avec architecture claire, tests de sécurité et recommandations exploitables.",
    },
    features: {
      en: ["Clean TypeScript architecture", "Integrated OWASP checks", "Actionable security reports"],
      fr: ["Architecture TypeScript claire", "Contrôles OWASP intégrés", "Rapports de tests exploitables"],
    },
  },
];

interface SolutionsSectionProps {
  onNavigateToSolution: (serviceId: string) => void;
}

export default function SolutionsSection({ onNavigateToSolution }: SolutionsSectionProps) {
  const { language, t } = useLanguage();

  return (
    <section
      id="solutions"
      className="py-20 md:py-28 px-4 w-full max-w-[1400px] mx-auto scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="solutions-title"
    >
      <div className="space-y-12 md:space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-[620px]">
            <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 px-3.5 py-1.5 rounded-full text-navy text-[12px] font-semibold tracking-wide uppercase">
              {t("solutions.badge")}
            </div>
            <h2 id="solutions-title" className="font-display text-[32px] md:text-[44px] font-medium tracking-tight text-navy leading-[1.12]">
              {t("solutions.title")}
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-slate-text leading-relaxed">
              {t("solutions.desc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutionsList.map((sol, index) => {
            const Icon = sol.icon;
            const locale = language === "fr" ? "fr" : "en";

            return (
              <motion.div
                key={sol.id}
                id={`solution-card-${sol.id}`}
                onClick={() => onNavigateToSolution(sol.serviceId)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                className="interactive-surface bg-white border border-slate-200/50 rounded-[40px] p-8 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.01)] hover:border-blue-200/80 hover:shadow-[0_30px_70px_-18px_rgba(15,43,75,0.2)] transition-[border-color,box-shadow] duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                <PointerGlow color="14, 165, 233" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-violet-500/5 rounded-bl-[40px] transition-all group-hover:scale-110" />

                <div className="space-y-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center text-navy border border-navy/10 group-hover:bg-navy group-hover:text-white group-hover:border-navy group-hover:-translate-y-1 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[22px] font-bold text-navy">{sol.name}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-navy/5 px-2 py-0.5 rounded text-navy md:inline-block hidden">Business</span>
                    </div>
                    <p className="text-[12px] font-semibold text-blue-600 font-display uppercase tracking-wide">{sol.tagline[locale]}</p>
                    <p className="font-sans text-[14px] text-slate-text leading-relaxed pt-2">{sol.desc[locale]}</p>
                  </div>

                  <div className="border-t border-slate-100 pt-6 space-y-3">
                    {sol.features[locale].map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-[13px] text-slate-text">
                        <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100/50 flex items-center justify-between relative z-10">
                  <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-widest">
                    {language === "fr" ? "Prêt pour votre activité" : "Business ready"}
                  </span>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      onNavigateToSolution(sol.serviceId);
                    }}
                    className="inline-flex items-center gap-1.5 font-sans font-bold text-[13px] text-[#0b7c9e] hover:text-navy transition-colors cursor-pointer"
                  >
                    <span>{language === "fr" ? "Découvrir" : "Discover"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}