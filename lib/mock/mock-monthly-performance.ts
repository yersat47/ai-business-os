export interface MonthlyPerformancePoint {
  period: string;
  current: number;
  target: number;
}

export const mockMonthlyData: MonthlyPerformancePoint[] = [
  { period: "Jan", current: 2100, target: 2800 },
  { period: "Feb", current: 3400, target: 3000 },
  { period: "Mar", current: 2900, target: 3200 },
  { period: "Apr", current: 4200, target: 3500 },
  { period: "May", current: 3800, target: 4000 },
  { period: "Jun", current: 4790, target: 4200 },
  { period: "Jul", current: 4400, target: 4500 },
  { period: "Aug", current: 5200, target: 4800 },
  { period: "Sep", current: 4900, target: 5000 },
  { period: "Oct", current: 5600, target: 5300 },
  { period: "Nov", current: 6100, target: 5600 },
  { period: "Dec", current: 7800, target: 6000 },
];
