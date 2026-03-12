import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "./Button";
import { PlatformSwitch } from "./PlatformSwitch";
import { Skeleton } from "./Skeleton";
import { ThemedText } from "./ThemedText";

export function ComponentsShowcase() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  return (
    <>
      <ThemedText style={styles.sectionTitle}>Botões</ThemedText>
      <ThemedText style={styles.subSectionTitle}>Formatos</ThemedText>
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

      <ThemedText style={styles.subSectionTitle}>Variantes</ThemedText>
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

      <ThemedText style={styles.sectionTitle}>
        Switches (Interruptores)
      </ThemedText>
      <View style={styles.switchRow}>
        <ThemedText>Notificações</ThemedText>
        <PlatformSwitch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
      <ThemedText>
        Status: {notificationsEnabled ? "Ativado" : "Desativado"}
      </ThemedText>

      <View style={styles.switchRow}>
        <ThemedText>Interruptor desabilitado</ThemedText>
        <PlatformSwitch value disabled />
      </View>

      <View style={styles.switchRow}>
        <ThemedText>Cor customizada</ThemedText>
        <PlatformSwitch
          value={marketingEnabled}
          onValueChange={setMarketingEnabled}
          trackColor={{ false: "#D1D5DB", true: "#22C55E" }}
          thumbColor="#FFFFFF"
        />
      </View>

      <ThemedText style={styles.sectionTitle}>
        Skeletons (Carregamento)
      </ThemedText>
      <View style={styles.skeletonContainer}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <Skeleton width={50} height={50} borderRadius={25} />
          <View style={{ gap: 8, flex: 1 }}>
            <Skeleton width="70%" height={20} borderRadius={4} />
            <Skeleton width="40%" height={16} borderRadius={4} />
          </View>
        </View>
        <Skeleton width="100%" height={120} borderRadius={8} />
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
  subSectionTitle: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    opacity: 0.7,
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
  skeletonContainer: {
    gap: 16,
    marginTop: 10,
  },
});
