import React from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";

import type { Theme as AppTheme } from "../themes";
import { Icon, type IconProps } from "./atoms/Icon";
import { PlatformPressable } from "./atoms/PlatformPressable";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  trailingIcon?: IconProps;
  showBackButton?: boolean;
  disableSafeArea?: boolean;
  onBackTapped?: () => void;
  onTrailingTapped?: () => void;
};

export function FloatingSearchAppBar({
  value,
  onChangeText,
  placeholder = "Buscar",
  trailingIcon = undefined,
  showBackButton = false,
  disableSafeArea = false,
  onBackTapped,
  onTrailingTapped,
}: Props) {
  const { colors, fonts } = useTheme() as AppTheme;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBackTapped) {
      onBackTapped();
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
      {/* Botão de voltar (opcional) */}
      {showBackButton && (
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
      )}

      {/* Barra de pesquisa */}
      <View
        style={[
          styles.searchBar,
          {
            backgroundColor: colors.card,
            borderColor: "rgba(128, 128, 128, 0.1)",
            outlineWidth: 0,
          } as any,
        ]}
      >
        <Icon
          type="MaterialCommunityIcons"
          name="magnify"
          size={18}
          color={colors.placeholder}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          style={[
            styles.input,
            { color: colors.text, outlineWidth: 0, outline: "none" } as any,
            fonts.regular,
          ]}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <PlatformPressable onPress={() => onChangeText("")} hitSlop={8}>
            <Icon
              type="MaterialCommunityIcons"
              name="close-circle"
              size={18}
              color={colors.placeholder}
            />
          </PlatformPressable>
        )}
      </View>

      {/* Ícone à direita com badge opcional */}
      {trailingIcon ? (
        <View style={{ width: 44, height: 44, overflow: "visible" }}>
          <PlatformPressable
            onPress={onTrailingTapped}
            style={[circleStyle, { width: "100%", height: "100%" }]}
            android_ripple={{ color: "transparent", radius: 22 }}
          >
            <Icon {...trailingIcon} size={22} color={colors.text} />
          </PlatformPressable>
        </View>
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
  searchBar: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
});
