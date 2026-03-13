import React from "react";
import { useColorScheme } from "react-native";
import type { StyleProp, TextStyle } from "react-native";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;
type FeatherIconName = keyof typeof Feather.glyphMap;
type IoniconName = keyof typeof Ionicons.glyphMap;
type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

type BaseIconProps = {
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
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
    })
  | (BaseIconProps & {
      type: "MaterialCommunityIcons";
      name: MaterialCommunityIconName;
    });

export function Icon({ type, name, size = 20, color, style }: IconProps) {
  const colorScheme = useColorScheme();

  const iconColor = color ?? (colorScheme === "dark" ? "#fff" : "#000");

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
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={iconColor}
          style={style}
        />
      );
    default:
      return null;
  }
}
