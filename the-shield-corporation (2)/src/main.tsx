import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Suspense fallback={<div role='status' className='grid min-h-screen place-items-center bg-bg-global text-sm text-navy'>Chargement de la page...</div>}>
        <App />
      </Suspense>
    </LanguageProvider>
  </StrictMode>,
);
