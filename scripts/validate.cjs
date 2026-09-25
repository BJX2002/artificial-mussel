const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
global.window = {};
require(path.join(root, "dist", "data.js"));

const strings = window.GAME_DATA.strings;
const englishKeys = new Set(Object.keys(strings.en));
let failed = false;

for (const locale of ["zh-Hant", "zh-Hans"]) {
  const keys = new Set(Object.keys(strings[locale]));
  const missing = [...englishKeys].filter(key => !keys.has(key));
  const extra = [...keys].filter(key => !englishKeys.has(key));
  console.log(`${locale}: missing=${missing.length} extra=${extra.length}`);
  if (missing.length || extra.length) {
    failed = true;
    console.log({ missing, extra });
  }
}

const appSource = fs.readFileSync(path.join(root, "dist", "app.js"), "utf8");
const staticKeys = [...appSource.matchAll(/\bt\("([^"]+)"/g)].map(match => match[1]);
const missingStaticKeys = [...new Set(staticKeys.filter(key => !englishKeys.has(key)))].sort();
console.log(`static translation keys missing=${missingStaticKeys.length}`);
if (missingStaticKeys.length) {
  failed = true;
  console.log(missingStaticKeys);
}

const forbidden = ["<select", "select-reason", "toggle-location", "没有特别理由", "沒有特別理由", "No particular reason"];
const combinedSource = ["index.html", "app.js", "data.js"].map(file => fs.readFileSync(path.join(root, "dist", file), "utf8")).join("\n");
const foundForbidden = forbidden.filter(value => combinedSource.includes(value));
console.log(`forbidden dropdown markers=${foundForbidden.length}`);
if (foundForbidden.length) {
  failed = true;
  console.log(foundForbidden);
}

for (const asset of ["index.html", "app.js", "data.js", "styles.css", path.join("assets", "blue-bay-mission.png")]) {
  const assetPath = path.join(root, "dist", asset);
  if (!fs.existsSync(assetPath) || fs.statSync(assetPath).size === 0) {
    failed = true;
    console.log(`Missing or empty: ${asset}`);
  }
}

if (failed) process.exit(1);
console.log("Validation passed.");
