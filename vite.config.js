import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Toggle between demo (default) and library build using env var LIB=1
const isLib = process.env.LIB === "1";

export default defineConfig({
  plugins: [react()],
  root: isLib ? process.cwd() : path.resolve(process.cwd(), "demo"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: isLib
    ? {
        lib: {
          entry: path.resolve(__dirname, "src/index.jsx"),
          name: "alloy-react",
          fileName: (format) =>
            format === "es" ? "alloy-react.es.js" : "alloy-react.cjs.js",
          formats: ["es", "cjs"]
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM"
            }
          }
        },
        sourcemap: true,
        emptyOutDir: true,
        outDir: "dist"
      }
    : {
        outDir: "dist-demo",
        sourcemap: true,
        emptyOutDir: true
      },
  server: {
    open: true,
    port: 5173
  }
});
