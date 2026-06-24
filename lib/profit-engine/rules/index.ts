import type { ProfitEngineRule } from "@/lib/profit-engine/types";
import {
  grossMarginPct,
  repeatCustomerRate,
  revenueGrowthMom,
  cac,
  roas,
  deadStockPct,
  cashReserveMonths,
} from "@/lib/profit-engine/formulas";

export const PE_REV_001: ProfitEngineRule = {
  id: "PE-REV-001",
  name: "Revenue Decline Detection",
  requiredInputs: ["monthly_revenue", "revenue_prior_month"],
  assignedAgent: "analyst",
  detect: (m, b) => {
    const growth = revenueGrowthMom(m);
    return growth !== null && growth < -b.revenueGrowthMom;
  },
  calculateImpact: (m) => {
    const current = m.monthly_revenue ?? 0;
    const prior = m.revenue_prior_month ?? 0;
    return Math.max(0, prior - current);
  },
  getRootCauses: () => [
    "Снижение трафика или конверсии",
    "Сезонный спад спроса",
    "Потеря ключевых SKU или поставщика",
  ],
  getRecommendations: () => [
    "Проведите акцию для возврата клиентов",
    "Проанализируйте топ-10 SKU по падению продаж",
    "Усильте рекламу в каналах с лучшим ROAS",
  ],
};

export const PE_RET_001: ProfitEngineRule = {
  id: "PE-RET-001",
  name: "Low Repeat Customer Rate",
  requiredInputs: ["repeat_customers", "new_customers_monthly"],
  assignedAgent: "marketer",
  detect: (m, b) => {
    const rate = repeatCustomerRate(m);
    return rate !== null && rate < b.repeatCustomerRate;
  },
  calculateImpact: (m, b) => {
    const revenue = m.monthly_revenue ?? 0;
    const rate = repeatCustomerRate(m) ?? 0;
    const gap = (b.repeatCustomerRate - rate) / 100;
    return Math.round(revenue * gap * 0.15);
  },
  getRootCauses: () => [
    "Слабая программа лояльности",
    "Низкое качество post-purchase коммуникации",
    "Недостаточный ассортимент для повторных покупок",
  ],
  getRecommendations: () => [
    "Запустите реферальную программу",
    "Настройте email/SMS для повторных покупок",
    "Введите бонусы за 2-ю покупку в течение 30 дней",
  ],
};

export const PE_MKT_001: ProfitEngineRule = {
  id: "PE-MKT-001",
  name: "High Customer Acquisition Cost",
  requiredInputs: ["marketing_spend", "new_customers_monthly"],
  assignedAgent: "marketer",
  detect: (m, b) => {
    const value = cac(m);
    return value !== null && value > b.cac * 1.2;
  },
  calculateImpact: (m, b) => {
    const currentCac = cac(m) ?? 0;
    const newCust = m.new_customers_monthly ?? 0;
    const excess = Math.max(0, currentCac - b.cac);
    return Math.round(excess * newCust);
  },
  getRootCauses: () => [
    "Неэффективные рекламные каналы",
    "Слабая конверсия лендинга",
    "Высокая конкуренция в таргете",
  ],
  getRecommendations: () => [
    "Перераспределите бюджет в каналы с лучшим ROAS",
    "Оптимизируйте креативы и аудитории",
    "Запустите органический контент для снижения CAC",
  ],
};

export const PE_INV_001: ProfitEngineRule = {
  id: "PE-INV-001",
  name: "Dead Stock Accumulation",
  requiredInputs: ["dead_stock_value", "total_inventory_value"],
  assignedAgent: "manager",
  detect: (m, b) => {
    const pct = deadStockPct(m);
    return pct !== null && pct > b.deadStockPct;
  },
  calculateImpact: (m) => Math.round((m.dead_stock_value ?? 0) * 0.35),
  getRootCauses: () => [
    "Переизбыток закупок по медленным SKU",
    "Неверный прогноз спроса",
    "Отсутствие clearance-политики",
  ],
  getRecommendations: () => [
    "Запустите 30-дневную распродажу неликвида",
    "Создайте бандлы со slow-moving товарами",
    "Ограничьте повторный заказ проблемных SKU",
  ],
};

export const PE_FIN_001: ProfitEngineRule = {
  id: "PE-FIN-001",
  name: "Low Gross Margin",
  requiredInputs: ["monthly_revenue", "cogs"],
  assignedAgent: "accountant",
  detect: (m, b) => {
    const gm = grossMarginPct(m);
    return gm !== null && gm < b.grossMarginPct - 5;
  },
  calculateImpact: (m, b) => {
    const revenue = m.monthly_revenue ?? 0;
    const gm = grossMarginPct(m) ?? 0;
    const gap = (b.grossMarginPct - gm) / 100;
    return Math.round(revenue * gap);
  },
  getRootCauses: () => [
    "Высокая себестоимость закупки",
    "Чрезмерные скидки",
    "Низкая доля маржинальных SKU в продажах",
  ],
  getRecommendations: () => [
    "Пересмотрите условия с поставщиками",
    "Сфокусируйте продажи на high-margin коллекциях",
    "Сократите глубину скидок на новинки",
  ],
};

export const PE_MRG_001: ProfitEngineRule = {
  id: "PE-MRG-001",
  name: "Marketing Waste (Low ROAS)",
  requiredInputs: ["marketing_spend", "ad_revenue"],
  assignedAgent: "marketer",
  detect: (m, b) => {
    const value = roas(m);
    return value !== null && value < b.roas * 0.8;
  },
  calculateImpact: (m) => {
    const spend = m.marketing_spend ?? 0;
    const adRev = m.ad_revenue ?? 0;
    return Math.round(Math.max(0, spend - adRev));
  },
  getRootCauses: () => [
    "Неоптимальные рекламные кампании",
    "Низкая конверсия рекламного трафика",
    "Неверный выбор каналов",
  ],
  getRecommendations: () => [
    "Остановите кампании с ROAS ниже 2x",
    "Протестируйте новые креативы",
    "Перенаправьте бюджет в ретаргетинг",
  ],
};

export const PE_CASH_001: ProfitEngineRule = {
  id: "PE-CASH-001",
  name: "Low Cash Reserve",
  requiredInputs: ["cash_on_hand", "monthly_expenses"],
  assignedAgent: "accountant",
  detect: (m, b) => {
    const months = cashReserveMonths(m);
    return months !== null && months < b.cashReserveMonths;
  },
  calculateImpact: (m, b) => {
    const expenses = m.monthly_expenses ?? 0;
    const cash = m.cash_on_hand ?? 0;
    const target = expenses * b.cashReserveMonths;
    return Math.round(Math.max(0, target - cash));
  },
  getRootCauses: () => [
    "Высокие операционные расходы",
    "Замороженный капитал в складе",
    "Задержки поступлений от маркетплейсов",
  ],
  getRecommendations: () => [
    "Ускорьте оборот неликвида",
    "Сократите необязательные расходы",
    "Пересмотрите график закупок",
  ],
};

export const ALL_PROFIT_RULES: ProfitEngineRule[] = [
  PE_REV_001,
  PE_RET_001,
  PE_MKT_001,
  PE_INV_001,
  PE_FIN_001,
  PE_MRG_001,
  PE_CASH_001,
];
