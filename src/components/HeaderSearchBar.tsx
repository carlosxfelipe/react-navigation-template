import { useNavigation, useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Icon, IconProps } from "./Icon";
import type { Theme as AppTheme } from "../themes";

type MaterialCommunityIconName = Extract<
  IconProps,
  { type: "MaterialCommunityIcons" }
>["name"];

interface HeaderIcon {
  icon: MaterialCommunityIconName;
  screen?: keyof ReactNavigation.RootParamList;
  onPress?: () => void;
}

interface Props {
  leftIcon?: HeaderIcon;
  rightIcon?: HeaderIcon;
  query?: string;
  onChangeQuery?: (value: string) => void;
  placeholder?: string;
}

const HEADER_H_PADDING = 16;
const ICON_SIZE = 32;
const GAP = 12;

export function HeaderSearchBar({
  leftIcon,
  rightIcon,
  query,
  onChangeQuery,
  placeholder = "Buscar...",
}: Props) {
  const [internalQuery, setInternalQuery] = useState("");
  const { colors } = useTheme() as AppTheme;
  const navigation = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions();

  const currentQuery = query ?? internalQuery;
  const setQuery = onChangeQuery ?? setInternalQuery;

  const textColor = colors.text;
  const placeholderColor = colors.placeholder;
  const backgroundColor = colors.inputBackground;

  const barWidth = screenWidth - HEADER_H_PADDING * 2;

  function IconButton({ item }: { item: HeaderIcon }) {
    return (
      <TouchableOpacity
        style={styles.iconButton}
        hitSlop={8}
        onPress={() => {
          if (item.onPress) item.onPress();
          else if (item.screen) navigation.navigate(item.screen);
        }}
      >
        <Icon
          type="MaterialCommunityIcons"
          name={item.icon}
          size={24}
          color={textColor}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.row, { width: barWidth }]}>
      {leftIcon && <IconButton item={leftIcon} />}
      <View style={[styles.inputContainer, { backgroundColor }]}>
        <Icon
          type="MaterialCommunityIcons"
          name="magnify"
          size={18}
          color={textColor}
        />
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={currentQuery}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {currentQuery.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")} hitSlop={10}>
            <Icon
              type="MaterialCommunityIcons"
              name="close-circle"
              size={18}
              color={textColor}
              style={{ opacity: 0.5 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {rightIcon && <IconButton item={rightIcon} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: GAP,
  },
  iconButton: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});
