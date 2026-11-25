import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { yesteroPages } from '../src/data/yestero';

const template = await readFile('dist/index.html', 'utf8');
const root = '<div id="root"></div>';
if (!template.includes(root)) {
  throw new Error('The built index.html is missing the app root.');
}

for (const page of yesteroPages) {
  const routePath = join('dist', page.route.slice(1));
  const markup = renderToString(<App initialRoute={page.route} />);
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>Yestero ${page.title}</title>`)
    .replace(root, () => `<div id="root" data-route="${page.route}">${markup}</div>`);
  await mkdir(routePath, { recursive: true });
  await writeFile(join(routePath, 'index.html'), html);
}
