import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function GivingCTA() {
  const { t } = useLang();
  return (
    <section className="bg-cyprus text-sand" aria-labelledby="give-h">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 id="give-h" className="text-3xl text-sand">{t('give.title')}</h2>
          <p className="mt-2 max-w-lg text-sand/85">{t('give.text')}</p>
        </div>
        <Link to="/giving" className="btn-light">{t('give.btn')}</Link>
      </div>
    </section>
  );
}
