import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";

export function About() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>
        Este projeto é baseado no template oficial do React Navigation:
      </ThemedText>
      <ThemedText>https://github.com/react-navigation/template</ThemedText>
      <ThemedText>
        Nota: este app usa Development Build e não roda no Expo Go por padrão.
      </ThemedText>
      <ThemedText>
        Para usar Expo Go, ajuste o `package.json`: remova `expo-dev-client` e a
        flag `--dev-client` do script `start`.
      </ThemedText>
      <ThemedText>
        Recomendamos manter Development Build no desenvolvimento. As pastas
        `ios/` e `android/` são geradas automaticamente (CNG), por isso o ideal
        é usar config plugins em vez de editar essas pastas diretamente.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
});
