import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import {getPageRoute} from './routes';
import './index.css';

const root = document.getElementById('root')!;
const initialRoute = getPageRoute(window.location.pathname, window.location.hash);
const app = (
  <StrictMode>
    <App initialRoute={initialRoute} />
  </StrictMode>
);

if (root.dataset.route === initialRoute) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
