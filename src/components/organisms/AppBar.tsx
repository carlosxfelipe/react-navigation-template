import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Theme as AppTheme } from "../../themes";
import { Icon, type IconProps } from "../atoms/Icon";
import { PlatformPressable } from "../atoms/PlatformPressable";

type Props = {
  title: string;
  showBackButton?: boolean;
  onGoBack?: () => void;
  trailingIcon?: IconProps;
  onTrailingTapped?: () => void;
};

export function AppBar({
  title,
  showBackButton,
  onGoBack,
  trailingIcon,
  onTrailingTapped,
}: Props) {
  const { colors, fonts } = useTheme() as AppTheme;
  const navigation = useNavigation();
  const canGoBack =
    showBackButton !== undefined ? showBackButton : navigation.canGoBack();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.header,
          paddingTop: insets.top + 8,
          borderBottomColor: colors.border,
        },
      ]}
    >
      {/* Botão de voltar — ou espaçador para manter simetria */}
      {canGoBack ? (
        <PlatformPressable
          onPress={handleBack}
          style={styles.iconButton}
          android_ripple={{ color: "transparent", radius: 22 }}
        >
          <Icon
            type="Ionicons"
            name="chevron-back"
            size={22}
            color={colors.text}
          />
        </PlatformPressable>
      ) : (
        <View style={styles.iconButton} />
      )}

      {/* Título centralizado */}
      <Text
        style={[
          styles.titleText,
          { color: colors.text },
          Platform.OS === "android" ? fonts.heavy : fonts.bold,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Espaçador ou ícone à direita para manter simetria */}
      {trailingIcon ? (
        <PlatformPressable
          onPress={onTrailingTapped}
          style={styles.iconButton}
          android_ripple={{ color: "transparent", radius: 22 }}
        >
          <Icon {...trailingIcon} size={22} color={colors.text} />
        </PlatformPressable>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
  },
});
