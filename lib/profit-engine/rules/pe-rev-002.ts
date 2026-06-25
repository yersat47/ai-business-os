import type { ProfitEngineRule } from "@/lib/profit-engine/types";
import {
  weekendRevenueSharePct,
  weekdayWeekendTotal,
} from "@/lib/profit-engine/formulas";

export const PE_REV_002: ProfitEngineRule = {
  id: "PE-REV-002",
  name: "Weekend Revenue Dependency",
  requiredInputs: ["weekday_revenue", "weekend_revenue"],
  assignedAgent: "analyst",
  detect: (m, b) => {
    const share = weekendRevenueSharePct(m);
    return share !== null && share > b.weekendRevenueSharePct;
  },
  calculateImpact: (m, b) => {
    const total = weekdayWeekendTotal(m) ?? 0;
    const share = weekendRevenueSharePct(m) ?? 0;
    const excessShare = Math.max(0, (share - b.weekendRevenueSharePct) / 100);
    return Math.round(total * excessShare * 0.25);
  },
  getRootCauses: () => [
    "Основной трафик сосредоточен в пятницу–воскресенье",
    "Слабые продажи в будние дни",
    "Бизнес уязвим к погоде и событиям в выходные",
  ],
  getRecommendations: () => [
    "Запустите акции в середине недели для выравнивания продаж",
    "Протестируйте дневные скидки по вторникам и средам",
    "Усильте контент и рассылки в будние дни",
  ],
};
