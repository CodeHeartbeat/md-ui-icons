import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    outDir: "dist/es",
    lib: {
      name: "md-ui-icons",
      fileName: "md-ui-icons",
      entry: resolve(import.meta.dirname, "src/vue/index.ts"),
      formats: ["es"],
    },
    rolldownOptions: {
      // https://rolldown.rs/reference/
      external: ["vue"],
    },
  },
});
