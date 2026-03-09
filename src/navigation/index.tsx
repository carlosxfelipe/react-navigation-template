import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { RootStack } from "./rootStack";

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
