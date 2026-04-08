import { Button } from "@react-navigation/elements";
import { ThemedText } from "../components/atoms/ThemedText";
import { StyleSheet } from "react-native";
import { ThemedView } from "../components/atoms/ThemedView";

export function NotFound() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>404</ThemedText>
      <Button screen="HomeTabs">Ir para a Tela Inicial</Button>
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
});
