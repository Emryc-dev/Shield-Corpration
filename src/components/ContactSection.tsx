import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Clock, Send, MessageCircle, CheckCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { PointerGlow } from "./ui/pointer-glow";

export default function ContactSection() {
  const { language, t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });

  React.useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const id = customEvent.detail;
      const map: Record<string, string> = {
        "net-admin": "Network Administration",
        "sec-admin": "Security Administration",
        "pentest": "Pentesting",
        "web-test": "Web Application Testing",
        "cloud-comp": "Cloud Computing",
        "sec-host": "Secure Hosting",
        "cyber-cons": "Cybersecurity Consulting",
        "sec-dev": "Secure Web Development"
      };
      const mapped = map[id];
      if (mapped) {
        setFormData(prev => ({ ...prev, service: mapped }));
      }
    };
    window.addEventListener("select-service", handleSelectService);
    return () => window.removeEventListener("select-service", handleSelectService);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
    }
  };

  const handleWhatsAppClick = () => {
    const number = "237688956607";
    const text = language === "fr" 
      ? "Bonjour The Shield Corporation, je souhaite entrer en contact pour un audit de sÃ©curitÃ©."
      : "Hello The Shield Corporation, I would like to get in touch for a security audit.";
    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section 
      id="contact" 
      className="py-20 md:py-28 px-4 bg-slate-50/50 border-t border-slate-200/40 w-full scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="contact-title"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct contact info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 px-3.5 py-1.5 rounded-full text-navy text-[12px] font-semibold tracking-wide uppercase">
                {t("contact.badge")}
              </div>
              
              <h2 
                id="contact-title"
                className="font-display text-[32px] md:text-[44px] font-medium tracking-tight text-navy leading-[1.12]"
              >
                {t("contact.title")}
              </h2>
              
              <p className="font-sans text-[14px] md:text-[15px] text-slate-text leading-relaxed">
                {t("contact.desc")}
              </p>
            </div>

            <div className="space-y-4 font-sans text-[14px]">
              
              {/* Email Connection Row */}
              <div className="interactive-surface group relative overflow-hidden flex items-center gap-4 bg-white border border-slate-200/50 p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:border-blue-200/80 hover:shadow-[0_14px_30px_-18px_rgba(15,43,75,0.2)] transition-all duration-300">
                <PointerGlow />
                <div className="relative z-10 w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy font-bold group-hover:bg-navy group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="relative z-10">
                  <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    {language === "fr" ? "Email SÃ©curisÃ©" : "Secure Email"}
                  </p>
                  <a href="mailto:contact@theshieldcorporation.com" className="font-semibold text-navy hover:underline">
                    contact@theshieldcorporation.com
                  </a>
                </div>
              </div>

              {/* Phone Connection Row */}
              <div className="interactive-surface group relative overflow-hidden flex items-center gap-4 bg-white border border-slate-200/50 p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:border-blue-200/80 hover:shadow-[0_14px_30px_-18px_rgba(15,43,75,0.2)] transition-all duration-300">
                <PointerGlow />
                <div className="relative z-10 w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy font-bold group-hover:bg-navy group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="relative z-10">
                  <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    {language === "fr" ? "Support IT direct" : "Direct IT Support"}
                  </p>
                  <a href="tel:+237688956607" className="font-semibold text-navy hover:underline">
                    +237 6 88 95 66 07
                  </a>
                </div>
              </div>

              {/* Service response SLA Uptime indicator */}
              <div className="interactive-surface group relative overflow-hidden flex items-center gap-4 bg-white border border-slate-200/50 p-4 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_14px_30px_-18px_rgba(5,150,105,0.2)] transition-all duration-300">
                <PointerGlow color="16, 185, 129" />
                <div className="relative z-10 w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-3 transition-all duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="relative z-10">
                  <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    {language === "fr" ? "DÃ©lai Garanti" : "Response Time"}
                  </p>
                  <p className="font-semibold text-navy">
                    {language === "fr" ? "RÃ©ponse sous 24h ouvrÃ©es" : "Response under 24 business hours"}
                  </p>
                </div>
              </div>

            </div>

            {/* Quick WhatsApp CTA button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2 bg-[#0b7c9e] text-white font-semibold rounded-full px-6 py-3.5 text-[13px] hover:bg-navy active:scale-95 shadow-md shadow-[#0b7c9e]/15 hover:shadow-xl hover:shadow-[#0b7c9e]/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                {language === "fr" ? "Discuter sur WhatsApp" : "Chat on WhatsApp"}
              </button>
            </div>

          </div>

          {/* Right Column: Dynamic submission form card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/50 rounded-[40px] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.02)] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label htmlFor="name-input" className="text-[12px] font-bold text-navy font-display uppercase tracking-wide">
                          {language === "fr" ? "Votre Nom / Organisation *" : "Your Name / Organization *"}
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-[14px] text-navy focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all font-sans"
                          placeholder="e.g. Marc Alima"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label htmlFor="email-input" className="text-[12px] font-bold text-navy font-display uppercase tracking-wide">
                          {language === "fr" ? "Adresse Email SÃ©curisÃ©e *" : "Secure Corporate Email *"}
                        </label>
                        <input
                          id="email-input"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-[14px] text-navy focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all font-sans"
                          placeholder="e.g. contact@domain.com"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Enterprise input */}
                      <div className="space-y-1.5">
                        <label htmlFor="company-input" className="text-[12px] font-bold text-navy font-display uppercase tracking-wide">
                          {language === "fr" ? "Nom de l'Entreprise" : "Enterprise Name"}
                        </label>
                        <input
                          id="company-input"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-[14px] text-navy focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all font-sans"
                          placeholder="e.g. Afritech Capital"
                        />
                      </div>

                      {/* Service requested selector dropdown */}
                      <div className="space-y-1.5">
                        <label htmlFor="service-select" className="text-[12px] font-bold text-navy font-display uppercase tracking-wide">
                          {language === "fr" ? "Service SollicitÃ©" : "Service Requested"}
                        </label>
                        <select
                          id="service-select"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-[14px] text-navy focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all font-sans"
                        >
                          <option value="">{language === "fr" ? "Choisir un service..." : "Choose service..."}</option>
                          <option value="Network Administration">{t("services.netAdmin.title")}</option>
                          <option value="Security Administration">{t("services.secAdmin.title")}</option>
                          <option value="Pentesting">{t("services.pentest.title")}</option>
                          <option value="Web Application Testing">{t("services.webTest.title")}</option>
                          <option value="Cloud Computing">{t("services.cloud.title")}</option>
                          <option value="Secure Hosting">{t("services.host.title")}</option>
                          <option value="Cybersecurity Consulting">{t("services.consulting.title")}</option>
                          <option value="Secure Web Development">{t("services.webDev.title")}</option>
                        </select>
                      </div>

                    </div>

                    {/* Messages text-field box */}
                    <div className="space-y-1.5">
                      <label htmlFor="message-box" className="text-[12px] font-bold text-navy font-display uppercase tracking-wide">
                        {language === "fr" ? "Détails du projet" : "Project details"}
                      </label>
                      <textarea
                        id="message-box"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3.5 text-[14px] text-navy focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all font-sans resize-none"
                        placeholder={language === "fr" ? "Décrivez votre besoin, votre environnement technique ou vos délais..." : "Describe your need, current environment, or deadlines..."}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-navy text-white font-semibold rounded-full py-4 text-[14px] shadow-md hover:shadow-xl hover:bg-navy-dark active:scale-95 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      {language === "fr" ? "Envoyer ma demande" : "Send my request"}
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="form-feedback-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-display text-[22px] font-bold text-navy">
                        {language === "fr" ? "Demande reÃ§ue avec succÃ¨s" : "Request received"}
                      </h3>
                      <p className="font-sans text-[14px] text-slate-text max-w-[400px] mx-auto leading-relaxed">
                        {language === "fr" ? (
                          <>Nous vous remercions, <strong>{formData.name}</strong>. Nos Ã©quipes analysent vos informations avec la plus grande diligence. Nous vous recontacterons Ã  l'adresse <strong>{formData.email}</strong> sous 24 heures.</>
                        ) : (
                          <>Thank you for reaching out, <strong>{formData.name}</strong>. Our diagnostic operators are reviewing your request. We will follow up at <strong>{formData.email}</strong> under 24 business hours.</>
                        )}
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({ name: "", email: "", company: "", service: "", message: "" });
                        }}
                        className="text-[12px] font-bold text-navy font-display underline hover:text-navy-dark cursor-pointer"
                      >
                        {language === "fr" ? "Envoyer une autre demande" : "Send another communication"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
