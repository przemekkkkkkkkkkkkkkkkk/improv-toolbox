import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import pkg from './package.json' with { type: 'json' }

// SSG migration: switched from @vitejs/plugin-react to React Router framework
// mode (reactRouter plugin) to use RR7's built-in build-time prerendering.
//
// vite-plugin-pwa is temporarily disabled: RR framework mode changes the build
// pipeline (multi-environment, output under build/client), so the PWA service
// worker + manifest need deliberate re-integration. Tracked as its own
// follow-up milestone; the previous VitePWA config lives in git history.

// One id per build, baked into the bundle AND written to /version.json. A
// running client whose baked id differs from the live /version.json is stale
// and force-refreshes itself (src/pwa/registerSW.ts).
const BUILD_ID = Date.now().toString(36)

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_ID__: JSON.stringify(BUILD_ID),
  },
  plugins: [
    reactRouter(),
    tailwindcss(),
    {
      name: 'version-json',
      applyToEnvironment: (env) => env.name === 'client',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'version.json',
          source: JSON.stringify({ version: pkg.version, build: BUILD_ID }),
        })
      },
    },
  ],
})
