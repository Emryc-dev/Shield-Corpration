import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { servicesList } from "../data/serviceDetails";

interface ServicesSectionProps {
  onNavigateToService: (id: string) => void;
}

export default function ServicesSection({ onNavigateToService }: ServicesSectionProps) {
  const { t } = useLanguage();

  return (
    <section 
      id="services" 
      className="py-20 md:py-28 px-4 bg-slate-50/50 border-y border-slate-200/45 w-full scroll-mt-24 md:scroll-mt-28 select-none"
      aria-labelledby="services-title"
    >
      <div className="max-w-[1400px] mx-auto space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-[600px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 px-3.5 py-1.5 rounded-full text-navy text-[12px] font-semibold tracking-wide uppercase">
            {t("services.badge")}
          </div>
          <h2 
            id="services-title"
            className="font-display text-[32px] md:text-[44px] font-medium tracking-tight text-navy leading-[1.12]"
          >
            {t("services.title")}
          </h2>
          <p className="font-sans text-[14px] md:text-[15px] text-slate-text leading-relaxed">
            {t("services.desc")}
          </p>
        </div>

        {/* 8-Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => onNavigateToService(service.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigateToService(service.id);
                  }
                }}
                aria-label={`Service detail: ${t(service.titleKey)}`}
                className="group relative bg-white border border-slate-200/50 rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-[0_10px_30px_-15px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.03)] focus-visible:ring-2 focus-visible:ring-navy focus-visible:outline-none transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Subtle colorful radial highlight on hover to replicate Sleek design feel */}
                <div className={`absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br ${service.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl z-0`} />

                <div className="space-y-5 relative z-10">
                  {/* Icon wrapper */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-navy border border-slate-100 group-hover:bg-navy group-hover:text-white group-hover:border-navy transition-all duration-300 shadow-sm">
                    <IconComp className="w-5.5 h-5.5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-[17px] md:text-[18px] font-semibold text-navy tracking-tight">
                      {t(service.titleKey)}
                    </h3>
                    <p className="font-sans text-[13px] text-slate-text leading-relaxed">
                      {t(service.descKey)}
                    </p>
                  </div>
                </div>

                {/* Footer cta-arrow inside clean design framework */}
                <div className="pt-6 relative z-10 flex items-center justify-between text-slate-400 group-hover:text-navy transition-colors duration-300">
                  <span className="font-sans text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t("services.learnMore")}
                  </span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
