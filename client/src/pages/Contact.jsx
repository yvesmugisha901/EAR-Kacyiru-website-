import ContactForm from '../components/contact/ContactForm.jsx';
import PrayerRequestForm from '../components/contact/PrayerRequestForm.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import { church } from '../data/church.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function Contact() {
  const { t } = useLang();
  const { lat, lng } = church.coordinates;
  return (
    <>
      <PageHeader title={t('p.contact')} intro={t('p.contact.intro')} />
      <div className="container-x grid gap-12 py-14 md:grid-cols-2">
        <section aria-labelledby="msg-h">
          <h2 id="msg-h" className="mb-5 text-3xl">{t('contact.send')}</h2>
          <ContactForm />
        </section>
        <div className="space-y-10">
          <section aria-labelledby="find-h">
            <h2 id="find-h" className="text-3xl">{t('contact.find')}</h2>
            <address className="mt-4 text-lg not-italic leading-8">
              {church.address}<br />
              <a className="underline" href={church.phoneHref}>{church.phone}</a><br />
              <a className="underline" href={`mailto:${church.email}`}>{church.email}</a>
            </address>
            <p className="mt-3 text-sm"><a className="underline" href={church.youtube} target="_blank" rel="noreferrer">YouTube</a></p>
            <iframe title="Map showing EAR Kacyiru" loading="lazy" className="mt-5 h-60 w-full rounded-3xl border-0"
              src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`} />
          </section>
          <section aria-labelledby="pray-h">
            <h2 id="pray-h" className="mb-5 text-3xl">{t('contact.prayer')}</h2>
            <PrayerRequestForm />
          </section>
        </div>
      </div>
    </>
  );
}
