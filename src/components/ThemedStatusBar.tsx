import React from "react";
import { StatusBar, useColorScheme } from "react-native";

export function ThemedStatusBar() {
  const colorScheme = useColorScheme();
  return (
    <StatusBar
      barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      backgroundColor="transparent"
      translucent
    />
  );
}
