import { useLang } from '../../i18n/LanguageContext.jsx';

// Change this if your files end differently (for example 'jpg' or 'png')
const ext = 'jpeg';

const photos = [
  {
    src: `/images/youth/trip1.${ext}`,
    alt: 'The youth ministry group posing together on the grass beside the lake',
    className: 'col-span-full aspect-[4/3] sm:aspect-[16/9] object-[center_45%]',
  },
  {
    src: `/images/youth/trip2.${ext}`,
    alt: 'Young people from the youth ministry smiling during the trip',
    className: 'aspect-square object-center',
  },
  {
    src: `/images/youth/trip3.${ext}`,
    alt: 'Youth ministry members enjoying the trip together',
    className: 'aspect-square object-center',
  },
  {
    src: `/images/youth/trip4.${ext}`,
    alt: 'Two youth members sharing a meal at a table',
    className: 'aspect-square object-center',
  },
  {
    src: `/images/youth/trip5.${ext}`,
    alt: 'A youth member smiling on a garden swing',
    className: 'aspect-square object-[center_25%]',
  },
];

export default function YouthGallery() {
  const { t } = useLang();
  return (
    <section className="mt-16" aria-labelledby="gallery-h">
      <h2 id="gallery-h" className="text-3xl sm:text-4xl">{t('youth.gallery.title')}</h2>
      <p className="mt-3 max-w-prose leading-8">{t('youth.gallery.text')}</p>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {photos.map((p) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            loading="lazy"
            className={`w-full rounded-3xl object-cover ${p.className}`}
          />
        ))}
      </div>
    </section>
  );
}