# INSAUDEHS — Landing Page Premium

Documentação de design e estratégia da landing page institucional do INSAUDEHS
(Instituto SaudávelMente de Desenvolvimento Humano Sustentável). Este documento
cobre wireframe, estrutura UX/UI, hierarquia visual, paleta de cores, tipografia,
animações, estratégia de conversão e estrutura SEO. A copy completa vive em
`src/content/copy.ts` (fonte única de verdade); este doc não a duplica.

## 1. Wireframe detalhado (ordem das seções)

```
┌─────────────────────────────────────────────┐
│ Header (fixo, glass)                         │ logo · nav · CTA "Diagnóstico Gratuito"
├─────────────────────────────────────────────┤
│ Hero                                         │ eyebrow · headline · subheadline
│   3D brain (R3F) centrado/à direita          │ 2 CTAs · credibility row · scroll hint
├─────────────────────────────────────────────┤
│ About ("Quem somos")                         │ lead · 3 blocos · 3 pilares · quote
├─────────────────────────────────────────────┤
│ Problems                                     │ 2 colunas: Escolas | Empresas
├─────────────────────────────────────────────┤
│ Solutions                                    │ 2 pilares: Instituições | Corporativo
├─────────────────────────────────────────────┤
│ Methodology                                  │ timeline vertical, 5 etapas, scroll-fill
├─────────────────────────────────────────────┤
│ Results                                      │ benefit chips · 4 counters animados
├─────────────────────────────────────────────┤
│ Authority (Sandra Moura)                     │ foto · bio · credenciais · pull-quote
├─────────────────────────────────────────────┤
│ Social Proof                                 │ 3 depoimentos · faixa de parceiros
├─────────────────────────────────────────────┤
│ Diagnostic Form (lead capture)               │ formulário completo, id="diagnostico"
├─────────────────────────────────────────────┤
│ Final CTA                                    │ painel glass · 2 CTAs
├─────────────────────────────────────────────┤
│ Footer                                       │ marca · colunas · contato · legal
└─────────────────────────────────────────────┘
+ WhatsApp button flutuante (fixo, todas as seções)
```

Esta ordem segue o funil clássico de conversão B2B: **atenção (Hero) → empatia
com a dor (Problems) → solução (Solutions) → confiança no processo
(Methodology) → prova quantitativa (Results) → prova de autoridade
(Authority) → prova social (Social Proof) → conversão (Diagnostic Form) →
último empurrão (Final CTA)**.

## 2. Estrutura UX/UI

- **Composição em camadas**: `AnimatedBackground` (z-index mais baixo, fixo)
  → conteúdo das seções (z-index médio) → `Header` e `WhatsAppButton` (fixos,
  z-index mais alto). O fundo nunca compete com o texto: blobs com baixa
  opacidade e blur pesado.
- **Glassmorphism consistente**: cartões, painel do formulário e header usam
  a classe utilitária `.glass` (fundo `rgba(paper, 6%)` + borda sutil + blur
  18px) para criar profundidade sem recorrer a sombras pesadas.
- **Densidade progressiva**: Hero é o momento de respiro máximo (poucos
  elementos, muito espaço negativo); a partir de Problems/Solutions a
  densidade de informação aumenta gradualmente até o formulário.
- **Mobile-first em todas as seções**: grids 2 colunas (`sm:grid-cols-2`)
  colapsam para 1 coluna abaixo do breakpoint `sm`; o menu do Header se
  transforma em painel mobile com `AnimatePresence`.
- **Single source of truth de conteúdo**: nenhuma seção contém strings de
  copy hardcoded — tudo importado de `src/content/copy.ts`, permitindo edição
  de copy sem tocar em lógica/JSX.

## 3. Hierarquia visual

1. **Headline do Hero** (`font-display`, Fraunces, maior peso visual da
   página) — ponto de entrada do olhar.
