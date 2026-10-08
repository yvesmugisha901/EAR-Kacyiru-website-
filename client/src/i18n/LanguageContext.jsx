import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import en from './locales/en.json';
import rw from './locales/rw.json';
import fr from './locales/fr.json';

const dict = { en, rw, fr };
const Ctx = createContext(null);

const read = () => {
  try { const v = localStorage.getItem('lang'); return dict[v] ? v : 'en'; } catch { return 'en'; }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(read);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* storage unavailable */ }
  }, [lang]);
  const t = useCallback((key, vars = {}) => {
    let s = dict[lang][key] ?? dict.en[key] ?? key;
    for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
    return s;
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
