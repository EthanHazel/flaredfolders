import checker from "license-checker";
import fs from "fs";
import path from "path";

checker.init(
  {
    start: process.cwd(),
    production: true,
    json: true,
  },
  (err, packages) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const outPath = path.join(process.cwd(), "src/stores/licenses.json");
    fs.writeFileSync(outPath, JSON.stringify(packages, null, 2));
    console.log("Licenses written to", outPath);
  },
);
