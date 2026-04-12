import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useTheme } from "@react-navigation/native";

import type { Theme as AppTheme } from "../../themes";
import { Icon, type IconProps } from "../atoms/Icon";
import { PlatformPressable } from "../atoms/PlatformPressable";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  trailingIcon?: IconProps;
  showBackButton?: boolean;
  onBackTapped?: () => void;
  onTrailingTapped?: () => void;
};

export function SearchAppBar({
  value,
  onChangeText,
  placeholder = "Buscar",
  trailingIcon = undefined,
  showBackButton = false,
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
      {/* Botão de voltar (opcional) */}
      {showBackButton && (
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
      )}

      {/* Barra de pesquisa */}
      <View
        style={[
          styles.searchBar,
          { borderColor: colors.border, outlineWidth: 0 } as any,
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
        <PlatformPressable
          onPress={onTrailingTapped}
          style={styles.iconButton}
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
});
