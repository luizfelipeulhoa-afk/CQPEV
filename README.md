# Com Que Pedra Eu Vou? — Site Oficial

Site editorial cinematográfico para a marca de joias artesanais **Com Que Pedra Eu Vou?** (@comquepedraeuvou), criada por Cidinha Ulhoa em Brasília/DF.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4 (tokens em `@theme`)
- GSAP + ScrollTrigger (animações de scroll)
- Lenis (smooth scroll)
- Motion / Framer Motion (micro-animações UI)
- three.js (cena 3D procedural — lazy loaded)
- Zustand + persist (sacola)
- canvas-confetti (celebrações)
- Google Fonts: Fraunces, Karla, IBM Plex Mono

## Como usar

```bash
npm install
npm run dev     # desenvolvimento
npm run build   # produção
```

## Estrutura

```
src/
  data/           # Dados do site (config, produtos, cristais, textos)
  state/          # Stores Zustand (sacola, preferência de movimento)
  components/
    ui/           # Componentes reutilizáveis (BtnFio, Reveal, Toast, etc.)
    layout/       # Nav, Footer, BagDrawer
    sections/     # Seções do site
  events.ts       # Helpers de eventos globais (toast, cortina)
public/
  images/products/  # Fotos reais dos produtos (substituir placeholders)
```

## TODOs para a cliente

Campos marcados com `// TODO(cliente):` no código precisam ser confirmados:

1. **WhatsApp** — número completo com DDD em `src/data/config.ts`
2. **E-mail** — endereço de contato em `src/data/config.ts`
3. **Endereço** — endereço do atelier em `src/data/config.ts`
4. **Preços** — confirmar preços dos produtos em `src/data/products.ts`
5. **Depoimentos** — depoimentos reais em `src/data/content.ts` (seção `postais`)
6. **Biografia** — refinar bio da Cidinha em `src/data/content.ts` (seção `atelier`)
7. **Domínio** — domínio oficial em `src/data/config.ts`
8. **Fotos** — substituir placeholders SVG por fotos reais em `public/images/products/`
9. **Posts do Instagram** — URLs dos posts de origem em `src/data/products.ts`

## Fotos dos produtos

Coloque as fotos em `public/images/products/` seguindo a convenção:
- `{slug-do-produto}-1.png` (foto principal)
- `{slug-do-produto}-2.png` (foto alternativa)

O site usa automaticamente as fotos quando disponíveis e mostra o placeholder SVG enquanto não houver fotos reais.

## Paleta

| Token | Cor | Uso |
|-------|-----|-----|
| linen | #f4efe6 | Fundo geral |
| ink | #211f2a | Texto |
| night | #171a2b | Superfícies escuras |
| crystal | #8f7fd4 | Cor de marca (ametista) |
| brass | #c8a24d | CTAs e destaques |
| silver | #aeb4c2 | Alumínio |
| leather | #a26b45 | Couro caramelo |

---

© 2026 Com Que Pedra Eu Vou? — enrolada com paciência em Brasília por Cidinha Ulhoa
