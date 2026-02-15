# Como Renomear o Projeto

Este projeto inclui um script automatizado para renomear o app de forma completa, atualizando todos os arquivos necessários para Android e iOS.

## O que o script faz

O script `scripts/rename-project.ts` atualiza automaticamente:

- **app.json** - nome, slug, scheme, bundleIdentifier (iOS) e package (Android)
- **package.json** - nome do pacote npm
- **Android** - `strings.xml` com o nome que aparece no dispositivo
- **iOS** - `Info.plist` com display name e URL schemes

## Como usar

### 1. Execute o script de renomeação

```bash
npm run rename
```

### 2. Responda as perguntas

O script irá perguntar:

- **Nome do app** (como aparece no celular): Ex: "Meu App Incrível"
- **Nome do projeto** (slug): Ex: "meu-app-incrivel" (ou deixe em branco para gerar automaticamente)

### 3. Confirme a configuração

O script mostrará um resumo:

```
Configuração:
   Display Name: Meu App Incrível
   Project Name: meu-app-incrivel
   Scheme: meuappincrivel
   Bundle ID: com.meuappincrivel

Confirmar renomeação? (s/n):
```

### 4. Reconstrua os arquivos nativos

Após a renomeação, execute:

```bash
npx expo prebuild --clean
npm install
```

### 5. Teste o app

```bash
npm run android
# ou
npm run ios
```

## Exemplo completo

```bash
# 1. Renomear o projeto
npm run rename

# Responder:
# Nome do app: Super Tasks
# Nome do projeto: super-tasks
# Confirmar: s

# 2. Reconstruir
npx expo prebuild --clean
npm install

# 3. Rodar
npm run android
```

## Notas importantes

- O script **não renomeia a pasta do projeto** - faça isso manualmente se necessário
- Sempre execute `npx expo prebuild --clean` após renomear
- O Bundle ID será gerado automaticamente como `com.nomedoprojeto`
- Faça backup antes de renomear, caso precise reverter

## Personalização manual

Se precisar ajustar manualmente:

- **Android**: `android/app/src/main/res/values/strings.xml`
- **iOS**: `ios/[nome-do-app]/Info.plist`
- **Expo**: `app.json`
- **NPM**: `package.json`

---

**Dica**: Use nomes simples e sem caracteres especiais para evitar problemas com as lojas de apps!
