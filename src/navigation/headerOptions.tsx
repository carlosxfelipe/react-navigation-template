const TABS_WITH_LARGE_HEADER: string[] = ["Home Hero"];
const TABS_WITH_SEARCH_BAR: string[] = [];

export const getHeaderOptions = (tabName: string) => {
  if (TABS_WITH_LARGE_HEADER.includes(tabName)) {
    return { headerShown: false };
  }

  // TODO: criar um header com barra de pesquisa
  if (TABS_WITH_SEARCH_BAR.includes(tabName)) {
    return {};
  }

  return {};
};
