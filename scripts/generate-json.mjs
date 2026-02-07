import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

function extractYamlBlock(markdown) {
  const match = markdown.match(/```yaml\s*([\s\S]*?)\s*```/);
  if (!match) throw new Error("YAML code block (```yaml ... ```) not found.");
  return match[1];
}

function validate(schema, sourcePath) {
  if (!schema?.formId) throw new Error(`[${sourcePath}] formId is required`);
  if (!Array.isArray(schema?.fields)) throw new Error(`[${sourcePath}] fields must be an array`);

  const ids = new Set();
  for (const f of schema.fields) {
    if (!f.id) throw new Error(`[${sourcePath}] field.id is required`);
    if (ids.has(f.id)) throw new Error(`[${sourcePath}] duplicated field.id: ${f.id}`);
    ids.add(f.id);

    if (!f.label) throw new Error(`[${sourcePath}] field.label is required (id=${f.id})`);
    if (!f.type) throw new Error(`[${sourcePath}] field.type is required (id=${f.id})`);

    if (!f.required) f.required = { create: false, edit: false };
    f.required.create = !!f.required.create;
    f.required.edit = !!f.required.edit;
  }
}

function walkForms(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkForms(full));
    else if (entry.isFile() && entry.name === "form.md") out.push(full);
  }
  return out;
}

const root = process.cwd();
const mdFiles = walkForms(path.join(root, "forms"));

let changed = 0;

for (const mdPath of mdFiles) {
  const md = fs.readFileSync(mdPath, "utf-8");
  const schema = yaml.load(extractYamlBlock(md));
  validate(schema, mdPath);

  const outPath = path.join(path.dirname(mdPath), "form.schema.json");
  const json = JSON.stringify(schema, null, 2) + "\n";

  const prev = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf-8") : "";
  if (prev !== json) {
    fs.writeFileSync(outPath, json, "utf-8");
    changed++;
    console.log(`✅ updated: ${path.relative(root, outPath)}`);
  }
}

console.log(`Done. changed=${changed}`);
