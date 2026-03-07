import {
  type LinkProps,
  useLinkProps,
  useTheme,
} from "@react-navigation/native";
import Color from "color";
import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";

import {
  PlatformPressable,
  type Props as PlatformPressableProps,
} from "./PlatformPressable";
import { Text } from "./Text";

type ButtonBaseProps = Omit<PlatformPressableProps, "children"> & {
  variant?: "plain" | "tinted" | "filled";
  color?: string;
  shape?: "pill" | "rounded" | "sharp";
  children: string | string[];
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

type ButtonLinkProps<ParamList extends ReactNavigation.RootParamList> =
  LinkProps<ParamList> & Omit<ButtonBaseProps, "onPress">;

export function Button<ParamList extends ReactNavigation.RootParamList>(
  props: ButtonLinkProps<ParamList>,
): React.JSX.Element;

export function Button(props: ButtonBaseProps): React.JSX.Element;

export function Button<ParamList extends ReactNavigation.RootParamList>(
  props: ButtonBaseProps | ButtonLinkProps<ParamList>,
) {
  if ("screen" in props || "action" in props) {
    // @ts-expect-error: This is already type-checked by the prop types
    return <ButtonLink {...props} />;
  } else {
    return <ButtonBase {...props} />;
  }
}

function ButtonLink<ParamList extends ReactNavigation.RootParamList>({
  screen,
  params,
  action,
  href,
  ...rest
}: ButtonLinkProps<ParamList>) {
  // @ts-expect-error: This is already type-checked by the prop types
  const props = useLinkProps({ screen, params, action, href });

  return <ButtonBase {...rest} {...props} />;
}

function ButtonBase({
  variant = "tinted",
  color: customColor,
  shape = "pill",
  android_ripple,
  style,
  children,
  iconLeft,
  iconRight,
  ...rest
}: ButtonBaseProps) {
  const { colors, fonts } = useTheme();

  const color = customColor ?? colors.primary;

  let backgroundColor;
  let textColor;

  switch (variant) {
    case "plain":
      backgroundColor = "transparent";
      textColor = color;
      break;
    case "tinted":
      backgroundColor = Color(color).fade(0.85).hexa();
      textColor = color;
      break;
    case "filled":
      backgroundColor = color;
      textColor = Color(color).isDark()
        ? "#FFFFFF"
        : Color(color).darken(0.71).hex();
      break;
  }

  const borderRadius = shape === "pill" ? 40 : shape === "rounded" ? 8 : 0;

  return (
    <PlatformPressable
      {...rest}
      android_ripple={{
        color: Color(textColor).fade(0.85).hexa(),
        ...android_ripple,
      }}
      pressOpacity={Platform.OS === "ios" ? undefined : 1}
      hoverEffect={{ color: textColor }}
      style={[{ backgroundColor, borderRadius }, styles.button, style]}
    >
      <View style={styles.content}>
        {iconLeft && <View style={styles.icon}>{iconLeft}</View>}

        <Text style={[{ color: textColor }, fonts.regular, styles.text]}>
          {children}
        </Text>

        {iconRight && <View style={styles.icon}>{iconRight}</View>}
      </View>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderCurve: "continuous",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: 0.2,
    textAlign: "center",
  },
});
