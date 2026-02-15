#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

interface RenameConfig {
  projectName: string;
  displayName: string;
  bundleId: string;
  scheme: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

function sanitizeProjectName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

function sanitizeScheme(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function sanitizeBundleId(name: string): string {
  return `com.${name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}

async function getConfig(): Promise<RenameConfig> {
  console.log("\n🚀 Renomeador de Projeto Expo\n");
  console.log(
    "Este script irá renomear seu projeto em todos os arquivos necessários.\n",
  );

  const displayName = await question(
    "📱 Nome do app (como aparece no celular): ",
  );
  const projectName = await question(
    `📦 Nome do projeto (slug, default: ${sanitizeProjectName(displayName)}): `,
  );

  const finalProjectName =
    projectName.trim() || sanitizeProjectName(displayName);
  const scheme = sanitizeScheme(finalProjectName);
  const bundleId = sanitizeBundleId(finalProjectName);

  console.log("\n📋 Configuração:");
  console.log(`   Display Name: ${displayName}`);
  console.log(`   Project Name: ${finalProjectName}`);
  console.log(`   Scheme: ${scheme}`);
  console.log(`   Bundle ID: ${bundleId}`);

  const confirm = await question("\n✅ Confirmar renomeação? (s/n): ");

  if (confirm.toLowerCase() !== "s") {
    console.log("❌ Renomeação cancelada.");
    process.exit(0);
  }

  return {
    projectName: finalProjectName,
    displayName: displayName.trim(),
    bundleId,
    scheme,
  };
}

function updateAppJson(config: RenameConfig): void {
  const appJsonPath = path.join(process.cwd(), "app.json");

  if (!fs.existsSync(appJsonPath)) {
    console.log("⚠️  app.json não encontrado, pulando...");
    return;
  }

  const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf-8"));

  appJson.expo.name = config.displayName;
  appJson.expo.slug = config.projectName;
  appJson.expo.scheme = config.scheme;

  if (appJson.expo.ios) {
    appJson.expo.ios.bundleIdentifier = config.bundleId;
  }

  if (appJson.expo.android) {
    appJson.expo.android.package = config.bundleId;
  }

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + "\n");
  console.log("✅ app.json atualizado");
}

function updatePackageJson(config: RenameConfig): void {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.log("⚠️  package.json não encontrado, pulando...");
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  packageJson.name = config.projectName;

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n",
  );
  console.log("✅ package.json atualizado");
}

function updateAndroidStrings(config: RenameConfig): void {
  const stringsPath = path.join(
    process.cwd(),
    "android/app/src/main/res/values/strings.xml",
  );

  if (!fs.existsSync(stringsPath)) {
    console.log("⚠️  strings.xml (Android) não encontrado, pulando...");
    return;
  }

  let content = fs.readFileSync(stringsPath, "utf-8");
  content = content.replace(
    /<string name="app_name">.*?<\/string>/,
    `<string name="app_name">${config.displayName}</string>`,
  );

  fs.writeFileSync(stringsPath, content);
  console.log("✅ strings.xml (Android) atualizado");
}

function updateIosPlist(config: RenameConfig): void {
  const iosDir = path.join(process.cwd(), "ios");

  if (!fs.existsSync(iosDir)) {
    console.log("⚠️  Pasta ios/ não encontrada, pulando...");
    return;
  }

  // Encontrar a pasta do app (pode ter nome diferente)
  const appFolders = fs.readdirSync(iosDir).filter((item) => {
    const itemPath = path.join(iosDir, item);
    return (
      fs.statSync(itemPath).isDirectory() &&
      fs.existsSync(path.join(itemPath, "Info.plist"))
    );
  });

  if (appFolders.length === 0) {
    console.log("⚠️  Info.plist (iOS) não encontrado, pulando...");
    return;
  }

  const plistPath = path.join(iosDir, appFolders[0], "Info.plist");
  let content = fs.readFileSync(plistPath, "utf-8");

  // Atualizar CFBundleDisplayName
  content = content.replace(
    /(<key>CFBundleDisplayName<\/key>\s*<string>).*?(<\/string>)/,
    `$1${config.displayName}$2`,
  );

  // Atualizar scheme no CFBundleURLSchemes
  content = content.replace(
    /(<string>)[a-z0-9-]+(<\/string>\s*<string>com\.)/,
    `$1${config.scheme}$2`,
  );

  content = content.replace(
    /(com\.)([a-z0-9]+)(<\/string>)/g,
    `$1${config.scheme}$3`,
  );

  content = content.replace(
    /(<string>exp\+)[a-z0-9-]+(<\/string>)/,
    `$1${config.projectName}$2`,
  );

  fs.writeFileSync(plistPath, content);
  console.log("✅ Info.plist (iOS) atualizado");
}

async function main() {
  try {
    const config = await getConfig();

    console.log("\n🔄 Atualizando arquivos...\n");

    updateAppJson(config);
    updatePackageJson(config);
    updateAndroidStrings(config);
    updateIosPlist(config);

    console.log("\n✨ Renomeação concluída com sucesso!\n");
    console.log("📝 Próximos passos:");
    console.log("   1. Execute: npx expo prebuild --clean");
    console.log("   2. Execute: npm install");
    console.log("   3. Teste o app: npm run android ou npm run ios\n");
  } catch (error) {
    console.error("\n❌ Erro durante a renomeação:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
