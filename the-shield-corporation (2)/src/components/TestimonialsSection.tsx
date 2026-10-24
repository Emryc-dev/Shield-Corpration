import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  TestimonialCard,
  type TestimonialCardData,
  type TestimonialPosition,
} from "./ui/testimonial-cards";

const portraitImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
];

export default function TestimonialsSection() {
  const { language, t } = useLanguage();
  const [positions, setPositions] = React.useState<TestimonialPosition[]>(["front", "middle", "back"]);
  const [isPaused, setIsPaused] = React.useState(false);

  const testimonials: TestimonialCardData[] = [
    {
      id: "test-1",
      author: "Marc Alima",
      company: "Afritech Capital",
      role: language === "fr" ? "Directeur de la Technologie" : "Chief Technology Officer",
      testimonial:
        language === "fr"
          ? "The Shield Corporation a restructuré notre cloud et audité nos API. Leur méthode DevSecOps nous a permis de corriger plusieurs vulnérabilités critiques avant la mise en production."
          : "The Shield Corporation redesigned our cloud environment and audited our APIs. Their DevSecOps approach helped us fix critical vulnerabilities before production.",
      image: portraitImages[0],
    },
    {
      id: "test-2",
      author: "Carine Moukouri",
      company: "Cameroon Trade Link",
      role: language === "fr" ? "Responsable de l’Architecture Sécurisée" : "Head of Secure Architecture",
      testimonial:
        language === "fr"
          ? "Depuis le déploiement de leurs protections réseau, nos interruptions ont fortement diminué. Les ingénieurs interviennent vite et expliquent clairement chaque décision."
          : "Since their network protections were deployed, our service interruptions have dropped sharply. Their engineers respond quickly and explain every decision clearly.",
      image: portraitImages[1],
    },
    {
      id: "test-3",
      author: "Dr. Joshua Ndoumbé",
      company: "Central Health Hub",
      role: language === "fr" ? "Directeur de l’Infrastructure Numérique" : "Director of Digital Infrastructure",
      testimonial:
        language === "fr"
          ? "Nous hébergeons des données médicales sensibles. Leur accompagnement nous a permis de renforcer l’infrastructure, les accès et notre conformité sans ralentir les équipes."
          : "We host sensitive medical data. Their support helped us strengthen infrastructure, access controls and compliance without slowing our teams down.",
      image: portraitImages[2],
    },
  ];

  const shuffleForward = React.useCallback(() => {
    setPositions((current) => [current[2], current[0], current[1]]);
  }, []);

  const shuffleBackward = React.useCallback(() => {
    setPositions((current) => [current[1], current[2], current[0]]);
  }, []);

  React.useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(shuffleForward, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, shuffleForward]);

  const activeIndex = positions.indexOf("front");

  return (
    <section
      id="testimonials"
      className="w-full scroll-mt-24 overflow-hidden px-4 py-20 md:scroll-mt-28 md:px-8 md:py-28"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="space-y-7 lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/5 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-navy">
            {t("testimonials.badge")}
          </div>
          <div className="space-y-5">
            <h2 id="testimonials-title" className="max-w-[600px] font-display text-[34px] font-medium leading-[1.08] tracking-tight text-navy md:text-[48px]">
              {language === "fr" ? "La confiance se construit dans les systèmes réels." : "Trust is built in real systems."}
            </h2>
            <p className="max-w-[560px] font-sans text-[14px] leading-7 text-slate-text md:text-[15px]">
              {language === "fr"
                ? "Des responsables techniques racontent comment nos équipes ont renforcé leurs infrastructures sans compliquer leurs opérations."
                : "Technical leaders explain how our teams strengthened their infrastructure without adding friction to daily operations."}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={shuffleBackward}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-sm transition-all hover:border-slate-300 active:scale-95"
              aria-label={language === "fr" ? "Témoignage précédent" : "Previous testimonial"}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={shuffleForward}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-navy text-white shadow-md transition-all hover:bg-navy-dark active:scale-95"
              aria-label={language === "fr" ? "Témoignage suivant" : "Next testimonial"}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="ml-2 flex items-center gap-2" aria-label={`${activeIndex + 1} / ${testimonials.length}`}>
              {testimonials.map((testimonial, index) => (
                <span
                  key={testimonial.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-7 bg-[#0b7c9e]" : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="relative min-h-[480px] w-full max-w-[520px] lg:col-span-7 lg:ml-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="absolute inset-y-0 left-0 right-[18%] sm:right-[12%]">
            {testimonials.map((testimonial, index) => (
              <React.Fragment key={testimonial.id}>
                <TestimonialCard
                  {...testimonial}
                  position={positions[index]}
                  onShuffle={shuffleForward}
                  onInteractionChange={setIsPaused}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
