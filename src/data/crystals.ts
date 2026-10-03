/**
 * Cristais naturais usados nas joias.
 * Cada cristal tem uma intenção associada.
 */
export interface Crystal {
  slug: string;
  name: string;
  intention: string;
  meaning: string;
  color: string;
  premium?: boolean;
}

export const crystals: Crystal[] = [
  {
    slug: 'quartzo-transparente',
    name: 'Quartzo Transparente',
    intention: 'Clareza',
    meaning: 'Paz e clareza mental. A pedra que limpa o ruído e traz foco.',
    color: '#e8e2f2',
  },
  {
    slug: 'ametista',
    name: 'Ametista',
    intention: 'Equilíbrio',
    meaning: 'Calma e intuição. A pedra violeta que acalma e conecta.',
    color: '#8f7fd4',
  },
  {
    slug: 'quartzo-rosa',
    name: 'Quartzo Rosa',
    intention: 'Amor',
    meaning: 'Amor-próprio e ternura. Comece por você.',
    color: '#e6a8b8',
  },
  {
    slug: 'citrino',
    name: 'Citrino',
    intention: 'Prosperidade',
    meaning: 'Abertura e movimento. A pedra dourada que atrai abundância.',
    color: '#e3b34c',
  },
  {
    slug: 'turmalina-negra',
    name: 'Turmalina Negra',
    intention: 'Proteção',
    meaning: 'O que te cerca, te guarda. Escudo contra o que não te serve.',
    color: '#2b2b33',
  },
  {
    slug: 'aventurina-verde',
    name: 'Aventurina Verde',
    intention: 'Equilíbrio',
    meaning: 'Saúde e sorte. A pedra verde que equilibra o corpo e a mente.',
    color: '#7fae86',
  },
  {
    slug: 'lapis-lazuli',
    name: 'Lápis-lazúli',
    intention: 'Clareza',
    meaning: 'Expressão e verdade. A pedra azul que liberta a voz.',
    color: '#3a5f9e',
    premium: true,
  },
  {
    slug: 'cornalina',
    name: 'Cornalina',
    intention: 'Coragem',
    meaning: 'Fogo criativo. A pedra laranja que acende a coragem.',
    color: '#c96a3a',
  },
  {
    slug: 'pedra-da-lua',
    name: 'Pedra da Lua',
    intention: 'Amor',
    meaning: 'Ciclos e feminilidade. A pedra que honra o seu ritmo.',
    color: '#cfd6e8',
    premium: true,
  },
  {
    slug: 'agata',
    name: 'Ágata',
    intention: 'Proteção',
    meaning: 'Estabilidade e ancoragem. A pedra que firma os pés no chão.',
    color: '#b08d6a',
  },
];

export function getCrystalBySlug(slug: string): Crystal | undefined {
  return crystals.find(c => c.slug === slug);
}

export function getCrystalsByIntention(intention: string): Crystal[] {
  return crystals.filter(c => c.intention === intention);
}

export const intentions = ['Proteção', 'Clareza', 'Amor', 'Prosperidade', 'Equilíbrio', 'Coragem'] as const;
export type Intention = typeof intentions[number];
