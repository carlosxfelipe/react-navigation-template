import { useNavigation, useTheme } from "@react-navigation/native";
import type { ComponentProps } from "react";
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Theme as AppTheme } from "../themes";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface HeaderIcon {
  icon: IconName;
  screen?: string;
  onPress?: () => void;
}

interface Props {
  leftIcon?: HeaderIcon;
  rightIcon?: HeaderIcon;
  placeholder?: string;
}

const HEADER_H_PADDING = 16;
const ICON_SIZE = 32;
const GAP = 12;

export function HeaderSearchBar({
  leftIcon,
  rightIcon,
  placeholder = "Buscar...",
}: Props) {
  const [query, setQuery] = useState("");
  const theme = useTheme() as AppTheme;
  const navigation = useNavigation();
  const { width: screenWidth } = useWindowDimensions();

  const textColor = theme.colors.text;
  const placeholderColor = theme.colors.placeholder;
  const backgroundColor = theme.colors.inputBackground;

  const barWidth = screenWidth - HEADER_H_PADDING * 2;

  function Slot({ item }: { item?: HeaderIcon }) {
    return (
      <TouchableOpacity
        style={[styles.iconButton, { opacity: item ? 1 : 0 }]}
        disabled={!item}
        hitSlop={8}
        onPress={() => {
          if (item?.onPress) item.onPress();
          else if (item?.screen) navigation.navigate(item.screen as never);
        }}
      >
        <MaterialCommunityIcons
          name={item?.icon ?? "circle"}
          size={24}
          color={textColor}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.row, { width: barWidth }]}>
      <Slot item={leftIcon} />
      <View style={[styles.inputContainer, { backgroundColor }]}>
        <MaterialCommunityIcons name="magnify" size={18} color={textColor} />
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <Slot item={rightIcon} />
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
