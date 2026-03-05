import React from "react";
import { useColorScheme } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;
type FeatherIconName = keyof typeof Feather.glyphMap;
type IoniconName = keyof typeof Ionicons.glyphMap;

type BaseIconProps = {
  size?: number;
  color?: string;
  primary?: boolean;
  style?: any;
};

export type IconProps =
  | (BaseIconProps & {
      type: "MaterialIcons";
      name: MaterialIconName;
    })
  | (BaseIconProps & {
      type: "Feather";
      name: FeatherIconName;
    })
  | (BaseIconProps & {
      type: "Ionicons";
      name: IoniconName;
    });

export function Icon({
  type,
  name,
  size = 20,
  color,
  primary,
  style,
}: IconProps) {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  const iconColor =
    color ??
    (primary ? colors.primary : colorScheme === "dark" ? "#fff" : "#000");

  switch (type) {
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={name}
          size={size}
          color={iconColor}
          style={style}
        />
      );
    case "Feather":
      return (
        <Feather name={name} size={size} color={iconColor} style={style} />
      );
    case "Ionicons":
      return (
        <Ionicons name={name} size={size} color={iconColor} style={style} />
      );
    default:
      return null;
  }
}
