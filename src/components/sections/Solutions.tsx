"use client";

import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { solutions } from "@/content/copy";

const pillarIcons: Record<string, typeof GraduationCap> = {
  escolas: GraduationCap,
  empresas: Building2,
};

const pillarAccent: Record<string, string> = {
  escolas: "from-serenity/25 to-transparent",
  empresas: "from-gold/25 to-transparent",
};

export function Solutions() {
  return (
    <section id="solucoes" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow={solutions.eyebrow}
          title={solutions.title}
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {solutions.pillars.map((pillar, i) => {
            const Icon = pillarIcons[pillar.key];
            return (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative overflow-hidden rounded-3xl border border-paper/10 bg-gradient-to-br ${pillarAccent[pillar.key]} p-8 sm:p-10`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/40 text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-2xl text-paper">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{pillar.description}</p>
                <ul className="mt-6 space-y-3">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-paper/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="#diagnostico" variant="primary">
            Quero um diagnóstico para minha instituição
          </Button>
        </div>
      </Container>
    </section>
  );
}
