import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { footer, nav } from "@/content/copy";
import { buildWhatsAppLink, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-paper/10 py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg text-paper">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/55">
              {footer.tagline}
            </p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-paper/65 hover:text-paper">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/40">
              Contato
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-paper/65 hover:text-paper"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-paper/65 hover:text-paper"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav className="mt-12 flex flex-wrap gap-5 border-t border-paper/10 pt-8 lg:hidden">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="text-xs text-paper/50">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="mt-8 text-xs text-paper/35">{footer.legal}</p>
      </Container>
    </footer>
  );
}
