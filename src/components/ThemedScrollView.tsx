import React from "react";
import { ScrollView, useColorScheme, ScrollViewProps } from "react-native";

export function ThemedScrollView(props: ScrollViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000" : "#fff";
  return <ScrollView {...props} style={[props.style, { backgroundColor }]} />;
}
