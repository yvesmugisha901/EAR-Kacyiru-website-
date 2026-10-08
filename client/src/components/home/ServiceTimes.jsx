import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function ServiceTimes() {
  const { t } = useLang();
  return (
    <section id="service-times" className="container-x scroll-mt-16 py-16 md:py-20" aria-labelledby="times-h">
      <h2 id="times-h" className="text-3xl sm:text-4xl">{t('times.title')}</h2>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {church.services.map((s) => (
          <li key={s.id} className="rounded-3xl border border-cyprus/15 bg-white/50 p-6">
            <p className="text-sm font-medium text-brick">{t('days.' + s.day)}</p>
            <h3 className="mt-1 text-2xl">{t('svc.' + s.id)}</h3>
            <p className="mt-4 font-display text-3xl text-cyprus">{s.start} – {s.end}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
