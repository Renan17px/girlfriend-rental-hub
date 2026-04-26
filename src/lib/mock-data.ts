export type FeaturedProfile = {
  id: string;
  name: string;
  age: number;
  city: string;
  state: string;
  rating: number;
  verified: boolean;
  online: boolean;
  tags: string[];
  image: string;
  category: "Perto de voce" | "Mais avaliadas" | "Novidades";
};

export type SearchProfile = FeaturedProfile & {
  heightCm: number;
  photosCount: number;
  distanceKm: number;
  createdAt: string;
};

export const featuredProfiles: FeaturedProfile[] = [
  {
    id: "ana-lima",
    name: "Ana Lima",
    age: 24,
    city: "Sao Paulo",
    state: "SP",
    rating: 4.9,
    verified: true,
    online: true,
    tags: ["Cinema", "Viagens", "Gastronomia"],
    image:
      "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?auto=format&fit=crop&w=1200&q=80",
    category: "Perto de voce",
  },
  {
    id: "isabela-costa",
    name: "Isabela Costa",
    age: 27,
    city: "Curitiba",
    state: "PR",
    rating: 5.0,
    verified: true,
    online: false,
    tags: ["Arte", "Leitura", "Cafe"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    category: "Mais avaliadas",
  },
  {
    id: "beatriz-rocha",
    name: "Beatriz Rocha",
    age: 22,
    city: "Belo Horizonte",
    state: "MG",
    rating: 4.8,
    verified: false,
    online: true,
    tags: ["Musica", "Yoga", "Series"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    category: "Novidades",
  },
  {
    id: "camila-sousa",
    name: "Camila Sousa",
    age: 29,
    city: "Recife",
    state: "PE",
    rating: 4.7,
    verified: true,
    online: true,
    tags: ["Culinaria", "Praia", "Danca"],
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    category: "Perto de voce",
  },
  {
    id: "lara-ribeiro",
    name: "Lara Ribeiro",
    age: 25,
    city: "Porto Alegre",
    state: "RS",
    rating: 4.9,
    verified: true,
    online: false,
    tags: ["Games", "Cinema", "Esportes"],
    image:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=1200&q=80",
    category: "Mais avaliadas",
  },
  {
    id: "julia-mendes",
    name: "Julia Mendes",
    age: 23,
    city: "Florianopolis",
    state: "SC",
    rating: 4.6,
    verified: false,
    online: true,
    tags: ["Yoga", "Viagens", "Fotografia"],
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    category: "Novidades",
  },
];

export const hobbiesList = [
  "Arte",
  "Musica",
  "Games",
  "Viagens",
  "Esportes",
  "Culinaria",
  "Leitura",
  "Cinema",
  "Yoga",
  "Danca",
  "Fotografia",
];

export const brazilStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export const citiesByState: Record<string, string[]> = {
  SP: ["Sao Paulo", "Campinas", "Santos", "Sao Jose dos Campos"],
  RJ: ["Rio de Janeiro", "Niteroi", "Petropolis", "Buzios"],
  MG: ["Belo Horizonte", "Uberlandia", "Ouro Preto", "Juiz de Fora"],
  PR: ["Curitiba", "Londrina", "Maringa", "Foz do Iguacu"],
  SC: ["Florianopolis", "Joinville", "Blumenau", "Balneario Camboriu"],
  RS: ["Porto Alegre", "Caxias do Sul", "Gramado", "Pelotas"],
  PE: ["Recife", "Olinda", "Caruaru", "Porto de Galinhas"],
  BA: ["Salvador", "Feira de Santana", "Ilheus", "Porto Seguro"],
  CE: ["Fortaleza", "Juazeiro do Norte", "Sobral", "Jericoacoara"],
  DF: ["Brasilia", "Taguatinga", "Ceilandia", "Gama"],
};

export const searchProfiles: SearchProfile[] = [
  {
    ...featuredProfiles[0],
    heightCm: 168,
    photosCount: 8,
    distanceKm: 9,
    createdAt: "2026-04-10T12:00:00.000Z",
  },
  {
    ...featuredProfiles[1],
    heightCm: 170,
    photosCount: 10,
    distanceKm: 42,
    createdAt: "2026-03-28T12:00:00.000Z",
  },
  {
    ...featuredProfiles[2],
    heightCm: 163,
    photosCount: 5,
    distanceKm: 15,
    createdAt: "2026-04-22T12:00:00.000Z",
  },
  {
    ...featuredProfiles[3],
    heightCm: 172,
    photosCount: 7,
    distanceKm: 12,
    createdAt: "2026-04-16T12:00:00.000Z",
  },
  {
    ...featuredProfiles[4],
    heightCm: 166,
    photosCount: 9,
    distanceKm: 27,
    createdAt: "2026-03-19T12:00:00.000Z",
  },
  {
    ...featuredProfiles[5],
    heightCm: 160,
    photosCount: 4,
    distanceKm: 18,
    createdAt: "2026-04-24T12:00:00.000Z",
  },
  {
    id: "sofia-alves",
    name: "Sofia Alves",
    age: 31,
    city: "Rio de Janeiro",
    state: "RJ",
    rating: 4.9,
    verified: true,
    online: true,
    tags: ["Arte", "Viagens", "Leitura"],
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80",
    category: "Mais avaliadas",
    heightCm: 174,
    photosCount: 10,
    distanceKm: 36,
    createdAt: "2026-04-01T12:00:00.000Z",
  },
  {
    id: "renata-dias",
    name: "Renata Dias",
    age: 26,
    city: "Sao Paulo",
    state: "SP",
    rating: 4.7,
    verified: false,
    online: false,
    tags: ["Games", "Cinema", "Culinaria"],
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    category: "Novidades",
    heightCm: 158,
    photosCount: 3,
    distanceKm: 7,
    createdAt: "2026-04-23T12:00:00.000Z",
  },
  {
    id: "gabriela-pires",
    name: "Gabriela Pires",
    age: 28,
    city: "Curitiba",
    state: "PR",
    rating: 4.8,
    verified: true,
    online: true,
    tags: ["Musica", "Yoga", "Esportes"],
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80",
    category: "Perto de voce",
    heightCm: 169,
    photosCount: 6,
    distanceKm: 55,
    createdAt: "2026-04-05T12:00:00.000Z",
  },
];

export const platformStats = [
  { label: "Perfis ativos", value: "18.400+" },
  { label: "Perfis verificados", value: "82%" },
  { label: "Avaliacao media", value: "4,8/5" },
  { label: "Cidades atendidas", value: "320+" },
];

export const testimonials = [
  {
    author: "Marcos, 33",
    text: "A plataforma e elegante, segura e muito facil de usar. Tive uma experiencia excelente desde o primeiro contato.",
  },
  {
    author: "Fernanda, 26",
    text: "O processo de verificacao passa confianca para todo mundo. Meu perfil ganhou visibilidade rapidamente.",
  },
  {
    author: "Eduardo, 29",
    text: "Consegui encontrar companhia para eventos e viagens com muito mais praticidade e transparencia.",
  },
];

export const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    description: "Ideal para explorar a plataforma.",
    features: ["Visualizar perfis", "3 mensagens por dia", "Favoritar ate 10 perfis"],
    highlight: false,
  },
  {
    name: "Basico",
    price: "R$ 29,90/mes",
    description: "Para conversar sem limites e conhecer mais pessoas.",
    features: [
      "Mensagens ilimitadas",
      "Visualizar ate 50 perfis por dia",
      "Suporte prioritario",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "R$ 79,90/mes",
    description: "A experiencia completa para conexoes exclusivas.",
    features: [
      "Tudo ilimitado",
      "Destaque na busca",
      "Badge especial + trial de 7 dias",
    ],
    highlight: true,
  },
];
