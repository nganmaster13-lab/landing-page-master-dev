import type { PageRoute } from './types';

const routes = [
  '/',
  '/policy',
  '/terms',
  '/child-safety-standards',
  '/yestero/support',
  '/yestero/policy',
  '/yestero/terms',
] as const satisfies readonly PageRoute[];

export function getPageRoute(pathname: string, hash = ''): PageRoute {
  const path = findPageRoute(pathname);
  // Hash routes are a fallback for previews that restrict pushState.
  // A regular fragment on a document points to a section within that document.
  if (hash.startsWith('#/') || (path === '/' && hash)) {
    const hashRoute = findPageRoute(hash.slice(1));
    if (hashRoute) return hashRoute;
  }
  return path ?? '/';
}

function findPageRoute(path: string): PageRoute | undefined {
  const normalized = `/${path.toLowerCase().replace(/^\/+|\/+$/g, '')}`;
  return routes.find((route) => route === normalized);
}
