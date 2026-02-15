import { Text, Button } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";

export function NotFound() {
  return (
    <ThemedView style={styles.container}>
      <Text>404</Text>
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
