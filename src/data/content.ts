/**
 * Textos e conteúdo das seções do site.
 * Facilita revisão da cliente — tudo em um só lugar.
 */

export const heroCinema = {
  chapters: [
    {
      number: '01',
      label: 'A matéria',
      headline: 'Antes de brilhar, <em>é pedra.</em>',
      lines: [
        'Cristais naturais escolhidos um a um.',
        'Cada pedra guarda uma intenção.',
      ],
    },
    {
      number: '02',
      label: 'O encontro',
      headline: 'Cada volta. <em>Cada abraço.</em>',
      lines: [
        'O desenho nasce no encontro do fio com a pedra.',
      ],
    },
    {
      number: '03',
      label: 'A presença',
      headline: 'Natureza. <em>Por perto.</em>',
      lines: [
        'Pendente Pêndulo.',
        'Enrolado à mão, pela Cidinha.',
      ],
      cta: 'Encontre a sua pedra ↗',
    },
  ],
};

export const heroLanding = {
  badge: 'da bancada para o seu colo',
  headline: 'Cada pedra, <em>uma intenção</em> enrolada à mão.',
  paragraph: 'Colares, chokers, brincos e pulseiras feitos devagar — fio de alumínio, cristais naturais e couro, volta por volta, pelas mãos da Cidinha.',
  ctaPrimary: 'Ver a vitrine',
  ctaSecondary: 'Monte sua joia',
  social: '★ 4,9 de avaliação · centenas de mulheres brilhando · Brasília para o Brasil',
};

export const stats = [
  { value: 1200, label: 'voltas num pendente grande', prefix: '≈', suffix: '' },
  { value: 8, label: 'g de alumínio por peça', prefix: '', suffix: '' },
  { value: 10, label: 'anos de bancada', prefix: '', suffix: '+' },
  { value: 500, label: 'mulheres brilhando', prefix: '', suffix: '+' },
];

export const marqueeItems = [
  'feito à mão em Brasília',
  'cristais naturais',
  'fio de alumínio',
  'enviamos para todo o Brasil',
  'joias com intenção',
  'escolha brilhar',
];

export const vitrine = {
  title: 'Uma bancada. <em>Muitas histórias.</em>',
  subtitle: 'uma volta pela nossa vitrine — siga o fio para a direita',
};

export const catalogo = {
  header: '✳ direto da bancada',
  title: 'As peças <em>disponíveis</em>',
  subtitle: 'Poucas peças por vez. Escolha uma intenção e descubra o resto, sem pressa.',
  emptyCta: 'não achou a sua pedra? a gente cria pra você →',
};

export const intencoes = {
  intro: 'O fio continua →',
  subtitle: 'Role para atravessar as intenções',
  chapters: [
    {
      slug: 'protecao',
      name: 'Proteção',
      stones: 'turmalina negra · ônix',
      phrase: 'o que te cerca, te guarda',
      description: 'Peças que blindam. Turmalina negra enrolada em fio — um escudo que você veste.',
    },
    {
      slug: 'clareza',
      name: 'Clareza',
      stones: 'quartzo transparente · lápis-lazúli',
      phrase: 'paz e clareza mental',
      description: 'Pedras que limpam o ruído. Quartzo transparente no colo — foco que dança.',
    },
    {
      slug: 'amor',
      name: 'Amor',
      stones: 'quartzo rosa · pedra da lua',
      phrase: 'comece por você',
      description: 'O amor que começa de dentro. Quartzo rosa e pedra da lua — ternura no corpo.',
    },
    {
      slug: 'prosperidade',
      name: 'Prosperidade',
      stones: 'citrino · pirita',
      phrase: 'abertura e movimento',
      description: 'A pedra dourada que atrai. Citrino no pulso — abundância em movimento.',
    },
  ],
  footer: 'Uma volta de cada vez. Nenhuma igual.',
};

