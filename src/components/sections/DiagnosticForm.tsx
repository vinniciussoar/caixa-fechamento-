"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { diagnosticForm } from "@/content/copy";
import { diagnosticFormSchema, type DiagnosticFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/35 outline-none transition-colors focus:border-gold/60";

export function DiagnosticForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DiagnosticFormValues>({
    resolver: zodResolver(diagnosticFormSchema),
  });

  async function onSubmit(values: DiagnosticFormValues) {
    setStatus("submitting");
    try {
      const response = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("request_failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="diagnostico" className="relative py-28 sm:py-36">
      <Container>
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow={diagnosticForm.eyebrow}
            title={diagnosticForm.title}
            subtitle={diagnosticForm.subtitle}
            align="center"
            className="mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="glass mt-12 rounded-3xl p-8 sm:p-10"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={1.5} />
                <p className="font-display text-xl text-paper">{diagnosticForm.successTitle}</p>
                <p className="max-w-sm text-sm text-paper/65">{diagnosticForm.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-paper/50">
                    Nome completo
                  </label>
                  <input className={inputClasses} placeholder="Seu nome" {...register("name")} />
                  {errors.name && <FieldError message={errors.name.message} />}
                </div>

                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-paper/50">
                    E-mail
                  </label>
                  <input
                    className={inputClasses}
                    placeholder="voce@email.com"
                    {...register("email")}
                  />
                  {errors.email && <FieldError message={errors.email.message} />}
                </div>

                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-paper/50">
                    WhatsApp
                  </label>
                  <input
                    className={inputClasses}
                    placeholder="(00) 00000-0000"
                    {...register("whatsapp")}
                  />
                  {errors.whatsapp && <FieldError message={errors.whatsapp.message} />}
                </div>

                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-paper/50">
                    Você representa
                  </label>
                  <select
                    className={cn(inputClasses, "appearance-none")}
                    defaultValue=""
                    {...register("organizationType")}
                  >
                    <option value="" disabled>
                      Selecione uma opção
                    </option>
                    {diagnosticForm.organizationTypes.map((option) => (
                      <option key={option} value={option} className="text-ink">
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.organizationType && (
                    <FieldError message={errors.organizationType.message} />
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-paper/50">
                    Nome da escola ou empresa
                  </label>
                  <input
                    className={inputClasses}
                    placeholder="Instituição"
                    {...register("organizationName")}
                  />
                  {errors.organizationName && (
                    <FieldError message={errors.organizationName.message} />
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-paper/50">
                    Como podemos ajudar? (opcional)
                  </label>
                  <textarea
                    className={cn(inputClasses, "min-h-24 resize-none")}
                    placeholder="Conte um pouco sobre o desafio atual"
                    {...register("message")}
                  />
                </div>

                <div className="sm:col-span-2 mt-2 flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light via-gold to-serenity px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {diagnosticForm.submitLabel}
                  </button>
                  {status === "error" && (
                    <p className="text-xs text-red-300">
                      Não foi possível enviar agora. Tente novamente em instantes.
                    </p>
                  )}
                  <p className="text-center text-xs text-paper/40">
                    {diagnosticForm.privacyNote}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-300">{message}</p>;
}
