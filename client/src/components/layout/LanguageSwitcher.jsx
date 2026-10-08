import { useLang } from '../../i18n/LanguageContext.jsx';

const langs = [['en', 'EN', 'English'], ['rw', 'RW', 'Kinyarwanda'], ['fr', 'FR', 'Français']];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="flex gap-1">
      {langs.map(([code, label, name]) => (
        <button key={code} lang={code} aria-pressed={lang === code} aria-label={name} onClick={() => setLang(code)}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${lang === code ? 'bg-sand text-cyprus' : 'border border-sand/40 text-sand hover:bg-sand/10'}`}>
          {label}
        </button>
      ))}
    </div>
  );
}
