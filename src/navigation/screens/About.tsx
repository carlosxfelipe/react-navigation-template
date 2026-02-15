import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { Text } from "../../components/Text";

export function About() {
  return (
    <ThemedView style={styles.container}>
      <Text>
        Este projeto é baseado no template oficial do React Navigation:
      </Text>
      <Text>https://github.com/react-navigation/template</Text>
      <Text>
        Nota: este app usa Development Build e não roda no Expo Go por padrão.
      </Text>
      <Text>
        Para usar Expo Go, ajuste o `package.json`: remova `expo-dev-client` e a
        flag `--dev-client` do script `start`.
      </Text>
      <Text>
        Recomendamos manter Development Build no desenvolvimento. As pastas
        `ios/` e `android/` são geradas automaticamente (CNG), por isso o ideal
        é usar config plugins em vez de editar essas pastas diretamente.
      </Text>
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
