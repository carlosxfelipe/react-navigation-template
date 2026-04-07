import React from "react";
import { StatusBar } from "react-native";

type Props = {
  dark: boolean;
};

export function ThemedStatusBar({ dark }: Props) {
  return (
    <StatusBar
      barStyle={dark ? "light-content" : "dark-content"}
      backgroundColor="transparent"
      translucent
    />
  );
}
