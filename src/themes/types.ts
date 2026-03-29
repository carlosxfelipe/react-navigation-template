export type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type FontStyle = {
  fontFamily: string;
  fontWeight: FontWeight;
};

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    header: string;
    tabBar: string;
    text: string;
    border: string;
    cardBorder: string;
    notification: string;
    placeholder: string;
    inputBackground: string;
  };
  fonts: {
    regular: FontStyle;
    medium: FontStyle;
    bold: FontStyle;
    heavy: FontStyle;
  };
};
