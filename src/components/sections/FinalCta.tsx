"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { finalCta } from "@/content/copy";
import { buildWhatsAppLink } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative py-28 sm:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="glass relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] p-10 text-center sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-serenity/15 via-transparent to-gold/15" />
          <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-paper/70">{finalCta.subtitle}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#diagnostico" variant="primary">
              {finalCta.primary}
            </Button>
            <Button href={buildWhatsAppLink()} variant="secondary" external>
              {finalCta.secondary}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
