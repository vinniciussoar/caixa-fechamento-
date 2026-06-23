"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { results } from "@/content/copy";

export function Results() {
  return (
    <section id="resultados" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow={results.eyebrow} title={results.title} align="center" className="mx-auto" />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {results.benefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-paper/10 px-5 py-4 text-sm text-paper/80"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              {benefit}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 rounded-3xl glass p-10 sm:grid-cols-4 sm:p-14">
          {results.counters.map((counter, i) => (
            <motion.div
              key={counter.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-4xl text-gradient-gold sm:text-5xl">
                <Counter value={counter.value} suffix={counter.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-wide text-paper/55">{counter.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-paper/35">{results.disclaimer}</p>
      </Container>
    </section>
  );
}
