import { useEffect } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused, useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../themes";
import { ThemedText } from "./ThemedText";

const LARGE_HEADER_HEIGHT = 88;

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const LargeHeader = ({ title, subtitle, children }: Props) => {
  const { colors, dark } = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle("light-content", true);
    } else {
      StatusBar.setBarStyle(dark ? "light-content" : "dark-content", true);
    }
  }, [dark, isFocused]);

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.statusBarStrip,
          { height: insets.top, backgroundColor: colors.primary },
        ]}
      />

      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.header,
            {
              marginTop: -1000,
              paddingTop: 1000 + insets.top + 16,
              height: 1000 + insets.top + LARGE_HEADER_HEIGHT,
              backgroundColor: colors.primary,
            },
          ]}
        >
          <ThemedText style={[styles.title, { color: "#FFFFFF" }]}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText style={[styles.subtitle, { color: "#FFFFFF" }]}>
              {subtitle}
            </ThemedText>
          )}
        </View>

        <View style={styles.body}>{children}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  statusBarStrip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "flex-end",
    gap: 4,
  },
  body: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    opacity: 0.85,
  },
});
