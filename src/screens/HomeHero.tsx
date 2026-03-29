import { StyleSheet, View } from "react-native";
import { HeroScrollView } from "../components/HeroScrollView";
import { ThemedText } from "../components/ThemedText";
import { ContrastText } from "../components/ContrastText";
import { ComponentsShowcase } from "../components/ComponentsShowcase";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../themes";

export function HomeHero() {
  const { colors } = useTheme() as AppTheme;

  return (
    <HeroScrollView
      headerHeight={138}
      header={
        <View style={styles.headerContent}>
          <ContrastText style={styles.title} backgroundColor={colors.primary}>Olá, Carlos</ContrastText>
          <ContrastText style={styles.subtitle} backgroundColor={colors.primary}>Bem-vindo ao seu app!</ContrastText>
        </View>
      }
    >
      <View
        style={[
          styles.overlapCard,
          { backgroundColor: colors.card, shadowColor: colors.text },
        ]}
      >
        <ThemedText style={styles.cardLabel}>Saldo em conta</ThemedText>
        <ThemedText style={styles.cardValue}>R$ 5.432,10</ThemedText>
      </View>

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
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    opacity: 0.85,
  },
  overlapCard: {
    height: 100,
    marginTop: -70, // -20px para anular o padding do body + -50px para invadir o azul
    marginBottom: 10,
    borderRadius: 16,
    padding: 20,
    justifyContent: "center",
    // Sombras
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
