import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Globe,
  Layers,
  Network,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { PointerGlow } from "./ui/pointer-glow";

type Bi<T> = { en: T; fr: T };

interface PackSection {
  title: Bi<string>;
  items: Bi<string[]>;
}

interface PackItem {
  id: string;
  name: Bi<string>;
  icon: React.ComponentType<{ className?: string }>;
  serviceId: string;
  tagline: Bi<string>;
  audience: Bi<string>;
  website: Bi<string>;
  highlights: Bi<string[]>;
  sections: PackSection[];
  idealFor: Bi<string>;
  notIncluded: Bi<string[]>;
  duration: Bi<string>;
  price: Bi<string>;
  recommended?: boolean;
  quote?: boolean;
}

const packsList: PackItem[] = [
  {
    id: "pack-essentiel",
    name: { fr: "Pack Essentiel", en: "Essential Pack" },
    icon: ShieldCheck,
    serviceId: "pack-essentiel",
    tagline: {
      fr: "Faites le point sur votre sécurité et soyez visible en ligne.",
      en: "Take stock of your security and get visible online.",
    },
    audience: { fr: "Pour une première démarche", en: "For a first step" },
    website: { fr: "Site vitrine 1 page inclus", en: "1-page showcase website included" },
    highlights: {
      fr: [
        "Audit de sécurité de base de votre système",
        "Rapport avec plan d'action priorisé",
        "Site vitrine d'une page, adapté au mobile",
        "Nom de domaine et HTTPS configurés",
        "Une session de conseil en cybersécurité",
      ],
      en: [
        "Basic security audit of your system",
        "Report with a prioritised action plan",
        "One-page showcase website, mobile-friendly",
        "Domain name and HTTPS configured",
        "One cybersecurity consulting session",
      ],
    },
    sections: [
      {
        title: { fr: "Audit de sécurité de base", en: "Basic security audit" },
        items: {
          fr: [
            "Inventaire de vos équipements, comptes et services en ligne",
            "Analyse des failles les plus courantes : mots de passe, mises à jour, sauvegardes, accès partagés",
            "Scan de vulnérabilités de votre site et de vos services exposés sur Internet",
            "Vérification des bonnes pratiques de base : antivirus, Wi-Fi, comptes administrateurs",
          ],
          en: [
            "Inventory of your devices, accounts and online services",
            "Review of the most common weaknesses: passwords, updates, backups, shared access",
            "Vulnerability scan of your website and internet-facing services",
            "Check of basic good practices: antivirus, Wi-Fi, administrator accounts",
          ],
        },
      },
      {
        title: { fr: "Votre site vitrine (1 page)", en: "Your showcase website (1 page)" },
        items: {
          fr: [
            "Une page unique : présentation, services, contact",
            "Design responsive (mobile, tablette, ordinateur) aux couleurs de votre entreprise",
            "Bouton WhatsApp et formulaire de contact qui envoie réellement vos messages",
            "Référencement de base : titres, description, vitesse de chargement",
            "Certificat HTTPS et configuration de votre nom de domaine",
            "Nom de domaine : [à la charge du client / inclus la première année]", // TODO: confirmer la prise en charge du domaine.
            "Textes et images : [fournis par le client / rédaction incluse]", // TODO: confirmer la fourniture des contenus.
            "Jusqu'à [X] retouches incluses", // TODO: confirmer le nombre de retouches.
            "Mise en ligne et vérification avant livraison",
          ],
          en: [
            "A single page: presentation, services, contact",
            "Responsive design (mobile, tablet, desktop) in your company colours",
            "WhatsApp button and a contact form that really delivers your messages",
            "Basic SEO: titles, description, loading speed",
            "HTTPS certificate and domain name configuration",
            "Domain name: [paid by the client / included for the first year]", // TODO: confirm domain cost responsibility.
            "Text and images: [provided by the client / copywriting included]", // TODO: confirm content provision.
            "Up to [X] revisions included", // TODO: confirm the number of revisions.
            "Go-live and checks before delivery",
          ],
        },
      },
      {
        title: { fr: "Livrables et accompagnement", en: "Deliverables and support" },
        items: {
          fr: [
            "Rapport clair : failles classées par priorité, avec des explications simples",
            "Plan d'action en étapes réalisables par votre équipe",
            "Une session de conseil en cybersécurité", // TODO: confirmer la durée de la session.
            "Aide par e-mail ou WhatsApp pendant [30 jours] après livraison", // TODO: confirmer la durée et les conditions du support.
            "Paiement : [50 % à la commande, 50 % à la livraison] ; Mobile Money [à confirmer]", // TODO: confirmer les modalités et moyens de paiement.
          ],
          en: [
            "Clear report: weaknesses ranked by priority, with plain explanations",
            "Action plan in steps your team can carry out",
            "One cybersecurity consulting session", // TODO: confirm the session duration.
            "Help by email or WhatsApp for [30 days] after delivery", // TODO: confirm support duration and terms.
            "Payment: [50% on order, 50% on delivery]; Mobile Money [to confirm]", // TODO: confirm payment terms and methods.
          ],
        },
      },
    ],
    idealFor: {
      fr: "Indépendants, commerces et petites structures qui veulent un premier état des lieux de leur sécurité et une présence en ligne professionnelle.",
      en: "Freelancers, shops and small businesses that want a first security assessment and a professional online presence.",
    },
    notIncluded: {
      fr: ["Administration du réseau", "Hébergement géré et sauvegardes automatiques", "Développement sur mesure"],
      en: ["Network administration", "Managed hosting and automatic backups", "Custom development"],
    },
    duration: { fr: "1 à 2 semaines", en: "1 to 2 weeks" }, // TODO: revalidate after confirming the website scope and workload.
    price: { fr: "À partir de 350 000 FCFA", en: "From 350,000 XAF" }, // TODO: revalidate after confirming the website scope and workload.
  },
  {
    id: "pack-business",
    name: { fr: "Pack Business", en: "Business Pack" },
    icon: Network,
    serviceId: "pack-business",
    tagline: {
      fr: "Un réseau protégé, une équipe sereine, un site qui vous représente.",
      en: "A protected network, a calm team, a website that represents you.",
    },
    audience: { fr: "Pour les PME en croissance", en: "For growing SMEs" },
    website: { fr: "Site vitrine jusqu'à 5 pages inclus", en: "Showcase website up to 5 pages included" },
    highlights: {
      fr: [
        "Tout le Pack Essentiel",
        "Administration et sécurisation de votre réseau",
        "Pare-feu, accès sécurisés et sauvegardes",
        "Site vitrine jusqu'à 5 pages avec formulaire de contact",
        "Support technique après livraison",
      ],
      en: [
        "Everything in the Essential Pack",
        "Network administration and hardening",
        "Firewall, secure access and backups",
        "Showcase website up to 5 pages with contact form",
        "Technical support after delivery",
      ],
    },
    sections: [
      {
        title: { fr: "Tout le Pack Essentiel", en: "Everything in the Essential Pack" },
        items: {
          fr: [
            "Audit de sécurité de base et rapport priorisé",
            "Session de conseil en cybersécurité",
            "Le site vitrine d'une page est remplacé par la version 5 pages décrite plus bas",
          ],
          en: [
            "Basic security audit and prioritised report",
            "Cybersecurity consulting session",
            "The one-page website is replaced by the 5-page version described below",
          ],
        },
      },
      {
        title: { fr: "Réseau et accès", en: "Network and access" },
        items: {
          fr: [
            "Cartographie de votre réseau : postes, serveurs, imprimantes, Wi-Fi",
            "Configuration ou durcissement du pare-feu",
            "Séparation du Wi-Fi employés / visiteurs",
            "Gestion des comptes et des droits d'accès : chacun n'accède qu'à ce dont il a besoin",
            "Mises à jour et correctifs des équipements pris en charge",
          ],
          en: [
            "Mapping of your network: computers, servers, printers, Wi-Fi",
            "Firewall configuration or hardening",
            "Separate Wi-Fi for staff and guests",
            "Account and access rights management: everyone only accesses what they need",
            "Updates and patches for the managed devices",
          ],
        },
      },
      {
        title: { fr: "Protection des données", en: "Data protection" },
        items: {
          fr: [
            "Politique de mots de passe et double authentification sur vos comptes clés",
            "Mise en place de sauvegardes régulières de vos données importantes",
            "Test de restauration pour vérifier que les sauvegardes fonctionnent",
          ],
          en: [
            "Password policy and two-factor authentication on your key accounts",
            "Regular backups of your important data",
            "Restore test to check that the backups work",
          ],
        },
      },
      {
        title: { fr: "Votre site vitrine (jusqu'à 5 pages)", en: "Your showcase website (up to 5 pages)" },
        items: {
          fr: [
            "Jusqu'à 5 pages : Accueil, À propos, Services, Réalisations ou Équipe, Contact",
            "Design personnalisé et responsive",
            "Formulaire de contact sécurisé, bouton WhatsApp, carte Google Maps",
            "Référencement de base (SEO) et optimisation de la vitesse",
            "Mentions légales et politique de confidentialité",
            "Statistiques de visite (Google Analytics ou équivalent)",
            "Hébergement inclus pendant [X mois]", // TODO: confirmer la période incluse et le tarif de renouvellement.
          ],
          en: [
            "Up to 5 pages: Home, About, Services, Portfolio or Team, Contact",
            "Custom, responsive design",
            "Secure contact form, WhatsApp button, Google Maps",
            "Basic SEO and speed optimisation",
            "Legal notice and privacy policy",
            "Visit statistics (Google Analytics or equivalent)",
            "Hosting included for [X months]", // TODO: confirm the included period and renewal price.
          ],
        },
      },
      {
        title: { fr: "Accompagnement", en: "Support" },
        items: {
          fr: [
            "Support technique par e-mail ou WhatsApp pendant [30 jours]", // TODO: confirmer la durée et les conditions du support.
            "Documentation de votre configuration réseau",
            "Formation de votre équipe aux bonnes pratiques de sécurité (1 h)",
            "Maintenance mensuelle disponible en option : [X FCFA/mois]", // TODO: confirmer le tarif de maintenance.
          ],
          en: [
            "Technical support by email or WhatsApp for [30 days]", // TODO: confirm support duration and terms.
            "Documentation of your network configuration",
            "Security good-practice training for your team (1 h)",
            "Monthly maintenance available as an option: [X XAF/month]", // TODO: confirm the maintenance price.
          ],
        },
      },
    ],
    idealFor: {
      fr: "PME de 5 à 50 personnes qui veulent sécuriser leur réseau au quotidien et disposer d'un site vitrine complet.",
      en: "SMEs of 5 to 50 people that want to secure their network day to day and have a complete showcase website.",
    },
    notIncluded: {
      fr: ["Migration vers le cloud", "Audit des applications web et API", "Site bilingue et blog"],
      en: ["Cloud migration", "Web application and API audit", "Bilingual website and blog"],
    },
    duration: { fr: "3 à 4 semaines", en: "3 to 4 weeks" }, // TODO: revalidate after confirming the website scope and workload.
    price: { fr: "À partir de 1 200 000 FCFA", en: "From 1,200,000 XAF" }, // TODO: revalidate after confirming the website scope and workload.
    recommended: true, // TODO: confirm the recommended badge with the site owner.
  },
  {
    id: "pack-premium",
    name: { fr: "Pack Premium", en: "Premium Pack" },
    icon: Layers,
    serviceId: "pack-premium",
    tagline: {
      fr: "Une couverture complète, du réseau au cloud, avec un site à la hauteur.",
      en: "Full coverage, from network to cloud, with a website to match.",
    },
    audience: {
      fr: "Pour les entreprises avec cloud et applications",
      en: "For companies with cloud and applications",
    },
    website: {
      fr: "Site vitrine jusqu'à 10 pages, bilingue, inclus",
      en: "Bilingual showcase website up to 10 pages included",
    },
    highlights: {
      fr: [
        "Tout le Pack Business",
        "Cloud et hébergement sécurisés",
        "Audit de vos applications web et API",
        "Site vitrine jusqu'à 10 pages, bilingue FR/EN, avec blog",
        "Restitution à votre équipe et support prioritaire",
      ],
      en: [
        "Everything in the Business Pack",
        "Secure cloud and hosting",
        "Web application and API audit",
        "Showcase website up to 10 pages, bilingual FR/EN, with blog",
        "Debrief with your team and priority support",
      ],
    },
    sections: [
      {
        title: { fr: "Tout le Pack Business", en: "Everything in the Business Pack" },
        items: {
          fr: [
            "Audit de sécurité, conseil et rapport priorisé",
            "Administration réseau, pare-feu, accès, sauvegardes et double authentification",
            "Le site vitrine 5 pages est remplacé par la version avancée décrite plus bas",
          ],
          en: [
            "Security audit, consulting and prioritised report",
            "Network administration, firewall, access, backups and two-factor authentication",
            "The 5-page website is replaced by the advanced version described below",
          ],
        },
      },
      {
        title: { fr: "Cloud et hébergement sécurisés", en: "Secure cloud and hosting" },
        items: {
          fr: [
            "Architecture cloud adaptée à votre activité et à votre budget",
            "Migration de vos données et services vers un environnement sécurisé",
            "Séparation des environnements : production et test",
            "Chiffrement des données stockées et échangées",
            "Sauvegardes automatiques et test de restauration",
            "Hébergement sécurisé de votre site et de vos applications pendant [X mois]", // TODO: confirmer la période incluse et le tarif de renouvellement.
            "Surveillance de la disponibilité avec alerte en cas de panne",
          ],
          en: [
            "Cloud architecture adapted to your activity and budget",
            "Migration of your data and services to a secure environment",
            "Separate production and test environments",
            "Encryption of stored and transmitted data",
            "Automatic backups and restore test",
            "Secure hosting of your website and applications for [X months]", // TODO: confirm the included period and renewal price.
            "Availability monitoring with an alert in case of outage",
          ],
        },
      },
      {
        title: { fr: "Audit de vos applications web et API", en: "Web application and API audit" },
        items: {
          fr: [
            "Audit de sécurité selon le référentiel OWASP",
            "Contrôle des accès, des sessions et de la gestion des mots de passe",
            "Recherche des failles courantes : injections, accès non autorisés, mauvaise configuration",
            "Rapport détaillé avec preuves et recommandations de correction",
            "Une contre-vérification après vos corrections",
            "Tests d'intrusion contrôlés", // TODO: confirmer s'ils sont inclus, sinon supprimer cette ligne.
          ],
          en: [
            "Security audit following the OWASP standard",
            "Review of access control, sessions and password handling",
            "Search for common weaknesses: injections, unauthorised access, misconfiguration",
            "Detailed report with evidence and fix recommendations",
            "One re-check after your fixes",
            "Controlled penetration testing", // TODO: confirm whether included; otherwise remove this line.
          ],
        },
      },
      {
        title: {
          fr: "Votre site vitrine avancé (jusqu'à 10 pages)",
          en: "Your advanced showcase website (up to 10 pages)",
        },
        items: {
          fr: [
            "Jusqu'à 10 pages ou sections",
            "Version bilingue français / anglais",
            "Blog ou actualités que vous gérez vous-même",
            "Référencement technique : structure, balises, vitesse, plan du site",
            "Sécurité renforcée : en-têtes de sécurité, protection contre le spam et les attaques courantes",
            "Formation à la mise à jour de vos contenus (1 h)",
          ],
          en: [
            "Up to 10 pages or sections",
            "Bilingual French / English version",
            "Blog or news section you manage yourself",
            "Technical SEO: structure, tags, speed, sitemap",
            "Hardened security: security headers, protection against spam and common attacks",
            "Training on updating your content (1 h)",
          ],
        },
      },
      {
        title: { fr: "Accompagnement", en: "Support" },
        items: {
          fr: [
            "Restitution détaillée à votre équipe",
            "Documentation technique complète",
            "Support prioritaire pendant [60 jours]", // TODO: confirmer la durée et les conditions du support prioritaire.
            "Point de suivi après [3 mois]", // TODO: confirmer la période du suivi.
          ],
          en: [
            "Detailed debrief with your team",
            "Complete technical documentation",
            "Priority support for [60 days]", // TODO: confirm priority support duration and terms.
            "Follow-up meeting after [3 months]", // TODO: confirm the follow-up period.
          ],
        },
      },
    ],
    idealFor: {
      fr: "Entreprises qui ont des applications, des données sensibles ou des clients en ligne, et qui veulent une protection complète.",
      en: "Companies with applications, sensitive data or online customers that want complete protection.",
    },
    notIncluded: {
      fr: ["Développement d'applications sur mesure", "Conformité réglementaire détaillée", "Maintenance mensuelle (option)"],
      en: ["Custom application development", "Detailed regulatory compliance", "Monthly maintenance (option)"],
    },
    duration: { fr: "6 à 8 semaines", en: "6 to 8 weeks" }, // TODO: revalidate after confirming the website scope and workload.
    price: { fr: "À partir de 3 500 000 FCFA", en: "From 3,500,000 XAF" }, // TODO: revalidate after confirming the website scope and workload.
  },
  {
    id: "pack-sur-mesure",
    name: { fr: "Pack Sur mesure", en: "Custom Pack" },
    icon: SlidersHorizontal,
    serviceId: "pack-sur-mesure",
    tagline: {
      fr: "Une offre construite autour de votre réalité.",
      en: "An offer built around your reality.",
    },
    audience: {
      fr: "Pour les institutions et les besoins spécifiques",
      en: "For institutions and specific needs",
    },
    website: { fr: "Site vitrine ou site avancé inclus", en: "Showcase or advanced website included" },
    highlights: {
      fr: [
        "Périmètre défini avec vous après un échange de cadrage",
        "Tous nos services à la carte",
        "Site vitrine au minimum, ou site avancé selon votre besoin",
        "Conseil dédié en cybersécurité",
        "Interlocuteur dédié",
      ],
      en: [
        "Scope defined with you after a scoping call",
        "All our services à la carte",
        "At least a showcase website, or an advanced site depending on your need",
        "Dedicated cybersecurity consulting",
        "Dedicated contact person",
      ],
    },
    sections: [
      {
        title: { fr: "Cadrage", en: "Scoping" },
        items: {
          fr: [
            "Échange de cadrage gratuit de [30 minutes]", // TODO: confirmer la durée et la gratuité de l'échange.
            "Analyse de vos risques et de vos priorités",
            "Proposition détaillée avec planning, livrables et tarif",
          ],
          en: [
            "Free scoping call of [30 minutes]", // TODO: confirm the duration and whether the call is free.
            "Analysis of your risks and priorities",
            "Detailed proposal with schedule, deliverables and price",
          ],
        },
      },
      {
        title: { fr: "Services à la carte", en: "Services à la carte" },
        items: {
          fr: [
            "Tests d'intrusion",
            "Administration réseau",
            "Administration de la sécurité IT",
            "Cloud computing",
            "Hébergement sécurisé",
            "Développement web sécurisé",
            "Audit d'applications web et API",
            "Conseil en cybersécurité",
          ],
          en: [
            "Penetration testing",
            "Network administration",
            "IT security administration",
            "Cloud computing",
            "Secure hosting",
            "Secure web development",
            "Web application and API audit",
            "Cybersecurity consulting",
          ],
        },
      },
      {
        title: { fr: "Votre site web", en: "Your website" },
        items: {
          fr: [
            "Site vitrine inclus au minimum",
            "Possibilité d'un site avancé : espace client, portail, boutique en ligne",
            "Design personnalisé à votre identité visuelle",
            "Intégrations possibles : WhatsApp, e-mail professionnel, paiement Mobile Money", // TODO: confirmer la disponibilité des intégrations.
          ],
          en: [
            "Showcase website included at minimum",
            "Option of an advanced site: customer area, portal, online shop",
            "Design tailored to your visual identity",
            "Possible integrations: WhatsApp, business email, Mobile Money payment", // TODO: confirm integration availability.
          ],
        },
      },
      {
        title: { fr: "Accompagnement", en: "Support" },
        items: {
          fr: [
            "Interlocuteur dédié", // TODO: confirmer la disponibilité d'un interlocuteur dédié.
            "Contrat de support et de maintenance adapté, avec engagements définis ensemble",
            "Niveau de service (SLA) défini selon le périmètre", // TODO: confirmer les engagements SLA proposés.
            "Politiques de sécurité et procédures documentées",
            "Formation de vos équipes",
          ],
          en: [
            "Dedicated contact person", // TODO: confirm whether a dedicated contact is available.
            "Support and maintenance contract with commitments defined together",
            "Service level (SLA) defined according to scope", // TODO: confirm available SLA commitments.
            "Documented security policies and procedures",
            "Training for your teams",
          ],
        },
      },
    ],
    idealFor: {
      fr: "Institutions, grandes organisations et projets spécifiques dont les besoins ne rentrent pas dans un pack standard.",
      en: "Institutions, large organisations and specific projects whose needs do not fit a standard pack.",
    },
    notIncluded: { fr: [], en: [] },
    duration: { fr: "Selon le périmètre", en: "Depending on scope" },
    price: { fr: "Sur devis", en: "On quote" },
    quote: true,
  },
];

