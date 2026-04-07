import { useMemo } from "react";
import { Text as NativeText, type TextProps } from "react-native";
import { useTheme } from "@react-navigation/native";

export interface ContrastTextProps extends TextProps {
  /**
   * Cor de fundo que o componente de texto está inserido.
   * O texto decidirá entre ser claro ou escuro dependendo dessa cor.
   * Aceita HEX (#FFF), HEX duplo (#FFFFFF) e RGB/RGBA (rgb(255, 255, 255)).
   */
  backgroundColor: string;
  /** Cor customizada para fundos escuros. Padrão: Branca (#FFFFFF) */
  lightColor?: string;
  /** Cor customizada para fundos claros. Padrão: Escura (#121212) */
  darkColor?: string;
}

export function ContrastText({
  style,
  backgroundColor,
  lightColor = "#FFFFFF",
  darkColor = "#121212",
  ...rest
}: ContrastTextProps) {
  const { fonts } = useTheme();

  const textColor = useMemo(() => {
    try {
      let isLightBg = true;
      let hex = backgroundColor.trim().toLowerCase();

      // Caso seja rgb ou rgba (ex: rgb(255, 255, 255))
      if (hex.startsWith("rgb")) {
        const rgbValues = hex.match(/\d+/g);
        if (rgbValues && rgbValues.length >= 3) {
          const r = parseInt(rgbValues[0], 10);
          const g = parseInt(rgbValues[1], 10);
          const b = parseInt(rgbValues[2], 10);
          // Fórmula de luminância aparente (W3C / YIQ)
          const luminance = (r * 299 + g * 587 + b * 114) / 1000;
          isLightBg = luminance > 128;
          return isLightBg ? darkColor : lightColor;
        }
      }

      // Tratamento para Hexadecimal
      hex = hex.replace("#", "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }

      if (hex.length === 6 || hex.length === 8) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        const luminance = (r * 299 + g * 587 + b * 114) / 1000;
        isLightBg = luminance > 128;
        return isLightBg ? darkColor : lightColor;
      }

      // Caso ocorra algum fallback por cor não reconhecida
      return darkColor;
    } catch {
      return darkColor;
    }
  }, [backgroundColor, lightColor, darkColor]);

  return (
    <NativeText
      {...rest}
      style={[
        {
          color: textColor,
          fontSize: 16,
          lineHeight: 24,
        },
        fonts.regular,
        style,
      ]}
    />
  );
}
