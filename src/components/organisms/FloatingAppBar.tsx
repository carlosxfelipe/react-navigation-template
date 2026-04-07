import React from "react";
import { Platform, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Theme as AppTheme } from "../../themes";
import { Icon, type IconProps } from "../atoms/Icon";
import { PlatformPressable } from "../atoms/PlatformPressable";

type Props = {
  title: string;
  showBackButton?: boolean;
  disableSafeArea?: boolean;
  onGoBack?: () => void;
  trailingIcon?: IconProps;
  onTrailingTapped?: () => void;
};

export function FloatingAppBar({
  title,
  showBackButton,
  disableSafeArea = false,
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

  const circleStyle: ViewStyle = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: disableSafeArea ? 8 : insets.top + 8 },
      ]}
    >
      {/* Botão de voltar — exibido apenas quando há telas empilhadas */}
      {canGoBack ? (
        <PlatformPressable
          onPress={handleBack}
          style={circleStyle}
          android_ripple={{ color: "transparent", radius: 22 }}
        >
          <Icon
            type="Ionicons"
            name="chevron-back"
            size={22}
            color={colors.text}
          />
        </PlatformPressable>
      ) : null}

      {/* Cápsula de título */}
      <View
        style={[
          styles.titleCapsule,
          {
            backgroundColor: colors.card,
            borderColor: "rgba(128, 128, 128, 0.1)",
          },
        ]}
      >
        <Text
          style={[styles.titleText, { color: colors.text }, fonts.bold]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* Ícone à direita ou espaçador invisível para manter o título centralizado */}
      {trailingIcon ? (
        <PlatformPressable
          onPress={onTrailingTapped}
          style={circleStyle}
          android_ripple={{ color: "transparent", radius: 22 }}
        >
          <Icon {...trailingIcon} size={22} color={colors.text} />
        </PlatformPressable>
      ) : null}
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
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  titleCapsule: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 15,
  },
});