2. **3D Brain** — elemento central de atenção no Hero, reforça a marca
   "desenvolvimento humano" sem competir com o texto (posicionado para não
   sobrepor a headline em mobile).
3. **Títulos de seção** (`SectionHeading`: eyebrow em caps + título em
   `font-display`) — pontuam a rolagem e funcionam como "respiro" entre
   blocos de conteúdo.
4. **CTAs em gradiente dourado** (`from-gold-light via-gold to-serenity`) —
   única aplicação de cor saturada na página, garantindo que o olho sempre
   encontre o próximo passo de conversão.
5. **Texto de corpo em `paper/65`** (branco com opacidade reduzida) — mantém
   contraste confortável sem competir com títulos e CTAs.

## 4. Paleta de cores

Definida em `src/app/globals.css` via tokens Tailwind v4 (`@theme inline`):

| Token              | Hex       | Uso                                          |
|--------------------|-----------|-----------------------------------------------|
| `ink`              | `#060f1f` | Fundo base (quase preto azulado)              |
| `deep`              | `#0b2147` | Camada de fundo intermediária                 |
| `deep-2`            | `#123163` | Scrollbar, acentos escuros                    |
| `serenity`          | `#4fa3e3` | Azul Serenity — gradientes, luz 3D, acentos   |
| `serenity-light`    | `#a9d6f5` | Azul claro — glow, destaques suaves           |
| `gold`              | `#d6ad60` | Dourado suave — CTAs, foco, indicadores       |
| `gold-light`        | `#f1ddae` | Dourado claro — gradiente de CTA, texto gold  |
| `paper`             | `#f8f6f0` | Texto principal sobre fundo escuro            |
| `mist`              | `#e9f1fb` | Fundo claro auxiliar (não usado em excesso)   |

Lógica: fundo dominante em tons profundos de azul-marinho (transmite
seriedade clínica/institucional), contraponto em Azul Serenity (calma,
psicologia) e toques de dourado suave reservados exclusivamente para
elementos de ação (CTAs, ícones de destaque, contadores) — criando uma
hierarquia de cor onde "dourado = aja agora".

## 5. Tipografia

- **Display — Fraunces** (`next/font/google`, eixo `opsz` ativado): serifada
  contemporânea usada em headlines, títulos de seção e citações. Transmite
  o lado humano/editorial sem parecer institucional-burocrática.
- **Sans — Inter**: usada em corpo de texto, labels, navegação, formulário.
  Alta legibilidade em qualquer tamanho, neutra o suficiente para não
  competir com a Fraunces.
- Escala tipográfica usa unidades Tailwind padrão (`text-sm` → `text-6xl`),
  com `tracking-wide`/`uppercase` em eyebrows e labels para reforçar o tom
  premium/editorial.

## 6. Animações recomendadas (implementadas)

| Elemento                  | Biblioteca       | Comportamento                                          |
|----------------------------|------------------|---------------------------------------------------------|
| Fundo (blobs aquarela)     | CSS keyframes + Framer Motion | Morphing orgânico contínuo + parallax por `useMotionValue` ligado ao mouse |
| 3D Brain                  | React Three Fiber | Distorção contínua (`MeshDistortMaterial`), parallax por `pointer`, reage a `progress` de scroll via `useFrame` |
| Reveals de seção           | Framer Motion `whileInView` | Fade + translateY ao entrar no viewport, `viewport={{ once: true }}` |
| Headline do Hero           | Framer Motion    | Stagger por palavra na entrada                          |
| Timeline (Methodology)     | Framer Motion + `useScroll` | Linha vertical se preenche conforme progresso de scroll na seção |
| Contadores (Results)       | Framer Motion `useMotionValue`/`useSpring` + `useInView` | Count-up animado ao entrar em viewport, formatado pt-BR |
| Botão WhatsApp             | CSS keyframe `pulse-soft` | Pulso contínuo discreto para chamar atenção sem ser intrusivo |
| Header mobile              | Framer Motion `AnimatePresence` | Slide/fade do painel de navegação mobile |

