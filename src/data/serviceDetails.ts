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
  color: string;
}

export const servicesList: ServiceItem[] = [
  {
    id: "net-admin",
    titleKey: "services.netAdmin.title",
    descKey: "services.netAdmin.desc",
    icon: Network,
    color: "from-blue-500/10 to-indigo-500/10"
  },
  {
    id: "sec-admin",
    titleKey: "services.secAdmin.title",
    descKey: "services.secAdmin.desc",
    icon: ShieldCheck,
    color: "from-emerald-500/10 to-teal-500/10"
  },
  {
    id: "pentest",
    titleKey: "services.pentest.title",
    descKey: "services.pentest.desc",
    icon: Terminal,
    color: "from-orange-500/10 to-red-500/10"
  },
  {
    id: "web-test",
    titleKey: "services.webTest.title",
    descKey: "services.webTest.desc",
    icon: Bug,
    color: "from-pink-500/10 to-rose-500/10"
  },
  {
    id: "cloud-comp",
    titleKey: "services.cloud.title",
    descKey: "services.cloud.desc",
    icon: Cloud,
    color: "from-sky-500/10 to-violet-500/10"
  },
  {
    id: "sec-host",
    titleKey: "services.host.title",
    descKey: "services.host.desc",
    icon: Server,
    color: "from-amber-500/10 to-yellow-500/10"
  },
  {
    id: "cyber-cons",
    titleKey: "services.consulting.title",
    descKey: "services.consulting.desc",
    icon: MessageSquareCode,
    color: "from-violet-500/10 to-purple-500/10"
  },
  {
    id: "sec-dev",
    titleKey: "services.webDev.title",
    descKey: "services.webDev.desc",
    icon: Code2,
    color: "from-fuchsia-500/10 to-pink-500/10"
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
      subtitle: "Secure Routing & Topology Resilience",
      overview: "Our enterprise network division designs and maintains highly secure, resilient architectures. We isolate critical assets, engineer fail-safe routing rules, and monitor packet flows to block external network layer threats before they disrupt your workforce.",
      techSpecs: ["WireGuard VPN Integrations", "Zero-Trust VLAN Segmentation", "Advanced SD-WAN Deployments", "Interactive BGP Multi-Homing Controls"],
      deliverables: ["Physical & Logical Topology Blueprints", "Redundancy SLA Validation Logs", "Intrusion Detection System (IDS) Fine-Tuning"],
      impactMetric: "99.999% network path resilience achieved across 14 enterprise rollouts."
    },
    fr: {
      subtitle: "Routage Sécurisé & Résilience Topologique",
      overview: "Notre pôle ingénierie réseau conçoit des architectures hermétiques de communication d'entreprise. Nous isolons vos flux critiques, configurons des règles de routage redondantes et analysons le trafic réseau en temps réel pour neutraliser toute menace d'intrusion logique.",
      techSpecs: ["Tunnels VPN WireGuard Sécurisés", "Segmentation Web Zéro-Trust VLAN", "Déploiements SD-WAN d'Entreprise", "Configuration Multihébergement BGP"],
      deliverables: ["Plans de Topologie Réseau Physiques & Logiques", "Rapports de Validation SLA de Redondance", "Calibrage de Sondes d'Intrusion (IDS)"],
      impactMetric: "99,999% de continuité réseau garantie sur nos derniers déploiements d'envergure."
    }
  },
  "sec-admin": {
    en: {
      subtitle: "Enterprise Identity & Perimeter Control",
      overview: "Hardening operating environments is the core of active system defense. We configure strict Multi-Factor Authentication paths, design zero-trust policy registers, enforce strong firewall configurations, and coordinate encrypted work-from-home channels.",
      techSpecs: ["WebAuthn & Biometric Keys integration", "Granular RBAC Policy Matrix", "WAF (Web Application Firewall) Hardening", "Endpoint Detection & Response (EDR) Deployments"],
      deliverables: ["Identity Access Governance Playbook", "Firewall Rules Validation Reports", "Active Directory Security Audit Checklist"],
      impactMetric: "Zero unauthorized session elevations recorded over 12 months."
    },
    fr: {
      subtitle: "Contrôle des Périmètres & Identités Numériques",
      overview: "Le durcissement du périmètre d'entreprise est la base logique de votre sécurité opérationnelle. Nous mettons en œuvre des accès à double facteur stricts (MFA), configurons les registres d'autorisations zéro-trust et surveillons la conformité des postes de travail.",
      techSpecs: ["Intégration Clés Biométriques WebAuthn / FIDO2", "Matrice d'Habilitations Granulaires (RBAC)", "Règles d'Action de Pare-feu Applicatif (WAF)", "Déploiements d'outils de détection EDR"],
      deliverables: ["Charte de Gouvernance des Accès d'Identité", "Rapport d'Audit des Règles de Pare-feu", "Cahier de Recette Active Directory Durci"],
      impactMetric: "Zéro élévation illégitime de privilèges de session constatée sur l'ensemble de nos clients administrés."
    }
  },
  "pentest": {
    en: {
      subtitle: "Proactive Vulnerability Exploitation",
      overview: "The best defense is an ethical offense. Our certified pentesting group launches targeted simulations simulating real threat scenarios to evaluate your infrastructure robustness, finding internal pathways and logical design flaws before adversaries do.",
      techSpecs: ["Active Directory Penetration Scans", "Black-Box Network Explorations", "Social Engineering Simulations", "Binary Reverse Engineering Assessment"],
      deliverables: ["Executive Risk Summary Blueprint", "Reproducible Proof-of-Concepts (PoC)", "CVSS Remediation Roadmap Matrix"],
      impactMetric: "Over 150+ high-severity architectural vulnerabilities discovered and patched."
    },
    fr: {
      subtitle: "Exploitation Vulnérable Offensive",
      overview: "La meilleure des défenses réside dans l'anticipation éthique de l'attaque. Nos testeurs d'intrusion certifiés exécutent de véritables scénarios de compromission et d'exfiltration pour éprouver vos défenses et corriger les failles avant qu'elles ne soient exploitées.",
      techSpecs: ["Tests de Pénétration Active Directory", "Infiltrations Techniques en 'Boîte Noire'", "Campagnes de Simulation de Phishing éthique", "Rétro-ingénierie Logicielle & Binaire"],
      deliverables: ["Rapport d'Audit d'Intrusion Exécutif", "Analyses Techniques de Filles de Preuve de Concept (PoC)", "Matrice de Correctifs Priorisés CVSS"],
      impactMetric: "Plus de 150 vulnérabilités critiques identifiées et résolues avec succès cette année."
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
      overview: "Les applications web modernes sont la cible privilégiée de détournements logiques et de failles applicatives. Nous auditons vos formulaires, vos cinématiques de paiement et l'épaisseur de vos clés d'API pour vous assurer d'une imperméabilité totale.",
      techSpecs: ["Évaluation Approfondie OWASP Top 10", "Validation de Filles d'Injection SQL & XSS", "Audit de Sécurité API REST & GraphQL", "Tests d'Évasion de Jeton de Session"],
      deliverables: ["Rapport de Reproduction Technique", "Guides de Correction de Code pour Développeurs", "Badge de Conformité Sécuritaire Web"],
      impactMetric: "100% des applications auditées mises en conformité avec nos standards de code."
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
      overview: "La transition vers les infrastructures Cloud exige un cloisonnement absolu de vos ressources. Nous concevons vos pipelines de déploiement sécurisés, écrivons les scripts de provisionnement automatisés et isolons vos conteneurs virtuels (Docker/Kubernetes).",
      techSpecs: ["Grappes Kubernetes Durcies (K8s)", "Securisation IaC avec Terraform & Ansible", "Règles d'Accès API Gateway Avancées", "Chiffrement d'Enveloppe KMS Serverless"],
      deliverables: ["Plans Cloud Multi-Région à Haute Disponibilité", "Fiche de Notation de Sécurité d'Infrastructure Cloud", "Guides de Durcissement d'Images de Conteneurs"],
      impactMetric: "Accompagnement de 8 architectures gérant jusqu'à 5 millions d'appels par jour."
    }
  },
  "sec-host": {
    en: {
      subtitle: "Geo-Redundant Isolated Virtual Nodes",
      overview: "We offer private virtualization nodes with robust defenses. Benefit from built-in high-performance DDoS scrubbing, geographical replica mirrors, continuous system memory integrity sweeps, and total database confidentiality.",
      techSpecs: ["Hardware-Level Confidential Memory Shielding", "Anycast Multi-Gbps Anti-DDoS Scrubbing", "Encrypted-at-rest NVMe Storage arrays", "Automatic Off-Site Geographically Mirroring"],
      deliverables: ["Uptime SLA Certification (99.99%)", "Bare-Metal Node Compliance Reports", "Bare-Metal Disaster Recovery Plan (DRP)"],
      impactMetric: "Zero downtime minutes documented across our entire hosted nodes directory."
    },
    fr: {
      subtitle: "Noeuds Virtuels Cloisonnés Géo-Isolés",
      overview: "Nous vous fournissons des environnements d'hébergement privés robustes. Profitez d'une protection DDoS intégrée de haut niveau, de miroirs géographiques de secours, de balayages d'intégrité de la mémoire RAM en temps réel et d'un stockage chiffré.",
      techSpecs: ["Isolation Matérielle de Mémoire (AMD SEV / SGX)", "Filtrage Anti-DDoS Anycast Multi-Gigabits", "Stockage NVMe Chiffré au Repos", "Sauvegarde Systématique Géo-Redondante"],
      deliverables: ["Certificat SLA d'Hébergement 99,99%", "Rapport de Durcissement de l'Hyperviseur", "Plan de Reprise d'Activité Technique (PRA)"],
      impactMetric: "0 minute d'arrêt technique subie par nos clients hébergés."
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
      subtitle: "Standards de Conformité & Modélisation de Menaces",
      overview: "Nous aidons les équipes dirigeantes à aligner leurs pratiques opérationnelles sur les cadres réglementaires (ISO, RGPD). Nous structurons vos manuels de réaction d'urgence et sensibilisons vos équipes de travail aux bons réflexes défensifs.",
      techSpecs: ["Cartographie Documentaire ISO 27001 / SOC 2", "Suivi RGPD & Matrice des Flux de Données", "Modélisation de Cibles & Vecteurs d'Attaque (STRIDE)", "Évaluation d'Indicateurs de Sensibilité Humaine"],
      deliverables: ["Charte Interne de Gouvernance Cyber-Sécurisée", "Matrice d'Analyse des Risques Stratégiques", "Kit Pédagogique de Sensibilisation pour Collaborateurs"],
      impactMetric: "Taux de réussite de 100% sur la préparation aux audits externes certifiés."
    }
  },
  "sec-dev": {
    en: {
      subtitle: "Clean Defensive Architectural Software",
      overview: "Security must not be added at the end; it must be baked into the design. We build elegant cloud portals, clean desktop interfaces, and responsive business applications using state-of-the-art secure coding standards and modern frameworks.",
      techSpecs: ["Cryptographic Data Signing Hooks", "Decoupled Clean APIs (NestJS / FastAPI)", "Signed JWT Session Lifecycle Managers", "Automated DevSecOps Static Analysis (SAST)"],
      deliverables: ["Pristine TypeScript Frontend & Backend Source Code", "Automated Threat Protection Build-Pipeline", "Post-Deployment Software Verification Sign-off"],
      impactMetric: "12 custom systems built with zero security patches required post-launch."
    },
    fr: {
      subtitle: "Logiciels & Portails Natifs Défensifs",
      overview: "La sécurité logicielle se travaille dès la première ligne de code écrite. Nous réalisons vos portails sur mesure et applications web complexes en intégrant nativement des barrières cryptographiques, des clés de session robustes et des filtres de détection.",
      techSpecs: ["Signatures Cryptographiques Automatiques en Base", "Architectures Cloisonnées (FastAPI / NestJS)", "Gestion Unifiée des Jetons JWT Temporaires", "Vérifications de Code Statiques (SAST) dans le CI/CD"],
      deliverables: ["Code Source Épuré TypeScript (Front-end & Back-end)", "Pipeline d'Intégration Continue Sécurisé de Bout en Bout", "Rapport de Recette Logicielle et de Durcissement"],
      impactMetric: "12 systèmes durcis livrés avec zéro faille applicative détectée après mise en ligne."
    }
  }
};
