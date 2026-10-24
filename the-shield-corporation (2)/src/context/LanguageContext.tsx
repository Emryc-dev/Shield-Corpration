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
    "nav.solutions": "Solutions",
    "nav.whyUs": "Why Us",
    "nav.clients": "Clients",
    "nav.contactUs": "Contact Us",

    "scroller.netSec": "Network Security",
    "scroller.pentest": "Ethical Testing",
    "scroller.cloud": "Secure Cloud",
    "scroller.soc": "Monitoring",
    "scroller.webProtect": "Web Protection",
    "scroller.consulting": "Cyber Consulting",
    "scroller.infra": "Infrastructure",
    "scroller.devsecops": "DevSecOps",

    "hero.badge": "Digital security & IT services",
    "hero.title": "Build a reliable and secure digital environment",
    "hero.desc": "Cybersecurity, network administration, cloud and web solutions designed to help companies operate with confidence.",
    "hero.btnExplore": "Explore our services",
    "hero.btnTalk": "Talk to an expert",

    "services.badge": "Services Catalog",
    "services.title": "IT services built for business reliability",
    "services.desc": "Improve security, performance and continuity across your networks, applications, cloud systems and digital projects.",
    "services.learnMore": "Discuss this service",
    "services.netAdmin.title": "Network Administration",
    "services.netAdmin.desc": "Keep your infrastructure stable, monitored and adapted to the way your teams work.",
    "services.secAdmin.title": "Security Administration",
    "services.secAdmin.desc": "Strengthen access control, firewall rules and security practices across your environment.",
    "services.pentest.title": "Pentesting",
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
    "about.title": "About The Shield Corporation",
    "about.desc1": "The Shield Corporation helps companies identify vulnerabilities, secure their infrastructure and build reliable digital environments through cybersecurity, cloud, network and secure web solutions.",
    "about.desc2": "We combine technical expertise, practical guidance and secure engineering methods to help organizations reduce risk and build digital systems that last.",
    "about.specsTitle": "Cybersecurity and IT engineering specialists",
    "about.specsDesc": "We connect strategic consulting with hands-on implementation to improve the resilience, performance and security of modern business systems.",
    "about.statDefense": "Continuous IT support",
    "about.statLeaks": "Critical issues reduced",

    "solutions.badge": "Professional Solutions",
    "solutions.title": "Solutions for safer digital operations",
    "solutions.desc": "We design practical platforms and processes that help companies monitor, protect and improve their digital environment.",
    "solutions.fortress.tagline": "Secure Cloud Isolation",
    "solutions.fortress.desc": "A structured approach to isolate cloud resources, protect workloads and manage access with clear security policies.",
    "solutions.soc.tagline": "Continuous System Monitoring",
    "solutions.soc.desc": "Monitoring that helps detect unusual activity, prioritize alerts and support faster response decisions.",
    "solutions.build.tagline": "Secure Application Stack",
    "solutions.build.desc": "A development approach that combines clean architecture, security testing and practical delivery standards.",

    "why.badge": "Professional Value",
    "why.title": "Why modern teams rely on The Shield Corporation",
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
    "why.stat3.label": "Support Available",
    "why.stat3.sub": "Average reply < 5 minutes",
    "why.stat4.label": "SLA Guaranteed",
    "why.stat4.sub": "Service continuity support",

    "testimonials.badge": "Client Feedback",
    "testimonials.title": "Trusted by teams building secure systems",
    "testimonials.desc": "See how companies improve their infrastructure, applications and security practices with our team.",

    "contact.badge": "Talk to our team",
    "contact.title": "Let us discuss your digital needs",
    "contact.desc": "Tell us about your infrastructure, application or security challenge. Our team will help you identify the next step.",
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
    "nav.solutions": "Solutions",
    "nav.whyUs": "Pourquoi nous",
    "nav.clients": "Clients",
    "nav.contactUs": "Contactez-nous",

    "scroller.netSec": "Sécurité réseau",
    "scroller.pentest": "Tests d'intrusion",
    "scroller.cloud": "Cloud sécurisé",
    "scroller.soc": "Monitoring",
    "scroller.webProtect": "Protection web",
    "scroller.consulting": "Conseil cyber",
    "scroller.infra": "Infrastructure",
    "scroller.devsecops": "DevSecOps",

    "hero.badge": "Services IT & cybersécurité",
    "hero.title": "Construisez un environnement numérique fiable et sécurisé",
    "hero.desc": "Cybersécurité, administration réseau, cloud et solutions web pour aider votre entreprise à avancer avec confiance.",
    "hero.btnExplore": "Explorer nos services",
    "hero.btnTalk": "Parler à un expert",

    "services.badge": "Catalogue de services",
    "services.title": "Des services IT conçus pour la fiabilité",
    "services.desc": "Améliorez la sécurité, la performance et la continuité de vos réseaux, applications, systèmes cloud et projets numériques.",
    "services.learnMore": "Discuter de ce service",
    "services.netAdmin.title": "Administration réseau",
    "services.netAdmin.desc": "Gardez une infrastructure stable, surveillée et adaptée au fonctionnement de vos équipes.",
    "services.secAdmin.title": "Administration de la sécurité",
    "services.secAdmin.desc": "Renforcez vos accès, vos règles de sécurité et la protection de votre environnement informatique.",
    "services.pentest.title": "Pentesting",
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
    "about.title": "À propos de The Shield Corporation",
    "about.desc1": "The Shield Corporation accompagne les entreprises dans la détection des vulnérabilités, le renforcement de leur infrastructure et le développement d'environnements numériques fiables.",
    "about.desc2": "Nous combinons expertise technique, conseil pratique et ingénierie sécurisée pour aider les organisations à réduire leurs risques et construire des systèmes durables.",
    "about.specsTitle": "Spécialistes cybersécurité et ingénierie IT",
    "about.specsDesc": "Nous relions le conseil stratégique à l'implémentation concrète pour améliorer la résilience, la performance et la sécurité des systèmes modernes.",
    "about.statDefense": "Support IT continu",
    "about.statLeaks": "Risques critiques réduits",

    "solutions.badge": "Solutions professionnelles",
    "solutions.title": "Des solutions pour des opérations numériques plus sûres",
    "solutions.desc": "Nous concevons des plateformes et méthodes pratiques pour aider les entreprises à surveiller, protéger et améliorer leur environnement numérique.",
    "solutions.fortress.tagline": "Isolation cloud sécurisée",
    "solutions.fortress.desc": "Une approche structurée pour isoler vos ressources cloud, protéger vos charges de travail et gérer les accès avec des règles claires.",
    "solutions.soc.tagline": "Monitoring continu des systèmes",
    "solutions.soc.desc": "Une surveillance qui aide à détecter les comportements inhabituels, prioriser les alertes et accélérer les décisions.",
    "solutions.build.tagline": "Stack applicative sécurisée",
    "solutions.build.desc": "Une méthode de développement qui associe architecture claire, tests de sécurité et standards de livraison pratiques.",

    "why.badge": "Valeur professionnelle",
    "why.title": "Pourquoi les équipes modernes choisissent The Shield Corporation",
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
    "why.stat3.label": "Support disponible",
    "why.stat3.sub": "Réponse moyenne < 5 minutes",
    "why.stat4.label": "SLA garanti",
    "why.stat4.sub": "Continuité de service accompagnée",

    "testimonials.badge": "Retours clients",
    "testimonials.title": "Des équipes nous confient leurs systèmes critiques",
    "testimonials.desc": "Découvrez comment nos clients améliorent leurs infrastructures, applications et pratiques de sécurité avec notre équipe.",

    "contact.badge": "Parler à notre équipe",
    "contact.title": "Discutons de vos besoins numériques",
    "contact.desc": "Présentez-nous votre infrastructure, votre application ou votre enjeu de sécurité. Notre équipe vous aidera à identifier la prochaine étape.",
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