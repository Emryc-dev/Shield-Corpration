import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Eye, EyeOff, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageSlider } from "@/components/ui/image-slider";
import { Input } from "@/components/ui/input";
import StoreHeader from "../components/StoreHeader";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { login, loginWithGoogle, register } from "../api/auth";
import { StoreApiError } from "../api/client";

const authImages = [
  "/store/heroes/mobile.jpg",
  "/store/heroes/audio.jpg",
  "/store/heroes/informatique.jpg",
];

const authImageAlts = [
  "Smartphone et accessoires mobiles",
  "Casque et équipement audio",
  "Ordinateur et accessoires informatiques",
];

type AuthMode = "login" | "register";

export default function StoreAuthPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const params = React.useMemo(() => new URLSearchParams(window.location.search), []);
  const requestedMode = params.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = React.useState<AuthMode>(requestedMode);
  const [busy, setBusy] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const reduceMotion = useReducedMotion();
  const returnTo = params.get("returnTo") || "/store";
  const safeReturnTo = returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/store";

  React.useEffect(() => {
    document.title = mode === "login" ? "Connexion | The Shield Store" : "Créer un compte | The Shield Store";
  }, [mode]);

  const selectMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError("");
    setShowPassword(false);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (mode === "register") {
      if (form.password !== form.confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
      if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
        setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.");
        return;
      }
    }

    setBusy(true);
    try {
      if (mode === "login") await login(form.email.trim(), form.password);
      else await register({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(), phone: form.phone.trim() || undefined, password: form.password });
      onNavigate(safeReturnTo);
    } catch (cause) {
      setError(cause instanceof TypeError
        ? "Impossible de joindre le serveur. Vérifiez votre connexion puis réessayez."
        : cause instanceof StoreApiError
          ? cause.message
          : mode === "login"
            ? "Adresse e-mail ou mot de passe incorrect."
            : "Impossible de créer ce compte. Vérifiez les informations saisies.");
    } finally {
      setBusy(false);
    }
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleGoogleCredential = React.useCallback(async (credential: string) => {
    setBusy(true);
    setError("");
    try {
      await loginWithGoogle(credential);
      onNavigate(safeReturnTo);
    } catch (cause) {
      setError(cause instanceof StoreApiError ? cause.message : "La connexion Google a échoué. Veuillez réessayer.");
    } finally {
      setBusy(false);
    }
  }, [onNavigate, safeReturnTo]);

  const handleGoogleError = React.useCallback((message: string) => setError(message), []);

  return (
    <div className="min-h-screen bg-bg-global text-navy">
      <StoreHeader onNavigate={onNavigate} title="Espace client" />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-[1240px] items-center px-4 py-6 md:px-8 lg:py-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid w-full overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_28px_90px_rgba(10,27,51,0.10)] lg:min-h-[680px] lg:grid-cols-[1.02fr_0.98fr]"
        >
          <section className="relative hidden min-h-[680px] overflow-hidden lg:block">
            <ImageSlider images={authImages} imageAlts={authImageAlts} interval={4500} />
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(7,23,44,0.08)_15%,rgba(7,23,44,0.88)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-10 pb-16 text-white xl:p-12 xl:pb-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-cyan-200" /> The Shield Store
              </span>
              <h1 className="mt-5 max-w-lg font-display text-[38px] font-semibold leading-[1.08] xl:text-[44px]">
                Votre technologie, vos commandes, un seul espace.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/78">
                Retrouvez vos achats et suivez chaque étape de leur traitement en toute simplicité.
              </p>
              <ul className="mt-7 grid gap-3 text-sm text-white/90">
                {["Suivez l'état de vos commandes", "Retrouvez vos achats et vos favoris", "Commandez plus vite avec vos informations enregistrées"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-cyan-300/15"><Check className="h-3.5 w-3.5 text-cyan-100" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="flex items-center px-6 py-9 sm:px-10 lg:px-12 xl:px-16">
            <div className="mx-auto w-full max-w-[440px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
                {mode === "login" ? "Bienvenue" : "Créer votre espace"}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy sm:text-[38px]">
                {mode === "login" ? "Connectez-vous" : "Rejoignez The Shield Store"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-text">
                {mode === "login" ? "Accédez à vos commandes et poursuivez vos achats." : "Créez votre compte pour commander et suivre vos achats."}
              </p>

              <div className="mt-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Type d’authentification">
                <button type="button" role="tab" aria-selected={mode === "login"} onClick={() => selectMode("login")} className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${mode === "login" ? "bg-white text-navy shadow-sm" : "text-slate-500 hover:text-navy"}`}>Connexion</button>
                <button type="button" role="tab" aria-selected={mode === "register"} onClick={() => selectMode("register")} className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${mode === "register" ? "bg-white text-navy shadow-sm" : "text-slate-500 hover:text-navy"}`}>Créer un compte</button>
              </div>

              <div className="mt-6">
                <GoogleAuthButton mode={mode} disabled={busy} onCredential={handleGoogleCredential} onError={handleGoogleError} />
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
                <div className="relative flex justify-center text-[11px] font-semibold uppercase tracking-[0.12em]"><span className="bg-white px-3 text-slate-400">ou avec votre e-mail</span></div>
              </div>

              <form onSubmit={submit} className="grid gap-4">
                <AnimatePresence initial={false} mode="popLayout">
                  {mode === "register" && (
                    <motion.div key="identity" initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }} className="grid gap-4 overflow-hidden sm:grid-cols-2">
                      <Field label="Prénom" name="firstName" value={form.firstName} onChange={change} autoComplete="given-name" required minLength={2} />
                      <Field label="Nom" name="lastName" value={form.lastName} onChange={change} autoComplete="family-name" required minLength={2} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Field label="Adresse e-mail" name="email" type="email" placeholder="vous@exemple.com" value={form.email} onChange={change} autoComplete="email" required />

                <AnimatePresence initial={false} mode="popLayout">
                  {mode === "register" && (
                    <motion.div key="phone" initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <Field label="Téléphone (optionnel)" name="phone" type="tel" placeholder="+237 6XX XXX XXX" value={form.phone} onChange={change} autoComplete="tel" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <PasswordField label="Mot de passe" name="password" value={form.password} onChange={change} visible={showPassword} onToggle={() => setShowPassword((value) => !value)} autoComplete={mode === "login" ? "current-password" : "new-password"} />

                <AnimatePresence initial={false} mode="popLayout">
                  {mode === "register" && (
                    <motion.div key="confirmation" initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }} className="grid gap-2 overflow-hidden">
                      <PasswordField label="Confirmer le mot de passe" name="confirmPassword" value={form.confirmPassword} onChange={change} visible={showPassword} onToggle={() => setShowPassword((value) => !value)} autoComplete="new-password" />
                      <p className="text-xs leading-5 text-slate-500">8 caractères minimum, avec une majuscule et un chiffre.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

                <Button type="submit" disabled={busy} className="mt-1 h-12 w-full rounded-xl bg-navy px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(10,27,51,0.16)] hover:bg-navy-dark">
                  {busy ? <Loader2 className="animate-spin" /> : mode === "login" ? <LockKeyhole /> : <ArrowRight />}
                  {busy ? "Veuillez patienter..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
                </Button>
              </form>

              <p className="mt-7 text-center text-sm text-slate-500">
                {mode === "login" ? "Vous n’avez pas encore de compte ?" : "Vous avez déjà un compte ?"}{" "}
                <button type="button" onClick={() => selectMode(mode === "login" ? "register" : "login")} className="font-semibold text-cyan-800 underline-offset-4 hover:underline">
                  {mode === "login" ? "Créer un compte" : "Se connecter"}
                </button>
              </p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}

function Field({ label, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = React.useId();
  return (
    <label htmlFor={id} className="grid gap-2 text-xs font-semibold text-slate-700">
      {label}
      <Input id={id} {...props} className={`h-11 rounded-xl border-slate-200 bg-slate-50 px-3.5 text-sm text-navy placeholder:text-slate-400 focus-visible:border-cyan-700 focus-visible:ring-cyan-100 ${className || ""}`} />
    </label>
  );
}

function PasswordField({ label, visible, onToggle, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; visible: boolean; onToggle: () => void }) {
  const id = React.useId();
  return (
    <label htmlFor={id} className="grid gap-2 text-xs font-semibold text-slate-700">
      {label}
      <span className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-shadow focus-within:border-cyan-700 focus-within:ring-3 focus-within:ring-cyan-100">
        <input id={id} required {...props} type={visible ? "text" : "password"} className="h-11 min-w-0 flex-1 bg-transparent px-3.5 text-sm text-navy outline-none" />
        <button type="button" onClick={onToggle} className="grid w-11 place-items-center text-slate-500 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-700" aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </span>
    </label>
  );
}
