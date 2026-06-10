# @md-ui/icons

Vue SVG 图标组件库，支持通过 Node 脚本自动化生成图标组件及对应的类型声明文件。

## 特性

- **自动化生成**：运行脚本即可根据 `src/svg` 目录下的 SVG 文件自动生成 Vue 组件、入口文件及类型声明
- **双模式产物**：基于 Vite 打包，同时输出 **ES Module** 与 **UMD** 两种格式
- **TypeScript 支持**：使用 `vue-tsc` 生成类型声明文件，提供完整的类型提示

## 目录结构

```
src/
├── script/
│   └── generate.ts          # Node 自动化脚本：读取 SVG 并生成 Vue 组件与入口文件
├── svg/
│   ├── account.svg
│   ├── add-circle-plain.svg
│   ├── alert.svg
│   ├── arrow-down.svg
│   ├── arrow-up.svg
│   ├── calendar.svg
│   ├── close.svg
│   ├── ...                  # 其他 SVG 图标文件
│   └── workbench.svg
├── vue/                     # 自动生成（运行 generate.ts 后生成）
│   ├── components/          # 生成的 Vue 单文件组件
│   │   ├── account.vue
│   │   ├── add-circle-plain.vue
│   │   └── ...
│   └── index.ts             # 统一入口文件，导出所有图标组件
```

## 构建流程

执行以下命令即可完成完整的生成与打包流程：

```bash
pnpm build
```

该命令包含三个步骤：

1. **`pnpm run gen`**
   - 运行 `src/script/generate.ts` 脚本
   - 读取 `src/svg` 下的所有 `.svg` 文件
   - 自动生成对应的 Vue 组件到 `src/vue/components/`
   - 生成统一的入口文件 `src/vue/index.ts`

2. **`pnpm run build-only`**
   - 使用 Vite 同时构建 ES 和 UMD 两种产物
   - ES 产物输出至 `dist/es/`
   - UMD 产物输出至 `dist/umd/`

3. **`pnpm run build:types`**
   - 使用 `vue-tsc` 生成类型声明文件
   - 输出至 `dist/types/`

## 产物说明

| 产物      | 路径                           | 说明                              |
| --------- | ------------------------------ | --------------------------------- |
| ES Module | `dist/es/md-ui-icons.js`       | 现代模块化方案，支持 Tree Shaking |
| UMD       | `dist/umd/md-ui-icons.umd.cjs` | 兼容多种加载方式的通用模块        |
| 类型声明  | `dist/types/index.d.ts`        | TypeScript 类型定义文件           |

## 独立命令

```bash
# 仅生成图标组件（不打包）
pnpm run gen

# 仅打包（不重新生成组件）
pnpm run build-only

# 仅生成类型声明
pnpm run build:types

# 分别构建 ES / UMD
pnpm run build-es
pnpm run build-umd
```

## 技术栈

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [vue-tsc](https://github.com/vuejs/language-tools)
