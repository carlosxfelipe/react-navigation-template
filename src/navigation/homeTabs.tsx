import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HeaderSearchBar } from "../components/HeaderSearchBar";
import type { Theme as AppTheme } from "../themes";
import { tabItems } from "./tabItems";

const getHeaderOptions = (tabName: string) => {
  if (tabName !== "Home") {
    return {};
  }

  return {
    headerTitle: () => (
      <HeaderSearchBar
        placeholder="Buscar na Home..."
        rightIcon={{ icon: "cog-outline", screen: "Settings" }}
      />
    ),
  };
};

export const HomeTabs = createBottomTabNavigator({
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
          ...getHeaderOptions(tab.name),
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