interface PacksSectionProps {
  onNavigateToPack: (serviceId: string) => void;
}

export default function PacksSection({ onNavigateToPack }: PacksSectionProps) {
  const { language, t } = useLanguage();
  const locale = language === "fr" ? "fr" : "en";

  return (
    <section
      id="packs"
      className="py-20 md:py-28 px-4 w-full max-w-[1400px] mx-auto scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="packs-title"
    >
      <div className="space-y-12 md:space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-[620px]">
            <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 px-3.5 py-1.5 rounded-full text-navy text-[12px] font-semibold tracking-wide uppercase">
              {t("packs.badge")}
            </div>
            <h2 id="packs-title" className="font-display text-[32px] md:text-[44px] font-medium tracking-tight text-navy leading-[1.12]">
              {t("packs.title")}
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-slate-text leading-relaxed">
              {t("packs.desc")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packsList.map((pack, index) => {
            return (
              <PackCard
                key={pack.id}
                pack={pack}
                locale={locale}
                index={index}
                onSelect={() => onNavigateToPack(pack.serviceId)}
                t={t}
              />
            );
          })}
        </div>
        <p className="text-center text-[12px] leading-relaxed text-slate-text">
          {t("packs.options")}
        </p>
      </div>
    </section>
  );
}

function PackCard({
  pack,
  locale,
  index,
  onSelect,
  t,
}: {
  key?: React.Key;
  pack: PackItem;
  locale: "en" | "fr";
  index: number;
  onSelect: () => void;
  t: (key: string) => string;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const Icon = pack.icon;
  const detailsId = `pack-details-${pack.id}`;

  return (
    <motion.div
      id={`pack-card-${pack.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      className={`interactive-surface bg-white border rounded-[40px] p-8 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.01)] hover:border-blue-200/80 hover:shadow-[0_30px_70px_-18px_rgba(15,43,75,0.2)] transition-[border-color,box-shadow] duration-300 relative overflow-hidden group flex flex-col justify-between ${
        pack.recommended ? "border-[#0b7c9e]/40" : "border-slate-200/50"
      }`}
    >
      <PointerGlow color="14, 165, 233" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-violet-500/5 rounded-bl-[40px] transition-all group-hover:scale-110" />

      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center text-navy border border-navy/10 group-hover:bg-navy group-hover:text-white group-hover:border-navy group-hover:-translate-y-1 group-hover:rotate-3 transition-all duration-300">
            <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </div>
          {pack.recommended && (
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
              {t("packs.recommended")}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <span className="inline-flex w-fit rounded-full bg-navy/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {pack.audience[locale]}
          </span>
          <h3 className="font-display text-[22px] font-bold text-navy">{pack.name[locale]}</h3>
          <p className="text-[12px] font-semibold text-blue-600 font-display uppercase tracking-wide">{pack.tagline[locale]}</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-[11px] font-semibold text-cyan-800">
            <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
            {pack.website[locale]}
          </span>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-3">
          {pack.highlights[locale].map((highlight, highlightIndex) => (
            <div key={highlight} className="flex items-start gap-2.5 text-[13px] text-slate-text">
              <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span className={highlightIndex === 0 && index > 0 && index < 3 ? "font-semibold text-navy" : undefined}>
                {highlight}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-5">
          <button
            type="button"
            aria-expanded={detailsOpen}
            aria-controls={detailsId}
            onClick={() => setDetailsOpen((open) => !open)}
            className="inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-[#0b7c9e] hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b7c9e]"
          >
            {detailsOpen ? t("packs.hideDetails") : t("packs.details")}
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${detailsOpen ? "rotate-180" : ""}`} />
          </button>
          <motion.div
            id={detailsId}
            aria-hidden={!detailsOpen}
            inert={!detailsOpen}
            initial={false}
            animate={{ height: detailsOpen ? "auto" : 0, opacity: detailsOpen ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
                <div className="space-y-5 pt-4">
                  {pack.sections.map((section) => (
                    <div key={section.title[locale]}>
                      <h4 className="text-[13px] font-bold text-navy">{section.title[locale]}</h4>
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[12px] leading-relaxed text-slate-text">
                        {section.items[locale].map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                  <div>
                    <h4 className="text-[13px] font-bold text-navy">{t("packs.idealFor")}</h4>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-text">{pack.idealFor[locale]}</p>
                  </div>
                  {pack.notIncluded[locale].length > 0 && (
                    <div>
                      <h4 className="text-[13px] font-bold text-navy">{t("packs.notIncluded")}</h4>
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[12px] leading-relaxed text-slate-text">
                        {pack.notIncluded[locale].map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
          </motion.div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-100/50 relative z-10">
        <p className="text-[12px] font-semibold text-navy">
          {t("packs.duration")}{locale === "fr" ? " : " : ": "}{pack.duration[locale]}
          <span className="text-slate-300" aria-hidden="true">{" · "}</span>
          {t("packs.price")}{locale === "fr" ? " : " : ": "}{pack.price[locale]}
        </p>
        <button
          type="button"
          onClick={onSelect}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-[12px] font-semibold text-white transition-all hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          {pack.quote ? t("packs.ctaQuote") : t("packs.cta")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
