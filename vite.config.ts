import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const baseDefault = "/cst_engagement/dist";

type ViteConfig = {
  command: string;
  mode: string;
};

export default defineConfig(({ mode }: ViteConfig) => {
  const generateScopedName = "[local]__[hash:base64:3]";
  const base = mode === "production" ? baseDefault : "/";

  return {
    base: base,
    manifest: true,
    resolve: {
      alias: {
        assets: "/src/assets",
        components: "/src/components",
        modules: "/src/modules",
        types: "/src/types",
        // hooks: "/src/hooks",
        helpers: "/src/helpers",
        // services: "/src/services",
      },
    },
    plugins: [react()],
    css: {
      modules: {
        generateScopedName: generateScopedName,
      },
    },
  };
});
