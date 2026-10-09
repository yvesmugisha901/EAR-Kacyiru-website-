import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader.jsx';
import State from '../components/ui/State.jsx';
import YouthGallery from '../components/ministries/YouthGallery.jsx';
import useFetch from '../hooks/useFetch.js';
import { getMinistries } from '../api/content.js';
import { church } from '../data/church.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Ministries() {
  const { t } = useLang();
  const { data, loading, error } = useFetch(getMinistries);

  // The youth section also works when the backend is off, using the data in church.js
  const fallback = church.ministries.find((m) => m.id === 'youth');
  const apiYouth = data?.find((m) => m.slug === 'youth');
  const youth = {
    name: apiYouth?.name ?? fallback.name,
    summary: apiYouth?.summary ?? fallback.blurb,
    leader: apiYouth?.leader ?? church.youthLeader,
  };
  const slot = church.services.find((s) => s.id === 'youth');
  const others = data?.filter((m) => m.slug !== 'youth');

  return (
    <>
      <PageHeader title={t('p.ministries')} intro={t('p.ministries.intro')} />

      {/* Featured: youth ministry */}
      <section className="bg-sand-deep" aria-labelledby="youth-h">
        <div className="container-x py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brick">{t('min.featured')}</p>
            <h2 id="youth-h" className="mt-3 text-4xl sm:text-5xl">{youth.name}</h2>
            <p className="mt-4 text-lg leading-8">{youth.summary}</p>
            <dl className="mt-8 space-y-4 border-t border-cyprus/20 pt-6">
              <div className="flex gap-6">
                <dt className="w-24 shrink-0 text-sm font-semibold text-cyprus">{t('min.when')}</dt>
                <dd>{t('days.Monday')}, {slot.start}–{slot.end}</dd>
              </div>
              {youth.leader && (
                <div className="flex gap-6">
                  <dt className="w-24 shrink-0 text-sm font-semibold text-cyprus">{t('min.led')}</dt>
                  <dd>{youth.leader}</dd>
                </div>
              )}
            </dl>
            <div className="mt-8">
              <YouthGallery />
            </div>
          </div>
        </div>
      </section>

      {/* Other ministries */}
      <section className="container-x py-16 md:py-20" aria-labelledby="more-h">
        <h2 id="more-h" className="text-3xl sm:text-4xl">{t('min.more')}</h2>
        <State loading={loading} error={error}>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others?.map((m) => (
              <li key={m.id} className="rounded-3xl border border-cyprus/15 bg-white/50 p-6">
                <span className="block h-1 w-10 rounded bg-brick" aria-hidden="true" />
                <h3 className="mt-4 text-2xl">{m.name}</h3>
                <p className="mt-3 leading-7">{m.summary}</p>
                {m.leader && (
                  <p className="mt-4 text-sm font-semibold text-cyprus">{t('min.led')} {m.leader}</p>
                )}
              </li>
            ))}
          </ul>
        </State>
      </section>

      {/* Choirs call to action */}
      <section className="bg-cyprus text-sand">
        <div className="container-x flex flex-col items-start justify-between gap-5 py-12 sm:flex-row sm:items-center">
          <p className="font-display text-3xl text-sand">{t('min.choir.q')}</p>
          <Link to="/choirs" className="btn-light">{t('min.choir.link')}</Link>
        </div>
      </section>
    </>
  );
}