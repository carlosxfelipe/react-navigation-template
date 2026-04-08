import { StyleSheet } from "react-native";
import { ThemedText } from "../components/atoms/ThemedText";

import { ThemedView } from "../components/atoms/ThemedView";

export function Settings() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Tela de Configurações</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
