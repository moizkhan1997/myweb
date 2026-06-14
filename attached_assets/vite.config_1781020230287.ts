import process from "node:process";

// Set the Nitro preset dynamically based on the build environment.
// This overrides the Cloudflare default target of the Lovable config wrapper
// without breaking the Lovable preview editor.
if (process.env.VERCEL) {
  process.env.NITRO_PRESET = "vercel";
} else if (process.env.NETLIFY) {
  process.env.NITRO_PRESET = "netlify";
}

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
