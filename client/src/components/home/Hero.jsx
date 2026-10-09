import { Link } from 'react-router-dom';
import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLang();
  const [en, rw] = church.services;
  const sunday = [en, rw];

  return (
    <section className="border-b border-cyprus/10 bg-sand">
      <div className="container-x grid items-center gap-14 py-14 md:grid-cols-[1fr_1.05fr] md:py-20 lg:py-24">
        <div className="hero-rise">
          <h1 className="max-w-xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {t('hero.tagline')}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-cyprus-dark/80">
            {t('hero.intro', { name: church.name, en: en.start, rw: rw.start })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#service-times" className="btn-primary">{t('hero.times')}</a>
            <Link to="/sermons" className="btn-outline">{t('hero.watch')}</Link>
          </div>
          <p className="mt-10 flex items-center gap-2 text-sm text-cyprus-dark/70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {church.address}
          </p>
        </div>

        <div className="hero-rise relative" style={{ animationDelay: '.15s' }}>
          <img
            src="/images/church-2.jpg"
            alt="The brick front of EAR Kacyiru church with its white porch and cross"
            className="aspect-[4/3] w-full rounded-3xl object-cover object-[center_55%]"
            fetchpriority="high"
          />
          <div className="relative -mt-12 ml-4 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-cyprus p-5 text-sand shadow-xl md:absolute md:-bottom-8 md:-left-10 md:mt-0 md:ml-0 md:w-80">
            <p className="text-sm font-medium text-sand/75">{t('days.Sunday')}</p>
            <ul className="mt-3 space-y-3">
              {sunday.map((s) => (
                <li
                  key={s.id}
                  className="flex items-baseline justify-between gap-4 border-t border-sand/20 pt-3 first:border-0 first:pt-0"
                >
                  <span className="text-sm">{t('svc.' + s.id)}</span>
                  <span className="font-display text-xl">{s.start}–{s.end}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}