# Template Inicial com React Navigation

Este projeto é um template minimalista para apps React Native usando Expo e React Navigation. Inclui navegação por pilha e abas, suporte a web, TypeScript, deep linking, temas automáticos e build nativo com Expo Development Build.

## Como começar

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
