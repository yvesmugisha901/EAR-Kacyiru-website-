import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import { getSermons } from '../../api/content.js';
import SermonCard from '../sermons/SermonCard.jsx';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function FeaturedSermon() {
  const { t } = useLang();
  const { data } = useFetch(() => getSermons({ limit: 1 }));
  if (!data?.length) return null;
  return (
    <section className="bg-sand-deep" aria-labelledby="fs-h">
      <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <h2 id="fs-h" className="text-3xl sm:text-4xl">{t('sermon.latest')}</h2>
          <p className="mt-4 max-w-md leading-8">{t('sermon.text')}</p>
          <Link to="/sermons" className="btn-primary mt-6">{t('sermon.all')}</Link>
        </div>
        <SermonCard s={data[0]} />
      </div>
    </section>
  );
}
