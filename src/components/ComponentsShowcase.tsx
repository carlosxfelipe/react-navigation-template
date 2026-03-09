import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "./Button";
import { PlatformSwitch } from "./PlatformSwitch";
import { Text } from "./Text";

export function ComponentsShowcase() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
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
