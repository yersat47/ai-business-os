import type { BusinessSegment } from "@/lib/stores/onboarding.store";
import type { BusinessTypeKey } from "@/lib/utils/wizard-helpers";

export const SEGMENT_TO_BUSINESS_TYPE: Record<BusinessSegment, BusinessTypeKey> = {
  fashion_retail: "fashionRetail",
};

export function businessTypeFromSegment(
  segment: BusinessSegment | null
): BusinessTypeKey | "" {
  if (!segment) return "";
  return SEGMENT_TO_BUSINESS_TYPE[segment] ?? "";
}
