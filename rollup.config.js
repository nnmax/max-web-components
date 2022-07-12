import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

const OUTPUT_DIR = "es";

export default defineConfig([{
  input: ["src/index.ts", "src/utils/PubSub.ts"],
  output: {
    dir: OUTPUT_DIR,
    format: "es",
  },
  plugins: [
    typescript({
      compilerOptions: { outDir: OUTPUT_DIR, declarationDir: OUTPUT_DIR },
    }),
  ],
}, {
  input: ["src/index.ts", "src/utils/PubSub.ts"],
  output: {
    dir: 'docs',
    format: "es",
  },
  plugins: [
    typescript({
      compilerOptions: { declaration: false },
    }),
  ],
}]);
