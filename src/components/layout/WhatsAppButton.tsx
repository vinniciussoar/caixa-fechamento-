"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.6 }}
      whileHover={{ scale: 1.08 }}
      aria-label="Falar no WhatsApp"
      className="animate-pulse-soft fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-light via-gold to-serenity text-ink shadow-lg sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
    </motion.a>
  );
}
