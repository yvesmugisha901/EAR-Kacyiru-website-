import { useState } from 'react';
import { sendContact } from '../../api/contact.js';
import { useLang } from '../../i18n/LanguageContext.jsx';

const initial = { name: '', email: '', phone: '', message: '', website: '' }; // website = honeypot

export default function ContactForm() {
  const { t } = useLang();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [fields, setFields] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending'); setError(''); setFields({});
    try {
      await sendContact(form);
      setForm(initial); setStatus('sent');
    } catch (err) {
      setError(err.message); setFields(err.fields || {}); setStatus('error');
    }
  }

  const input = 'mt-1 w-full rounded-2xl border border-cyprus/30 bg-white/70 px-4 py-3';
  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {[['name', 'form.name', 'text', 'name'], ['email', 'form.email', 'email', 'email'], ['phone', 'form.phone', 'tel', 'tel']].map(([k, label, type, ac]) => (
        <div key={k}>
          <label htmlFor={k} className="text-sm font-medium">{t(label)}</label>
          <input id={k} type={type} autoComplete={ac} value={form[k]} onChange={set(k)} className={input}
                 aria-invalid={!!fields[k]} aria-describedby={fields[k] ? `${k}-err` : undefined} />
          {fields[k] && <p id={`${k}-err`} className="mt-1 text-sm text-red-700">{fields[k]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="text-sm font-medium">{t('form.message')}</label>
        <textarea id="message" rows="5" value={form.message} onChange={set('message')} className={input}
                  aria-invalid={!!fields.message} aria-describedby={fields.message ? 'message-err' : undefined} />
        {fields.message && <p id="message-err" className="mt-1 text-sm text-red-700">{fields.message}</p>}
      </div>
      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="hidden" aria-hidden="true">
        <input tabIndex="-1" autoComplete="off" value={form.website} onChange={set('website')} />
      </div>
      <button className="btn-primary disabled:opacity-60" disabled={status === 'sending'}>
        {status === 'sending' ? t('form.sending') : t('form.send')}
      </button>
      <p role="status" aria-live="polite" className="text-sm">
        {status === 'sent' && t('form.sent')}
        {status === 'error' && <span className="text-red-700">{error}</span>}
      </p>
    </form>
  );
}
