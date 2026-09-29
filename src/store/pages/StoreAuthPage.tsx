import React from "react";
import { Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import { login, register } from "../api/auth";

interface StoreAuthPageProps {
  onNavigate: (path: string) => void;
}

export default function StoreAuthPage({ onNavigate }: StoreAuthPageProps) {
  const [mode, setMode] = React.useState<"login" | "register">("login");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });
  const returnTo = new URLSearchParams(window.location.search).get("returnTo") || "/store/checkout";
  const safeReturnTo = returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/store/checkout";

  React.useEffect(() => {
    document.title = "Connexion | The Shield Corporation Store";
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form);
      }
      onNavigate(safeReturnTo);
    } catch {
      setError(mode === "login" ? "E-mail ou mot de passe incorrect." : "Impossible de créer le compte. Vérifiez les informations saisies.");
    } finally {
      setBusy(false);
    }
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <div className="min-h-screen bg-bg-global text-navy">
      <StoreHeader onNavigate={onNavigate} title="Espace client" />
      <main className="mx-auto grid max-w-[1100px] items-center gap-8 px-4 py-10 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[36px] bg-navy p-8 text-white md:p-10">
          <ShieldCheck className="h-10 w-10 text-cyan-300" />
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Compte client sécurisé</p>
          <h1 className="mt-3 font-display text-[34px] font-semibold leading-tight md:text-[44px]">Connectez-vous avant de finaliser votre achat.</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">Votre compte permet de protéger le paiement, retrouver vos commandes et suivre leur traitement.</p>
        </section>

        <section className="rounded-[36px] border border-slate-200/70 bg-white p-6 md:p-10">
          <div className="flex rounded-full bg-slate-100 p-1">
            <button type="button" onClick={() => setMode("login")} className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold ${mode === "login" ? "bg-white text-navy shadow-sm" : "text-slate-text"}`}>Connexion</button>
            <button type="button" onClick={() => setMode("register")} className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold ${mode === "register" ? "bg-white text-navy shadow-sm" : "text-slate-text"}`}>Créer un compte</button>
          </div>

          <form onSubmit={submit} className="mt-7 grid gap-4">
            {mode === "register" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Prénom" name="firstName" value={form.firstName} onChange={change} autoComplete="given-name" />
                <Field label="Nom" name="lastName" value={form.lastName} onChange={change} autoComplete="family-name" />
              </div>
            )}
            <Field label="Adresse e-mail" name="email" type="email" value={form.email} onChange={change} autoComplete="email" />
            {mode === "register" && <Field label="Téléphone" name="phone" type="tel" value={form.phone} onChange={change} autoComplete="tel" />}
            <Field label="Mot de passe" name="password" type="password" value={form.password} onChange={change} autoComplete={mode === "login" ? "current-password" : "new-password"} />
            {mode === "register" && <p className="text-xs leading-relaxed text-slate-text">Au moins 8 caractères, une majuscule et un chiffre.</p>}
            {error && <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
            <button disabled={busy} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
              {mode === "login" ? "Se connecter et continuer" : "Créer mon compte et continuer"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...inputProps } = props;
  return (
    <label className="grid gap-2 text-xs font-bold text-slate-text">
      {label}
      <input required {...inputProps} className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-navy outline-none focus:border-[#0b7c9e]" />
    </label>
  );
}
