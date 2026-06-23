"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { authority } from "@/content/copy";

export function Authority() {
  return (
    <section id="autoridade" className="relative py-28 sm:py-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-gold/20"
          >
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-deep-2 via-deep to-ink text-center">
              <div>
                <span className="font-display text-6xl text-gold/70">SM</span>
                <p className="mt-3 px-6 text-xs uppercase tracking-[0.2em] text-paper/40">
                  Fotografia profissional
                </p>
              </div>
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-paper/10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {authority.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl text-paper sm:text-4xl">
              {authority.name}
            </h2>
            <p className="mt-1 text-sm font-medium uppercase tracking-wide text-serenity-light">
              {authority.role}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70">
              {authority.bio}
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {authority.credentials.map((credential) => (
                <li key={credential} className="flex items-start gap-2 text-sm text-paper/75">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                  {credential}
                </li>
              ))}
            </ul>

            <blockquote className="mt-8 flex gap-3 border-l-2 border-gold/40 pl-5 text-lg italic leading-snug text-paper/85">
              <Quote className="h-5 w-5 shrink-0 text-gold/70" />
              <span>{authority.quote}</span>
            </blockquote>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
