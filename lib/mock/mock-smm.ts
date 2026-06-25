import type { SmmAgentOutput } from "@/lib/types/smm.types";

export const SMM_CONTENT_COLORS: Record<string, string> = {
  product: "#C9923A",
  story: "#5A9FD4",
  reel: "#4CAF7D",
  promo: "#E8923A",
};

export const MOCK_SMM_OUTPUT: SmmAgentOutput = {
  content_recommendations: [
    "Усильте контент в середине недели — продажи в будни ниже выходных",
    "Добавьте stories с примеркой 2–3 раза в неделю",
    "Запустите reel с новинками в пятницу перед пиком трафика",
  ],
  posting_schedule: [
    {
      date: "2026-06-02",
      type: "product",
      label: "Новинка лета",
      recommendation: "Карусель из 3 фото: платье + аксессуары. CTA: «Напишите в Direct для размера».",
    },
    {
      date: "2026-06-04",
      type: "story",
      label: "Закулисье",
      recommendation: "Stories: распаковка новой поставки, опрос «какой цвет берём?»",
    },
    {
      date: "2026-06-06",
      type: "reel",
      label: "Примерка пятницы",
      recommendation: "Reel 15 сек: 3 образа на выходные. Хэштеги #алматы #мода",
    },
    {
      date: "2026-06-07",
      type: "promo",
      label: "Выходная акция",
      recommendation: "Пост: -15% на вторую вещь только в субботу. Stories с таймером.",
    },
    {
      date: "2026-06-09",
      type: "product",
      label: "Будний день — look of the day",
      recommendation: "Один сильный образ в ленту + stories с ценой и размерами в наличии.",
    },
    {
      date: "2026-06-12",
      type: "story",
      label: "Отзывы клиентов",
      recommendation: "Репост отзыва + stories «спасибо за покупку» с фото клиента.",
    },
    {
      date: "2026-06-14",
      type: "reel",
      label: "Тренд недели",
      recommendation: "Reel с трендовым звуком: быстрая смена 4–5 SKU.",
    },
    {
      date: "2026-06-15",
      type: "promo",
      label: "Середина месяца",
      recommendation: "Промо на slow-moving SKU: «только 3 дня» в stories и посте.",
    },
    {
      date: "2026-06-18",
      type: "product",
      label: "Коллекция выходного дня",
      recommendation: "Подборка 6 товаров для выходных — карусель + закреп в stories.",
    },
    {
      date: "2026-06-20",
      type: "story",
      label: "До/после витрины",
      recommendation: "Stories: как оформили витрину к выходным.",
    },
    {
      date: "2026-06-22",
      type: "reel",
      label: "Бэкстейдж команды",
      recommendation: "Короткий reel про команду — человеческий контент для доверия.",
    },
    {
      date: "2026-06-25",
      type: "promo",
      label: "Конец месяца",
      recommendation: "Пост + stories: финальная распродажа месяца, дедлайн воскресенье.",
    },
  ],
};
