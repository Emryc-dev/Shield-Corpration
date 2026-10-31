import React from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import { verifyPayment, type PaymentStatus } from "../api/payments";

interface PaymentCallbackPageProps {
  onNavigate: (path: string) => void;
}

const PAYMENT_ID_KEY = "shield-store-pending-payment";

export default function PaymentCallbackPage({ onNavigate }: PaymentCallbackPageProps) {
  const [status, setStatus] = React.useState<PaymentStatus | "VERIFYING" | "UNKNOWN">("VERIFYING");

  React.useEffect(() => {
    document.title = "Vérification du paiement | The Shield Store";
    const paymentId = window.sessionStorage.getItem(PAYMENT_ID_KEY);
    if (!paymentId) {
      setStatus("UNKNOWN");
      return;
    }
    verifyPayment(paymentId)
      .then(result => {
        setStatus(result.status);
        if (result.status !== "PENDING") window.sessionStorage.removeItem(PAYMENT_ID_KEY);
      })
      .catch(() => setStatus("UNKNOWN"));
  }, []);

  const successful = status === "SUCCESS";
  const pending = status === "VERIFYING" || status === "PENDING";

  return (
    <div className="min-h-screen bg-bg-global">
      <StoreHeader onNavigate={onNavigate} title="Paiement" />
      <main className="mx-auto max-w-[760px] px-4 py-16">
        <section className="rounded-[40px] border border-slate-200/70 bg-white p-8 text-center shadow-[0_30px_90px_-65px_rgba(10,27,51,0.45)] md:p-12">
          {pending ? <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#0b7c9e]" /> : successful ? <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" /> : <XCircle className="mx-auto h-12 w-12 text-red-600" />}
          <h1 className="mt-5 font-display text-[34px] font-semibold text-navy">
            {pending ? "Vérification du paiement" : successful ? "Paiement confirmé" : "Paiement non confirmé"}
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] text-sm leading-relaxed text-slate-text">
            {pending
              ? "Nous vérifions la transaction directement auprès de NotchPay. Cette opération peut prendre quelques instants."
              : successful
                ? "Merci ! Votre commande est payée et notre équipe la prépare."
                : "Nous n'avons pas pu valider ce paiement et aucune somme n'est enregistrée comme payée. Si vous avez été débité, écrivez-nous avec votre numéro de commande."}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => onNavigate("/account/orders")} className="rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">Voir mes commandes</button>
            <button onClick={() => onNavigate("/store")} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-navy">Retour au Store</button>
          </div>
        </section>
      </main>
    </div>
  );
}
