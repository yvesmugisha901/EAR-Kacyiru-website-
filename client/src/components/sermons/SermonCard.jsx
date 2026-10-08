import { useState } from 'react';
import { fmtDate } from '../../utils/format.js';
import { church } from '../../data/church.js';

const LANG = { en: 'English', rw: 'Kinyarwanda', fr: 'French' };

export default function SermonCard({ s }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="rounded-3xl border border-cyprus/15 bg-white/50 p-5">
      <div className="aspect-video overflow-hidden rounded-2xl bg-cyprus/10">
        {playing && s.youtubeId ? (
          <iframe className="h-full w-full" title={`Video: ${s.title}`} allowFullScreen
            src={`https://www.youtube-nocookie.com/embed/${s.youtubeId}?autoplay=1`} />
        ) : s.youtubeId ? (
          <button onClick={() => setPlaying(true)} className="flex h-full w-full items-center justify-center bg-cyprus text-sand">
            <span className="btn-light">Play video</span>
          </button>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-sm">
            <p>Video not added yet.</p>
            <a className="font-semibold underline" href={church.youtube} target="_blank" rel="noreferrer">Watch on YouTube</a>
          </div>
        )}
      </div>
      {s.audioUrl && <audio controls className="mt-3 w-full" src={s.audioUrl} />}
      <h3 className="mt-4 text-xl">{s.title}</h3>
      <p className="mt-1 text-sm">{s.speaker} · {fmtDate(s.preachedOn)}</p>
      <p className="mt-1 text-sm">{s.scripture} · {LANG[s.language] || s.language}</p>
    </article>
  );
}
