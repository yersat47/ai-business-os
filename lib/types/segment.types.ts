import type { LucideIcon } from "lucide-react";
import {
  Shirt,
  Scissors,
  UtensilsCrossed,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export type SegmentId =
  | "fashion_retail"
  | "beauty"
  | "restaurants"
  | "services"
  | "ecommerce";

export type SegmentStatus = "active" | "coming_soon";

export interface BusinessSegmentConfig {
  id: SegmentId;
  title: string;
  titleKk: string;
  description: string;
  icon: LucideIcon;
  status: SegmentStatus;
  eta?: string;
}

export const SEGMENTS: BusinessSegmentConfig[] = [
  {
    id: "fashion_retail",
    title: "Магазины одежды",
    titleKk: "Киім дүкендері",
    description: "Бутики, Instagram-магазины, мульти-брендовые точки",
    icon: Shirt,
    status: "active",
  },
  {
    id: "beauty",
    title: "Салоны красоты",
    titleKk: "Сұлулық салондары",
    description: "Парикмахерские, ногтевые студии, косметология",
    icon: Scissors,
    status: "coming_soon",
    eta: "Q3 2026",
  },
  {
    id: "restaurants",
    title: "Рестораны и кафе",
    titleKk: "Мейрамханалар",
    description: "Кофейни, ресторанчики, доставка",
    icon: UtensilsCrossed,
    status: "coming_soon",
    eta: "Q4 2026",
  },
  {
    id: "services",
    title: "Услуги",
    titleKk: "Қызметтер",
    description: "Массаж, фитнес, образование, ремонт",
    icon: Sparkles,
    status: "coming_soon",
    eta: "Q4 2026",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    titleKk: "Электрондық сауда",
    description: "Чистые онлайн-магазины без физических точек",
    icon: ShoppingBag,
    status: "coming_soon",
    eta: "Q1 2027",
  },
];
