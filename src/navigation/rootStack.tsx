import { HeaderButton, Text } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { Theme as AppTheme } from "../themes";
import { HomeTabs } from "./homeTabs";
import { NotFound } from "../screens/NotFound";
import { Profile } from "../screens/Profile";
import { Settings } from "../screens/Settings";

export const RootStack = createNativeStackNavigator({
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
        title: "Início",
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      options: {
        title: "Perfil",
      },
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
        title: "Configurações",
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Fechar</Text>
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
