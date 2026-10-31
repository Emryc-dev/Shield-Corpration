import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const slides = [
  { category: 'Smartphones', title: 'Un smartphone fiable pour chaque journée.', subtitle: 'Smartphones, chargeurs et accessoires choisis pour durer.', description: 'Les smartphones et accessoires essentiels du quotidien.', image: '/store/heroes/mobile.jpg', alt: 'Composition illustrative de smartphones, ordinateur, audio et accessoires', cta: 'Voir les smartphones', action: '/store/category/smartphones', position: '70% center' },
  { category: 'Audio', title: 'Un son net, partout où vous allez.', subtitle: 'Casques, écouteurs et enceintes pour vos appels, votre travail et vos pauses.', description: 'Un son de qualité partout où vous allez : casques, écouteurs et enceintes compactes.', image: '/store/heroes/audio.jpg', alt: 'Composition illustrative de casque audio, écouteurs et enceinte Bluetooth', cta: "Découvrir l'audio", action: '/store/category/audio', position: '70% center' },
  { category: 'Ordinateurs', title: 'Des ordinateurs fiables pour travailler et créer.', subtitle: 'Portables, claviers, SSD et accessoires pour votre bureau.', description: 'Des équipements fiables pour travailler et créer.', image: '/store/heroes/informatique.jpg', alt: 'Composition illustrative d\'ordinateur portable, clavier, souris et accessoires', cta: 'Voir les ordinateurs', action: '/store/category/ordinateurs', position: '70% center' },
];

export default function StoreHeroSlider({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [interacting, setInteracting] = React.useState(false);
  const reducedMotion = useReducedMotion();
  React.useEffect(() => {
    if (paused || interacting || reducedMotion) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 6200);
    return () => window.clearInterval(timer);
  }, [paused, interacting, reducedMotion]);
  const slide = slides[activeIndex];
  const goTo = (index: number) => { setActiveIndex((index + slides.length) % slides.length); setPaused(true); };
  const scrollTo = (id: string) => (document.getElementById(id) ?? document.getElementById('store-catalog'))?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });

  return (
    <section aria-label='Sélections du Store' aria-roledescription='carrousel' className='relative mx-auto isolate max-w-[1400px] overflow-hidden rounded-[28px] bg-navy text-white md:rounded-[36px]' onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false); }}>
      <AnimatePresence initial={false}>
        <motion.img key={slide.image} src={slide.image} alt={slide.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.6 }} style={{ objectPosition: slide.position }} className='absolute inset-0 -z-20 h-full w-full object-cover' decoding='async' />
      </AnimatePresence>
      <div className='absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,17,32,0.75)_0%,rgba(6,17,32,0.45)_35%,rgba(6,17,32,0.03)_65%,transparent_100%)] max-md:bg-[linear-gradient(90deg,rgba(6,17,32,0.92),rgba(6,17,32,0.5))]' />
      <div className='flex min-h-[420px] flex-col justify-center px-6 pb-20 pt-9 sm:px-10 md:h-[540px] md:px-12 lg:px-16'>
        <span className='mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75'>The Shield Store · {slide.category}</span>
        <h1 className='max-w-[520px] font-display text-[26px] font-semibold leading-[1.15] tracking-tight sm:text-[32px] lg:text-[36px]'>{slide.title}</h1>
        <p className='mt-4 max-w-[440px] text-sm leading-relaxed text-white/80 md:text-base'>{slide.subtitle}</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <button type='button' onClick={() => scrollTo('store-catalog')} className='inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'>Explorer le catalogue<ArrowRight className='h-4 w-4' /></button>
          <button type='button' onClick={() => scrollTo('store-newest')} className='inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'>Voir les nouveautés</button>
        </div>
      </div>
      <div className='absolute bottom-4 left-3 right-3 flex items-center justify-between gap-0 sm:gap-3 md:bottom-6 md:left-12 md:right-12'>
        <div className='flex items-center'>{slides.map((item, index) => <button key={item.category} type='button' aria-label={`Afficher ${item.category}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => goTo(index)} className='flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-white'><span className={`h-1.5 rounded-full transition-all ${activeIndex === index ? 'w-8 bg-white' : 'w-3 bg-white/45'}`} /></button>)}</div>
        <div className='flex sm:gap-2'>
          <button type='button' aria-label={paused ? 'Activer le défilement automatique' : 'Mettre le défilement en pause'} aria-pressed={paused} onClick={() => setPaused((value) => !value)} className='flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy/30 hover:bg-navy/60'>{paused ? <Play className='h-4 w-4' /> : <Pause className='h-4 w-4' />}</button>
          <button type='button' aria-label='Slide précédent' onClick={() => goTo(activeIndex - 1)} className='flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy/30 hover:bg-navy/60'><ChevronLeft className='h-5 w-5' /></button>
          <button type='button' aria-label='Slide suivant' onClick={() => goTo(activeIndex + 1)} className='flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy/30 hover:bg-navy/60'><ChevronRight className='h-5 w-5' /></button>
        </div>
      </div>
    </section>
  );
}
