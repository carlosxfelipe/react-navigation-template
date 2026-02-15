import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import type { Theme as AppTheme } from "../themes";

import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { About } from "./screens/About";
import { NotFound } from "./screens/NotFound";

type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const tabItems: {
  name: string;
  component: React.ComponentType<any>;
  title: string;
  iconName: MaterialIconName;
}[] = [
  {
    name: "Home",
    component: Home,
    title: "Início",
    iconName: "home-outline",
  },
  {
    name: "About",
    component: About,
    title: "Sobre",
    iconName: "information-outline",
  },
];

const HomeTabs = createBottomTabNavigator({
  screenOptions: ({ theme }) => {
    const appTheme = theme as AppTheme;

    return {
      headerStyle: {
        backgroundColor: appTheme.colors.header,
      },
      headerTintColor: appTheme.colors.text,
      tabBarStyle: {
        backgroundColor: appTheme.colors.tabBar,
        borderTopColor: appTheme.colors.border,
      },
    };
  },
  screens: Object.fromEntries(
    tabItems.map((tab) => [
      tab.name,
      {
        screen: tab.component,
        options: {
          title: tab.title,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={tab.iconName}
              color={color}
              size={size}
            />
          ),
        },
      },
    ]),
  ),
});

const RootStack = createNativeStackNavigator({
  screenOptions: ({ theme }) => {
    const appTheme = theme as AppTheme;

    return {
      headerStyle: {
        backgroundColor: appTheme.colors.header,
      },
      headerTintColor: appTheme.colors.text,
      contentStyle: {
        backgroundColor: appTheme.colors.background,
      },
    };
  },
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
