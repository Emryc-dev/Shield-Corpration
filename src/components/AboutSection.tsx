import React from "react";
import { Shield } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function AboutSection() {
  const { language, t } = useLanguage();

  return (
    <section 
      id="about" 
      className="py-20 md:py-28 px-4 w-full max-w-[1400px] mx-auto scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="about-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left text column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 px-3.5 py-1.5 rounded-full text-navy text-[12px] font-semibold tracking-wide uppercase">
            {t("about.badge")}
          </div>
          
          <h2 
            id="about-title"
            className="font-display text-[32px] md:text-[48px] font-medium tracking-tight text-navy leading-[1.12]"
          >
            {t("about.title")}
          </h2>
          
          <p className="font-sans text-[15px] md:text-[17px] text-slate-text leading-relaxed">
            {t("about.desc1")}
          </p>
          
          <p className="font-sans text-[14px] md:text-[15px] text-slate-text/90 leading-relaxed">
            {t("about.desc2")}
          </p>
        </motion.div>

        {/* Right visual layout column with modern cards / details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative bg-white border border-slate-200/50 rounded-[32px] p-8 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.02)] overflow-hidden">
            {/* Ambient visual badge decoration */}
            <div className="absolute top-0 right-0 -trany-x-4 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center text-navy border border-navy/10 shadow-sm">
                <Shield className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-[18px] font-semibold text-navy">{t("about.specsTitle")}</h3>
                <p className="font-sans text-[13px] text-slate-text leading-relaxed">
                  {t("about.specsDesc")}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-display text-[24px] font-bold text-navy">24/7</div>
                  <div className="font-sans text-[11px] text-slate-text uppercase font-semibold">{t("about.statDefense")}</div>
                </div>
                <div>
                  <div className="font-display text-[24px] font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {language === "fr" ? "Zéro" : "Zero"}
                  </div>
                  <div className="font-sans text-[11px] text-slate-text uppercase font-semibold">{t("about.statLeaks")}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
