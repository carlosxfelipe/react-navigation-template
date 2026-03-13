import { HeaderSearchBar } from "../components/HeaderSearchBar";

export const getHeaderOptions = (tabName: string) => {
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