export const historiaDaPedra = {
  chapters: [
    {
      number: '01',
      label: 'a terra',
      headline: 'Antes de ser joia, <em>é mineral.</em>',
      text: 'Cristais formados por milênios dentro da rocha. A cor e a energia já vêm prontas da terra.',
    },
    {
      number: '02',
      label: 'a mão',
      headline: 'Antes de ser peça, <em>é paciência.</em>',
      text: 'Um pendente leva cerca de 6 horas de voltas de fio. A pressa é o único material que não entra na bancada.',
    },
    {
      number: '03',
      label: 'você',
      headline: 'Antes de chegar até você, <em>é intenção.</em>',
      text: 'Cada peça sai com a ficha da pedra e um bilhete escrito à mão. A sua história termina o trabalho.',
    },
  ],
};

export const bancadaNasce = {
  intro: '✳ da pedra à joia — role para enrolar',
  subtitle: 'A joia não se imprime, não se molda, não se cola. Ela se <strong>enrola</strong> — e é exatamente isso que o seu scroll faz aqui embaixo.',
  steps: [
    {
      title: 'A escolha da pedra',
      text: 'Tudo começa na pedra: forma, tamanho e o que ela pede para virar.',
    },
    {
      title: 'O berço de fio',
      text: 'Fio de alumínio cortado e curvado à mão — o berço que vai abraçar o cristal.',
    },
    {
      title: 'As voltas, uma a uma',
      text: 'Volta por volta, o fio sobe e trava. É daqui que nasce o desenho — sem molde, só memória de mão.',
    },
    {
      title: 'O fecho & o couro',
      text: 'Cordão de couro, fecho ajustável, polida final. A joia sai da bancada pronta para o seu colo.',
    },
  ],
  complete: 'PEÇA PRONTA ✂',
  glossary: ['volta simples', 'volta trançada', 'espiral', 'argola de couro', 'fecho ajustável', 'berço de fio'],
};

export const quiz = {
  title: 'Com que pedra eu vou?',
  subtitle: '4 perguntas. 1 intenção. A sua pedra.',
  questions: [
    {
      question: 'Como você se sente hoje?',
      options: [
        { text: 'Precisando de proteção', weights: { protecao: 3, equilibrio: 1 } },
        { text: 'Buscando clareza', weights: { clareza: 3, equilibrio: 1 } },
        { text: 'Querendo mais amor', weights: { amor: 3, coragem: 1 } },
        { text: 'Pronta pra prosperar', weights: { prosperidade: 3, coragem: 1 } },
      ],
    },
    {
      question: 'O que você precisa agora?',
      options: [
        { text: 'Firmeza e escudo', weights: { protecao: 3 } },
        { text: 'Foco e paz mental', weights: { clareza: 3 } },
        { text: 'Ternura e acolhimento', weights: { amor: 3 } },
        { text: 'Movimento e abertura', weights: { prosperidade: 3 } },
      ],
    },
    {
      question: 'O que te faz brilhar?',
      options: [
        { text: 'Me sentir segura', weights: { protecao: 2, equilibrio: 2 } },
        { text: 'Entender as coisas', weights: { clareza: 2, coragem: 1 } },
        { text: 'Amar e ser amada', weights: { amor: 3 } },
        { text: 'Conquistar o mundo', weights: { prosperidade: 2, coragem: 2 } },
      ],
    },
    {
      question: 'Para onde você quer ir?',
      options: [
        { text: 'Pra dentro de mim', weights: { equilibrio: 3, amor: 1 } },
        { text: 'Pra um lugar de verdade', weights: { clareza: 2, coragem: 2 } },
        { text: 'Pra perto de quem amo', weights: { amor: 2, protecao: 1 } },
        { text: 'Pra cima — sem parar', weights: { prosperidade: 3 } },
      ],
    },
  ],
};

