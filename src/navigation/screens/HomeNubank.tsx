import { StyleSheet, View } from "react-native";
import { LargeHeader } from "../../components/LargeHeader";
import { ThemedText } from "../../components/ThemedText";
import { ComponentsShowcase } from "../../components/ComponentsShowcase";

export function HomeNubank() {
  return (
    <LargeHeader
      header={
        <View style={styles.headerContent}>
          <ThemedText style={styles.title}>Olá, Carlos</ThemedText>
          <ThemedText style={styles.subtitle}>Bem-vindo ao seu app!</ThemedText>
        </View>
      }
    >
      <ComponentsShowcase />
    </LargeHeader>
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
