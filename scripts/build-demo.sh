#!/usr/bin/env bash
set -euo pipefail

corepack yarn install --frozen-lockfile --non-interactive
corepack yarn vite build --mode demo

# The manifest lives under an immutable release while launches use the stable URL.
node --input-type=module <<'NODE'
import { readFileSync, rmSync, writeFileSync } from "node:fs";

const filename = "dist/site.webmanifest";
const manifest = JSON.parse(readFileSync(filename, "utf8"));
for (const icon of manifest.icons) {
  if (!icon.src.startsWith("/favicon/")) {
    throw new Error("Unexpected Tetris manifest icon path.");
  }
  icon.src = "." + icon.src;
}
manifest.start_url = "/tetris/";
manifest.scope = "/tetris/";
writeFileSync(filename, JSON.stringify(manifest, null, 2) + "\n");

// The shared origin owns robots.txt.
rmSync("dist/robots.txt");
NODE