export const monteSuaJoia = {
  title: 'Monte sua joia',
  subtitle: 'sob medida — do seu jeito',
  pieces: [
    { id: 'pendente', name: 'Pendente', basePrice: 160, desc: 'clássico da bancada' },
    { id: 'colar-pendulo', name: 'Colar pêndulo', basePrice: 180, desc: 'pedra que gira' },
    { id: 'choker', name: 'Choker', basePrice: 140, desc: 'gola de couro e fio' },
    { id: 'brincos', name: 'Brincos', basePrice: 120, desc: 'par leve' },
    { id: 'pulseira', name: 'Pulseira', basePrice: 110, desc: 'fio e fecho ajustável' },
  ],
  wires: [
    { id: 'prateado', name: 'Natural/prateado' },
    { id: 'dourado', name: 'Dourado (latão)' },
    { id: 'grafite', name: 'Grafite' },
    { id: 'colorido', name: 'Colorido (rose/violeta)' },
  ],
  cords: [
    { id: 'couro-caramelo', name: 'Couro caramelo' },
    { id: 'couro-preto', name: 'Couro preto' },
    { id: 'fio-puro', name: 'Fio de alumínio puro' },
    { id: 'corrente', name: 'Corrente (prata)' },
  ],
  extras: [
    { id: 'caixa', name: 'Caixa-presente', price: 25 },
    { id: 'bilhete', name: 'Bilhete escrito à mão', price: 15 },
    { id: 'cordao-reserva', name: 'Cordão reserva', price: 12 },
    { id: 'banho', name: 'Banho de proteção no fio', price: 20 },
  ],
  baseDays: 7,
  extraDaysPerExtra: 2,
  footer: 'valor final confirmado pela Cidinha · 50% na encomenda · fotos da bancada a cada etapa',
};

export const atelier = {
  title: 'Devagar é o nosso ritmo',
  bio: 'Cidinha Ulhoa cria cada peça artesanalmente em Brasília. Com mais de uma década de bancada, já passou pelo Brasília Trends Fashion Week, desfile GBM e exposição internacional IVCBC na Zâmbia. Tudo o que sai daqui passou pelas mãos dela — e pelas suas, quando veste.',
  // TODO(cliente): refinar biografia com a Cidinha
  steps: [
    { number: '01', title: 'A escolha da pedra' },
    { number: '02', title: 'O desenho do fio' },
    { number: '03', title: 'Centenas de voltas' },
    { number: '04', title: 'Fecho & despedida' },
  ],
  label: 'bancada nº 1 · Brasília · DF · visita com hora marcada',
};

export const postais = {
  title: '✳ cartões que chegam pelo correio',
  // TODO(cliente): depoimentos reais
  items: [
    {
      quote: 'Usei no dia mais importante do ano. Recebi mais elogios do que coragem — e a pedra me deu as duas.',
      author: 'Mariana S.',
      city: 'São Paulo, SP',
      piece: 'Pendente Ametista',
    },
    {
      quote: 'A Cidinha entendeu o que eu precisava antes de eu explicar. A joia chegou com um bilhete que me fez chorar.',
      author: 'Juliana R.',
      city: 'Belo Horizonte, MG',
      piece: 'Colar Quartzo Rosa',
    },
    {
      quote: 'Leve, diferente de tudo que já tive. Uso todo dia — e todo dia alguém pergunta onde comprei.',
      author: 'Fernanda L.',
      city: 'Brasília, DF',
      piece: 'Brincos Cristais Naturais',
    },
    {
      quote: 'Presenteei minha mãe. Ela disse que é a primeira joia que parece ela. Eu disse: "mãe, é porque é."',
      author: 'Carla M.',
      city: 'Rio de Janeiro, RJ',
      piece: 'Pulseira Fio & Couro',
    },
  ],
};

export const finale = {
  stanzas: [
    'Há um lugar <em>para o que é natural.</em>',
    'Leve um pouco <em>de brilho.</em>',
  ],
  cta1: 'Encontre a sua pedra ↗',
  cta2: 'Quero uma joia sob medida ↗',
  seal: 'com que pedra eu vou? · joias funcionais',
};

export const footerText = {
  tagline: 'joias funcionais por Cidinha Ulhoa',
  bottomStrip: 'cristais naturais · fio de alumínio · feito devagar — v1.0 · peça nº 2.486',
  copyright: '© 2026 Com Que Pedra Eu Vou? — enrolada com paciência em Brasília por Cidinha Ulhoa',
};
