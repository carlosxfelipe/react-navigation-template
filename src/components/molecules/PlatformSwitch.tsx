import { useRef, useEffect } from "react";
import {
  Switch,
  SwitchProps,
  Animated,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../../themes";

const TRACK_WIDTH = 50;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const THUMB_MARGIN = 3;

function NonIosSwitch({
  value,
  onValueChange,
  disabled,
  trackColor,
}: Pick<SwitchProps, "value" | "onValueChange" | "disabled" | "trackColor">) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const activeColor = String(trackColor?.true ?? "#0A84FF");
  const inactiveColor = String(trackColor?.false ?? "#b0b0b0");

  const trackBg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const thumbLeft = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [THUMB_MARGIN, TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN],
  });

  const thumbScale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.9, 1],
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange?.(!value)}
      accessible
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.track,
          { backgroundColor: trackBg, opacity: disabled ? 0.4 : 1 },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbLeft }, { scale: thumbScale }],
              elevation: 2,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

export function PlatformSwitch(props: SwitchProps) {
  const theme = useTheme() as AppTheme;

  const activeTrackColor = props.trackColor?.true ?? theme.colors.primary;
  const inactiveTrackColor =
    props.trackColor?.false ?? (theme.dark ? "#555" : "#b0b0b0");

  const mergedTrackColor = {
    false: inactiveTrackColor,
    true: activeTrackColor,
  };

  if (Platform.OS !== "ios") {
    return <NonIosSwitch {...props} trackColor={mergedTrackColor} />;
  }

  return (
    <Switch
      {...props}
      trackColor={mergedTrackColor}
      ios_backgroundColor={inactiveTrackColor ?? undefined}
    />
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: "center",
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
