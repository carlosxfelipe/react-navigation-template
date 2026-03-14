import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps, ComponentType } from "react";

import { About } from "./screens/About";
import { Home } from "./screens/Home";
import { HomeNubank } from "./screens/HomeNubank";

type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type TabItem = {
  name: string;
  component: ComponentType<any>;
  title: string;
  iconName: MaterialIconName;
};

export const tabItems: TabItem[] = [
  {
    name: "Home",
    component: Home,
    title: "Início",
    iconName: "home-outline",
  },
  {
    name: "Home Nubank",
    component: HomeNubank,
    title: "Início Nubank",
    iconName: "bank-outline",
  },
  {
    name: "About",
    component: About,
    title: "Sobre",
    iconName: "information-outline",
  },
];
