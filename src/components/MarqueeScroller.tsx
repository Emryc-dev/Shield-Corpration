import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  Terminal, 
  Cloud, 
  Activity, 
  Globe, 
  MessageSquareCode, 
  Server, 
  FileCode2 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ScrollerItem {
  id: string;
  nameKey: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: { from: string; to: string };
}

const scrollerItems: ScrollerItem[] = [
  {
    id: "net-sec",
    nameKey: "scroller.netSec",
    icon: Shield,
    gradient: { from: "#0ea5e9", to: "#1d4ed8" }
  },
  {
    id: "pentest",
    nameKey: "scroller.pentest",
    icon: Terminal,
    gradient: { from: "#f97316", to: "#ea580c" }
  },
  {
    id: "cloud-sec",
    nameKey: "scroller.cloud",
    icon: Cloud,
    gradient: { from: "#0ea5e9", to: "#4f46e5" }
  },
  {
    id: "soc",
    nameKey: "scroller.soc",
    icon: Activity,
    gradient: { from: "#10b981", to: "#059669" }
  },
  {
    id: "web-protect",
    nameKey: "scroller.webProtect",
    icon: Globe,
    gradient: { from: "#06b6d4", to: "#0d9488" }
  },
  {
    id: "consulting",
    nameKey: "scroller.consulting",
    icon: MessageSquareCode,
    gradient: { from: "#8b5cf6", to: "#6d28d9" }
  },
  {
    id: "infra",
    nameKey: "scroller.infra",
    icon: Server,
    gradient: { from: "#f59e0b", to: "#d97706" }
  },
  {
    id: "devsecops",
    nameKey: "scroller.devsecops",
    icon: FileCode2,
    gradient: { from: "#ec4899", to: "#e11d48" }
  }
];

interface LogoCardProps {
  key?: string;
  item: ScrollerItem;
  index: number;
}

function LogoCard({ item, index }: LogoCardProps) {
  const { t } = useLanguage();
  const IconComp = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const card = cardRef.current;
      if (card) {
        card.classList.add("scale-95");
        setTimeout(() => card.classList.remove("scale-95"), 150);
      }
    }
  };

  return (
    <div
      ref={cardRef}
      id={`marquee-card-${item.id}-${index}`}
      role="button"
      tabIndex={0}
      aria-label={`Cyber Capability: ${t(item.nameKey)}`}
      onKeyDown={handleKeyDown}
      className="group relative h-14 min-w-[210px] shrink-0 flex items-center gap-3 px-6 rounded-full bg-white border border-slate-200/70 shadow-sm hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-navy focus-visible:outline-none transition-all overflow-hidden cursor-pointer"
    >
      <div
        className="absolute inset-0 opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 transition-all duration-500 ease-out z-0"
        style={{
          background: `linear-gradient(135deg, ${item.gradient.from}, ${item.gradient.to})`
        }}
      />

      {/* Standardized beautiful Lucide Icon */}
      <div className="relative z-10 shrink-0 text-navy group-hover:text-white transition-colors duration-300">
        <IconComp className="w-5.5 h-5.5" />
      </div>

      {/* Prominent standard HTML text solving tiny-words layout and supporting live translation */}
      <span className="relative z-10 font-sans text-[15.5px] font-bold tracking-tight text-navy group-hover:text-white transition-colors duration-300">
        {t(item.nameKey)}
      </span>
    </div>
  );
}

export default function MarqueeScroller() {
  const duplicatedItems = [...scrollerItems, ...scrollerItems, ...scrollerItems];

  return (
    <section 
      className="w-full relative overflow-hidden py-6 select-none bg-slate-50/20" 
      id="marquee-section"
      aria-label="The Shield Corporation core cybersecurity domains"
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f9fafb] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f9fafb] to-transparent z-10 pointer-events-none" />

      <div
        style={{
          maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)"
        }}
        className="w-full overflow-hidden"
      >
        <div className="animate-marquee gap-5 flex items-center">
          {duplicatedItems.map((item, index) => (
            <LogoCard 
              key={`${item.id}-${index}`} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
