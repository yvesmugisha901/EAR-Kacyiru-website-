import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import { getEvents } from '../../api/content.js';
import { fmtDate, fmtTime } from '../../utils/format.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function UpcomingEvents() {
  const { t } = useLang();
  const { data } = useFetch(() => getEvents(3));
  if (!data?.length) return null;
  return (
    <section className="container-x py-16 md:py-20" aria-labelledby="ev-h">
      <div className="flex items-end justify-between gap-4">
        <h2 id="ev-h" className="text-3xl sm:text-4xl">{t('events.title')}</h2>
        <Link to="/events" className="text-sm font-semibold underline underline-offset-4">{t('events.all')}</Link>
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {data.map((e) => (
          <li key={e.id} className="rounded-3xl border border-cyprus/15 bg-white/50 p-6">
            <p className="text-sm font-medium text-brick">{fmtDate(e.startsAt)}</p>
            <h3 className="mt-1 text-xl">{e.title}</h3>
            <p className="mt-2 text-sm">{fmtTime(e.startsAt)} · {e.location}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
