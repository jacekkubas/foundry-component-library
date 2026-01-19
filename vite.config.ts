import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import preserveDirectives from "rollup-preserve-directives";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    libInjectCss(),
    dts({ tsconfigPath: "./tsconfig.app.json", include: ["lib/**/*"] }),
    preserveDirectives(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        main: resolve(__dirname, "lib/index.ts"),
        queries: resolve(__dirname, "lib/queries/index.ts"),
        types: resolve(__dirname, "lib/types/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "next"],
      input: Object.fromEntries(
        glob
          .sync("lib/**/*.{ts,tsx}", {
            ignore: ["lib/**/*.d.ts"],
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative("lib", file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
  assetsInclude: ["**/*.frag"],
  optimizeDeps: {
    exclude: ["foundry-component-library"],
  },
  server: {
    fs: {
      allow: [".."], // allow access to your local folder
    },
  },
});
