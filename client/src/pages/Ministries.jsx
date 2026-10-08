import PageHeader from '../components/ui/PageHeader.jsx';
import State from '../components/ui/State.jsx';
import useFetch from '../hooks/useFetch.js';
import { getMinistries } from '../api/content.js';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Ministries() {
  const { t } = useLang();
  const { data, loading, error } = useFetch(getMinistries);
  return (
    <>
      <PageHeader title={t('p.ministries')} intro={t('p.ministries.intro')} />
      <section className="container-x py-12">
        <State loading={loading} error={error}>
          <ul className="grid gap-6 md:grid-cols-2">
            {data?.map((m) => (
              <li key={m.id} className="rounded-3xl border border-cyprus/15 bg-white/50 p-6">
                <h2 className="text-2xl">{m.name}</h2>
                <p className="mt-3 leading-7">{m.summary}</p>
                {m.leader && <p className="mt-3 text-sm font-semibold">Led by {m.leader}</p>}
              </li>
            ))}
          </ul>
        </State>
        <p className="mt-10">Love to sing? <Link to="/choirs" className="font-semibold underline underline-offset-4">Meet our choirs</Link>.</p>
      </section>
    </>
  );
}
