import React from "react";
import { 
  Network, 
  ShieldCheck, 
  Terminal, 
  Bug, 
  Cloud, 
  Server, 
  MessageSquareCode, 
  Code2 
} from "lucide-react";

export interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

export const servicesList: ServiceItem[] = [
  {
    id: "net-admin",
    titleKey: "services.netAdmin.title",
    descKey: "services.netAdmin.desc",
    icon: Network,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=82"
  },
  {
    id: "sec-admin",
    titleKey: "services.secAdmin.title",
    descKey: "services.secAdmin.desc",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=82"
  },
  {
    id: "pentest",
    titleKey: "services.pentest.title",
    descKey: "services.pentest.desc",
    icon: Terminal,
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=82"
  },
  {
    id: "web-test",
    titleKey: "services.webTest.title",
    descKey: "services.webTest.desc",
    icon: Bug,
    image: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?auto=format&fit=crop&w=1200&q=82"
  },
  {
    id: "cloud-comp",
    titleKey: "services.cloud.title",
    descKey: "services.cloud.desc",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82"
  },
  {
    id: "sec-host",
    titleKey: "services.host.title",
    descKey: "services.host.desc",
    icon: Server,
    image: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=82"
  },
  {
    id: "cyber-cons",
    titleKey: "services.consulting.title",
    descKey: "services.consulting.desc",
    icon: MessageSquareCode,
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=1200&q=82"
  },
  {
    id: "sec-dev",
    titleKey: "services.webDev.title",
    descKey: "services.webDev.desc",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=82"
  }
];

export interface DetailedServiceContent {
  subtitle: string;
  overview: string;
  techSpecs: string[];
  deliverables: string[];
  impactMetric: string;
}

