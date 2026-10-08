import PageHeader from '../components/ui/PageHeader.jsx';
import State from '../components/ui/State.jsx';
import EventCard from '../components/events/EventCard.jsx';
import useFetch from '../hooks/useFetch.js';
import { getEvents } from '../api/content.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Events() {
  const { t } = useLang();
  const { data, loading, error } = useFetch(() => getEvents());
  return (
    <>
      <PageHeader title={t('p.events')} intro={t('p.events.intro')} />
      <section className="container-x py-12">
        <State loading={loading} error={error} empty={data && !data.length && 'No upcoming events yet. Check back soon.'}>
          <div className="grid gap-6 md:grid-cols-2">{data?.map((e) => <EventCard key={e.id} e={e} />)}</div>
        </State>
      </section>
    </>
  );
}
