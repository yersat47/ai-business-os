import { describe, expect, it } from "vitest";
import { getDayColorStatus } from "@/lib/calendar/daily-sales-status";

describe("getDayColorStatus", () => {
  const avg = 100_000;

  it("returns neutral when no sales data", () => {
    expect(getDayColorStatus(null, avg)).toBe("neutral");
    expect(getDayColorStatus(50_000, 0)).toBe("neutral");
  });

  it("classifies green at >= 110% of average", () => {
    expect(getDayColorStatus(110_000, avg)).toBe("green");
    expect(getDayColorStatus(150_000, avg)).toBe("green");
  });

  it("classifies amber between 70% and 110%", () => {
    expect(getDayColorStatus(80_000, avg)).toBe("amber");
    expect(getDayColorStatus(109_000, avg)).toBe("amber");
  });

  it("classifies red below 70%", () => {
    expect(getDayColorStatus(69_000, avg)).toBe("red");
    expect(getDayColorStatus(10_000, avg)).toBe("red");
  });
});
