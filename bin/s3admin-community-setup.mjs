#!/usr/bin/env node --import=tsx

import fs from "node:fs"
import path from "node:path"

function findProjectRoot() {
  let dir = path.resolve(import.meta.dirname, "..")

  // Walk up to 5 levels to find the main project root
  for (let i = 0; i < 5; i++) {
    const pkgPath = path.join(dir, "package.json")
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
      // Must be the main project, not a @s3administrator/ package
      if (!pkg.name?.startsWith("@s3administrator/")) {
        if (fs.existsSync(path.join(dir, "src", "app"))) {
          return dir
        }
      }
    }
    dir = path.dirname(dir)
  }

  return process.cwd()
}

const projectRoot = findProjectRoot()

const { runCommunitySetup } = await import("../src/index.ts")

try {
  await runCommunitySetup(projectRoot)
} catch (error) {
  console.error("Community setup failed:", error)
  process.exit(1)
}
