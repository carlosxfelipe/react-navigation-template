import { Text as NativeText, type TextProps } from "react-native";
import { useTheme } from "@react-navigation/native";

export function ThemedText({ style, ...rest }: TextProps) {
  const { colors, fonts } = useTheme();

  return (
    <NativeText
      {...rest}
      style={[
        {
          color: colors.text,
          fontSize: 16,
          lineHeight: 24,
        },
        fonts.regular,
        style,
      ]}
    />
  );
}
