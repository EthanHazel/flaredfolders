import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const ROOT = process.cwd();
const PKG_PATH = path.join(ROOT, "package.json");
const OUT_PATH = path.join(ROOT, "src/stores/licenses.json");

const LICENSE_FILES = [
  "LICENSE",
  "LICENSE.md",
  "LICENSE.markdown",
  "LICENSE.txt",
  "LICENCE",
  "LICENCE.md",
  "LICENCE.markdown",
  "LICENCE.txt",
];

function findLicenseFile(pkgDir) {
  for (const file of LICENSE_FILES) {
    const full = path.join(pkgDir, file);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function resolvePackageDir(pkgName) {
  try {
    // Resolve the main entry of the package
    let mainPath = require.resolve(pkgName);
    let dir = path.dirname(mainPath);

    // Walk up until we find package.json
    while (!fs.existsSync(path.join(dir, "package.json"))) {
      const parent = path.dirname(dir);
      if (parent === dir) throw new Error("package.json not found");
      dir = parent;
    }

    return dir;
  } catch (e) {
    console.error(`Failed to resolve ${pkgName}`, e);
    return null;
  }
}

const pkg = JSON.parse(fs.readFileSync(PKG_PATH, "utf8"));

const deps = {
  ...pkg.dependencies,
  ...pkg.optionalDependencies,
};

const result = {};

for (const [name, versionRange] of Object.entries(deps)) {
  const dir = resolvePackageDir(name);

  if (!dir) {
    console.warn(`Skipping ${name} (not resolvable)`);
    continue;
  }

  if (name === "fs") {
    console.warn(`Skipping ${name} (Security holding package)`);
    continue;
  }

  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(dir, "package.json"), "utf8"),
  );

  const licenseFile = findLicenseFile(dir);
  const licenseText = licenseFile ? fs.readFileSync(licenseFile, "utf8") : null;

  result[name] = {
    version: pkgJson.version,
    license: pkgJson.license || "Unknown",
    licenseText,
  };
}

fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
console.log(`✔ Licenses generated (${Object.keys(result).length} packages)`);
