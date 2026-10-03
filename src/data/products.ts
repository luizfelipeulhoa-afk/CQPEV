/**
 * Produtos (joias) da vitrine.
 * Campos marcados com TODO(cliente) precisam ser confirmados.
 */
import type { Crystal } from './crystals';

export type ProductType = 'Colares' | 'Brincos' | 'Chokers' | 'Pulseiras';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  intention: string;
  stone: string;
  crystalSlug: string;
  // TODO(cliente): confirmar preços
  price: number;
  images: string[];
  material: string;
  // TODO(cliente): confirmar medidas
  size: string;
  story: string;
  // TODO(cliente): preencher com URLs reais dos posts do Instagram
  sourcePost?: string;
  available: boolean;
  weekPick?: boolean;
}

export const products: Product[] = [
  {
    id: 'colar-pendulo-quartzo',
    name: 'Colar Pêndulo',
    type: 'Colares',
    intention: 'Clareza',
    stone: 'Quartzo Transparente',
    crystalSlug: 'quartzo-transparente',
    price: 180,
    images: ['/images/products/colar-pendulo-quartzo-1.png', '/images/products/colar-pendulo-quartzo-2.png'],
    material: 'Fio de alumínio, quartzo transparente, couro',
    size: '45–55 cm ajustável',
    story: 'O quartzo gira livre — um pêndulo que dança no seu colo.',
    available: true,
  },
  {
    id: 'choker-te-amo-brasilia',
    name: 'Choker "Te Amo Brasília"',
    type: 'Chokers',
    intention: 'Amor',
    stone: 'Quartzo Rosa',
    crystalSlug: 'quartzo-rosa',
    price: 140,
    images: ['/images/products/choker-te-amo-brasilia-1.png', '/images/products/choker-te-amo-brasilia-2.png'],
    material: 'Couro caramelo, fio de alumínio, quartzo rosa',
    size: '32–38 cm ajustável',
    story: 'Gola de couro com cristal — um abraço no pescoço.',
    available: true,
  },
  {
    id: 'colar-buque-flores',
    name: 'Colar Buquê',
    type: 'Colares',
    intention: 'Amor',
    stone: 'Quartzo Rosa',
    crystalSlug: 'quartzo-rosa',
    price: 200,
    images: ['/images/products/colar-buque-flores-1.png', '/images/products/colar-buque-flores-2.png'],
    material: 'Fio de alumínio, cristais variados',
    size: '50–60 cm',
    story: 'Flores de fio que florescem no colo — um buquê que não murcha.',
    available: true,
  },
  {
    id: 'brincos-cristais-naturais',
    name: 'Brincos Cristais Naturais',
    type: 'Brincos',
    intention: 'Clareza',
    stone: 'Quartzo Transparente',
    crystalSlug: 'quartzo-transparente',
    price: 120,
    images: ['/images/products/brincos-cristais-naturais-1.png', '/images/products/brincos-cristais-naturais-2.png'],
    material: 'Fio de alumínio, quartzo transparente',
    size: '4 cm',
    story: 'Leves como nada — cristais que balançam com o seu ritmo.',
    available: true,
  },
  {
    id: 'pulseira-fio-couro',
    name: 'Pulseira Fio & Couro',
    type: 'Pulseiras',
    intention: 'Proteção',
    stone: 'Turmalina Negra',
    crystalSlug: 'turmalina-negra',
    price: 110,
    images: ['/images/products/pulseira-fio-couro-1.png', '/images/products/pulseira-fio-couro-2.png'],
    material: 'Fio de alumínio, turmalina negra, couro',
    size: '16–20 cm ajustável',
    story: 'Turmalina no pulso — o que te cerca, te guarda.',
    available: true,
  },
  {
    id: 'pendente-ametista',
    name: 'Pendente Ametista',
    type: 'Colares',
    intention: 'Equilíbrio',
    stone: 'Ametista',
    crystalSlug: 'ametista',
    price: 160,
    images: ['/images/products/pendente-ametista-1.png', '/images/products/pendente-ametista-2.png'],
    material: 'Fio de alumínio, ametista, couro',
    size: '45–55 cm ajustável',
    story: 'A pedra violeta que acalma — equilíbrio enrolado à mão.',
    available: true,
    weekPick: true,
  },
  {
    id: 'colar-quartzo-rosa',
    name: 'Colar Quartzo Rosa',
    type: 'Colares',
    intention: 'Amor',
    stone: 'Quartzo Rosa',
    crystalSlug: 'quartzo-rosa',
    price: 170,
    images: ['/images/products/colar-quartzo-rosa-1.png', '/images/products/colar-quartzo-rosa-2.png'],
    material: 'Fio de alumínio, quartzo rosa, couro caramelo',
    size: '45–55 cm ajustável',
    story: 'Amor-próprio no colo — a pedra rosa que começa por você.',
    available: true,
  },
  {
    id: 'brincos-citrino-gota',
    name: 'Brincos Gota Citrino',
    type: 'Brincos',
    intention: 'Prosperidade',
    stone: 'Citrino',
    crystalSlug: 'citrino',
    price: 130,
    images: ['/images/products/brincos-citrino-gota-1.png', '/images/products/brincos-citrino-gota-2.png'],
    material: 'Fio de alumínio, citrino',
    size: '3,5 cm',
    story: 'Gotas de luz dourada — prosperidade que balança.',
    available: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByType(type: ProductType): Product[] {
  return products.filter(p => p.type === type);
}

export function getProductsByIntention(intention: string): Product[] {
  return products.filter(p => p.intention === intention);
}

export function getAvailableProducts(): Product[] {
  return products.filter(p => p.available);
}

export function getWeekPick(): Product | undefined {
  return products.find(p => p.weekPick);
}

/**
 * Helper para formatar preço em BRL.
 */
export function Q(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
