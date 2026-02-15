import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";

export function Home() {
  return (
    <ThemedView style={styles.container}>
      <Text>Tela Inicial</Text>
      <Text>
        Abra o arquivo 'src/App.tsx' para começar a trabalhar no seu app!
      </Text>

      <Button
        screen="Profile"
        params={{ user: "carlos" }}
        iconLeft={<Icon type="Feather" name="user" usePrimaryColor />}
      >
        Ir para o Perfil
      </Button>

      <Button
        screen="Settings"
        iconRight={
          <Icon type="Ionicons" name="settings-outline" usePrimaryColor />
        }
      >
        Ir para as Configurações
      </Button>
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
