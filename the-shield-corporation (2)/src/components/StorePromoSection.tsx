import { ArrowUpRight, Headphones, Laptop, Smartphone } from "lucide-react";
import { openStore } from "../config/store";

export default function StorePromoSection() {
  return (
    <section aria-labelledby="store-promo-title" className="w-full rounded-[32px] border border-slate-200/70 bg-white px-6 py-8 shadow-[0_24px_70px_rgba(10,27,51,0.08)] md:px-10 md:py-10">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">The Shield Store</p>
          <h2 id="store-promo-title" className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-navy md:text-4xl">La technologie sélectionnée pour votre quotidien.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-text">Découvrez notre plateforme indépendante dédiée aux smartphones, ordinateurs, équipements audio et accessoires.</p>
          <button type="button" onClick={openStore} className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark">
            Visiter le Store <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3" aria-hidden="true">
          {[Smartphone, Laptop, Headphones].map((Icon, index) => <span key={index} className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 text-cyan-800 md:h-20 md:w-20"><Icon className="h-6 w-6" /></span>)}
        </div>
      </div>
    </section>
  );
}
