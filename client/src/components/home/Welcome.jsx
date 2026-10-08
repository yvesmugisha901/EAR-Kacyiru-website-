import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function Welcome() {
  const { t } = useLang();
  return (
    <section className="bg-sand-deep" aria-labelledby="welcome-h">
      <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
<img src="/images/church-2.jpg" alt="The front of EAR Kacyiru church with its noticeboard and white porch" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        <div>
          <h2 id="welcome-h" className="text-3xl sm:text-4xl">{t('welcome.title')}</h2>
          <p className="mt-5 max-w-prose leading-8">
            {t('welcome.body', { name: church.name, diocese: t('diocese') })}
          </p>
        </div>
      </div>
    </section>
  );
}
