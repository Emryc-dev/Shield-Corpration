import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ServiceLanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-3 py-2 font-display text-[11px] font-bold text-navy shadow-sm transition-all hover:border-[#0b7c9e]/40 hover:bg-white active:scale-95"
      aria-label={language === "fr" ? "Switch to English" : "Passer en français"}
    >
      <Globe className="h-3.5 w-3.5 text-[#0b7c9e]" />
      <span>{language === "fr" ? "EN" : "FR"}</span>
    </button>
  );
}
