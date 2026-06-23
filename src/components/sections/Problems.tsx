"use client";

import { motion } from "framer-motion";
import { AlertTriangle, GraduationCap, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problems } from "@/content/copy";

const columnIcons: Record<string, typeof GraduationCap> = {
  escolas: GraduationCap,
  empresas: Building2,
};

export function Problems() {
  return (
    <section className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow={problems.eyebrow}
          title={problems.title}
          subtitle={problems.subtitle}
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {problems.columns.map((column, i) => {
            const Icon = columnIcons[column.key];
            return (
              <motion.div
                key={column.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass rounded-3xl p-8 sm:p-10"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-paper/5 text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/50">
                    {column.label}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-paper">{column.title}</h3>
                <ul className="mt-6 space-y-4">
                  {column.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-paper/70">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-serenity-light" strokeWidth={1.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
