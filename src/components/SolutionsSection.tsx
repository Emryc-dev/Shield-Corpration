import React from "react";
import { motion } from "motion/react";
import { ShieldAlert, Fingerprint, Activity, Code2, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface SolutionItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const solutionsList: SolutionItem[] = [
  {
    id: "shield-defend",
    name: "ShieldDefend™",
    icon: ShieldAlert,
  },
  {
    id: "cloud-fortress",
    name: "CloudFortress",
    icon: Fingerprint,
  },
  {
    id: "cyber-soc",
    name: "CyberSOC 24/7",
    icon: Activity,
  },
  {
    id: "secureweb-build",
    name: "SecureWeb Build",
    icon: Code2,
  }
];

interface SolutionsSectionProps {
  onNavigateToSolution: (serviceId: string) => void;
}

export default function SolutionsSection({ onNavigateToSolution }: SolutionsSectionProps) {
  const { language, t } = useLanguage();

  const handleLearnMore = (id: string) => {
    // Exact mapping between products and detailed specification pages
    const mapping: Record<string, string> = {
      "shield-defend": "sec-admin",
      "cloud-fortress": "cloud-comp",
      "cyber-soc": "net-admin",
      "secureweb-build": "sec-dev"
    };
    onNavigateToSolution(mapping[id] || "sec-admin");
  };

  return (
    <section 
      id="solutions" 
      className="py-20 md:py-28 px-4 w-full max-w-[1400px] mx-auto scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="solutions-title"
    >
      <div className="space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-[620px]">
            <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 px-3.5 py-1.5 rounded-full text-navy text-[12px] font-semibold tracking-wide uppercase">
              {t("solutions.badge")}
            </div>
            <h2 
              id="solutions-title"
              className="font-display text-[32px] md:text-[44px] font-medium tracking-tight text-navy leading-[1.12]"
            >
              {t("solutions.title")}
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-slate-text leading-relaxed">
              {t("solutions.desc")}
            </p>
          </div>
        </div>

        {/* 2x2 Bento Style Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutionsList.map((sol, index) => {
            const Icon = sol.icon;

            // Translated copies
            const tTagline = sol.id === "shield-defend" 
              ? (language === "fr" ? "Bouclier de Protection de Point d'Entrée" : "Endpoint Protection Shield")
              : sol.id === "cloud-fortress"
              ? (language === "fr" ? "Sandbox de Nœuds Chiffrés" : "Encrypted Node Sandboxing")
              : sol.id === "cyber-soc"
              ? (language === "fr" ? "Radar de Télémétrie Permanent" : "Always-On Telemetry Radar")
              : (language === "fr" ? "Stack Applicative Durcie" : "Hardened Application Stack");

            const tDesc = sol.id === "shield-defend" 
              ? (language === "fr" ? "Moteur de protection haute efficacité analysant les points d'entrée système, filtrant les requêtes malveillantes et réduisant les risques d'API en temps réel." : "High-efficiency threat shielding engine that analyzes system endpoints, filters malicious requests, and mitigates API vulnerability risk in real-time.")
              : sol.id === "cloud-fortress"
              ? (language === "fr" ? "Bac à sable avancé d'infrastructure. Sépare et sécurise les nœuds virtuels et les groupes de conteneurs avec un chiffrement de niveau militaire." : "Advanced infrastructure sandboxing. Segregates and protects virtual nodes and container groups with military-grade custom encryption keys.")
              : sol.id === "cyber-soc"
              ? (language === "fr" ? "Surveillance permanente par notre centre de sécurité des flux de paquets, repérant les accès anormaux et alertant nos équipes d'intervention." : "Security Operations Center monitoring packet flows, detecting anomalous access patterns, and alerting incident response teams instantly.")
              : (language === "fr" ? "Stratégie de déploiement d'interfaces serveur durcies s'appuyant sur des audits rigoureux de tests d'intrusion et certification." : "Durable design implementation strategy. Delivers fully hardened server interfaces backed by penetration testing audits and certification.");

            const tFeatures = sol.id === "shield-defend"
              ? (language === "fr" ? ["Contenir l'exploitation de failles Zero-Day", "Isolation active des logiciels malveillants", "Mise en place automatique de règlages serveurs"] : ["Zero-Day exploit containment", "Dynamic malware threat isolation", "Automated server policy synthesis"])
              : sol.id === "cloud-fortress"
              ? (language === "fr" ? ["Isolation hermétique multi-locataires", "Chiffrement d'enveloppe dynamique", "Politique réseau zéro-trust stricte"] : ["Multi-tenant data isolation", "Dynamic envelope file encryption", "Strict zero-trust node network policy"])
              : sol.id === "cyber-soc"
              ? (language === "fr" ? ["Radar d'inspection de paquets live", "Tri intelligent de patterns par IA", "Atténuation de l'incident en < 12 minutes"] : ["Live packet-inspection radar", "AI-enhanced pattern triage", "Under 12-minute incident mitigation"])
              : (language === "fr" ? ["Couches serveurs TypeScript ultra-propres", "Couverture de sécurité OWASP automatisée", "Rapports de pentest complets pré-compilation"] : ["Prism-clean TypeScript server layers", "Automated OWASP security coverage", "Pre-compile backend pentest reports"]);

            return (
              <motion.div
                key={sol.id}
                id={`solution-card-${sol.id}`}
                onClick={() => handleLearnMore(sol.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-slate-200/50 rounded-[40px] p-8 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.01)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.02)] transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-violet-500/5 rounded-bl-[40px] transition-all group-hover:scale-110" />

                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center text-navy border border-navy/10 group-hover:bg-navy group-hover:text-white group-hover:border-navy transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[22px] font-bold text-navy">{sol.name}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-navy/5 px-2 py-0.5 rounded text-navy md:inline-block hidden">Enterprise</span>
                    </div>
                    <p className="text-[12px] font-semibold text-blue-600 font-display uppercase tracking-wide">{tTagline}</p>
                    <p className="font-sans text-[14px] text-slate-text leading-relaxed pt-2">
                      {tDesc}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="border-t border-slate-100 pt-6 space-y-3">
                    {tFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-[13px] text-slate-text">
                        <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secure Navigation Footer triggering page load */}
                <div className="pt-6 mt-6 border-t border-slate-100/50 flex items-center justify-between">
                  <span className="text-[12px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {language === "fr" ? "Niveau Militaire // Class-D" : "MIL-SPEC SECURE"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLearnMore(sol.id);
                    }}
                    className="inline-flex items-center gap-1.5 font-sans font-bold text-[13px] text-[#0b7c9e] hover:text-navy transition-colors cursor-pointer"
                  >
                    <span>{language === "fr" ? "En savoir plus" : "Learn More"}</span>
                    <ArrowRight className="w-4 h-4" />
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
