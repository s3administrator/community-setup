import fs from "node:fs"
import path from "node:path"
import { COMMUNITY_STUBS } from "./registry.ts"
import { generateStubContent, writeStubFile, isGeneratedFile } from "./stub-generator.ts"

const STUBS_MARKER_FILE = ".s3admin-stubs"

/**
 * Check if any cloud packages are installed.
 * If they are, the cloud setup will handle stub generation — we skip.
 */
function hasCloudPackages(projectRoot: string): boolean {
  const knownPackages = ["auth", "billing", "admin", "audit", "marketing"]
  return knownPackages.some((name) => {
    const pkgDir = path.join(projectRoot, "node_modules", "@s3administrator", name)
    return fs.existsSync(pkgDir)
  })
}

/**
 * Load the list of previously generated stubs
 */
function loadGeneratedStubs(projectRoot: string): string[] {
  const markerPath = path.join(projectRoot, STUBS_MARKER_FILE)
  if (!fs.existsSync(markerPath)) return []

  const content = fs.readFileSync(markerPath, "utf-8")
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

/**
 * Save the list of generated stubs
 */
function saveGeneratedStubs(projectRoot: string, stubs: string[]): void {
  const markerPath = path.join(projectRoot, STUBS_MARKER_FILE)
  fs.writeFileSync(markerPath, stubs.join("\n") + "\n", "utf-8")
  console.log(`\n✓ Tracked ${stubs.length} generated files in ${STUBS_MARKER_FILE}`)
}

/**
 * Clean up previously generated stubs that are no longer in the registry
 */
function cleanupOldStubs(
  projectRoot: string,
  oldStubs: string[],
  newStubs: string[],
): void {
  const newStubsSet = new Set(newStubs)
  const toRemove = oldStubs.filter((stub) => !newStubsSet.has(stub))

  for (const stubPath of toRemove) {
    const fullPath = path.join(projectRoot, stubPath)
    if (fs.existsSync(fullPath) && isGeneratedFile(fullPath)) {
      fs.unlinkSync(fullPath)
      console.log(`  ✓ Removed: ${stubPath}`)
    }
  }

  if (toRemove.length > 0) {
    console.log(`\n✓ Cleaned up ${toRemove.length} stale stubs`)
  }
}

/**
 * Main community setup function
 */
export async function runCommunitySetup(projectRoot: string): Promise<void> {
  console.log("🔧 S3 Administrator Community Setup\n")

  if (hasCloudPackages(projectRoot)) {
    console.log("✓ Cloud packages detected — skipping community setup (cloud setup will handle stubs)")
    return
  }

  console.log("Generating community fallback stubs...\n")

  const oldStubs = loadGeneratedStubs(projectRoot)
  const generatedPaths: string[] = []

  for (const entry of COMMUNITY_STUBS) {
    const content = generateStubContent(entry)
    if (content === null) continue // skip entries

    const written = writeStubFile(projectRoot, entry.path, content)
    if (written) {
      generatedPaths.push(entry.path)
    }
  }

  cleanupOldStubs(projectRoot, oldStubs, generatedPaths)
  saveGeneratedStubs(projectRoot, generatedPaths)

  console.log("\n✅ Community setup complete!")
}
