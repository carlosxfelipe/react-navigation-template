import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { DateInput } from "./DateInput";
import { PlatformSwitch } from "./PlatformSwitch";
import { FloatingSearchAppBar } from "./FloatingSearchAppBar";
import { Skeleton } from "./Skeleton";
import { FloatingAppBar } from "./FloatingAppBar";
import { ThemedText } from "./ThemedText";
import { InfoCard } from "./InfoCard";
import { Icon } from "./Icon";

export function ComponentsShowcase() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.sectionTitle, styles.firstSectionTitle]}>
        Botões
      </ThemedText>
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
      <View style={styles.row}>
        <Button variant="outline" style={styles.flexButton}>
          Outline
        </Button>
        <Button disabled style={styles.flexButton}>
          Disabled
        </Button>
      </View>

      <ThemedText style={styles.subSectionTitle}>Com Ícones</ThemedText>
      <View style={styles.row}>
        <Button
          style={styles.flexButton}
          iconLeft={(color) => (
            <Icon
              type="MaterialCommunityIcons"
              name="check"
              color={color}
              size={20}
            />
          )}
        >
          Esquerda
        </Button>
        <Button
          variant="outline"
          style={styles.flexButton}
          iconRight={(color) => (
            <Icon
              type="MaterialCommunityIcons"
              name="arrow-right"
              color={color}
              size={20}
            />
          )}
        >
          Direita
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
      <ThemedText style={styles.statusText}>
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

      <ThemedText style={styles.sectionTitle}>Cards (Informação)</ThemedText>
      <InfoCard
        icon={(color) => (
          <Icon
            type="MaterialCommunityIcons"
            name="information-variant"
            color={color}
            size={24}
          />
        )}
      >
        Este é um exemplo de InfoCard! Use-o para destacar avisos, dicas ou
        informações importantes no app.
      </InfoCard>

      <ThemedText style={styles.sectionTitle}>
        Skeletons (Carregamento)
      </ThemedText>
      <View style={styles.skeletonContainer}>
        <View style={styles.skeletonRow}>
          <Skeleton width={50} height={50} borderRadius={25} />
          <View style={styles.skeletonLines}>
            <Skeleton width="70%" height={20} borderRadius={4} />
            <Skeleton width="40%" height={16} borderRadius={4} />
          </View>
        </View>
        <Skeleton width="100%" height={120} borderRadius={8} />
      </View>
      <ThemedText style={styles.sectionTitle}>Calendário</ThemedText>
      <DateInput />
      <Calendar />

      <ThemedText style={styles.sectionTitle}>App Bars (Cabeçalho)</ThemedText>
      <View style={styles.appBarContainer}>
        <FloatingAppBar
          title="Floating App Bar"
          showBackButton
          disableSafeArea
        />
        <FloatingSearchAppBar
          value={search}
          onChangeText={setSearch}
          disableSafeArea
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  sectionTitle: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  firstSectionTitle: {
    marginTop: 0,
  },
  subSectionTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    opacity: 0.6,
  },
  statusText: {
    fontSize: 14,
    opacity: 0.6,
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
  },
  skeletonRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  skeletonLines: {
    gap: 8,
    flex: 1,
  },
  appBarContainer: {
    marginHorizontal: -20,
    gap: 8,
  },
});
