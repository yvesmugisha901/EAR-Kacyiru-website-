import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader.jsx';
import State from '../components/ui/State.jsx';
import SermonCard from '../components/sermons/SermonCard.jsx';
import useFetch from '../hooks/useFetch.js';
import useDebounce from '../hooks/useDebounce.js';
import { getSermons } from '../api/content.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Sermons() {
  const { t } = useLang();
  const [q, setQ] = useState('');
  const [language, setLanguage] = useState('');
  const dq = useDebounce(q);
  const { data, loading, error } = useFetch(() => getSermons({ q: dq, language }), [dq, language]);
  const field = 'rounded-full border border-cyprus/30 bg-white/70 px-4 py-2';
  return (
    <>
      <PageHeader title={t('p.sermons')} intro={t('p.sermons.intro')} />
      <section className="container-x py-12">
        <div className="flex flex-wrap gap-3" role="search">
          <label className="sr-only" htmlFor="q">Search sermons</label>
          <input id="q" type="search" placeholder={t('sermons.search')} value={q} onChange={(e) => setQ(e.target.value)} className={`${field} w-full sm:w-80`} />
          <label className="sr-only" htmlFor="lang">Language</label>
          <select id="lang" value={language} onChange={(e) => setLanguage(e.target.value)} className={field}>
            <option value="">{t('sermons.all')}</option>
            <option value="en">English</option>
            <option value="rw">Kinyarwanda</option>
          </select>
        </div>
        <State loading={loading} error={error} empty={data && !data.length && 'No sermons match your search.'}>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((s) => <SermonCard key={s.id} s={s} />)}
          </div>
        </State>
      </section>
    </>
  );
}
