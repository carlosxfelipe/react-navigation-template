import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../themes";
import { ThemedText } from "./ThemedText";

type Props = {
  icon?: (color: string) => React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function InfoCard({ icon, children, style }: Props) {
  const { colors } = useTheme() as AppTheme;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
        style,
      ]}
    >
      {icon && <View style={styles.cardIcon}>{icon(colors.text)}</View>}
      <View style={styles.content}>
        {typeof children === "string" ? (
          <ThemedText style={styles.text}>{children}</ThemedText>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardIcon: {
    marginTop: 2,
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
});
