import { lazy, Suspense, useEffect, useState } from 'react'
import { parseShareHash } from './services/shareRouting'
import { AuthProvider } from './context/AuthContext'

import { LanguageProvider } from './context/LanguageContext'

const App = lazy(() => import('./App'));
const ShareModeWrapper = lazy(() => import('./components/ShareModeWrapper'));

export default function Root() {
  const [shareRoute, setShareRoute] = useState(() => parseShareHash());

  useEffect(() => {
    function onHashChange() {
      setShareRoute(parseShareHash());
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <Suspense fallback={null}>
          {shareRoute ? <ShareModeWrapper shareId={shareRoute.shareId} /> : <App />}
        </Suspense>
      </AuthProvider>
    </LanguageProvider>
  );
}
