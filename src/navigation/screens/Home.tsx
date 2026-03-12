import { StyleSheet } from "react-native";
import { ThemedScrollView } from "../../components/ThemedScrollView";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { ComponentsShowcase } from "../../components/ComponentsShowcase";

export function Home() {
  return (
    <ThemedScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>Tela Inicial</Text>
      <Text>
        Abra o arquivo 'src/App.tsx' para começar a trabalhar no seu app!
      </Text>

      <Button
        screen="Profile"
        params={{ user: "carlos" }}
        iconLeft={<Icon type="Feather" name="user" primary />}
      >
        Ir para o Perfil
      </Button>

      <Button
        screen="Settings"
        iconRight={<Icon type="Ionicons" name="settings-outline" primary />}
      >
        Ir para as Configurações
      </Button>

      <ComponentsShowcase />
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    gap: 10,
  },
});
