import { LargeHeader } from "../../components/LargeHeader";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { ComponentsShowcase } from "../../components/ComponentsShowcase";

export function HomeNubank() {
  return (
    <LargeHeader title="Olá, Carlos" subtitle="Bem-vindo ao seu app!">
      <Button
        screen="Profile"
        params={{ user: "carlos" }}
        iconLeft={(color) => <Icon type="Feather" name="user" color={color} />}
      >
        Ir para o Perfil
      </Button>

      <Button
        screen="Settings"
        iconRight={(color) => (
          <Icon type="Ionicons" name="settings-outline" color={color} />
        )}
      >
        Ir para as Configurações
      </Button>

      <ComponentsShowcase />
    </LargeHeader>
  );
}
