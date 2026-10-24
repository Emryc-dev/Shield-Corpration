import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
  imageAlts?: string[];
  interval?: number;
}

const ImageSlider = React.forwardRef<HTMLDivElement, ImageSliderProps>(
  ({ images, imageAlts = [], interval = 5000, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
      if (images.length < 2 || reduceMotion) return;
      const timer = window.setInterval(() => {
        setCurrentIndex((index) => (index + 1) % images.length);
      }, interval);
      return () => window.clearInterval(timer);
    }, [images.length, interval, reduceMotion]);

    React.useEffect(() => {
      if (currentIndex >= images.length) setCurrentIndex(0);
    }, [currentIndex, images.length]);

    if (!images.length) return null;

    return (
      <div
        ref={ref}
        className={cn("relative h-full w-full overflow-hidden bg-slate-950", className)}
        role="region"
        aria-label="Sélection de produits The Shield Store"
        {...props}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={imageAlts[currentIndex] || `Produit technologique ${currentIndex + 1}`}
            initial={reduceMotion ? false : { opacity: 0, x: 36, scale: 1.02 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -36 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2" aria-label="Choisir une image">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full bg-white/55 transition-[width,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                  currentIndex === index ? "w-7 bg-white" : "w-2 hover:bg-white/80",
                )}
                aria-label={`Afficher l’image ${index + 1}`}
                aria-current={currentIndex === index ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

ImageSlider.displayName = "ImageSlider";

export { ImageSlider };
