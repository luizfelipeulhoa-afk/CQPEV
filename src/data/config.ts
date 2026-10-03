/**
 * Configuração do site — dados de contato e redes.
 * Campos marcados com TODO(cliente) precisam ser confirmados com a Cidinha.
 */
export const siteConfig = {
  brand: {
    name: 'Com Que Pedra Eu Vou?',
    tagline: 'joias funcionais',
    artisan: 'Cidinha Ulhoa',
    city: 'Brasília',
    state: 'DF',
  },
  contact: {
    // TODO(cliente): confirmar número de WhatsApp
    whatsapp: '5561999999999',
    // TODO(cliente): confirmar e-mail
    email: 'contato@comquepedraeuvou.com.br',
    instagram: 'https://instagram.com/comquepedraeuvou',
    instagramHandle: '@comquepedraeuvou',
    // TODO(cliente): confirmar endereço do atelier
    address: 'Brasília — DF',
  },
  // TODO(cliente): confirmar domínio
  domain: 'comquepedraeuvou.com.br',
  // TODO(cliente): confirmar ano de início
  since: 2015,
  credentials: [
    'Brasília Trends Fashion Week',
    'Desfile GBM',
    'Exposição internacional IVCBC (Zâmbia)',
  ],
} as const;

export type SiteConfig = typeof siteConfig;
