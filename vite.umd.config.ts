import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    // vite生产版本配置：https://cn.vitejs.dev/guide/build
    outDir: "dist/umd",
    lib: {
      entry: resolve(import.meta.dirname, "src/vue/index.ts"),
      name: "md-ui-icons",
      fileName: "md-ui-icons",
      formats: ["umd"],
    },
    rolldownOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named",
      },
    },
  },
});
