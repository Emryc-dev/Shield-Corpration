import React from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Swords, 
  ShieldCheck, 
  Flame, 
  Activity, 
  Clock, 
  Layers 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { PointerGlow } from "./ui/pointer-glow";

interface Benefit {
  id: string;
  titleKey: string;
  textKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

const benefits: Benefit[] = [
  {
    id: "expertise",
    titleKey: "why.benefit1.title",
    textKey: "why.benefit1.text",
    icon: Swords
  },
  {
    id: "secure-approach",
    titleKey: "why.benefit2.title",
    textKey: "why.benefit2.text",
    icon: ShieldCheck
  },
  {
    id: "support",
    titleKey: "why.benefit3.title",
    textKey: "why.benefit3.text",
    icon: Clock
  },
  {
    id: "comprehensive",
    titleKey: "why.benefit4.title",
    textKey: "why.benefit4.text",
    icon: Layers
  }
];

interface Stat {
  id: string;
  value: string;
  labelKey: string;
  subKey: string;
}

const stats: Stat[] = [
  {
    id: "clients",
    value: "500+",
    labelKey: "why.stat1.label",
    subKey: "why.stat1.sub"
  },
  {
    id: "audits",
    value: "1,200+",
    labelKey: "why.stat2.label",
    subKey: "why.stat2.sub"
  },
  {
    id: "support-time",
    value: "24/7/365",
    labelKey: "why.stat3.label",
    subKey: "why.stat3.sub"
  },
  {
    id: "uptime",
    value: "99.99%",
    labelKey: "why.stat4.label",
    subKey: "why.stat4.sub"
  }
];

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section 
      id="why-choose-us" 
      className="py-20 md:py-28 px-4 bg-slate-50/50 border-t border-slate-200/40 w-full scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="why-title"
    >
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* Upper Layout: Why Choose Us Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left sticky description header */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 px-3.5 py-1.5 rounded-full text-navy text-[12px] font-semibold tracking-wide uppercase">
              {t("why.badge")}
            </div>
            
            <h2 
              id="why-title"
              className="font-display text-[32px] md:text-[44px] font-medium tracking-tight text-navy leading-[1.12]"
            >
              {t("why.title")}
            </h2>
            
            <p className="font-sans text-[14px] md:text-[15px] text-slate-text leading-relaxed">
              {t("why.desc")}
            </p>

            <div className="hidden lg:block pt-4 text-xs text-slate-400 font-mono">
              {t("why.secops")}
            </div>
          </div>

          {/* Right Grid of Benefits */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, bIdx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: bIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="interactive-surface group relative overflow-hidden bg-white border border-slate-200/50 rounded-[32px] p-6 space-y-4 hover:border-blue-200/80 hover:shadow-[0_20px_45px_-18px_rgba(15,43,75,0.18)] transition-[border-color,box-shadow] duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                >
                  <PointerGlow color="59, 130, 246" />
                  <div className="relative z-10 w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="space-y-1.5 relative z-10">
                    <h3 className="font-display text-[16px] font-bold text-navy">{t(benefit.titleKey)}</h3>
                    <p className="font-sans text-[13px] text-slate-text leading-relaxed">{t(benefit.textKey)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lower Layout: Impact Stats Section */}
        <div className="pt-12 border-t border-slate-200/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, sIdx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, delay: sIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, scale: 1.015 }}
                className="interactive-surface bg-white border border-slate-200/50 rounded-[32px] p-6 lg:p-8 space-y-2 text-center shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:border-blue-200/80 hover:shadow-[0_20px_45px_-20px_rgba(15,43,75,0.2)] transition-[border-color,box-shadow] duration-300 relative overflow-hidden group"
              >
                <PointerGlow color="14, 116, 144" />
                {/* Visual accent circles */}
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-navy/5 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-xl pointer-events-none" />

                <div className="relative z-10 font-display text-[28px] md:text-[38px] lg:text-[44px] font-bold text-navy tracking-tight flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </div>
                
                <div className="space-y-1 relative z-10">
                  <p className="font-display text-[14px] font-bold text-navy tracking-tight">{t(stat.labelKey)}</p>
                  <p className="font-sans text-[11px] text-slate-text leading-tight">{t(stat.subKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
