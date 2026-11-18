// Bundle scene.js (three.js inlined) once, then write one self-contained board per page into G-DESIGN/planches/v3/.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, page } from './pages.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..', '..', 'planches', 'v3');
mkdirSync(out, { recursive: true });

const res = await build({ entryPoints: [join(here, 'scene.js')], bundle: true, format: 'iife', minify: true, write: false, target: 'es2020' });
const js = res.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const chrome = readFileSync(join(here, '..', 'chrome.css'), 'utf8');
const ui = readFileSync(join(here, 'ui.css'), 'utf8');

for (const p of PAGES) {
  const html = page(p, ui, chrome, js);
  writeFileSync(join(out, p.file), html);
  console.log(p.file, (html.length / 1024).toFixed(0) + ' KB');
}
