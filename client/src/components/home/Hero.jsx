import { Link } from 'react-router-dom';
import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLang();
  const [en, rw] = church.services;

  return (
    <section className="relative overflow-hidden bg-cyprus text-sand">
      {/* Photo: on top for mobile, right half edge-to-edge on desktop */}
      <div className="relative h-64 sm:h-80 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2">
        <img
          src="/images/church-1.jpg"
          alt="The brick front of EAR Kacyiru church with its white porch and cross"
          className="h-full w-full object-cover"
          fetchpriority="high"
        />
        {/* Fades the photo into the green so the text stays calm and readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-cyprus via-transparent to-transparent md:bg-gradient-to-r md:from-cyprus md:via-cyprus/25 md:to-transparent"
        />
      </div>

      <div className="container-x relative">
        <div className="hero-rise pb-16 pt-6 md:max-w-[48%] md:py-28 lg:py-32">
          <h1 className="text-4xl leading-[1.1] text-sand sm:text-5xl lg:text-[3.4rem]">
            {t('hero.tagline')}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-sand/85">
            {t('hero.intro', { name: church.name, en: en.start, rw: rw.start })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#service-times" className="btn-light">{t('hero.times')}</a>
            <Link to="/sermons" className="btn border border-sand/60 text-sand hover:bg-sand/10">
              {t('hero.watch')}
            </Link>
          </div>
          <p className="mt-10 text-sm text-sand/70">{church.address}</p>
        </div>
      </div>
    </section>
  );
}