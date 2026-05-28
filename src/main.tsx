import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted fonts (no third-party request, no CLS from DNS).
// Fraunces: standard axes (opsz + wght), upright + italic — the italic carries
// the brand's display emphasis and the "Designed by Camm" signature.
import '@fontsource-variable/fraunces/standard.css';
import '@fontsource-variable/fraunces/standard-italic.css';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';

import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
