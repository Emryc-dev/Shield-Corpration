import React from "react";

interface TypewriterHeroTitleProps {
  language: "en" | "fr";
}

const titles = {
  fr: ["Sécurisez votre entreprise", "avec une protection numérique"],
  en: ["Secure your business", "with digital protection"],
};

export default function TypewriterHeroTitle({ language }: TypewriterHeroTitleProps) {
  const lines = titles[language];
  const fullText = lines.join("\n");
  const [visibleLength, setVisibleLength] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setVisibleLength(fullText.length);
      setIsComplete(true);
      return;
    }

    setVisibleLength(0);
    setIsComplete(false);

    let index = 0;
    let completionTimer: number | undefined;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleLength(index);

      if (index >= fullText.length) {
        window.clearInterval(timer);
        completionTimer = window.setTimeout(() => setIsComplete(true), 700);
      }
    }, 42);

    return () => {
      window.clearInterval(timer);
      if (completionTimer) window.clearTimeout(completionTimer);
    };
  }, [fullText]);

  const visibleText = fullText.slice(0, visibleLength);
  const [firstLine = "", secondLine = ""] = visibleText.split("\n");

  return (
    <h1
      id="hero-title"
      className="relative min-h-[2.2em] font-display text-[38px] font-bold leading-[1.1] tracking-tight text-navy sm:text-[46px] md:text-[56px]"
      aria-label={lines.join(" ")}
    >
      <span aria-hidden="true">
        {firstLine}
        {visibleText.includes("\n") && <br />}
        {secondLine}
        {!isComplete && <span className="typewriter-cursor ml-1 inline-block h-[0.85em] w-[3px] rounded-full bg-[#0b7c9e] align-[-0.05em]" />}
      </span>
    </h1>
  );
}
