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

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
