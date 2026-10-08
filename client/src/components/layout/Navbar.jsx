import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { church } from '../../data/church.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';

const links = [
  ['/about', 'nav.about'], ['/sermons', 'nav.sermons'], ['/events', 'nav.events'],
  ['/ministries', 'nav.ministries'], ['/choirs', 'nav.choirs'], ['/contact', 'nav.contact'],
];
const linkClass = ({ isActive }) =>
  `rounded px-1 py-1 text-sm font-medium transition-colors hover:text-white ${isActive ? 'underline underline-offset-8 text-white' : 'text-sand'}`;

export default function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-cyprus">
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <Link to="/" className="font-display text-xl font-semibold text-sand" onClick={() => setOpen(false)}>
          {church.name}
        </Link>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map(([to, label]) => (
            <li key={to}><NavLink to={to} className={linkClass}>{t(label)}</NavLink></li>
          ))}
          <li><Link to="/giving" className="btn-light !py-2">{t('nav.give')}</Link></li>
          <li><LanguageSwitcher /></li>
        </ul>
        <button
          className="rounded p-2 text-sand md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t('nav.close') : t('nav.open')}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="container-x flex flex-col gap-1 pb-5 md:hidden">
          {links.map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} className={`${linkClass} block py-2 text-base`} onClick={() => setOpen(false)}>{t(label)}</NavLink>
            </li>
          ))}
          <li className="pt-2"><Link to="/giving" className="btn-light" onClick={() => setOpen(false)}>{t('nav.give')}</Link></li>
          <li className="pt-2"><LanguageSwitcher /></li>
        </ul>
      )}
    </header>
  );
}
