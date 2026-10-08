import { useState } from 'react';
import { sendPrayer } from '../../api/content.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

export default function PrayerRequestForm() {
  const { t } = useLang();
  const [f, setF] = useState({ name: '', request: '', isPublic: false, website: '' });
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');
  async function submit(e) {
    e.preventDefault(); setStatus('sending'); setMsg('');
    try { await sendPrayer(f); setF({ name: '', request: '', isPublic: false, website: '' }); setStatus('done'); }
    catch (err) { setMsg(Object.values(err.fields || {})[0] || err.message); setStatus('error'); }
  }
  const input = 'mt-1 w-full rounded-2xl border border-cyprus/30 bg-white/70 px-4 py-3';
  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div><label htmlFor="pn" className="text-sm font-medium">{t('prayer.name')}</label><input id="pn" className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
      <div><label htmlFor="pr" className="text-sm font-medium">{t('prayer.q')}</label><textarea id="pr" rows="4" className={input} value={f.request} onChange={(e) => setF({ ...f, request: e.target.value })} /></div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.isPublic} onChange={(e) => setF({ ...f, isPublic: e.target.checked })} />{t('prayer.share')}</label>
      <div className="hidden" aria-hidden="true"><input tabIndex="-1" autoComplete="off" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} /></div>
      <button className="btn-primary" disabled={status === 'sending'}>{status === 'sending' ? t('form.sending') : t('prayer.send')}</button>
      <p role="status" aria-live="polite" className="text-sm">
        {status === 'done' && t('prayer.done')}
        {status === 'error' && <span className="text-red-700">{msg}</span>}
      </p>
    </form>
  );
}
