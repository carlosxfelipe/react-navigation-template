import { HeaderSearchBar } from "../components/HeaderSearchBar";

const TABS_WITH_LARGE_HEADER = ["Home Nubank"];
const TABS_WITH_SEARCH_BAR = ["Home"];

export const getHeaderOptions = (tabName: string) => {
  if (TABS_WITH_LARGE_HEADER.includes(tabName)) {
    return { headerShown: false };
  }

  if (TABS_WITH_SEARCH_BAR.includes(tabName)) {
    return {
      headerTitle: () => (
        <HeaderSearchBar
          placeholder="Buscar na Home..."
          rightIcon={{ icon: "cog-outline", screen: "Settings" }}
        />
      ),
    };
  }

  return {};
};
