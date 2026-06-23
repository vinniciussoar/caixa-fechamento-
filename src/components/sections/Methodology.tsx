"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ClipboardList, Rocket, LineChart, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { methodology } from "@/content/copy";

const stepIcons = [Search, ClipboardList, Rocket, LineChart, RefreshCw];

export function Methodology() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="metodologia" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow={methodology.eyebrow}
          title={methodology.title}
          subtitle={methodology.subtitle}
          align="center"
          className="mx-auto"
        />

        <div ref={trackRef} className="relative mt-20">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-paper/10 lg:block" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-gold via-serenity to-transparent lg:block"
          />

          <div className="space-y-10 lg:space-y-0">
            {methodology.steps.map((step, i) => {
              const Icon = stepIcons[i];
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col items-center gap-4 lg:flex-row lg:gap-0 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } lg:py-8`}
                >
                  <div className={`w-full lg:w-1/2 ${isEven ? "lg:pr-14 lg:text-right" : "lg:pl-14"}`}>
                    <div className="glass inline-block rounded-3xl p-6 text-left sm:p-8">
                      <span className="font-display text-sm font-semibold text-gold">
                        Etapa {step.number}
                      </span>
                      <h3 className="mt-2 font-display text-xl text-paper">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-paper/65">{step.text}</p>
                    </div>
                  </div>

                  <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold shadow-[0_0_30px_rgba(214,173,96,0.25)]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <div className="hidden w-full lg:block lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
