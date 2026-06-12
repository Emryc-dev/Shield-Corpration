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

// Simple flat dictionary keys matching the content of all sections
const translations: Record<Language, Record<string, any>> = {
  en: {
    // Nav & General
    "nav.services": "Services",
    "nav.solutions": "Solutions",
    "nav.whyUs": "Why Us",
    "nav.clients": "Clients",
    "nav.contactUs": "Contact Us",

    // Scroller badges
    "scroller.netSec": "Network Security",
    "scroller.pentest": "Ethical Pentesting",
    "scroller.cloud": "Secure Cloud",
    "scroller.soc": "SOC Monitor",
    "scroller.webProtect": "Web Protection",
    "scroller.consulting": "Cyber Consulting",
    "scroller.infra": "Infrastructure",
    "scroller.devsecops": "DevSecOps",

    // Hero Section
    "hero.badge": "Next-Gen Defensive Operations",
    "hero.title": "Secure your business with digital protection",
    "hero.desc": "Cybersecurity, network administration, pentesting, secure cloud and web solutions for modern businesses.",
    "hero.btnExplore": "Explore Our Solutions",
    "hero.btnTalk": "Talk To An Expert",

    // Services Catalog
    "services.badge": "Services Catalog",
    "services.title": "Defense-grade operations",
    "services.desc": "Protect every entry-point, transition channel, and file-system directory with customized defense strategies tailored for digital enterprises.",
    "services.learnMore": "Learn more",
    "services.netAdmin.title": "Network Administration",
    "services.netAdmin.desc": "Design, deployment and continuous monitoring of strong routing structures to keep corporate systems seamlessly integrated.",
    "services.secAdmin.title": "Security Administration",
    "services.secAdmin.desc": "Robust identity control configurations, strict firewall rules, and unified protocol application across remote teams.",
    "services.pentest.title": "Pentesting",
    "services.pentest.desc": "Proactive, simulation-based ethical hacks to isolate weak targets before external attackers can leverage them.",
    "services.webTest.title": "Web Application Testing",
    "services.webTest.desc": "Granular verification checks on front-end platforms, API endpoints, and SQL queries to eliminate logic flaws.",
    "services.cloud.title": "Cloud Computing",
    "services.cloud.desc": "Serverless frameworks, elastic scaling strategy, and policy configurations adapted for rapid workspace transitions.",
    "services.host.title": "Secure Hosting",
    "services.host.desc": "Siloed environment virtualization with DDoS shielding, active memory integrity scans, and redundant geographical mirrors.",
    "services.consulting.title": "Cybersecurity Consulting",
    "services.consulting.desc": "Actionable strategic intelligence mapping, compliance audits, and responsive employee preparedness workshops.",
    "services.webDev.title": "Secure Web Development",
    "services.webDev.desc": "Crafting fully encrypted web applications using pristine backend architectures, defensive data routing, and secure databases.",

    // About Section
    "about.badge": "Who We Are",
    "about.title": "About The Shield Corporation",
    "about.desc1": "The Shield Corporation helps companies identify vulnerabilities, secure their infrastructure and build reliable digital environments through cybersecurity, cloud, network and secure web solutions.",
    "about.desc2": "With our deep certified defensive intelligence, we empower local and global institutions to tackle threats before they arise. Security is not just a feature—it is the foundation of the digital world.",
    "about.specsTitle": "Offensive & Defensive Security Specialists",
    "about.specsDesc": "We balance strategic consulting with state-of-the-art diagnostic algorithms to deploy end-to-end resilient ecosystems for modern business.",
    "about.statDefense": "Active Threat Defense",
    "about.statLeaks": "Zero Critical Leaks",

    // Core Products / Solutions
    "solutions.badge": "Core Products",
    "solutions.title": "Enterprise security suites",
    "solutions.desc": "We build production platforms capable of withstanding state-sponsored attacks, allowing builders to scale with absolute confidence.",
    "solutions.fortress.tagline": "Encrypted Node Sandboxing",
    "solutions.fortress.desc": "Advanced infrastructure sandboxing. Segregates and protects virtual nodes and container groups with military-grade custom encryption keys.",
    "solutions.soc.tagline": "Always-On Telemetry Radar",
    "solutions.soc.desc": "Security Operations Center monitoring packet flows, detecting anomalous access patterns, and alerting incident response teams instantly.",
    "solutions.build.tagline": "Hardened Application Stack",
    "solutions.build.desc": "Durable design implementation strategy. Delivers fully hardened server interfaces backed by rigorous penetration testing audits and certification.",

    // Why Choose Us
    "why.badge": "Professional Value",
    "why.title": "Why modern teams rely on The Shield Corporation",
    "why.desc": "We deliver defensive strategies tailored for startups, SMEs, and enterprise institutions who refuse to trade stability for velocity.",
    "why.secops": "🛡️ ENCRYPTED CHANNELS SECURED // CERTIFIED SEC_OPS 2026",
    "why.benefit1.title": "Offensive & Defensive Expertise",
    "why.benefit1.text": "With certified ethical hackers and specialized blue teams, we simulate real attack frameworks while building pristine defenses.",
    "why.benefit2.title": "Proactive Secure Approach",
    "why.benefit2.text": "We integrate diagnostic tools directly inside compile-chains to isolate structural bugs before software reaches production.",
    "why.benefit3.title": "Fast Technical Support",
    "why.benefit3.text": "Continuous active channels with immediate engineer coordination. No waiting rooms, just high-performance assistance.",
    "why.benefit4.title": "Comprehensive Protection",
    "why.benefit4.text": "We safeguard cloud backends, physical office networks, local terminals, databases, and client web applications simultaneously.",
    "why.stat1.label": "Protected Clients",
    "why.stat1.sub": "Startups, SMEs & Institutions",
    "why.stat2.label": "Security Audits",
    "why.stat2.sub": "Infrastructure tests performed",
    "why.stat3.label": "Support Available",
    "why.stat3.sub": "Average reply < 5 minutes",
    "why.stat4.label": "SLA Guaranteed",
    "why.stat4.sub": "Continuous system operation",

    // Testimonials
    "testimonials.badge": "Verified Credibility",
    "testimonials.title": "Trusted by defense pioneers",
    "testimonials.desc": "Discover how standard enterprise projects achieve flawless compliance, isolate real breaches daily, and solidify operations.",

    // Contact Us Section
    "contact.badge": "Incident Mitigation",
    "contact.title": "Initiate secure system contact",
    "contact.desc": "Get in touch with a senior cyber defense coordinator in under five minutes. Safeguard your infrastructure today.",
    "contact.form.name": "Full Name / Organization",
    "contact.form.email": "Secure Corporate Email",
    "contact.form.message": "Incident Details or Inquiry Description",
    "contact.form.submit": "Submit Secure Ticket",
    "contact.form.success": "Secure ticket generated successfully! One of our security coordinators will call you back on your provided secure channel.",

    // Chatbot widget translations
    "chat.title": "Shield Secure Assistant",
    "chat.subtitle": "Online - AI Coordinator",
    "chat.placeholder": "Ask a security question...",
    "chat.suggest1": "How to secure my cloud infrastructure?",
    "chat.suggest2": "What services does Shield Corporation provide?",
    "chat.suggest3": "Tell me about ShieldDefend™",
  },
  fr: {
    // Nav & General
    "nav.services": "Services",
    "nav.solutions": "Solutions",
    "nav.whyUs": "Pourquoi Nous",
    "nav.clients": "Clients",
    "nav.contactUs": "Contactez-nous",

    // Scroller badges
    "scroller.netSec": "Sécurité Réseau",
    "scroller.pentest": "Hack Éthique",
    "scroller.cloud": "Cloud Sécurisé",
    "scroller.soc": "Surveillance SOC",
    "scroller.webProtect": "Protection Web",
    "scroller.consulting": "Conseil Cyber",
    "scroller.infra": "Infrastructure",
    "scroller.devsecops": "DevSecOps",

    // Hero Section
    "hero.badge": "Opérations Défensives de Nouvelle Génération",
    "hero.title": "Sécurisez votre entreprise avec une protection numérique",
    "hero.desc": "Cybersécurité, administration réseau, pentesting, cloud sécurisé et solutions web pour les entreprises modernes.",
    "hero.btnExplore": "Explorer nos Solutions",
    "hero.btnTalk": "Parler à un Expert",

    // Services Catalog
    "services.badge": "Catalogue de Services",
    "services.title": "Opérations de niveau militaire",
    "services.desc": "Protégez chaque point d'entrée, canal de transition et répertoire système avec des stratégies de défense sur mesure adaptées aux entreprises modernes.",
    "services.learnMore": "En savoir plus",
    "services.netAdmin.title": "Administration Réseau",
    "services.netAdmin.desc": "Conception, déploiement et surveillance continue de structures de routage solides pour intégrer vos systèmes d'entreprise.",
    "services.secAdmin.title": "Administration de la Sécurité",
    "services.secAdmin.desc": "Configurations robustes d'identité, règles de pare-feu optimales et protocoles de travail sécurisés à distance.",
    "services.pentest.title": "Pentester / Tests d'Intrusion",
    "services.pentest.desc": "Piratage éthique simulé proactif pour isoler les cibles fragiles avant que des attaquants externes ne les exploitent.",
    "services.webTest.title": "Audit d'Applications Web",
    "services.webTest.desc": "Contrôles de validation granulaires sur vos portails, API et requêtes de bases de données pour éliminer toute faille logique.",
    "services.cloud.title": "Cloud Computing",
    "services.cloud.desc": "Infrastructures serverless de confiance, stratégies de scaling élastiques et configurations de politiques de sécurité cloud.",
    "services.host.title": "Hébergement Sécurisé",
    "services.host.desc": "Virtualisation étanche avec protection DDoS, scans d'intégrité de mémoire vive et redondances géographiques.",
    "services.consulting.title": "Conseil en Cybersécurité",
    "services.consulting.desc": "Conseils stratégiques, audits de conformité réglementaire (RGPD/ISO) et ateliers pratiques de préparation des équipes.",
    "services.webDev.title": "Développement Web Sécurisé",
    "services.webDev.desc": "Création d'applications web cryptées basées sur des bases de données et architectures back-end impénétrables.",

    // About Section
    "about.badge": "Qui Sommes-Nous",
    "about.title": "À Propos de The Shield Corporation",
    "about.desc1": "The Shield Corporation accompagne les entreprises dans la détection des vulnérabilités, le renforcement de leur infrastructure et le développement d'environnements numériques fiables via nos solutions cloud, réseau et web.",
    "about.desc2": "Forts d'un savoir-faire défensif certifié, nous aidons les organisations locales et internationales à devancer les cybermenaces. La sécurité n'est pas un accessoire : c'est le ciment du monde numérique.",
    "about.specsTitle": "Spécialistes Cyber Offensifs & Défensifs",
    "about.specsDesc": "Nous combinons le conseil stratégique de haut niveau avec des outils de diagnostic avancés pour garantir la résilience de vos systèmes.",
    "about.statDefense": "Défense Cyber Active 24/7",
    "about.statLeaks": "Zéro Fuite Critique",

    // Core Products / Solutions
    "solutions.badge": "Nos Produits Phares",
    "solutions.title": "Suites de sécurité d'entreprise",
    "solutions.desc": "Nous concevons des plateformes professionnelles résistantes aux attaques les plus sophistiquées, vous offrant une sérénité absolue.",
    "solutions.fortress.tagline": "Sandbox de Nœuds Chiffrés",
    "solutions.fortress.desc": "Structure d'isolation avancée de vos containers et serveurs virtuels dotée de jetons et de clés d'encryption de niveau défense.",
    "solutions.soc.tagline": "Radar Télémétrique Permanent",
    "solutions.soc.desc": "Centre opérationnel analysant vos flux de paquets réseau, identifiant les comportements anormaux et alertant nos experts.",
    "solutions.build.tagline": "Stack Applicative Durcie",
    "solutions.build.desc": "Méthode de conception d'interfaces ultra-sécurisées, auditées méticuleusement avant livraison par nos meilleurs pentesters.",

    // Why Choose Us
    "why.badge": "Notre Valeur Professionnelle",
    "why.title": "Pourquoi les leaders choisissent The Shield Corporation",
    "why.desc": "Nous fournissons des boucliers défensifs sur-mesure pour les startups innovantes, les PME et les grandes institutions exigeantes.",
    "why.secops": "🛡️ CANAUX CHIFFRÉS SÉCURISÉS // CERTIFIÉ SEC_OPS 2026",
    "why.benefit1.title": "Double Expertise Offensive-Défensive",
    "why.benefit1.text": "Nos Blue Teams et hackers éthiques certifiés simulent des attaques complexes d'une part, tout en durcissant vos verrous d'autre part.",
    "why.benefit2.title": "Méthode Cyber Native Proactive",
    "why.benefit2.text": "Nous branchons des diagnostics intelligents dès la compilation de votre code pour corriger les failles avant la mise en production.",
    "why.benefit3.title": "Ingénieurs Directement Accessibles",
    "why.benefit3.text": "Pas d'intermédiaires ni de serveurs vocaux. Vous parlez en direct à un spécialiste qualifié en cas d'alerte critique.",
    "why.benefit4.title": "Couverture Complète à 360 Degrés",
    "why.benefit4.text": "Nous protégeons simultanément vos serveurs cloud, réseaux physiques, terminaux de travail, bases de données et interfaces web.",
    "why.stat1.label": "Clients Sécurisés",
    "why.stat1.sub": "Startups, PME & Institutions",
    "why.stat2.label": "Audits Réalisés",
    "why.stat2.sub": "Tests d'infrastructures approfondis",
    "why.stat3.label": "Support Activé",
    "why.stat3.sub": "Réponse moyenne < 5 minutes",
    "why.stat4.label": "Garantie SLA",
    "why.stat4.sub": "Continuité de service sans panne",

    // Testimonials
    "testimonials.badge": "Crédibilité Vérifiée",
    "testimonials.title": "Plébiscités par les géants du secteur",
    "testimonials.desc": "Découvrez comment nos partenaires maintiennent une conformité irréprochable et isolent quotidiennement toutes les cybermenaces.",

    // Contact Us Section
    "contact.badge": "Neutralisation d'Incidents",
    "contact.title": "Entrer en contact sécurisé",
    "contact.desc": "Sollicitez un coordinateur de crise senior en moins de cinq minutes. Mettez vos actifs numériques à l'abri immédiatement.",
    "contact.form.name": "Nom complet / Organisation",
    "contact.form.email": "Email professionnel sécurisé",
    "contact.form.message": "Détails de l'incident ou objet de la demande",
    "contact.form.submit": "Déposer un Ticket Sécurisé",
    "contact.form.success": "Votre demande a été enregistrée en toute sécurité ! Un de nos experts va prendre contact avec vous sous peu sur votre ligne directe.",

    // Chatbot widget translations
    "chat.title": "Shield Assistant Sécurisé",
    "chat.subtitle": "En ligne - Coordinateur Cyber IA",
    "chat.placeholder": "Posez une question sur notre cybersécurité...",
    "chat.suggest1": "Comment sécuriser mon infrastructure cloud ?",
    "chat.suggest2": "Quels services offre Shield Corporation ?",
    "chat.suggest3": "Parlez-moi de ShieldDefend™",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Detect browser language or default to 'fr' (since user is speaking French)
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
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
