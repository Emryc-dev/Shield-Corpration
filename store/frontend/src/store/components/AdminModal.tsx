import React from "react";
import { X } from "lucide-react";

export default function AdminModal({ open, title, description, onClose, children, width = "max-w-2xl" }: { open: boolean; title: string; description?: string; onClose: () => void; children: React.ReactNode; width?: string }) {
  React.useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", close);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", close); document.body.style.overflow = overflow; };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/45 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="admin-modal-title" className={`max-h-[92vh] w-full ${width} overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl`}>
      <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-white px-6 py-5">
        <div><h2 id="admin-modal-title" className="text-xl font-semibold text-navy">{title}</h2>{description && <p className="mt-1 text-sm text-slate-text">{description}</p>}</div>
        <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-full border p-2 text-slate-500 hover:bg-slate-100"><X className="h-4 w-4" /></button>
      </header>
      <div className="p-6">{children}</div>
    </section>
  </div>;
}
