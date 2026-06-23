import { z } from "zod";

export const diagnosticFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo"),
  email: z.string().trim().email("Informe um e-mail válido"),
  whatsapp: z.string().trim().min(8, "Informe um número de WhatsApp válido"),
  organizationType: z.string().trim().min(1, "Selecione uma opção"),
  organizationName: z.string().trim().min(2, "Informe o nome da escola ou empresa"),
  role: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type DiagnosticFormValues = z.infer<typeof diagnosticFormSchema>;
