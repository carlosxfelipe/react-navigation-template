import { Text } from "@react-navigation/elements";
import { StyleSheet } from "react-native";

import { ThemedView } from "../../components/ThemedView";

export function Settings() {
  return (
    <ThemedView style={styles.container}>
      <Text>Tela de Configurações</Text>
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
