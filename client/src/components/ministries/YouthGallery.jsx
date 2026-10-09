import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LanguageContext.jsx';

// Tries these file endings for each photo (trip1 ... trip5) and hides any that are missing
const exts = ['jpeg', 'jpg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'];

const photos = [
  { n: 1, alt: 'The youth ministry group posing together on the grass beside the lake', pos: 'object-[center_45%]' },
  { n: 2, alt: 'Young people from the youth ministry smiling during the trip', pos: 'object-center' },
  { n: 3, alt: 'Youth ministry members enjoying the trip together', pos: 'object-center' },
  { n: 4, alt: 'Two youth members sharing a meal at a table', pos: 'object-center' },
  { n: 5, alt: 'A youth member smiling on a garden swing', pos: 'object-[center_25%]' },
];

const labels = {
  en: { open: 'View trip photos', close: 'Close', prev: 'Previous photo', next: 'Next photo', of: 'of' },
  rw: { open: "Reba amafoto y'urugendo", close: 'Funga', prev: 'Ifoto ibanza', next: 'Ifoto ikurikira', of: 'kuri' },
  fr: { open: 'Voir les photos de la sortie', close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', of: 'sur' },
};

function find(n) {
  return new Promise((resolve) => {
    let k = 0;
    const tryNext = () => {
      if (k >= exts.length) return resolve(null);
      const url = `/images/youth/trip${n}.${exts[k++]}`;
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = tryNext;
      img.src = url;
    };
    tryNext();
  });
}

const Icon = ({ d }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

export default function YouthGallery() {
  const { t, lang } = useLang();
  const l = labels[lang] || labels.en;
  const dialog = useRef(null);
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let live = true;
    Promise.all(photos.map(async (p) => ({ ...p, src: await find(p.n) }))).then((all) => {
      if (live) setItems(all.filter((p) => p.src));
    });
    return () => {
      live = false;
    };
  }, []);

  if (!items.length) return null;

  const open = (index) => {
    setActive(index);
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
  };
  const close = () => dialog.current?.close();
  const go = (d) => setActive((x) => (x + d + items.length) % items.length);
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) close();
  };
  const cur = active !== null ? items[active] : null;
  const round = 'absolute flex h-11 w-11 items-center justify-center rounded-full bg-sand/90 text-cyprus transition-colors hover:bg-sand';

  return (
    <>
      <button
        type="button"
        onClick={() => open(0)}
        className="inline-flex items-center gap-4 rounded-full border border-cyprus/25 bg-white/60 py-2 pl-2 pr-5 transition-colors hover:bg-white"
      >
        <span className="flex -space-x-3">
          {items.slice(0, 4).map((p) => (
            <img key={p.n} src={p.src} alt="" loading="lazy" className={`h-10 w-10 rounded-full object-cover ring-2 ring-sand-deep ${p.pos}`} />
          ))}
        </span>
        <span className="text-sm font-semibold text-cyprus">{l.open} ({items.length})</span>
      </button>

      <dialog
        ref={dialog}
        onKeyDown={onKey}
        onClick={onBackdrop}
        onClose={() => setActive(null)}
        aria-label={t('youth.gallery.title')}
        className="m-auto w-[92vw] max-w-4xl bg-transparent p-0 backdrop:bg-black/85"
      >
        {cur && (
          <div onClick={onBackdrop}>
            <div className="relative">
              <img src={cur.src} alt={cur.alt} className="mx-auto max-h-[68vh] w-auto max-w-full rounded-2xl object-contain" />
              <button type="button" onClick={close} aria-label={l.close} className={`${round} right-3 top-3`}>
                <Icon d="M6 6l12 12M18 6L6 18" />
              </button>
              {items.length > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label={l.prev} className={`${round} left-3 top-1/2 -translate-y-1/2`}>
                    <Icon d="M15 5l-7 7 7 7" />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label={l.next} className={`${round} right-3 top-1/2 -translate-y-1/2`}>
                    <Icon d="M9 5l7 7-7 7" />
                  </button>
                </>
              )}
            </div>
            <p className="mt-3 text-center text-sm text-sand" aria-live="polite">
              {t('youth.gallery.title')} · {active + 1} {l.of} {items.length}
            </p>
            <ul className="mt-3 flex justify-center gap-2 overflow-x-auto pb-1">
              {items.map((p, index) => (
                <li key={p.n} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={p.alt}
                    aria-current={index === active ? 'true' : undefined}
                    className={`block h-14 w-14 overflow-hidden rounded-lg transition-opacity ${index === active ? 'opacity-100 ring-2 ring-sand' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <img src={p.src} alt="" className={`h-full w-full object-cover ${p.pos}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </dialog>
    </>
  );
}