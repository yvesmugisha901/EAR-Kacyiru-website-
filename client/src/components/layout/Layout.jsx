import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function Layout() {
  const { t } = useLang();
  const { pathname } = useLocation();
useEffect(() => {
  window.scrollTo(0, 0);
}, [pathname]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cyprus focus:px-4 focus:py-2 focus:text-sand">
        {t('skip')}
      </a>
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  );
}
