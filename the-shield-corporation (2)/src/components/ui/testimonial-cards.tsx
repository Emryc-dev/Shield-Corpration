import * as React from "react";
import { motion, type PanInfo } from "motion/react";
import { Quote, Star } from "lucide-react";

export type TestimonialPosition = "front" | "middle" | "back";

export interface TestimonialCardData {
  id: string;
  testimonial: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

interface TestimonialCardProps extends TestimonialCardData {
  position: TestimonialPosition;
  onShuffle: () => void;
  onInteractionChange: (isInteracting: boolean) => void;
}

export function TestimonialCard({
  testimonial,
  position,
  author,
  role,
  company,
  image,
  onShuffle,
  onInteractionChange,
}: TestimonialCardProps) {
  const isFront = position === "front";
  const xPosition = position === "front" ? "0%" : position === "middle" ? "11%" : "22%";
  const yPosition = position === "front" ? "0%" : position === "middle" ? "5%" : "10%";

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    onInteractionChange(false);
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 650) {
      onShuffle();
    }
  };

  return (
    <motion.article
      style={{ zIndex: position === "front" ? 3 : position === "middle" ? 2 : 1 }}
      animate={{
        rotate: position === "front" ? -3.5 : position === "middle" ? 1 : 4.5,
        x: xPosition,
        y: yPosition,
        scale: position === "front" ? 1 : position === "middle" ? 0.965 : 0.93,
        opacity: position === "back" ? 0.72 : 1,
      }}
      drag="x"
      dragElastic={0.28}
      dragListener={isFront}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => onInteractionChange(true)}
      onDragEnd={handleDragEnd}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute inset-0 flex min-h-[420px] select-none flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-7 shadow-[0_28px_70px_-30px_rgba(10,27,51,0.35)] md:min-h-[450px] md:p-9 ${
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
      aria-hidden={!isFront}
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#0b7c9e]/6" />

      <div className="relative space-y-7">
        <div className="flex items-start justify-between">
          <img
            src={image}
            alt={`Portrait de ${author}`}
            className="pointer-events-none h-20 w-20 rounded-[24px] border border-slate-200 bg-slate-100 object-cover shadow-sm md:h-24 md:w-24"
            loading="lazy"
          />
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white">
            <Quote className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-1" aria-label="5 étoiles sur 5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="font-display text-[19px] font-medium leading-[1.55] tracking-[-0.015em] text-navy md:text-[22px]">
            “{testimonial}”
          </blockquote>
        </div>
      </div>

      <footer className="relative mt-8 border-t border-slate-100 pt-6">
        <p className="font-display text-[15px] font-bold text-navy">{author}</p>
        <p className="mt-1 text-[12px] leading-relaxed text-slate-text">
          {role}, <span className="font-semibold text-navy/80">{company}</span>
        </p>
      </footer>
    </motion.article>
  );
}
