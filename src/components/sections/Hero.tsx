"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ShieldCheck, Sparkles, Microscope, Users2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/copy";
import { buildWhatsAppLink } from "@/lib/site";

const Brain3D = dynamic(
  () => import("@/components/visuals/Brain3D").then((mod) => mod.Brain3D),
  { ssr: false }
);

const credibilityIcons = [ShieldCheck, Microscope, Users2, Sparkles];

const headlineWords = hero.headline.split(" ");

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const brainOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-[100vh] items-center overflow-hidden pt-28"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity: brainOpacity }}
      >
        <Brain3D progress={scrollYProgress} />
      </motion.div>

      <Container className="relative z-10">
        <motion.div style={{ y: contentY }} className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-paper/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
          >
            {hero.eyebrow}
          </motion.span>

          <h1 className="font-display text-4xl font-medium leading-[1.08] text-paper sm:text-5xl lg:text-6xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.06 }}
                className={cnGoldWord(word)}
              >
                {word}{" "}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href="#diagnostico" variant="primary">
              {hero.ctaPrimary}
            </Button>
            <Button href={buildWhatsAppLink()} variant="secondary" external>
              {hero.ctaSecondary}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {hero.credibility.map((item, i) => {
              const Icon = credibilityIcons[i % credibilityIcons.length];
              return (
                <div
                  key={item}
                  className="flex flex-col items-center gap-2 text-center text-[11px] font-medium uppercase tracking-wide text-paper/55"
                >
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  {item}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-paper/50"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">{hero.scrollHint}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function cnGoldWord(word: string) {
  return word.toLowerCase().includes("sustentável") ? "text-gradient-gold" : "";
}
