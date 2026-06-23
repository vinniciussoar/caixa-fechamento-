"use client";

import { motion } from "framer-motion";
import { Microscope, HeartHandshake, Sprout } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/content/copy";

const pillarIcons = [Microscope, HeartHandshake, Sprout];

export function About() {
  return (
    <section id="sobre" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow={about.eyebrow} title={about.title} subtitle={about.lead} />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {about.blocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass rounded-3xl p-8"
            >
              <span className="font-display text-3xl text-gold">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl text-paper">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">{block.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {about.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-3 rounded-2xl border border-paper/10 p-5"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-serenity-light" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-paper">{pillar.title}</p>
                  <p className="mt-1 text-sm text-paper/60">{pillar.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-2xl text-center font-display text-2xl italic leading-snug text-paper/85 sm:text-3xl"
        >
          “{about.quote}”
        </motion.blockquote>
      </Container>
    </section>
  );
}
