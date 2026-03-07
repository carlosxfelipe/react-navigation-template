import type { Theme } from "./types";
import { fonts } from "./fonts";

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: "#007AFF",
    background: "#F2F2F2",
    card: "#FFFFFF",
    header: "#FFFFFF",
    tabBar: "#FFFFFF",
    text: "#1C1C1E",
    border: "#D8D8D8",
    notification: "#FF3B30",
  },
  fonts,
};
