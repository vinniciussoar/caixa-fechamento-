"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialProof } from "@/content/copy";

export function SocialProof() {
  return (
    <section id="depoimentos" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow={socialProof.eyebrow}
          title={socialProof.title}
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {socialProof.testimonials.map((testimonial, i) => (
            <motion.figure
              key={testimonial.name + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass flex flex-col rounded-3xl p-8"
            >
              <Quote className="h-6 w-6 text-gold/70" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-paper/80">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-paper/10 pt-4">
                <p className="text-sm font-medium text-paper">{testimonial.name}</p>
                <p className="text-xs text-paper/50">{testimonial.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-paper/10 pt-10"
        >
          {socialProof.partners.map((partner) => (
            <span
              key={partner}
              className="text-xs font-medium uppercase tracking-[0.15em] text-paper/35"
            >
              {partner}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
