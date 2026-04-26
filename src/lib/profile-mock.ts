import { searchProfiles } from "@/lib/mock-data";

export type Review = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type WeeklyAvailability = {
  day: string;
  slots: string[];
};

export type ProfileDetails = {
  id: string;
  name: string;
  age: number;
  city: string;
  state: string;
  image: string;
  gallery: string[];
  bio: string;
  verified: boolean;
  online: boolean;
  rating: number;
  reviewsCount: number;
  hobbies: string[];
  heightCm: number;
  zodiac: string;
  languages: string[];
  availability: WeeklyAvailability[];
  neighborhood: string;
  reviews: Review[];
};

const extraImages = [
  "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=1400&q=80",
];

const zodiacs = ["Aries", "Touro", "Gemeos", "Cancer", "Leao", "Virgem", "Libra"];
const neighborhoods = [
  "Jardins",
  "Batel",
  "Boa Viagem",
  "Centro",
  "Savassi",
  "Lago Sul",
];

const defaultAvailability: WeeklyAvailability[] = [
  { day: "Segunda", slots: ["18:00 - 22:00"] },
  { day: "Terca", slots: ["19:00 - 23:00"] },
  { day: "Quinta", slots: ["14:00 - 18:00", "20:00 - 23:30"] },
  { day: "Sexta", slots: ["20:00 - 02:00"] },
  { day: "Sabado", slots: ["15:00 - 01:00"] },
];

function makeReviews(name: string): Review[] {
  return [
    {
      author: "Cliente verificado",
      rating: 5,
      text: `Experiencia excelente com ${name}. Conversa leve, atencao aos detalhes e pontualidade impecavel.`,
      date: "ha 3 dias",
    },
    {
      author: "Usuario Premium",
      rating: 5,
      text: "Perfil confiavel, fotos reais e comunicacao muito clara no chat interno.",
      date: "ha 1 semana",
    },
    {
      author: "Carlos, 34",
      rating: 4,
      text: "Encontro super agradavel e respeitoso. Recomendo para quem busca companhia elegante.",
      date: "ha 2 semanas",
    },
  ];
}

export const profileDetailsById: Record<string, ProfileDetails> = Object.fromEntries(
  searchProfiles.map((profile, index) => {
    const languages = index % 2 === 0 ? ["Portugues", "Ingles"] : ["Portugues", "Espanhol"];
    const entry: ProfileDetails = {
      id: profile.id,
      name: profile.name,
      age: profile.age,
      city: profile.city,
      state: profile.state,
      image: profile.image,
      gallery: [profile.image, ...extraImages].slice(0, Math.min(profile.photosCount, 4)),
      bio: "Amo boas conversas, experiencias culturais e conexoes com respeito. Gosto de encontros com autenticidade, leveza e momentos especiais.",
      verified: profile.verified,
      online: profile.online,
      rating: profile.rating,
      reviewsCount: Math.round(profile.rating * 37),
      hobbies: profile.tags,
      heightCm: profile.heightCm,
      zodiac: zodiacs[index % zodiacs.length],
      languages,
      availability: defaultAvailability,
      neighborhood: neighborhoods[index % neighborhoods.length],
      reviews: makeReviews(profile.name),
    };

    return [profile.id, entry];
  }),
);

export function getProfileDetails(profileId: string) {
  return profileDetailsById[profileId] ?? null;
}
