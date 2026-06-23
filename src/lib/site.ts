/**
 * Placeholder contact/identity values — replace before launch.
 * whatsappNumber must be E.164 digits only (no symbols) for the wa.me link to work.
 */
export const siteConfig = {
  name: "INSAUDEHS",
  fullName: "INSAUDEHS — Instituto SaudávelMente de Desenvolvimento Humano Sustentável",
  shortDescription:
    "Desenvolvimento socioemocional, saúde mental e inclusão para escolas e empresas, com diagnóstico contínuo e metodologia baseada em evidências.",
  url: "https://www.insaudehs.com.br",
  email: "contato@insaudehs.com.br",
  whatsappNumber: "5511999999999",
  whatsappDefaultMessage:
    "Olá! Quero solicitar um diagnóstico gratuito para minha escola/empresa.",
  locale: "pt_BR",
};

export function buildWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}
