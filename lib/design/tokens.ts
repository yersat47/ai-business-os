export const COLORS = {
  bg: {
    page: "#0A0B0E",
    card: "#13151A",
    cardHover: "#171A20",
    sidebar: "#0F1117",
    elevated: "#1A1D24",
    border: "#22262E",
    borderSubtle: "#1A1D24",
  },
  accent: {
    bronze: "#C9923A",
    bronzeHover: "#D6A04A",
    bronzeMuted: "rgba(201, 146, 58, 0.12)",
    bronzeGlow: "rgba(201, 146, 58, 0.35)",
  },
  text: {
    primary: "#EDEFF3",
    secondary: "#9BA1AC",
    tertiary: "#5E6571",
    inverse: "#0A0B0E",
  },
  semantic: {
    positive: "#3EC78A",
    negative: "#E5614C",
    warning: "#E5B04C",
    info: "#5B9DF9",
  },
  chart: {
    primary: "#C9923A",
    secondary: "#5B9DF9",
    tertiary: "#E5614C",
    grid: "#1F232B",
    gridSubtle: "rgba(255,255,255,0.04)",
  },
} as const;

export const RADIUS = { sm: 8, md: 12, lg: 16, xl: 20, full: 9999 } as const;
export const SPACING_GRID = 4;
