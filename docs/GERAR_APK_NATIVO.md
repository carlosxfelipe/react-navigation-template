# Como Gerar um APK Nativo (Sem Lock-in do Expo)

Este guia mostra como migrar seu projeto Expo Managed para o Bare Workflow e gerar um APK Android nativo, pronto para distribuição, sem dependência do Expo Go ou EAS Build.

## 1. Migrar para Bare Workflow

No terminal, execute:

```sh
npx expo prebuild
```

Isso irá criar as pastas `android/` e `ios/` no seu projeto, tornando-o compatível com builds nativos.

## 2. Gerar o APK de Release

No seu `package.json`, adicione (ou ajuste) o script:

```json
"build:apk": "cd android && ./gradlew assembleRelease && cd .. && mkdir -p apk-build && cp android/app/build/outputs/apk/release/app-release.apk apk-build/"
```

Para rodar o build:

```sh
npm run build:apk
```

O APK final estará em:

```
apk-build/app-release.apk
```

## 3. Considerações Importantes

- O APK de release é assinado com uma chave de debug por padrão. Para publicar na Play Store, configure sua própria chave de assinatura em `android/app/build.gradle`.
- Você pode customizar o app nativo (ícone, splash, permissões, etc.) editando os arquivos na pasta `android/`.
- Após migrar para Bare Workflow, você pode usar qualquer biblioteca nativa do React Native, sem limitações do Expo Managed.

## 4. Referências

- [Documentação Expo Prebuild](https://docs.expo.dev/workflow/prebuild/)
- [Documentação React Native Build APK](https://reactnative.dev/docs/signed-apk-android)

---

Se precisar de mais detalhes sobre assinatura, publicação ou customização, consulte a documentação oficial ou peça ajuda!
