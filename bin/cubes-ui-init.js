#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function builder(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

function isPackageInstalled(pkg) {
  try {
    execSync(`npm ls ${pkg}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function installPackages() {
  const pkgs = ["tailwindcss", "@tailwindcss/vite"].filter(
    (pkg) => !isPackageInstalled(pkg.split("@")[0])
  );

  if (pkgs.length > 0) {
    builder(`npm install -D ${pkgs.join(" ")}`);
  } else {
    console.log("✅ Tailwind-related packages already installed.");
  }
}

function updateViteConfig() {
  const viteConfigPathTs = path.resolve(process.cwd(), "vite.config.ts");
  const viteConfigPathJs = path.resolve(process.cwd(), "vite.config.js");
  let viteConfigPath = fs.existsSync(viteConfigPathTs)
    ? viteConfigPathTs
    : viteConfigPathJs;

  if (!viteConfigPath) {
    console.warn("⚠ vite.config.ts/js not found.");
    return;
  }

  let content = fs.readFileSync(viteConfigPath, "utf-8");

  if (!content.includes("import tailwindcss from '@tailwindcss/vite'")) {
    content = `import tailwindcss from '@tailwindcss/vite'\n${content}`;
  }

  const pluginsRegex = /plugins\s*:\s*\[([\s\S]*?)\]/m;
  if (pluginsRegex.test(content)) {
    content = content.replace(
      pluginsRegex,
      (match, p1) =>
        `plugins: [\n    tailwindcss(),\n${
          p1.trim() ? "    " + p1.trim() + "\n" : ""
        }]`
    );
  } else {
    content += `\nexport default defineConfig({\n  plugins: [tailwindcss()],\n});\n`;
  }

  fs.writeFileSync(viteConfigPath, content);
  console.log("🛠️ Vite config updated.");
}

function createCssImport() {
  const cssPath = path.resolve(process.cwd(), "src/index.css");
  const lines = [
    '@import "tailwindcss";',
    '@import "cubes-ui/dist/index.css";',
    '@source "../node_modules/cubes-ui/dist/index.css";',
  ];

  if (!fs.existsSync(cssPath)) {
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    const content = lines
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim())
      .join("\n");

    fs.writeFileSync(cssPath, content);
    console.log("🎨 Created src/index.css with imports and source.");
  } else {
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    let updated = false;

    lines.forEach((line) => {
      if (!cssContent.includes(line)) {
        fs.appendFileSync(cssPath, `\n${line}`);
        updated = true;
      }
    });

    if (updated) {
      console.log("🧩 Updated src/index.css with missing imports.");
    } else {
      console.log("✅ src/index.css is already up-to-date.");
    }
  }
}

function run() {
  installPackages();
  updateViteConfig();
  createCssImport();
  console.log(`
🎉 Setup Complete!
✅ Tailwind CSS and cubes-ui are integrated.
🚀 Run your dev server with: npm run dev or vite
`);
}

run();
