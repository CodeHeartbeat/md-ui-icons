/**
 * 图标组件生成脚本
 * 用于读取 svg 目录下的所有 svg 文件，并生成对应的 Vue 组件和入口文件
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * 获取目录下所有 svg 文件
 * @param dirPath 目录路径
 * @returns svg 文件路径数组
 */
function getSvgFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath);
  return files.filter((file) => file.endsWith(".svg")).map((file) => path.join(dirPath, file));
}

/**
 * 将文件名转换为 PascalCase（大驼峰）
 * @param fileName 文件名
 * @returns PascalCase 格式的名称
 */
function toPascalCase(fileName: string): string {
  const name = fileName.replace(/\.svg$/, "").toLowerCase();
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * 读取 svg 文件内容
 * @param filePath 文件路径
 * @returns 文件内容
 */
function readSvgContent(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * 创建 Vue 组件内容
 * @param componentName 组件名称
 * @param svgContent svg 内容
 * @returns Vue 组件代码
 */
function createVueComponent(componentName: string, svgContent: string): string {
  return `<script setup lang="ts">
defineOptions({
  name: '${componentName}',
});
</script>

<template>
  ${svgContent}
</template>
`;
}

/**
 * 创建统一入口文件内容
 * @param components 组件列表
 * @returns 统一入口文件代码
 */
function createMainIndexFile(components: string[], fileNames: string[]): string {
  const imports = components
    .map(
      (name, index) => `export { default as ${name} } from './components/${fileNames[index]}.vue';`,
    )
    .join("\n");
  return `${imports}
`;
}

/**
 * 主函数：执行生成流程
 */
async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // 路径配置
  const svgDir = path.join(__dirname, "../svg");
  const vueDir = path.join(__dirname, "../vue");
  const componentDir = path.join(vueDir, "./components");

  // 确保目录存在
  if (!fs.existsSync(vueDir)) {
    fs.mkdirSync(vueDir, { recursive: true });
  }
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // 获取所有 svg 文件
  const svgFiles = getSvgFiles(svgDir);

  if (svgFiles.length === 0) {
    console.log("No SVG files found in the svg directory.");
    return;
  }

  const componentNames: string[] = [];
  const fileNames: string[] = [];

  // 为每个 svg 文件生成组件
  for (const svgFile of svgFiles) {
    const fileName = path.basename(svgFile, ".svg");
    const componentName = toPascalCase(fileName);

    componentNames.push(componentName);
    fileNames.push(fileName);

    // 读取 svg 内容
    const svgContent = readSvgContent(svgFile);

    // 创建 Vue 组件
    const vueContent = createVueComponent(componentName, svgContent);
    const vueFilePath = path.join(componentDir, `${fileName}.vue`);
    fs.writeFileSync(vueFilePath, vueContent);
    console.log(`Created: ${vueFilePath}`);
  }

  // 生成统一入口文件
  const mainIndexContent = createMainIndexFile(componentNames, fileNames);
  const mainIndexFilePath = path.join(vueDir, "index.ts");
  fs.writeFileSync(mainIndexFilePath, mainIndexContent);
  console.log(`Created: ${mainIndexFilePath}`);

  console.log("\nIcon components generated successfully!");
}

// 执行主函数
main().catch((err) => {
  console.error("Error generating icon components:", err);
  process.exit(1);
});