Princípio geral: toda animação tem **propósito de leitura ou de conversão**
(guiar o olho, indicar progresso, recompensar a rolagem) — nenhuma animação é
puramente decorativa ao ponto de atrasar a leitura do conteúdo.

## 7. Estratégia de conversão

- **Duas portas de entrada para o mesmo objetivo**: CTA primário ("Solicitar
  Diagnóstico Gratuito", ancora no formulário) e CTA secundário/WhatsApp
  ("Falar com Especialista") — atende tanto quem prefere preencher um
  formulário quanto quem prefere contato humano imediato.
  - Não testamos automaticamente A/B; framework de qualquer ferramenta de
   experimentação pode ser plugado no botão sem alterar estrutura.
- **Repetição estratégica do CTA**: presente no Header, no Hero, no fim de
  Solutions, no Final CTA e como botão flutuante de WhatsApp — o visitante
  nunca está mais que "uma rolagem" de distância de um caminho de conversão.
- **Redução de fricção no formulário**: apenas 5 campos obrigatórios (nome,
  e-mail, WhatsApp, tipo de organização, nome da instituição) + 1 campo
  opcional (mensagem) — validação client-side (Zod + React Hook Form) com
  feedback inline imediato, evitando reload de página.
- **Prova social distribuída ao longo do funil**, não apenas no fim:
  credibility row no Hero → métricas em Results → autoridade da fundadora →
  depoimentos/parceiros — cada camada reduz objeções antes do formulário.
- **Segmentação already-in-form**: o campo "Você representa" (Escola/Empresa/
  Outro) permite qualificar o lead no momento da captura, possibilitando
  roteamento e priorização imediatos pelo time comercial.
- **Privacy note visível** junto ao botão de envio, reduzindo a hesitação
  típica de formulários B2B que pedem WhatsApp.

## 8. Estrutura SEO

- **Metadata centralizada** em `src/app/layout.tsx`: title template
  (`%s — INSAUDEHS`), description, keywords focadas em termos de busca B2B
  (saúde mental escolar, NR-01 riscos psicossociais, BNCC competências
  socioemocionais), Open Graph e Twitter Card completos, `metadataBase` para
  resolução de URLs canônicas/OG.
- **JSON-LD estruturado** (`EducationalOrganization`) injetado no `<body>`
  via `<script type="application/ld+json">`, com `founder`, `areaServed` e
  `audience` — ajuda motores de busca a entender o instituto como entidade
  educacional/institucional, não como blog ou e-commerce.
- **`sitemap.ts` e `robots.ts`** (App Router file conventions) gerando
  `/sitemap.xml` e `/robots.txt` automaticamente a partir de `siteConfig.url`.
- **Semântica HTML**: `lang="pt-BR"` no `<html>`, hierarquia de headings
  (`h1` único no Hero, `h2` por seção via `SectionHeading`), `alt` text
  pendente de imagens reais quando substituírem os blocos placeholder.
- **Performance como fator de SEO**: Brain3D carregado via `next/dynamic`
  (`ssr: false`) para não bloquear o LCP do Hero; fontes via `next/font/google`
  com self-hosting automático (sem layout shift de webfont).

## 9. Pendências antes do lançamento

Itens explicitamente marcados como placeholder no código e que precisam de
dados reais antes de publicar:

- `src/lib/site.ts`: número de WhatsApp, e-mail e URL do site.
- `src/content/copy.ts` → `results.counters`: indicadores ilustrativos.
- `src/content/copy.ts` → `socialProof`: depoimentos e parceiros genéricos.
- `src/app/api/diagnostico/route.ts`: integração real com CRM/e-mail/planilha
  (atualmente apenas `console.log` do lead recebido).
- `public/og-image.png`: imagem de Open Graph referenciada no metadata mas
  ainda não criada.
- Foto real de Sandra Moura na seção Authority (atualmente bloco placeholder).
