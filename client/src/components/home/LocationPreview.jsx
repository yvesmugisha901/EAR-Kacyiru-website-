import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function LocationPreview() {
  const { t } = useLang();
  const { lat, lng } = church.coordinates;
  return (
    <section className="container-x grid gap-8 py-16 md:grid-cols-2 md:py-20" aria-labelledby="loc-h">
      <div>
        <h2 id="loc-h" className="text-3xl sm:text-4xl">{t('loc.title')}</h2>
        <address className="mt-5 text-lg not-italic leading-8">
          {church.address}<br />
          <a className="font-semibold underline underline-offset-4" href={church.phoneHref}>{church.phone}</a>
        </address>
        <a className="btn-primary mt-6" target="_blank" rel="noreferrer"
           href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}>{t('loc.directions')}</a>
      </div>
      <iframe
        title="Map showing EAR Kacyiru"
        loading="lazy"
        className="h-72 w-full rounded-3xl border-0"
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
      />
    </section>
  );
}
