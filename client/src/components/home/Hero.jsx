import { Link } from 'react-router-dom';
import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLang();
  const [en, rw] = church.services;
  return (
    <section className="bg-cyprus text-sand">
      <div className="container-x grid items-end gap-10 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pt-20">
        <div className="hero-rise pb-14 md:pb-24">
          <h1 className="max-w-xl text-4xl leading-tight text-sand sm:text-5xl lg:text-6xl">
            {t('hero.tagline')}
          </h1>
          <p className="mt-6 max-w-md text-lg text-sand/85">
            {t('hero.intro', { name: church.name, en: en.start, rw: rw.start })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#service-times" className="btn-light">{t('hero.times')}</a>
            <Link to="/sermons" className="btn border border-sand/60 text-sand hover:bg-sand/10">{t('hero.watch')}</Link>
          </div>
        </div>
        {/* Arched frame echoes the pointed windows of the church */}
        <div className="hero-rise mx-auto w-full max-w-sm md:max-w-none" style={{ animationDelay: '.15s' }}>
          <img
            src="/images/church-2.jpg"
            alt="The brick front of EAR Kacyiru church with its white porch and cross"
            className="aspect-[4/5] w-full rounded-t-[999px] object-cover"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>
  );
}
