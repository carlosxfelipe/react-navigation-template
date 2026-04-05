import React, { useState } from "react";
import { SearchAppBar } from "../components/SearchAppBar";
import { StandardAppBar } from "../components/StandardAppBar";

const TABS_WITH_HIDDEN_HEADER: string[] = ["Home Hero"];

function HomeHeader() {
  const [search, setSearch] = useState("");
  return <SearchAppBar value={search} onChangeText={setSearch} />;
}

export const getHeaderOptions = (tabName: string) => {
  if (TABS_WITH_HIDDEN_HEADER.includes(tabName)) {
    return { headerShown: false };
  }

  // Headers customizados por aba. Para remover, basta comentar o bloco correspondente.
  if (tabName === "Home") {
    return {
      headerShown: true,
      header: () => <HomeHeader />,
    };
  }

  if (tabName === "About") {
    return {
      headerShown: true,
      header: () => (
        <StandardAppBar
          title="Sobre"
          showBackButton={false}
          trailingIcon={{
            type: "MaterialCommunityIcons",
            name: "help-circle-outline",
          }}
          onTrailingTapped={() => console.log("teste")}
        />
      ),
    };
  }

  return {};
};
