import * as React from "react";

declare const __PUBLIC_GOOGLE_CLIENT_ID__: string;

type GoogleCredentialResponse = { credential?: string };
type GoogleIdApi = {
  initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void;
  renderButton: (element: HTMLElement, options: Record<string, string | number>) => void;
};

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdApi } };
  }
}

let googleScriptPromise: Promise<void> | null = null;
let initializedClientId = "";
let credentialListener: ((response: GoogleCredentialResponse) => void) | null = null;

function loadGoogleScript() {
  if (window.google?.accounts.id) return Promise.resolve();
  if (googleScriptPromise) return googleScriptPromise;
  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src^="https://accounts.google.com/gsi/client"]');
    const script = existing || document.createElement("script");
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("GOOGLE_SCRIPT_FAILED")), { once: true });
    if (!existing) {
      script.src = "https://accounts.google.com/gsi/client?hl=fr";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
  return googleScriptPromise;
}

export default function GoogleAuthButton({ mode, disabled, onCredential, onError }: {
  mode: "login" | "register";
  disabled?: boolean;
  onCredential: (credential: string) => void;
  onError: (message: string) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!__PUBLIC_GOOGLE_CLIENT_ID__) return;
    let active = true;
    const receiveCredential = (response: GoogleCredentialResponse) => {
      if (response.credential) onCredential(response.credential);
      else onError("Google n'a retourne aucun identifiant valide.");
    };
    credentialListener = receiveCredential;
    loadGoogleScript()
      .then(() => {
        if (!active || !containerRef.current || !window.google) return;
        containerRef.current.replaceChildren();
        if (initializedClientId !== __PUBLIC_GOOGLE_CLIENT_ID__) {
          window.google.accounts.id.initialize({
            client_id: __PUBLIC_GOOGLE_CLIENT_ID__,
            callback: (response) => credentialListener?.(response),
          });
          initializedClientId = __PUBLIC_GOOGLE_CLIENT_ID__;
        }
        window.google.accounts.id.renderButton(containerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "rectangular",
          text: mode === "register" ? "signup_with" : "signin_with",
          logo_alignment: "left",
          locale: "fr",
          width: Math.min(containerRef.current.clientWidth || 400, 400),
        });
      })
      .catch(() => onError("Impossible de charger la connexion Google."));
    return () => {
      active = false;
      if (credentialListener === receiveCredential) credentialListener = null;
    };
  }, [mode, onCredential, onError]);

  if (!__PUBLIC_GOOGLE_CLIENT_ID__) return null;
  return <div ref={containerRef} className={disabled ? "pointer-events-none opacity-60" : "min-h-11 w-full overflow-hidden rounded-lg"} aria-label="Connexion avec Google" />;
}
