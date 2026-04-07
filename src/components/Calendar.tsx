import { useTheme } from "@react-navigation/native";
import * as React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { Icon } from "./Icon";

const MONTH_NAMES = [
  "jan.",
  "fev.",
  "mar.",
  "abr.",
  "mai.",
  "jun.",
  "jul.",
  "ago.",
  "set.",
  "out.",
  "nov.",
  "dez.",
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

type Props = {
  initialDate?: Date;
  selectedDate?: Date;
  firstDate?: Date;
  lastDate?: Date;
  label?: string;
  style?: StyleProp<ViewStyle>;
  onDateSelected?: (date: Date) => void;
};

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function today(): Date {
  return normalizeDate(new Date());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Modal de seleção de mês ou ano
function PickerModal({
  visible,
  items,
  selectedValue,
  renderLabel,
  onSelect,
  onClose,
}: {
  visible: boolean;
  items: number[];
  selectedValue: number;
  renderLabel: (value: number) => string;
  onSelect: (value: number) => void;
  onClose: () => void;
}) {
  const { colors, fonts } = useTheme();
  const listRef = React.useRef<FlatList<number>>(null);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View
          style={[
            styles.pickerContainer,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <FlatList
            ref={listRef}
            data={items}
            keyExtractor={(item) => String(item)}
            contentContainerStyle={styles.pickerList}
            getItemLayout={(_, index) => ({
              length: 44,
              offset: 44 * index,
              index,
            })}
            onLayout={() => {
              const idx = Math.max(0, items.indexOf(selectedValue));
              if (idx > 0) {
                listRef.current?.scrollToIndex({ index: idx, animated: false });
              }
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = item === selectedValue;
              return (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                  style={[
                    styles.pickerItem,
                    isSelected && { backgroundColor: colors.primary + "22" },
                  ]}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      fonts.regular,
                      { color: colors.text },
                      isSelected && {
                        color: colors.primary,
                        ...fonts.bold,
                      },
                    ]}
                  >
                    {renderLabel(item)}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

export function Calendar({
  initialDate,
  selectedDate: selectedDateProp,
  firstDate,
  lastDate,
  label,
  style,
  onDateSelected,
}: Props) {
  const { colors, fonts } = useTheme();

  const todayDate = today();

  const normalizedFirstDate = firstDate ? normalizeDate(firstDate) : undefined;
  const normalizedLastDate = lastDate ? normalizeDate(lastDate) : undefined;

  const firstMonth = normalizedFirstDate
    ? new Date(
        normalizedFirstDate.getFullYear(),
        normalizedFirstDate.getMonth(),
        1,
      )
    : undefined;

  const lastMonth = normalizedLastDate
    ? new Date(
        normalizedLastDate.getFullYear(),
        normalizedLastDate.getMonth(),
        1,
      )
    : undefined;

  const safeInitial = initialDate ?? selectedDateProp ?? todayDate;

  const [displayedMonth, setDisplayedMonth] = React.useState(
    () => new Date(safeInitial.getFullYear(), safeInitial.getMonth(), 1),
  );

  const [selected, setSelected] = React.useState<Date | undefined>(
    selectedDateProp ? normalizeDate(selectedDateProp) : undefined,
  );

  const [monthPickerOpen, setMonthPickerOpen] = React.useState(false);
  const [yearPickerOpen, setYearPickerOpen] = React.useState(false);

  function isMonthInRange(month: Date): boolean {
    if (firstMonth && month < firstMonth) return false;
    if (lastMonth && month > lastMonth) return false;
    return true;
  }

  function isDateInRange(date: Date): boolean {
    if (normalizedFirstDate && date < normalizedFirstDate) return false;
    if (normalizedLastDate && date > normalizedLastDate) return false;
    return true;
  }

  const canGoPrev = isMonthInRange(
    new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1),
  );

  const canGoNext = isMonthInRange(
    new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1),
  );

  function changeMonth(delta: number) {
    const next = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() + delta,
      1,
    );
    if (isMonthInRange(next)) setDisplayedMonth(next);
  }

  const minYear = firstMonth
    ? firstMonth.getFullYear()
    : displayedMonth.getFullYear() - 10;
  const maxYear = lastMonth
    ? lastMonth.getFullYear()
    : displayedMonth.getFullYear() + 10;

  const availableYears = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i,
  );

  function availableMonthsForYear(year: number): number[] {
    return Array.from({ length: 12 }, (_, i) => i).filter((month) =>
      isMonthInRange(new Date(year, month, 1)),
    );
  }

  const currentYear = displayedMonth.getFullYear();
  const currentMonth = displayedMonth.getMonth();

  const firstDayOfMonth = startOfMonth(displayedMonth);
  const leadingDays = firstDayOfMonth.getDay();
  const totalDays = daysInMonth(currentYear, currentMonth);
  const totalCells = leadingDays + totalDays <= 35 ? 35 : 42;

  return (
    <View style={style}>
      {label != null && (
        <Text style={[styles.label, fonts.medium, { color: colors.text }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.container,
          { backgroundColor: colors.card /* fundo do calendário */ },
        ]}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => canGoPrev && changeMonth(-1)}
            style={[styles.navBtn, !canGoPrev && styles.navBtnDisabled]}
            disabled={!canGoPrev}
            hitSlop={8}
          >
            <Text
              style={[
                styles.navIcon,
                { color: canGoPrev ? colors.text : colors.text + "40" },
              ]}
            >
              ‹
            </Text>
          </TouchableOpacity>

          <View style={styles.headerPickers}>
            {/* Seletor de mês */}
            <TouchableOpacity
              onPress={() => setMonthPickerOpen(true)}
              style={styles.pickerButton}
            >
              <Text
                style={[
                  styles.pickerButtonText,
                  fonts.medium,
                  { color: colors.text },
                ]}
              >
                {MONTH_NAMES[currentMonth]}
              </Text>
              <Icon
                type="MaterialCommunityIcons"
                name="chevron-down"
                size={16}
                color={colors.text}
              />
            </TouchableOpacity>

            {/* Seletor de ano */}
            <TouchableOpacity
              onPress={() => setYearPickerOpen(true)}
              style={styles.pickerButton}
            >
              <Text
                style={[
                  styles.pickerButtonText,
                  fonts.medium,
                  { color: colors.text },
                ]}
              >
                {currentYear}
              </Text>
              <Icon
                type="MaterialCommunityIcons"
                name="chevron-down"
                size={16}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => canGoNext && changeMonth(1)}
            style={[styles.navBtn, !canGoNext && styles.navBtnDisabled]}
            disabled={!canGoNext}
            hitSlop={8}
          >
            <Text
              style={[
                styles.navIcon,
                { color: canGoNext ? colors.text : colors.text + "40" },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cabeçalho dos dias da semana */}
        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((day) => (
            <View key={day} style={styles.weekdayCell}>
              <Text
                style={[
                  styles.weekdayText,
                  fonts.medium,
                  { color: colors.text + "B3" },
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Grade de dias */}
        <View>
          {Array.from({ length: totalCells / 7 }, (_, rowIndex) => (
            <View key={rowIndex} style={styles.weekRow}>
              {Array.from({ length: 7 }, (_, colIndex) => {
                const index = rowIndex * 7 + colIndex;
                const day = index - leadingDays + 1;
                if (day < 1 || day > totalDays) {
                  return <View key={`empty-${index}`} style={styles.dayCell} />;
                }

                const cellDate = new Date(currentYear, currentMonth, day);
                const isSelected =
                  selected != null && isSameDay(selected, cellDate);
                const isToday = isSameDay(cellDate, todayDate);
                const isEnabled = isDateInRange(cellDate);

                return (
                  <View key={day} style={styles.dayCell}>
                    <TouchableOpacity
                      onPress={() => {
                        if (!isEnabled) return;
                        setSelected(cellDate);
                        onDateSelected?.(cellDate);
                      }}
                      disabled={!isEnabled}
                      style={[
                        styles.dayButton,
                        isSelected && { backgroundColor: colors.primary },
                        isToday &&
                          !isSelected && {
                            borderWidth: 1,
                            borderColor: colors.primary,
                          },
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          fonts.regular,
                          {
                            color: !isEnabled
                              ? colors.text + "40"
                              : isSelected
                                ? "#FFFFFF"
                                : colors.text,
                          },
                          isSelected && fonts.medium,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Modal de seleção de mês */}
      <PickerModal
        visible={monthPickerOpen}
        items={availableMonthsForYear(currentYear)}
        selectedValue={currentMonth}
        renderLabel={(m) => MONTH_NAMES[m]}
        onSelect={(m) => setDisplayedMonth(new Date(currentYear, m, 1))}
        onClose={() => setMonthPickerOpen(false)}
      />

      {/* Modal de seleção de ano */}
      <PickerModal
        visible={yearPickerOpen}
        items={availableYears}
        selectedValue={currentYear}
        renderLabel={(y) => String(y)}
        onSelect={(y) => {
          const months = availableMonthsForYear(y);
          if (months.length === 0) return;
          const targetMonth = months.includes(currentMonth)
            ? currentMonth
            : months[0];
          setDisplayedMonth(new Date(y, targetMonth, 1));
        }}
        onClose={() => setYearPickerOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  container: {
    borderRadius: 8,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerPickers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navIcon: {
    fontSize: 24,
    lineHeight: 28,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  pickerButtonText: {
    fontSize: 14,
  },
  weekdayRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  weekdayText: {
    fontSize: 12,
  },
  weekRow: {
    flexDirection: "row",
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    padding: 2,
  },
  dayButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  dayText: {
    fontSize: 13,
  },
  // Modal de seleção
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    width: 200,
    maxHeight: 280,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
  },
  pickerList: {
    paddingVertical: 4,
  },
  pickerItem: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  pickerItemText: {
    fontSize: 15,
  },
});
