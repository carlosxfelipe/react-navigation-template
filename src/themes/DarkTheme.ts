import type { Theme } from "./types";
import { fonts } from "./fonts";

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#0A84FF",
    background: "#010101",
    card: "#121212",
    header: "#121212",
    tabBar: "#121212",
    text: "#E5E5E7",
    border: "#272729",
    notification: "#FF453A",
    placeholder: "#EBEBF599",
    inputBackground: "rgba(255,255,255,0.08)",
  },
  fonts,
};
