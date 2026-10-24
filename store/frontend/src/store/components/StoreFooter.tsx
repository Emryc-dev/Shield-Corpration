import type React from "react";
import { ArrowUpRight, Headphones, Mail, ShieldCheck, ShoppingBag } from "lucide-react";

declare const __PUBLIC_CORPORATE_URL__: string;

export default function StoreFooter({ onNavigate }: { onNavigate: (path: string) => void }) {
  const year = new Date().getFullYear();
  const corporateUrl = __PUBLIC_CORPORATE_URL__ || "http://localhost:3000";

  return (
    <footer className="border-t border-slate-200 bg-[#f1f5f8] text-navy">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-12 md:grid-cols-[1.35fr_0.8fr_0.8fr_1fr] md:px-8 md:py-16">
        <div>
          <button type="button" onClick={() => onNavigate("/")} className="inline-flex items-center gap-3 text-left">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy text-white"><ShoppingBag className="h-5 w-5" /></span>
            <span><strong className="block font-display text-lg">The Shield Store</strong><span className="text-xs text-slate-500">Technologie et accessoires</span></span>
          </button>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">Une sélection claire d’équipements pour communiquer, travailler et rester mobile au quotidien.</p>
          <a href={corporateUrl} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0b7c9e] hover:text-navy">Découvrir The Shield Corporation <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <FooterGroup title="Explorer">
          <FooterButton onClick={() => onNavigate("/")}>Tous les produits</FooterButton>
          <FooterButton onClick={() => onNavigate("/category/smartphones")}>Smartphones</FooterButton>
          <FooterButton onClick={() => onNavigate("/category/ordinateurs")}>Ordinateurs</FooterButton>
          <FooterButton onClick={() => onNavigate("/category/audio")}>Audio</FooterButton>
        </FooterGroup>
        <FooterGroup title="Votre espace">
          <FooterButton onClick={() => onNavigate("/cart")}>Panier</FooterButton>
          <FooterButton onClick={() => onNavigate("/account/orders")}>Mes commandes</FooterButton>
          <FooterButton onClick={() => onNavigate("/login")}>Connexion</FooterButton>
        </FooterGroup>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Besoin d’aide ?</h2>
          <a href="mailto:contact@theshieldcorporation.com" className="mt-4 flex items-start gap-3 text-sm font-semibold hover:text-[#0b7c9e]"><Mail className="mt-0.5 h-4 w-4 shrink-0" />contact@theshieldcorporation.com</a>
          <div className="mt-4 flex items-start gap-3 text-sm text-slate-600"><Headphones className="mt-0.5 h-4 w-4 shrink-0 text-[#0b7c9e]" /><span>Conseil avant achat et accompagnement client.</span></div>
          <div className="mt-4 flex items-center gap-3 text-sm text-slate-600"><ShieldCheck className="h-4 w-4 shrink-0 text-[#0b7c9e]" />Paiements traités de manière sécurisée.</div>
        </div>
      </div>
      <div className="border-t border-slate-200/80"><div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between md:px-8"><p>© {year} The Shield Corporation Store.</p><p>Les prix et disponibilités sont confirmés au moment de la commande.</p></div></div>
    </footer>
  );
}

function FooterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{title}</h2><div className="mt-4 grid gap-3">{children}</div></div>;
}

function FooterButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className="w-fit text-left text-sm font-medium text-slate-600 transition-colors hover:text-[#0b7c9e]">{children}</button>;
}