/**
  * 把 Storefront Ad Studio 的单文件原型同步进 public/studio.html。
 *
 * 源文件按 Artifact 的约定书写（没有 doctype / html / head / body，
 * 由发布端补全）。作为独立静态页部署时必须自己补上，否则浏览器
 * 走怪异模式（document.compatMode === "BackCompat"）。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = process.env.STUDIO_SRC
  || resolve(here, '../../../VertensAI_AdDesignStudio.html');
const OUT = resolve(here, '../public/studio.html');
const SPLIT = '<nav class="nav">';

const raw = readFileSync(SRC, 'utf8');
const at = raw.indexOf(SPLIT);
if (at < 0) throw new Error(`sync-studio: "${SPLIT}" not found in ${SRC}`);

const html = `<!doctype html>
<html lang="en">
<head>
${raw.slice(0, at).trim()}
</head>
<body>
${raw.slice(at).trim()}
</body>
</html>
`;

writeFileSync(OUT, html);
console.log(`sync-studio: ${(html.length / 1024).toFixed(0)}KB -> public/studio.html`);

// 注意：只在本地跑（源文件不在仓库里）。产物 public/studio.html 已提交，
// Vercel 构建不依赖这个脚本。
