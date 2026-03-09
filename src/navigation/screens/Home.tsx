import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { PlatformSwitch } from "../../components/PlatformSwitch";

export function Home() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

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

      <Text style={styles.sectionTitle}>Demonstração do PlatformSwitch</Text>
      <View style={styles.switchRow}>
        <Text>Notificações</Text>
        <PlatformSwitch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
      <Text>Status: {notificationsEnabled ? "Ativado" : "Desativado"}</Text>

      <View style={styles.switchRow}>
        <Text>Interruptor desabilitado</Text>
        <PlatformSwitch value disabled />
      </View>

      <View style={styles.switchRow}>
        <Text>Cor customizada</Text>
        <PlatformSwitch
          value={marketingEnabled}
          onValueChange={setMarketingEnabled}
          trackColor={{ false: "#D1D5DB", true: "#22C55E" }}
          thumbColor="#FFFFFF"
        />
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
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexButton: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
