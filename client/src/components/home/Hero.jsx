import { Link } from 'react-router-dom';
import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function Hero() {
  const { t } = useLang();
  const sunday = [church.services[0], church.services[1]];

  return (
    <section className="border-b border-cyprus/10 bg-sand">
      <div className="container-x grid items-center gap-14 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20 lg:py-24">
        <div className="hero-rise">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brick">
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-4 max-w-xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-cyprus-dark/85">
            {t('hero.welcome')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#service-times" className="btn-primary">{t('hero.times')}</a>
            <Link to="/sermons" className="btn-outline">{t('hero.watch')}</Link>
          </div>

          <figure className="mt-10 max-w-md border-l-4 border-brick pl-5">
            <blockquote className="font-display text-xl italic leading-8 text-cyprus">
              “{t('hero.verse')}”
            </blockquote>
            <figcaption className="mt-2 text-sm font-semibold text-brick">
              {t('hero.verse.ref')}
            </figcaption>
          </figure>
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