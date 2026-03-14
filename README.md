# Template Inicial com React Navigation

Este projeto é um template minimalista para apps React Native usando Expo e React Navigation. Inclui navegação por pilha e abas, suporte a web, TypeScript, deep linking, temas automáticos e build nativo com Expo Development Build.

## Como começar

1. Clone este repositório:
   ```sh
   git clone https://github.com/carlosxfelipe/react-navigation-template
   ```
2. Entre na pasta do projeto e instale as dependências:
   ```sh
   cd react-navigation-template
   npm install
   ```
3. Para renomear o nome do app (nome de exibição, identificadores e ajustes nativos), siga a documentação em `docs/RENOMEAR_PROJETO.md`.
4. Para gerar APK nativo, siga `docs/GERAR_APK_NATIVO.md`.
5. Edite `src/App.tsx` para começar a desenvolver.

## Configuração Manual

Caso prefira não clonar este repositório, siga os passos abaixo:

1. Crie o projeto com o template do React Navigation:

   ```bash
   npx create-expo-app@latest --template react-navigation/template
   ```

2. Instale as dependências extras:

   ```bash
   npm install @expo/vector-icons
   ```

3. Instale as dependências de desenvolvimento:

   ```bash
   npm install -D @types/color @types/node ts-node
   ```

4. Delete a pasta `src` gerada e substitua pela pasta `src` deste repositório.

## Como rodar

- Instale as dependências: `npm install`
- Inicie o servidor: `npm start`
- Rode no iOS, Android ou Web: `npm run ios`, `npm run android` ou `npm run web`

## Notas

- O projeto usa build de desenvolvimento do Expo, não funciona no Expo Go.
- As pastas `ios/` e `android/` são geradas automaticamente e normalmente ignoradas pelo git.
- Recomenda-se usar config plugins para customizações nativas.

## Recursos

- [Documentação do React Navigation](https://reactnavigation.org/)
- [Documentação do Expo](https://docs.expo.dev/)

## Opções de Header por Aba

O arquivo `src/navigation/headerOptions.tsx` centraliza as opções de header aplicadas a cada aba do navegador inferior. Em `homeTabs.tsx`, a linha:

```tsx
// Aplica opções de header por aba (ver headerOptions.tsx)
...getHeaderOptions(tab.name),
```

faz o spread das opções retornadas para cada aba, permitindo configurar comportamentos diferentes sem poluir o navegador. O arquivo define duas listas:

- **`TABS_WITH_LARGE_HEADER`** — abas que escondem o header nativo (`headerShown: false`) para usar o `LargeHeader` customizado, inspirado no estilo do Nubank: bloco colorido que rola com o conteúdo e desaparece ao scrollar, deixando apenas a cor primária atrás do status bar.
- **`TABS_WITH_SEARCH_BAR`** — abas que substituem o título do header pelo componente `HeaderSearchBar`.

### Variantes de Home disponíveis

O projeto inclui duas implementações de tela inicial que podem ser usadas em `tabItems.ts`:

| Componente   | Estilo                                        | Header                            |
| ------------ | --------------------------------------------- | --------------------------------- |
| `Home`       | Padrão com `HeaderSearchBar` no topo          | Nativo com barra de busca         |
| `HomeNubank` | Large header colorido que desaparece ao rolar | Sem header nativo (`LargeHeader`) |

Para alternar, basta trocar o `component` da aba `Home` em `src/navigation/tabItems.ts`.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
