import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LanguageContext.jsx';

const langs = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'rw', short: 'RW', name: 'Kinyarwanda' },
  { code: 'fr', short: 'FR', name: 'Français' },
];

export default function LanguageSwitcher({ align = 'right' }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const btn = useRef(null);
  const current = langs.find((l) => l.code === lang) || langs[0];

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (!box.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (code) => {
    setLang(code);
    setOpen(false);
    btn.current?.focus();
  };

  return (
    <div ref={box} className="relative">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls="lang-menu"
        aria-label={`Language: ${current.name}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-sand/40 px-3.5 py-2 text-sm font-semibold text-sand transition-colors hover:bg-sand/10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
        {current.short}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          id="lang-menu"
          className={`absolute z-50 mt-2 min-w-[11rem] overflow-hidden rounded-2xl bg-sand p-1 text-cyprus shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {langs.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                aria-current={l.code === lang ? 'true' : undefined}
                onClick={() => choose(l.code)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-cyprus/10"
              >
                <span>{l.name}</span>
                {l.code === lang && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}