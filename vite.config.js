import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isLib = process.env.LIB === "1";

/**
 * One config for both:
 * - LIB=1 vite build      -> builds the library to dist/
 * - vite build            -> builds the demo    to dist/demo/
 */
export default defineConfig({
  plugins: [react()],

  // Demo uses /demo as the root so index.html loads assets correctly in dev
  root: isLib ? process.cwd() : path.resolve(process.cwd(), "demo"),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    // guard against duplicate React in dev (especially if linked locally)
    dedupe: ["react", "react-dom"]
  },

  // Make demo portable under any path (e.g., yoursite.com/dist/demo/)
  base: isLib ? "/" : "./",

  build: isLib
    ? {
        // -------- LIBRARY BUILD --------
        lib: {
          entry: path.resolve(__dirname, "src/index.jsx"),
          name: "alloy-react",
          fileName: (format) =>
            format === "es" ? "alloy-react.es.js" : "alloy-react.cjs.js",
          formats: ["es", "cjs"]
        },
        rollupOptions: {
          // Critical: do NOT bundle React; also externalize the JSX runtime
          external: ["react", "react-dom", "react/jsx-runtime"],
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
        // -------- DEMO BUILD --------
        outDir: "dist/demo",
        sourcemap: true,
        // keep library files if you run build:lib before/after
        emptyOutDir: false
      },

  server: {
    open: true,
    port: 5173
  }
});
