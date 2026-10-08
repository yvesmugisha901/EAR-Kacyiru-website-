import { useState } from 'react';
import { fmtDate, fmtTime } from '../../utils/format.js';
import { registerForEvent } from '../../api/content.js';

export default function EventCard({ e }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', guests: 1 });
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');
  const set = (k) => (ev) => setForm((f) => ({ ...f, [k]: ev.target.value }));

  async function submit(ev) {
    ev.preventDefault();
    setStatus('sending'); setMsg('');
    try { await registerForEvent(e.id, { ...form, guests: Number(form.guests) }); setStatus('done'); }
    catch (err) { setMsg(Object.values(err.fields || {})[0] || err.message); setStatus('error'); }
  }
  const input = 'mt-1 w-full rounded-xl border border-cyprus/30 bg-white/70 px-3 py-2';
  return (
    <article className="rounded-3xl border border-cyprus/15 bg-white/50 p-6">
      {e.flyerUrl && <img src={e.flyerUrl} alt={`Flyer for ${e.title}`} loading="lazy" className="mb-4 w-full rounded-2xl" />}
      <p className="text-sm font-medium text-brick">{fmtDate(e.startsAt)}</p>
      <h3 className="mt-1 text-2xl">{e.title}</h3>
      <p className="mt-1 text-sm">{fmtTime(e.startsAt)}{e.endsAt && ` – ${fmtTime(e.endsAt)}`} · {e.location}</p>
      <p className="mt-3 leading-7">{e.description}</p>
      {e.needsRsvp && status !== 'done' && (
        <>
          <button className="btn-primary mt-5" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? 'Close' : 'Register'}
          </button>
          {open && (
            <form onSubmit={submit} className="mt-4 space-y-3">
              <div><label className="text-sm" htmlFor={`n-${e.id}`}>Name</label><input id={`n-${e.id}`} className={input} value={form.name} onChange={set('name')} /></div>
              <div><label className="text-sm" htmlFor={`p-${e.id}`}>Phone</label><input id={`p-${e.id}`} type="tel" className={input} value={form.phone} onChange={set('phone')} /></div>
              <div><label className="text-sm" htmlFor={`g-${e.id}`}>Number of people</label><input id={`g-${e.id}`} type="number" min="1" max="10" className={input} value={form.guests} onChange={set('guests')} /></div>
              <button className="btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Confirm registration'}</button>
              {msg && <p role="alert" className="text-sm text-red-700">{msg}</p>}
            </form>
          )}
        </>
      )}
      {status === 'done' && <p role="status" className="mt-5 font-semibold text-cyprus">You are registered. See you there.</p>}
    </article>
  );
}
