import { useTheme } from "@react-navigation/native";
import * as React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Calendar } from "./Calendar";
import { Icon } from "../atoms/Icon";

type Props = {
  value?: Date;
  firstDate?: Date;
  lastDate?: Date;
  onDateSelected?: (date: Date) => void;
};

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function DateInput({
  value,
  firstDate,
  lastDate,
  onDateSelected,
}: Props) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState<Date | undefined>(value);

  function handleDateSelected(date: Date) {
    setSelected(date);
    onDateSelected?.(date);
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
        style={[
          styles.inputRow,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
          },
        ]}
      >
        <Icon
          type="MaterialCommunityIcons"
          name="calendar"
          size={20}
          color={colors.text + "99"}
        />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={colors.text + "66"}
          value={selected ? formatDate(selected) : ""}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={[styles.sheet, { backgroundColor: colors.card }]}>
            <Calendar
              selectedDate={selected}
              firstDate={firstDate}
              lastDate={lastDate}
              onDateSelected={handleDateSelected}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  sheet: {
    width: "100%",
    borderRadius: 12,
    padding: 8,
  },
});
