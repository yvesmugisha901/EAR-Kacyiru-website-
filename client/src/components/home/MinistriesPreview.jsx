import { Link } from 'react-router-dom';
import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function MinistriesPreview() {
  const { t } = useLang();
  return (
    <section className="container-x py-16 md:py-20" aria-labelledby="min-h">
      <div className="flex items-end justify-between gap-4">
        <h2 id="min-h" className="text-3xl sm:text-4xl">{t('min.title')}</h2>
        <Link to="/ministries" className="text-sm font-semibold text-cyprus underline underline-offset-4">{t('min.all')}</Link>
      </div>
      <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {church.ministries.map((m) => (
          <li key={m.id} className="border-t border-cyprus/25 pt-4">
            <h3 className="text-xl">{m.name}</h3>
            <p className="mt-2 text-sm leading-6">{m.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
