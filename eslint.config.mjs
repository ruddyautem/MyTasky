import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "node_modules/**"]),
  {
    rules: {
      // Client-side hydration initializes state from browser storage after mount.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
