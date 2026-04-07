import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../../themes";

export function ThemedScrollView(props: ScrollViewProps) {
  const { colors } = useTheme() as AppTheme;
  const backgroundColor = colors.background;

  return <ScrollView {...props} style={[{ backgroundColor }, props.style]} />;
}