export const serviceDetails: Record<string, { en: DetailedServiceContent; fr: DetailedServiceContent }> = {
  "net-admin": {
    en: {
      subtitle: "Reliable Network Operations",
      overview: "We design and maintain reliable network architectures, improve routing continuity and monitor traffic so your teams can work with fewer interruptions.",
      techSpecs: ["WireGuard VPN Integrations", "Zero-Trust VLAN Segmentation", "Advanced SD-WAN Deployments", "Interactive BGP Multi-Homing Controls"],
      deliverables: ["Physical & Logical Topology Blueprints", "Redundancy SLA Validation Logs", "Intrusion Detection System (IDS) Fine-Tuning"],
      impactMetric: "99.999% network path resilience achieved across 14 enterprise rollouts."
    },
    fr: {
      subtitle: "Routage SÃ©curisÃ© & RÃ©silience Topologique",
      overview: "Notre équipe réseau conçoit et maintient des architectures fiables, améliore la continuité du routage et surveille le trafic pour limiter les interruptions.",
      techSpecs: ["Tunnels VPN WireGuard SÃ©curisÃ©s", "Segmentation Web ZÃ©ro-Trust VLAN", "DÃ©ploiements SD-WAN d'Entreprise", "Configuration MultihÃ©bergement BGP"],
      deliverables: ["Plans de Topologie RÃ©seau Physiques & Logiques", "Rapports de Validation SLA de Redondance", "Calibrage de Sondes d'Intrusion (IDS)"],
      impactMetric: "99,999% de continuitÃ© rÃ©seau garantie sur nos derniers dÃ©ploiements d'envergure."
    }
  },
  "sec-admin": {
    en: {
      subtitle: "Identity and Access Security",
      overview: "We configure multi-factor authentication, access rules, firewall policies and secure remote work practices to improve protection across your environment.",
      techSpecs: ["WebAuthn & Biometric Keys integration", "Granular RBAC Policy Matrix", "WAF (Web Application Firewall) Hardening", "Endpoint Detection & Response (EDR) Deployments"],
      deliverables: ["Identity Access Governance Playbook", "Firewall Rules Validation Reports", "Active Directory Security Audit Checklist"],
      impactMetric: "Zero unauthorized session elevations recorded over 12 months."
    },
    fr: {
      subtitle: "ContrÃ´le des PÃ©rimÃ¨tres & IdentitÃ©s NumÃ©riques",
      overview: "Nous configurons les accès, les règles de pare-feu, les politiques de sécurité et les pratiques de travail à distance pour mieux protéger votre environnement.",
      techSpecs: ["IntÃ©gration ClÃ©s BiomÃ©triques WebAuthn / FIDO2", "Matrice d'Habilitations Granulaires (RBAC)", "RÃ¨gles d'Action de Pare-feu Applicatif (WAF)", "DÃ©ploiements d'outils de dÃ©tection EDR"],
      deliverables: ["Charte de Gouvernance des AccÃ¨s d'IdentitÃ©", "Rapport d'Audit des RÃ¨gles de Pare-feu", "Cahier de Recette Active Directory Durci"],
      impactMetric: "ZÃ©ro Ã©lÃ©vation illÃ©gitime de privilÃ¨ges de session constatÃ©e sur l'ensemble de nos clients administrÃ©s."
    }
  },
  "pentest": {
    en: {
      subtitle: "Controlled Vulnerability Assessment",
      overview: "Our certified pentesting team runs controlled simulations to identify vulnerabilities, document risk and help you correct weaknesses before they affect your activity.",
      techSpecs: ["Active Directory Penetration Scans", "Black-Box Network Explorations", "Social Engineering Simulations", "Binary Reverse Engineering Assessment"],
      deliverables: ["Executive Risk Summary Blueprint", "Reproducible Proof-of-Concepts (PoC)", "CVSS Remediation Roadmap Matrix"],
      impactMetric: "Over 150+ high-severity architectural vulnerabilities discovered and patched."
    },
    fr: {
      subtitle: "Exploitation VulnÃ©rable Offensive",
      overview: "Notre équipe réalise des simulations contrôlées pour identifier les vulnérabilités, documenter les risques et vous aider à corriger les faiblesses prioritaires.",
      techSpecs: ["Tests de PÃ©nÃ©tration Active Directory", "Infiltrations Techniques en 'BoÃ®te Noire'", "Campagnes de Simulation de Phishing Ã©thique", "RÃ©tro-ingÃ©nierie Logicielle & Binaire"],
      deliverables: ["Rapport d'Audit d'Intrusion ExÃ©cutif", "Analyses Techniques de Filles de Preuve de Concept (PoC)", "Matrice de Correctifs PriorisÃ©s CVSS"],
      impactMetric: "Plus de 150 vulnÃ©rabilitÃ©s critiques identifiÃ©es et rÃ©solues avec succÃ¨s cette annÃ©e."
    }
  },
  "web-test": {
    en: {
      subtitle: "Micro-service & API Endpoint Audits",
      overview: "Modern web platforms are constantly targeted via logic flaws and third-party script vulnerabilities. We inspect database request queries, token lifecycles, and front-end architectures to make sure your customer data and backends are absolutely leak-proof.",
      techSpecs: ["OWASP Top 10 Detailed Assessment", "SQL Injection & XSS Validation", "GraphQL & REST API Security Audits", "Encrypted Session Leak Testing"],
      deliverables: ["Raw Payload Execution Logs", "Developer-Grade Code Remediation Guidelines", "Security Seal of Verification for Web Apps"],
      impactMetric: "100% of analyzed web apps certified compliant with secure coding standards."
    },
    fr: {
      subtitle: "Audit Fin de Portails & Endpoints d'API",
      overview: "Les applications web modernes sont la cible privilÃ©giÃ©e de dÃ©tournements logiques et de failles applicatives. Nous auditons vos formulaires, vos cinÃ©matiques de paiement et l'Ã©paisseur de vos clÃ©s d'API pour vous assurer d'une impermÃ©abilitÃ© totale.",
      techSpecs: ["Ã‰valuation Approfondie OWASP Top 10", "Validation de Filles d'Injection SQL & XSS", "Audit de SÃ©curitÃ© API REST & GraphQL", "Tests d'Ã‰vasion de Jeton de Session"],
      deliverables: ["Rapport de Reproduction Technique", "Guides de Correction de Code pour DÃ©veloppeurs", "Badge de ConformitÃ© SÃ©curitaire Web"],
      impactMetric: "100% des applications auditÃ©es mises en conformitÃ© avec nos standards de code."
    }
  },
  "cloud-comp": {
    en: {
      subtitle: "Multi-tenant Sandboxing & Infrastructure as Code",
      overview: "Transitioning securely to cloud services requires granular configurations. We architect serverless workflows, design secure AWS/GCP pipelines, write optimized Terraform scripts, and audit container setups (Docker/Kubernetes).",
      techSpecs: ["Kubernetes Hardened Clusters (K8s)", "Terraform IaC Automated Compliance", "API Gateway Access Control Matrix", "Serverless KMS Envelope Encryption"],
      deliverables: ["Multi-Region High Availability Blueprints", "Cloud Infrastructure Security Scorecard", "Container Base Image Hardening Guidelines"],
      impactMetric: "Helped scale 8 cloud environments supporting up to 5M daily transactions."
    },
    fr: {
      subtitle: "Sandboxing Multi-tenant & Infrastructure as Code",
      overview: "La transition vers les infrastructures Cloud exige un cloisonnement absolu de vos ressources. Nous concevons vos pipelines de dÃ©ploiement sÃ©curisÃ©s, Ã©crivons les scripts de provisionnement automatisÃ©s et isolons vos conteneurs virtuels (Docker/Kubernetes).",
      techSpecs: ["Grappes Kubernetes Durcies (K8s)", "Securisation IaC avec Terraform & Ansible", "RÃ¨gles d'AccÃ¨s API Gateway AvancÃ©es", "Chiffrement d'Enveloppe KMS Serverless"],
      deliverables: ["Plans Cloud Multi-RÃ©gion Ã  Haute DisponibilitÃ©", "Fiche de Notation de SÃ©curitÃ© d'Infrastructure Cloud", "Guides de Durcissement d'Images de Conteneurs"],
      impactMetric: "Accompagnement de 8 architectures gÃ©rant jusqu'Ã  5 millions d'appels par jour."
    }
  },
  "sec-host": {
    en: {
      subtitle: "Reliable Secure Hosting",
      overview: "We provide secure hosting environments with performance monitoring, backups, availability controls and data protection practices adapted to business applications.",
      techSpecs: ["Hardware-Level Confidential Memory Shielding", "Anycast Multi-Gbps Anti-DDoS Scrubbing", "Encrypted-at-rest NVMe Storage arrays", "Automatic Off-Site Geographically Mirroring"],
      deliverables: ["Uptime SLA Certification (99.99%)", "Bare-Metal Node Compliance Reports", "Bare-Metal Disaster Recovery Plan (DRP)"],
      impactMetric: "Zero downtime minutes documented across our entire hosted nodes directory."
    },
    fr: {
      subtitle: "Noeuds Virtuels CloisonnÃ©s GÃ©o-IsolÃ©s",
      overview: "Nous fournissons des environnements d hébergement fiables avec supervision, sauvegardes, contrôles de disponibilité et pratiques de protection des données.",
      techSpecs: ["Isolation MatÃ©rielle de MÃ©moire (AMD SEV / SGX)", "Filtrage Anti-DDoS Anycast Multi-Gigabits", "Stockage NVMe ChiffrÃ© au Repos", "Sauvegarde SystÃ©matique GÃ©o-Redondante"],
      deliverables: ["Certificat SLA d'HÃ©bergement 99,99%", "Rapport de Durcissement de l'Hyperviseur", "Plan de Reprise d'ActivitÃ© Technique (PRA)"],
      impactMetric: "0 minute d'arrÃªt technique subie par nos clients hÃ©bergÃ©s."
    }
  },
  "cyber-cons": {
    en: {
      subtitle: "Compliance Standards & Threat Modeling",
      overview: "We help leadership align business structures with compliance frameworks and emergency protocols. We design security playbooks, map corporate risks, and deliver intuitive workshops to build a strong workplace culture of security.",
      techSpecs: ["ISO 27001 / SOC 2 Compliance Mapping", "GDPR Data Flow Mapping Guides", "Threat Modeling & Attack Surface Inventories", "Employee Incident Readiness Assessments"],
      deliverables: ["Corporate Cyber Governance Playbook", "Risk Matrix Analysis & Mitigation Plan", "Workplace Threat-Prevention Toolkit"],
      impactMetric: "100% success rate in preparing clients for rigorous security certifications."
    },
    fr: {
      subtitle: "Standards de ConformitÃ© & ModÃ©lisation de Menaces",
      overview: "Nous aidons les Ã©quipes dirigeantes Ã  aligner leurs pratiques opÃ©rationnelles sur les cadres rÃ©glementaires (ISO, RGPD). Nous structurons vos manuels de rÃ©action d'urgence et sensibilisons vos Ã©quipes de travail aux bons rÃ©flexes dÃ©fensifs.",
      techSpecs: ["Cartographie Documentaire ISO 27001 / SOC 2", "Suivi RGPD & Matrice des Flux de DonnÃ©es", "ModÃ©lisation de Cibles & Vecteurs d'Attaque (STRIDE)", "Ã‰valuation d'Indicateurs de SensibilitÃ© Humaine"],
      deliverables: ["Charte Interne de Gouvernance Cyber-SÃ©curisÃ©e", "Matrice d'Analyse des Risques StratÃ©giques", "Kit PÃ©dagogique de Sensibilisation pour Collaborateurs"],
      impactMetric: "Taux de rÃ©ussite de 100% sur la prÃ©paration aux audits externes certifiÃ©s."
    }
  },
  "sec-dev": {
    en: {
      subtitle: "Secure Application Engineering",
      overview: "Security should be integrated from the first design decisions. We build reliable websites, portals and applications with secure coding practices and modern frameworks.",
      techSpecs: ["Cryptographic Data Signing Hooks", "Decoupled Clean APIs (NestJS / FastAPI)", "Signed JWT Session Lifecycle Managers", "Automated DevSecOps Static Analysis (SAST)"],
      deliverables: ["Pristine TypeScript Frontend & Backend Source Code", "Automated Threat Protection Build-Pipeline", "Post-Deployment Software Verification Sign-off"],
      impactMetric: "12 custom systems built with zero security patches required post-launch."
    },
    fr: {
      subtitle: "Logiciels & Portails Natifs DÃ©fensifs",
      overview: "La sécurité logicielle se construit dès la conception. Nous réalisons des sites, portails et applications avec des pratiques de développement fiables et sécurisées.",
      techSpecs: ["Signatures Cryptographiques Automatiques en Base", "Architectures CloisonnÃ©es (FastAPI / NestJS)", "Gestion UnifiÃ©e des Jetons JWT Temporaires", "VÃ©rifications de Code Statiques (SAST) dans le CI/CD"],
      deliverables: ["Code Source Ã‰purÃ© TypeScript (Front-end & Back-end)", "Pipeline d'IntÃ©gration Continue SÃ©curisÃ© de Bout en Bout", "Rapport de Recette Logicielle et de Durcissement"],
      impactMetric: "12 systÃ¨mes durcis livrÃ©s avec zÃ©ro faille applicative dÃ©tectÃ©e aprÃ¨s mise en ligne."
    }
  }
};
