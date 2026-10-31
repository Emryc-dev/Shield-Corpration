import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations: Record<Language, Record<string, any>> = {
  en: {
    "nav.services": "Services",
    "nav.packs": "Packs",
    "nav.whyUs": "Why Us",
    "nav.clients": "Clients",
    "nav.contactUs": "Contact Us",
    "nav.store": "Store",

    "scroller.netSec": "Network Security",
    "scroller.pentest": "Penetration Testing",
    "scroller.cloud": "Secure Cloud",
    "scroller.soc": "Monitoring",
    "scroller.webProtect": "Web Protection",
    "scroller.consulting": "Cyber Consulting",
    "scroller.infra": "Infrastructure",
    "scroller.devsecops": "Secure Development",

    "hero.badge": "Cybersecurity · Networks · Cloud",
    "hero.title": "Your systems protected. Your business at ease.",
    "hero.desc": "Security audits, network administration, cloud and secure web development for SMEs, startups and institutions.",
    "hero.btnAudit": "Request my security audit",
    "hero.btnExplore": "Discover our services",
    "hero.btnTalk": "Talk to an expert",

    "services.badge": "Our Services",
    "services.title": "IT services to protect and sustain your business",
    "services.desc": "Security, performance, continuity: we cover your networks, applications and cloud systems.",
    "services.learnMore": "View service",
    "services.netAdmin.title": "Network Administration",
    "services.netAdmin.desc": "Keep your infrastructure stable, monitored and adapted to the way your teams work.",
    "services.secAdmin.title": "Security Administration",
    "services.secAdmin.desc": "Strengthen access control, firewall rules and security practices across your environment.",
    "services.pentest.title": "Penetration Testing",
    "services.pentest.desc": "Identify vulnerabilities before they become business risks, with clear recommendations.",
    "services.webTest.title": "Web Application Audit",
    "services.webTest.desc": "Assess the security, reliability and performance of your web applications and APIs.",
    "services.cloud.title": "Cloud Computing",
    "services.cloud.desc": "Move and scale your resources with cloud infrastructure adapted to your needs.",
    "services.host.title": "Secure Hosting",
    "services.host.desc": "Host your websites, applications and data in a reliable and secure environment.",
    "services.consulting.title": "Cybersecurity Consulting",
    "services.consulting.desc": "Build a practical cybersecurity strategy aligned with your risks, teams and objectives.",
    "services.webDev.title": "Secure Web Development",
    "services.webDev.desc": "Create performant web applications with security integrated from the first design decisions.",

    "about.badge": "Who We Are",
    "about.title": "Your cybersecurity and IT partner",
    "about.desc1": "We help companies spot their weaknesses, protect their infrastructure and build reliable systems: cybersecurity, networks, cloud and secure web.",
    "about.desc2": "We combine technical expertise, practical guidance and secure engineering methods to help organizations reduce risk and build digital systems that last.",
    "about.specsTitle": "From advice to delivery, one team",
    "about.specsDesc": "We connect strategic consulting with hands-on implementation to improve the resilience, performance and security of modern business systems.",
    "about.statDefense": "",
    "about.statLeaks": "Critical issues reduced",

    "packs.badge": "Our Packs",
    "packs.title": "Clear packs to secure your business",
    "packs.desc": "From a first diagnosis to full coverage, every pack includes your showcase website. Choose the level that fits your business.",
    "packs.cta": "Choose this pack",
    "packs.ctaQuote": "Request a quote",
    "packs.recommended": "Recommended",
    "packs.details": "View details",
    "packs.hideDetails": "Hide details",
    "packs.idealFor": "Ideal for",
    "packs.notIncluded": "Not included",
    "packs.duration": "Duration",
    "packs.price": "Price",
    "packs.options": "Available options: monthly maintenance, hosting, website content writing.",

    "why.badge": "Professional Value",
    "why.title": "Why choose The Shield Corporation",
    "why.desc": "We support startups, SMEs and organizations that need reliable systems, practical security and clear technical guidance.",
    "why.secops": "SECURE IT SUPPORT // RELIABLE SYSTEMS // PRACTICAL GUIDANCE",
    "why.benefit1.title": "Practical cybersecurity expertise",
    "why.benefit1.text": "We assess real risks, test your systems responsibly and help your team apply the right improvements.",
    "why.benefit2.title": "Secure-by-design approach",
    "why.benefit2.text": "Security is integrated early, so issues are easier to prevent, detect and correct before production.",
    "why.benefit3.title": "Accessible technical support",
    "why.benefit3.text": "You work with accessible technical specialists who can explain priorities clearly and act quickly.",
    "why.benefit4.title": "Complete digital coverage",
    "why.benefit4.text": "We cover cloud systems, office networks, workstations, databases, websites and business applications.",
    "why.stat1.label": "Supported Clients",
    "why.stat1.sub": "Startups, SMEs & Institutions",
    "why.stat2.label": "Security Audits",
    "why.stat2.sub": "Infrastructure tests performed",
    "why.stat3.label": "Response time",
    "why.stat3.sub": "Reply within 24 business hours",
    "why.stat4.label": "SLA Guaranteed",
    "why.stat4.sub": "Service continuity commitment",

    "testimonials.badge": "Client Feedback",
    "testimonials.title": "Trusted by teams building secure systems",
    "testimonials.desc": "See how companies improve their infrastructure, applications and security practices with our team.",

    "contact.badge": "Talk to our team",
    "contact.title": "Let's discuss your project",
    "contact.desc": "Describe your need: security, network, cloud or development. We reply within 24 business hours with the next steps.",
    "contact.form.name": "Full Name / Organization",
    "contact.form.email": "Professional Email",
    "contact.form.message": "Project details or request",
    "contact.form.submit": "Send my request",
    "contact.form.success": "Your request has been received. Our team will contact you soon with the next steps.",

    "chat.title": "Shield Assistant",
    "chat.subtitle": "Online, IT guidance",
    "chat.placeholder": "Ask about services or the Store...",
    "chat.suggest1": "How can I secure my cloud infrastructure?",
    "chat.suggest2": "What services does The Shield Corporation provide?",
    "chat.suggest3": "Can you help me choose a product?",
  },
  fr: {
    "nav.services": "Services",
    "nav.packs": "Packs",
    "nav.whyUs": "Pourquoi nous",
    "nav.clients": "Clients",
    "nav.contactUs": "Contactez-nous",
    "nav.store": "Boutique",

    "scroller.netSec": "Sécurité réseau",
    "scroller.pentest": "Tests d'intrusion",
    "scroller.cloud": "Cloud sécurisé",
    "scroller.soc": "Supervision",
    "scroller.webProtect": "Protection web",
    "scroller.consulting": "Conseil cyber",
    "scroller.infra": "Infrastructure",
    "scroller.devsecops": "Développement sécurisé",

    "hero.badge": "Cybersécurité · Réseaux · Cloud",
    "hero.title": "Vos systèmes protégés. Votre activité sereine.",
    "hero.desc": "Audit de sécurité, administration réseau, cloud et développement web sécurisé pour PME, startups et institutions.",
    "hero.btnAudit": "Demander mon audit de sécurité",
    "hero.btnExplore": "Découvrir nos services",
    "hero.btnTalk": "Parler à un expert",

    "services.badge": "Nos services",
    "services.title": "Des services IT pour la mise en place, protéger et faire durer votre activité",
    "services.desc": "Sécurité, performance, continuité : nous couvrons vos réseaux, vos applications et vos systèmes cloud.",
    "services.learnMore": "Voir le service",
    "services.netAdmin.title": "Administration réseau",
    "services.netAdmin.desc": "Mise en place de votre infrastructure, surveillance et adaptation au fonctionnement de vos équipes.",
    "services.secAdmin.title": "Administration de la sécurité",
    "services.secAdmin.desc": "Renforcez vos accès, vos règles de sécurité et la protection de votre environnement informatique.",
    "services.pentest.title": "Tests d'intrusion",
    "services.pentest.desc": "Identifiez vos vulnérabilités avant qu'elles ne deviennent un risque pour votre activité.",
    "services.webTest.title": "Audit d'applications web",
    "services.webTest.desc": "Évaluez la sécurité, la fiabilité et la performance de vos applications web et API.",
    "services.cloud.title": "Cloud computing",
    "services.cloud.desc": "Faites évoluer vos ressources avec une infrastructure cloud adaptée à vos besoins.",
    "services.host.title": "Hébergement sécurisé",
    "services.host.desc": "Hébergez vos sites, applications et données dans un environnement fiable et sécurisé.",
    "services.consulting.title": "Conseil en cybersécurité",
    "services.consulting.desc": "Construisez une stratégie cyber pratique, alignée avec vos risques, vos équipes et vos objectifs.",
    "services.webDev.title": "Développement web sécurisé",
    "services.webDev.desc": "Créez des applications web performantes avec la sécurité intégrée dès la conception.",

    "about.badge": "Qui sommes-nous",
    "about.title": "Votre partenaire cybersécurité et IT",
    "about.desc1": "Nous aidons les entreprises à repérer leurs failles, protéger leur infrastructure et bâtir des systèmes fiables : cybersécurité, réseaux, cloud et web sécurisé.",
    "about.desc2": "Nous combinons expertise technique, conseil pratique et ingénierie sécurisée pour aider les organisations à réduire leurs risques et construire des systèmes durables.",
    "about.specsTitle": "Du conseil à la mise en œuvre, une seule équipe",
    "about.specsDesc": "Nous relions le conseil stratégique à l'implémentation concrète pour améliorer la résilience, la performance et la sécurité des systèmes modernes.",
    "about.statDefense": "Support 7 jours/7",
    "about.statLeaks": "Risques critiques réduits",

    "packs.badge": "Nos packs",
    "packs.title": "Des packs clairs pour sécuriser votre entreprise",
    "packs.desc": "Du premier diagnostic à la couverture complète, chaque pack inclut votre site vitrine. Choisissez le niveau qui correspond à votre entreprise.",
    "packs.cta": "Choisir ce pack",
    "packs.ctaQuote": "Demander un devis",
    "packs.recommended": "Recommandé",
    "packs.details": "Voir le détail",
    "packs.hideDetails": "Masquer le détail",
    "packs.idealFor": "Idéal pour",
    "packs.notIncluded": "Non inclus",
    "packs.duration": "Durée",
    "packs.price": "Tarif",
    "packs.options": "Options disponibles : maintenance mensuelle, hébergement, rédaction des contenus du site.",

    "why.badge": "Valeur professionnelle",
    "why.title": "Pourquoi choisir The Shield Corporation",
    "why.desc": "Nous accompagnons les startups, PME et organisations qui ont besoin de systèmes fiables, d'une sécurité pratique et d'un conseil technique clair.",
    "why.secops": "SUPPORT IT SÉCURISÉ // SYSTÈMES FIABLES // CONSEIL PRATIQUE",
    "why.benefit1.title": "Expertise cyber concrète",
    "why.benefit1.text": "Nous évaluons les risques réels, testons vos systèmes de façon responsable et aidons vos équipes à appliquer les bonnes améliorations.",
    "why.benefit2.title": "Approche sécurisée dès la conception",
    "why.benefit2.text": "La sécurité est intégrée tôt, pour prévenir, détecter et corriger plus facilement les problèmes avant la production.",
    "why.benefit3.title": "Support technique accessible",
    "why.benefit3.text": "Vous échangez avec des spécialistes capables d'expliquer les priorités clairement et d'agir rapidement.",
    "why.benefit4.title": "Couverture numérique complète",
    "why.benefit4.text": "Nous couvrons les systèmes cloud, réseaux, postes de travail, bases de données, sites web et applications métier.",
    "why.stat1.label": "Clients accompagnés",
    "why.stat1.sub": "Startups, PME & Institutions",
    "why.stat2.label": "Audits réalisés",
    "why.stat2.sub": "Tests d'infrastructures effectués",
    "why.stat3.label": "Délai de réponse",
    "why.stat3.sub": "Réponse sous 24 h ouvrées",
    "why.stat4.label": "SLA garanti",
    "why.stat4.sub": "Engagement de continuité de service",

    "testimonials.badge": "Retours clients",
    "testimonials.title": "Des équipes nous confient leurs systèmes critiques",
    "testimonials.desc": "Découvrez comment nos clients améliorent leurs infrastructures, applications et pratiques de sécurité avec notre équipe.",

    "contact.badge": "Parler à notre équipe",
    "contact.title": "Discutons de votre projet",
    "contact.desc": "Décrivez votre besoin : sécurité, réseau, cloud ou développement. Nous vous répondons sous 24 h ouvrées avec les prochaines étapes.",
    "contact.form.name": "Nom complet / Organisation",
    "contact.form.email": "Email professionnel",
    "contact.form.message": "Détails du projet ou de la demande",
    "contact.form.submit": "Envoyer ma demande",
    "contact.form.success": "Votre demande a été reçue. Notre équipe vous recontactera bientôt avec les prochaines étapes.",

    "chat.title": "Shield Assistant",
    "chat.subtitle": "En ligne, conseil IT",
    "chat.placeholder": "Posez une question sur nos services ou le Store...",
    "chat.suggest1": "Comment sécuriser mon infrastructure cloud ?",
    "chat.suggest2": "Quels services propose The Shield Corporation ?",
    "chat.suggest3": "Pouvez-vous m'aider à choisir un produit ?",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const browserLang = navigator.language.startsWith("fr") ? "fr" : "en";
    return browserLang;
  });

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "fr" : "en"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};