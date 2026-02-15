import { Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile({ route }: Props) {
  return (
    <ThemedView style={styles.container}>
      <Text>Perfil de {route.params.user}</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
