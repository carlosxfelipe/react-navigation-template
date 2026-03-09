import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../themes";

export function ThemedView(props: ViewProps) {
  const { colors } = useTheme() as AppTheme;
  const backgroundColor = colors.background;

  return <View {...props} style={[{ backgroundColor }, props.style]} />;
}
