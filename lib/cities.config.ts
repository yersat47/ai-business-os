import { getAssetPath } from "@/lib/utils/asset-path";

export interface City {
  id: string;
  name: { ru: string; kk: string; en: string };
  image: string;
  overlayColor: string;
}

export const CITIES: City[] = [
  {
    id: "almaty",
    name: { ru: "Алматы", kk: "Алматы", en: "Almaty" },
    image: getAssetPath("/cities/almaty.png"),
    overlayColor: "rgba(4, 8, 20, 0.35)",
  },
  {
    id: "astana",
    name: { ru: "Астана", kk: "Астана", en: "Astana" },
    image: getAssetPath("/cities/astana.png"),
    overlayColor: "rgba(4, 8, 28, 0.4)",
  },
  {
    id: "shymkent",
    name: { ru: "Шымкент", kk: "Шымкент", en: "Shymkent" },
    image: getAssetPath("/cities/shymkent.png"),
    overlayColor: "rgba(16, 4, 24, 0.35)",
  },
  {
    id: "karaganda",
    name: { ru: "Қарағанды", kk: "Қарағанды", en: "Karaganda" },
    image: getAssetPath("/cities/karaganda.png"),
    overlayColor: "rgba(4, 6, 16, 0.4)",
  },
  {
    id: "aktau",
    name: { ru: "Актау", kk: "Актау", en: "Aktau" },
    image: getAssetPath("/cities/aktau.png"),
    overlayColor: "rgba(4, 12, 20, 0.35)",
  },
  {
    id: "atyrau",
    name: { ru: "Атырау", kk: "Атырау", en: "Atyrau" },
    image: getAssetPath("/cities/atyrau.png"),
    overlayColor: "rgba(16, 8, 4, 0.35)",
  },
];
