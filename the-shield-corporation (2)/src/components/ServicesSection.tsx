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
        <div className="text-center max-w-[700px] mx-auto space-y-4">
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
              <motion.button
                type="button"
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => onNavigateToService(service.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -9, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                aria-label={`Service detail: ${t(service.titleKey)}`}
                className="service-image-card group relative min-h-[350px] md:min-h-[390px] rounded-[32px] p-6 md:p-7 flex flex-col justify-between text-left border border-white/15 shadow-[0_18px_45px_-20px_rgba(6,17,32,0.35)] hover:border-white/30 hover:shadow-[0_32px_70px_-22px_rgba(6,17,32,0.5)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy focus-visible:outline-none transition-[border-color,box-shadow] duration-300 overflow-hidden cursor-pointer"
              >
                <img
                  src={service.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="service-card-image absolute inset-0 h-full w-full object-cover"
                />

                <div className="service-card-shade absolute inset-0" aria-hidden="true" />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-white/12 flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-navy group-hover:-translate-y-1 group-hover:rotate-3 transition-all duration-300">
                      <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="font-display text-[11px] font-semibold text-white/65 tracking-[0.14em]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="max-w-[260px] min-h-[3.9em] font-display text-[27px] md:text-[30px] lg:text-[clamp(25px,2vw,31px)] font-semibold text-white tracking-[-0.025em] leading-[1.08]">
                    {t(service.titleKey)}
                  </h3>
                </div>

                <div className="service-card-content relative z-10">
                  <div className="service-card-reveal">
                    <p className="font-sans text-[13px] text-white/78 leading-relaxed">
                      {t(service.descKey)}
                    </p>

                    <div className="pt-5 flex items-center justify-between text-white">
                      <span className="font-sans text-[12px] font-semibold">
                        {t("services.learnMore")}
                      </span>
                      <span className="w-9 h-9 rounded-full border border-white/25 bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-navy transition-colors duration-300">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
