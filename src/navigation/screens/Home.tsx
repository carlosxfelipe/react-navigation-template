import { StyleSheet, View } from "react-native";
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

      <Text style={styles.sectionTitle}>Formatos (Shapes)</Text>
      <View style={styles.row}>
        <Button shape="pill" style={styles.flexButton}>
          Pill
        </Button>
        <Button shape="rounded" style={styles.flexButton}>
          Rounded
        </Button>
        <Button shape="sharp" style={styles.flexButton}>
          Sharp
        </Button>
      </View>

      <Text style={styles.sectionTitle}>Variantes (Variants)</Text>
      <View style={styles.row}>
        <Button variant="tinted" style={styles.flexButton}>
          Tinted
        </Button>
        <Button variant="filled" style={styles.flexButton}>
          Filled
        </Button>
        <Button variant="plain" style={styles.flexButton}>
          Plain
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  sectionTitle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  flexButton: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
