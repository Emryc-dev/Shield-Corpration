import React from "react";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

export default function FooterSection() {
  const { language } = useLanguage();
  const currentYear = 2026;

  return (
    <footer 
      className="bg-navy text-white/90 py-16 px-4 border-t border-navy-dark w-full select-none"
      id="footer-section"
      role="contentinfo"
    >
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* Upper layout: corporate branding & site links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Logo & description column */}
          <div className="md:col-span-5 space-y-4">
            <Logo iconSize={32} theme="dark" />
            
            <p className="font-sans text-[13px] text-white/60 leading-relaxed max-w-[360px]">
              {language === "fr" 
                ? "Défense active de vos serveurs, réseaux d'entreprise et applications cloud via des audits de sécurité rigoureux et des architectures numériques durcies."
                : "Defending enterprise workflows, cloud networks, and web infrastructures through high-performance offensive auditing and secure digital architectures."}
            </p>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-4 font-sans text-[13px]">
            <h4 className="font-display font-semibold text-white/90 text-[14px]">Solutions</h4>
            <ul className="space-y-2.5">
              <li><a href="#solutions" className="text-white/60 hover:text-white transition-colors">ShieldDefend™</a></li>
              <li><a href="#solutions" className="text-white/60 hover:text-white transition-colors">CloudFortress</a></li>
              <li><a href="#solutions" className="text-white/60 hover:text-white transition-colors">CyberSOC 24/7</a></li>
              <li><a href="#solutions" className="text-white/60 hover:text-white transition-colors">SecureWeb Build</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4 font-sans text-[13px]">
            <h4 className="font-display font-semibold text-white/90 text-[14px]">
              {language === "fr" ? "Entreprise" : "Company"}
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="text-white/60 hover:text-white transition-colors">{language === "fr" ? "À Propos" : "About Us"}</a></li>
              <li><a href="#services" className="text-white/60 hover:text-white transition-colors">{language === "fr" ? "Catalogue" : "Services Catalog"}</a></li>
              <li><a href="#testimonials" className="text-white/60 hover:text-white transition-colors font-sans">{language === "fr" ? "Partenaires" : "Client Stories"}</a></li>
              <li><a href="#contact" className="text-white/60 hover:text-white transition-colors">{language === "fr" ? "Ticket Sécurisé" : "Secure Contact"}</a></li>
            </ul>
          </div>

          {/* Security and compliance info badge */}
          <div className="md:col-span-2 space-y-4 font-sans text-[13px]">
            <h4 className="font-display font-semibold text-white/90 text-[14px]">
              {language === "fr" ? "Norme SLA" : "SLA Standard"}
            </h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                {language === "fr" ? "SLA Actif Sécurisé" : "Secure Active SLA"}
              </span>
              <p className="text-[12px] font-semibold text-white block">
                {language === "fr" ? "Assurance < 24h" : "Under 24h Assurance"}
              </p>
              <p className="text-[11px] text-white/50 block">
                {language === "fr" ? "Réponse garantie" : "Response guaranteed"}
              </p>
            </div>
          </div>

        </div>

        {/* Lower layout: copyright & social connections */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white/40 font-sans text-[12px]">
          <div>
            <p>
              {language === "fr" 
                ? `Copyright \u00a9 ${currentYear} The Shield Corporation. Tous droits r\u00e9serv\u00e9s.`
                : `Copyright \u00a9 ${currentYear} The Shield Corporation. All rights reserved.`}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors">
              {language === "fr" ? "Confidentialité" : "Privacy Policy"}
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              {language === "fr" ? "Conditions d'utilisation" : "Terms of Operations"}
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              {language === "fr" ? "Divulgations" : "Security Disclosures"}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
