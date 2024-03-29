import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { importAssertionsPlugin } from 'rollup-plugin-import-assert'
import { importAssertions } from 'acorn-import-assertions'

const OUTPUT_DIR = 'es'

export default defineConfig([
  {
    input: ['src/index.ts'],
    output: {
      dir: OUTPUT_DIR,
      format: 'es',
    },
    plugins: [
      typescript({
        compilerOptions: { outDir: OUTPUT_DIR, declarationDir: OUTPUT_DIR },
      }),
      importAssertionsPlugin(),
    ],
    acornInjectPlugins: [importAssertions],
    strictDeprecations: true,
  },
])
