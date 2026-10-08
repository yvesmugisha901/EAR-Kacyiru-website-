import PageHeader from '../components/ui/PageHeader.jsx';
import { choirs } from '../data/content.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Choirs() {
  const { t } = useLang();
  return (
    <>
      <PageHeader title={t('p.choirs')} intro={t('p.choirs.intro')} />
      <section className="container-x py-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {choirs.map((c) => (
            <li key={c.name} className="rounded-3xl border border-cyprus/15 bg-white/50 p-6">
              <h2 className="text-2xl">{c.name}</h2>
              <p className="mt-3 leading-7">{c.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
