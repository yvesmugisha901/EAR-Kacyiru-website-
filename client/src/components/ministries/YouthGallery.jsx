import { useRef, useState } from 'react';
import { useLang } from '../../i18n/LanguageContext.jsx';

// Change this if your files end differently (for example 'jpg' or 'png')
const ext = 'jpeg';

const photos = [
  { n: 1, alt: 'The youth ministry group posing together on the grass beside the lake', pos: 'object-[center_45%]' },
  { n: 2, alt: 'Young people from the youth ministry smiling during the trip', pos: 'object-center' },
  { n: 3, alt: 'Youth ministry members enjoying the trip together', pos: 'object-center' },
  { n: 4, alt: 'Two youth members sharing a meal at a table', pos: 'object-center' },
  { n: 5, alt: 'A youth member smiling on a garden swing', pos: 'object-[center_25%]' },
];

const labels = {
  en: { close: 'Close', prev: 'Previous photo', next: 'Next photo', hint: 'Tap a photo to view it larger', of: 'of' },
  rw: { close: 'Funga', prev: 'Ifoto ibanza', next: 'Ifoto ikurikira', hint: 'Kanda ku ifoto kugira ngo uyirebe nini', of: 'kuri' },
  fr: { close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', hint: 'Touchez une photo pour l’agrandir', of: 'sur' },
};

const src = (n) => `/images/youth/trip${n}.${ext}`;

const Chevron = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

export default function YouthGallery() {
  const { t, lang } = useLang();
  const l = labels[lang] || labels.en;
  const dialog = useRef(null);
  const [i, setI] = useState(0);

  const open = (index) => {
    setI(index);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const go = (d) => setI((x) => (x + d + photos.length) % photos.length);
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };
  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) close();
  };
  const round = 'absolute flex h-11 w-11 items-center justify-center rounded-full bg-sand/90 text-cyprus transition-colors hover:bg-sand';

  return (
    <figure>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {photos.map((p, index) => (
          <li key={p.n}>
            <button
              type="button"
              onClick={() => open(index)}
              className="group block aspect-square w-full overflow-hidden rounded-2xl"
            >
              <img
                src={src(p.n)}
                alt={p.alt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${p.pos}`}
              />
            </button>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-sm leading-6">
        <span className="font-semibold text-cyprus">{t('youth.gallery.title')}</span>
        <span className="text-cyprus-dark/75"> · {t('youth.gallery.text')}</span>
        <span className="mt-1 block text-cyprus-dark/60">{l.hint}</span>
      </figcaption>

      <dialog
        ref={dialog}
        onKeyDown={onKey}
        onClick={closeOnBackdrop}
        aria-label={t('youth.gallery.title')}
        className="m-auto w-[92vw] max-w-4xl bg-transparent p-0 backdrop:bg-black/85"
      >
        <div className="relative" onClick={closeOnBackdrop}>
          <img
            src={src(photos[i].n)}
            alt={photos[i].alt}
            className="mx-auto max-h-[78vh] w-auto max-w-full rounded-2xl object-contain"
          />
          <button type="button" onClick={close} aria-label={l.close} className={`${round} right-3 top-3`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <button type="button" onClick={() => go(-1)} aria-label={l.prev} className={`${round} left-3 top-1/2 -translate-y-1/2`}>
            <Chevron dir="left" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label={l.next} className={`${round} right-3 top-1/2 -translate-y-1/2`}>
            <Chevron dir="right" />
          </button>
        </div>
        <p className="mt-3 text-center text-sm text-sand" aria-live="polite">
          {i + 1} {l.of} {photos.length}
        </p>
      </dialog>
    </figure>
  );
}