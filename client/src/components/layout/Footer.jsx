import { Link } from 'react-router-dom';
import { church } from '../../data/church.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-cyprus text-sand">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-sand">{church.fullName}</p>
          <p className="mt-2 text-sm text-sand/80">{t('diocese')}</p>
        </div>
        <address className="text-sm not-italic leading-7 text-sand/90">
          {church.address}<br />
          <a className="underline" href={church.phoneHref}>{church.phone}</a><br />
          <a className="underline" href={`mailto:${church.email}`}>{church.email}</a>
        </address>
        <ul className="space-y-2 text-sm">
          <li><Link className="hover:underline" to="/sermons">{t('footer.watch')}</Link></li>
          <li><Link className="hover:underline" to="/events">{t('footer.events')}</Link></li>
          <li><Link className="hover:underline" to="/giving">{t('footer.give')}</Link></li>
          <li><a className="hover:underline" href={church.youtube} target="_blank" rel="noreferrer">{t('footer.youtube')}</a></li>
        </ul>
      </div>
      <p className="border-t border-sand/20 py-4 text-center text-xs text-sand/70">
        © {new Date().getFullYear()} {church.fullName}
      </p>
    </footer>
  );
}
