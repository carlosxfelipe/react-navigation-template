import { StyleSheet, View } from "react-native";
import { HeroScrollView } from "../components/HeroScrollView";
import { ThemedText } from "../components/ThemedText";
import { ComponentsShowcase } from "../components/ComponentsShowcase";

export function HomeHero() {
  return (
    <HeroScrollView
      header={
        <View style={styles.headerContent}>
          <ThemedText style={styles.title}>Olá, Carlos</ThemedText>
          <ThemedText style={styles.subtitle}>Bem-vindo ao seu app!</ThemedText>
        </View>
      }
    >
      <ComponentsShowcase />
    </HeroScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 34,
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    color: "#FFFFFF",
    opacity: 0.85,
  },
});
