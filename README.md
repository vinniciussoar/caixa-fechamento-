# INSAUDEHS — Landing Page

Landing page institucional do **INSAUDEHS** (Instituto SaudávelMente de
Desenvolvimento Humano Sustentável), voltada à geração de leads B2B
qualificados junto a escolas e empresas, com diagnóstico institucional
gratuito como principal caminho de conversão.

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Tailwind CSS v4 (tema via `@theme inline` em `src/app/globals.css`)
- [Framer Motion](https://www.framer.com/motion/) para reveals, parallax e microinterações
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + drei para o cérebro 3D procedural do Hero
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para o formulário de diagnóstico

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx          # Metadata/SEO, fonts, JSON-LD
│   ├── page.tsx            # Composição de todas as seções
│   ├── sitemap.ts          # /sitemap.xml
│   ├── robots.ts           # /robots.txt
│   └── api/diagnostico/    # Route handler do formulário de leads
├── components/
│   ├── layout/             # Header, Footer, WhatsAppButton
│   ├── sections/           # Hero, About, Problems, Solutions, Methodology,
│   │                       # Results, Authority, SocialProof, DiagnosticForm, FinalCta
│   ├── ui/                 # Container, Button, SectionHeading, Counter
│   └── visuals/            # AnimatedBackground, Brain3D
├── content/copy.ts         # Copy completa da página (fonte única de verdade)
└── lib/                    # site config, validação (Zod), utils (cn)
```

## Documentação de design e estratégia

Wireframe detalhado, hierarquia visual, paleta de cores, tipografia,
animações, estratégia de conversão e estrutura SEO estão documentados em
[`docs/insaudehs-landing-page.md`](./docs/insaudehs-landing-page.md).

## Getting Started

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Build

```bash
npm run build
npm run lint
```

## Antes de publicar

Os seguintes pontos são placeholders explícitos no código e precisam de
dados reais antes do lançamento (detalhes em `docs/insaudehs-landing-page.md`):

- Número de WhatsApp, e-mail e URL do site (`src/lib/site.ts`)
- Indicadores de `Results`, depoimentos e parceiros de `SocialProof` (`src/content/copy.ts`)
- Integração real do formulário de diagnóstico com CRM/e-mail/planilha (`src/app/api/diagnostico/route.ts`)
- Imagem de Open Graph (`public/og-image.png`) e foto de Sandra Moura na seção Authority
