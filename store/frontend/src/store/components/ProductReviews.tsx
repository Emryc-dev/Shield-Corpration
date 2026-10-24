import React from "react";
import { CheckCircle2, MessageSquareText, Pencil, Trash2 } from "lucide-react";
import { createReview, deleteReview, getMyReviews, getProductReviews, updateReview } from "../api/reviews";
import { StoreApiError, storeSession } from "../api/client";
import type { Product, ProductReview, ProductReviewsResponse } from "../types";
import RatingStars from "./RatingStars";

const emptyReviews: ProductReviewsResponse = {
  items: [],
  averageRating: 0,
  ratingCount: 0,
  pagination: { page: 1, limit: 10, total: 0, pages: 0 },
};

export default function ProductReviews({ product, onNavigate, onRatingChange }: { product: Product; onNavigate: (path: string) => void; onRatingChange?: (average: number, count: number) => void }) {
  const [data, setData] = React.useState<ProductReviewsResponse>(emptyReviews);
  const [ownReview, setOwnReview] = React.useState<ProductReview | null>(null);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{ type: "error" | "success"; message: string } | null>(null);
  const authenticated = storeSession.hasToken();

  const loadReviews = React.useCallback(async (targetPage = page) => {
    setLoading(true);
    try {
      const [reviews, mine] = await Promise.all([
        getProductReviews(product.id, targetPage),
        authenticated ? getMyReviews().catch(() => []) : Promise.resolve([]),
      ]);
      const personal = mine.find((review) => review.productId === product.id || review.product?.id === product.id) || null;
      setData(reviews);
      setOwnReview(personal);
      if (personal) {
        setRating(personal.rating);
        setComment(personal.comment || "");
      }
      onRatingChange?.(reviews.averageRating, reviews.ratingCount);
    } catch {
      setFeedback({ type: "error", message: "Impossible de charger les avis pour le moment." });
    } finally {
      setLoading(false);
    }
  }, [authenticated, onRatingChange, page, product.id]);

  React.useEffect(() => { void loadReviews(page); }, [loadReviews, page]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!authenticated) {
      onNavigate(`/login?returnTo=${encodeURIComponent(`/product/${product.slug}`)}`);
      return;
    }
    if (!rating) {
      setFeedback({ type: "error", message: "Choisissez une note entre 1 et 5 étoiles." });
      return;
    }
    setSubmitting(true);
    setFeedback(null);
    try {
      if (ownReview) await updateReview(ownReview.id, { rating, comment: comment.trim() || null });
      else await createReview({ productId: product.id, rating, comment: comment.trim() || undefined });
      setFeedback({ type: "success", message: ownReview ? "Votre avis a été mis à jour." : "Merci, votre avis est publié." });
      await loadReviews(1);
      setPage(1);
    } catch (error) {
      const apiError = error instanceof StoreApiError ? error : null;
      const message = apiError?.code === "PURCHASE_REQUIRED"
        ? "Vous pourrez noter ce produit après l’avoir acheté et payé."
        : apiError?.code === "REVIEW_ALREADY_EXISTS"
          ? "Vous avez déjà publié un avis pour ce produit."
          : apiError?.message || "Votre avis n’a pas pu être enregistré.";
      setFeedback({ type: "error", message });
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async () => {
    if (!ownReview || !window.confirm("Supprimer définitivement votre avis ?")) return;
    setSubmitting(true);
    try {
      await deleteReview(ownReview.id);
      setOwnReview(null);
      setRating(0);
      setComment("");
      setFeedback({ type: "success", message: "Votre avis a été supprimé." });
      await loadReviews(1);
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof StoreApiError ? error.message : "Suppression impossible." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10" aria-labelledby="reviews-title">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0b7c9e]">Avis vérifiés</p>
          <h2 id="reviews-title" className="mt-2 font-display text-[30px] font-semibold tracking-tight md:text-[38px]">Ce qu’en pensent nos clients</h2>
          <div className="mt-6 flex items-end gap-4">
            <strong className="font-display text-6xl font-semibold leading-none">{data.ratingCount ? data.averageRating.toFixed(1) : "—"}</strong>
            <div className="pb-1"><RatingStars value={data.averageRating} size="md" /><p className="mt-2 text-sm text-slate-500">{data.ratingCount} avis publié{data.ratingCount > 1 ? "s" : ""}</p></div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">Seuls les clients ayant acheté ce produit peuvent publier une note. Chaque avis correspond donc à une commande vérifiée.</p>
        </div>

        <div className="space-y-5">
          <form onSubmit={submit} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_-45px_rgba(10,27,51,0.35)] md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h3 className="font-display text-xl font-semibold">{ownReview ? "Modifier votre avis" : "Noter ce produit"}</h3><p className="mt-1 text-xs text-slate-500">Votre expérience aide les autres clients à choisir.</p></div>
              {ownReview && <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" />Achat vérifié</span>}
            </div>
            <div className="mt-5"><RatingStars value={rating} size="md" interactive onChange={setRating} /></div>
            <label className="mt-5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500" htmlFor="review-comment">Votre commentaire <span className="font-normal normal-case tracking-normal">(facultatif)</span></label>
            <textarea id="review-comment" value={comment} onChange={(event) => setComment(event.target.value)} maxLength={2000} rows={4} placeholder="Parlez de la qualité, de l’usage ou de votre expérience avec ce produit." className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#0b7c9e] focus:bg-white focus:ring-4 focus:ring-[#0b7c9e]/10" />
            {feedback && <p role="status" className={`mt-3 rounded-xl px-3 py-2 text-sm ${feedback.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{feedback.message}</p>}
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="submit" disabled={submitting} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-white transition hover:bg-[#0b7c9e] disabled:cursor-wait disabled:opacity-60">{ownReview ? <Pencil className="h-4 w-4" /> : <MessageSquareText className="h-4 w-4" />}{submitting ? "Enregistrement..." : ownReview ? "Mettre à jour" : authenticated ? "Publier mon avis" : "Se connecter pour noter"}</button>
              {ownReview && <button type="button" disabled={submitting} onClick={() => void remove()} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" />Supprimer</button>}
            </div>
          </form>

          <div aria-live="polite">
            {loading ? <div className="h-36 animate-pulse rounded-[24px] bg-slate-100" /> : data.items.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-300 px-5 py-8 text-center"><p className="font-semibold">Aucun avis pour le moment.</p><p className="mt-1 text-sm text-slate-500">Soyez le premier client vérifié à partager votre expérience.</p></div>
            ) : <div className="divide-y divide-slate-200">{data.items.map((review) => <article key={review.id} className="py-5 first:pt-0"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{review.user ? `${review.user.firstName} ${review.user.lastName.charAt(0)}.` : "Client vérifié"}</p><div className="mt-1"><RatingStars value={review.rating} /></div></div><time className="text-xs text-slate-400" dateTime={review.createdAt}>{new Intl.DateTimeFormat("fr-CM", { dateStyle: "medium" }).format(new Date(review.createdAt))}</time></div>{review.comment && <p className="mt-3 text-sm leading-6 text-slate-600">{review.comment}</p>}<p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" />Achat vérifié</p></article>)}</div>}
          </div>

          {data.pagination.pages > 1 && <div className="flex items-center justify-between border-t border-slate-200 pt-4"><button type="button" disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="text-sm font-semibold disabled:opacity-40">Précédent</button><span className="text-xs text-slate-500">Page {page} sur {data.pagination.pages}</span><button type="button" disabled={page >= data.pagination.pages} onClick={() => setPage((value) => value + 1)} className="text-sm font-semibold disabled:opacity-40">Suivant</button></div>}
        </div>
      </div>
    </section>
  );
}