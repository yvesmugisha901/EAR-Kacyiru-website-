import PageHeader from '../components/ui/PageHeader.jsx';
import { about } from '../data/content.js';
import { church } from '../data/church.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function About() {
  const { t } = useLang();
  return (
    <>
      <PageHeader title={t('p.about')} intro={`${church.fullName}, ${t('diocese')}.`} />
      <div className="container-x space-y-16 py-14">
        <section className="grid gap-8 md:grid-cols-2" aria-label="Mission and vision">
          <div><h2 className="text-3xl">Our mission</h2><p className="mt-3 leading-8">{about.mission}</p></div>
          <div><h2 className="text-3xl">Our vision</h2><p className="mt-3 leading-8">{about.vision}</p></div>
        </section>
        <section aria-labelledby="lead-h">
          <h2 id="lead-h" className="text-3xl">Leadership</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {about.leadership.map((p) => (
              <li key={p.name} className="rounded-3xl border border-cyprus/15 bg-white/50 p-6">
                <h3 className="text-xl">{p.name}</h3><p className="mt-1 text-sm">{p.role}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="bel-h">
          <h2 id="bel-h" className="text-3xl">What we believe</h2>
          <dl className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {about.beliefs.map(([t, d]) => (
              <div key={t} className="border-t border-cyprus/25 pt-3"><dt className="font-display text-xl text-cyprus">{t}</dt><dd className="mt-1 leading-7">{d}</dd></div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="his-h" className="max-w-prose">
          <h2 id="his-h" className="text-3xl">Our history</h2>
          {about.history.map((p) => <p key={p} className="mt-4 leading-8">{p}</p>)}
        </section>
      </div>
    </>
  );
}
