import React from "react";
import { ArrowLeft, Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { getCurrentCustomer, login, logout } from "../../api/auth";

export default function AdminLoginPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const returnTo = new URLSearchParams(window.location.search).get("returnTo") || "/admin/store";
  React.useEffect(() => { document.title = "Connexion administration | The Shield Corporation"; }, []);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError("");
    try {
      await login(form.email, form.password);
      const user = await getCurrentCustomer();
      if (user?.role !== "ADMIN") { await logout(); setError("Ce compte ne dispose pas des droits d'administration."); return; }
      onNavigate(returnTo.startsWith("/admin/") ? returnTo : "/admin/store");
    } catch (cause) { setError(cause instanceof TypeError ? "Impossible de joindre le serveur. Vérifiez que le backend est démarré et autorise cette adresse." : "Identifiants incorrects ou compte non autorisé."); }
    finally { setBusy(false); }
  };
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f4f7fa] px-4 py-10 text-navy">
    <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyan-100/50 to-transparent" />
    <button onClick={() => onNavigate("/")} className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-bold shadow-sm"><ArrowLeft className="h-4 w-4" />Retour au site</button>
    <section className="relative w-full max-w-md rounded-[32px] border border-white/80 bg-white p-7 shadow-[0_30px_90px_rgba(10,27,51,0.12)] sm:p-9">
      <div className="flex justify-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-white shadow-lg"><ShieldCheck className="h-7 w-7" /></span></div>
      <div className="mt-7 text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-navy text-white"><ShieldCheck className="h-5 w-5" /></span><h1 className="mt-4 font-display text-3xl font-semibold">Espace administrateur</h1><p className="mt-2 text-sm leading-relaxed text-slate-text">Connectez-vous avec un compte administrateur pour gérer le Store.</p></div>
      <form onSubmit={submit} className="mt-7 grid gap-4">
        <Field label="Adresse e-mail"><input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-12 w-full bg-transparent px-4 text-sm outline-none" /></Field>
        <Field label="Mot de passe"><div className="flex"><input required type={showPassword ? "text" : "password"} autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} className="px-4 text-slate-500">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></Field>
        {error && <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        <button disabled={busy} className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-white shadow-lg disabled:opacity-60">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}Accéder au dashboard</button>
      </form>
    </section>
  </main>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="grid gap-2 text-xs font-bold text-slate-text">{label}<span className="block overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-100">{children}</span></label>; }
