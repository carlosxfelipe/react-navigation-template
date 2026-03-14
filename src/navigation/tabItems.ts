import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps, ComponentType } from "react";

import { About } from "./screens/About";
import { Home } from "./screens/Home";
import { HomeHero } from "./screens/HomeHero";

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
    name: "Home Hero",
    component: HomeHero,
    title: "Início Hero",
    iconName: "home-variant-outline",
  },
  {
    name: "About",
    component: About,
    title: "Sobre",
    iconName: "information-outline",
  },
];
