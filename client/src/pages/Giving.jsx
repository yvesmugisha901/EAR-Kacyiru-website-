import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader.jsx';
import { giving } from '../data/content.js';
import { useLang } from '../i18n/LanguageContext.jsx';

function Copy({ value }) {
  const [done, setDone] = useState(false);
  return (
    <button className="btn-outline !py-1.5" onClick={() => navigator.clipboard?.writeText(value).then(() => { setDone(true); setTimeout(() => setDone(false), 1800); })}>
      {done ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function Giving() {
  const { t } = useLang();
  return (
    <>
      <PageHeader title={t('p.giving')} intro={t('p.giving.intro')} />
      <section className="container-x grid gap-10 py-14 md:grid-cols-2">
        <div className="max-w-prose space-y-4 leading-8">
          <h2 className="text-3xl">Tithes and offerings</h2>
          <p>Giving is an act of worship. Tithes and offerings keep our services running, care for people in need and support the ministries of the parish.</p>
          <p>You can give in person during any service, or send your gift by mobile money or bank transfer using the details here. Please add your name and “tithe” or “offering” as the reference.</p>
        </div>
        <ul className="space-y-4">
          {Object.values(giving).map((g) => (
            <li key={g.label} className="flex items-center justify-between gap-4 rounded-3xl border border-cyprus/15 bg-white/50 p-5">
              <div><p className="text-sm font-medium text-brick">{g.label}</p><p className="font-display text-2xl text-cyprus">{g.value}</p></div>
              <Copy value={g.value} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
