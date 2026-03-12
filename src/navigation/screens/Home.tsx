import { StyleSheet } from "react-native";
import { ThemedScrollView } from "../../components/ThemedScrollView";
import { ThemedText } from "../../components/ThemedText";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { ComponentsShowcase } from "../../components/ComponentsShowcase";

export function Home() {
  return (
    <ThemedScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ThemedText>Tela Inicial</ThemedText>
      <ThemedText>
        Abra o arquivo 'src/App.tsx' para começar a trabalhar no seu app!
      </ThemedText>

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
