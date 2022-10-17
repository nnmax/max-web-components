import { esbuildPlugin } from '@web/dev-server-esbuild'

/** @type { import('@web/test-runner').TestRunnerConfig } */
export default {
  files: ['src/**/*.test.ts'],
  plugins: [esbuildPlugin({ ts: true })],
}
