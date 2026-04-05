import React, { useState } from "react";
import { FloatingSearchAppBar } from "../components/FloatingSearchAppBar";
import { FloatingAppBar } from "../components/FloatingAppBar";

const TABS_WITH_HIDDEN_HEADER: string[] = ["Home Hero"];

function SearchHeader() {
  const [search, setSearch] = useState("");
  return (
    <FloatingSearchAppBar
      value={search}
      onChangeText={setSearch}
      trailingIcon={{ type: "MaterialCommunityIcons", name: "bell-outline" }}
    />
  );
}

export const getHeaderOptions = (tabName: string) => {
  if (TABS_WITH_HIDDEN_HEADER.includes(tabName)) {
    return { headerShown: false };
  }

  // Headers customizados por aba. Para remover, basta comentar o bloco correspondente.
  if (tabName === "Home") {
    return {
      headerShown: true,
      header: () => <SearchHeader />,
    };
  }

  if (tabName === "About") {
    return {
      headerShown: true,
      header: () => (
        <FloatingAppBar
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
