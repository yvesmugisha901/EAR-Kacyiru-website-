# EAR Kacyiru website

React + Vite + Tailwind client, Node + Express + Prisma server.

## Run it
```bash
npm run install:all
cp server/.env.example server/.env
cd server && npx prisma db push && npm run db:seed && cd ..
npm run dev        # client http://localhost:5173, API http://localhost:5000
```

## Edit church details
Everything marked SAMPLE in `client/src/data/church.js` is a placeholder (email, ministries text, social links).
Replace the photos in `client/public/images/` any time.

## Replace the sample content
- Sermons, events, ministries: `npm --prefix server run db:studio` (add `youtubeId`, `flyerUrl`), or edit `server/prisma/seed.js` and re-run `npm --prefix server run db:seed`.
- About, choirs, giving details: `client/src/data/content.js`. Parish details: `client/src/data/church.js`.
- Flyers: put images in `client/public/flyers/` and set `flyerUrl` to `/flyers/name.jpg`.

## Languages
English, Kinyarwanda and French. Edit `client/src/i18n/locales/*.json`; add a key to `en.json` first (other languages fall back to it).
Ministry descriptions, About text, and sermon/event content come from data files or the database and are not translated yet. Have a native speaker review the Kinyarwanda and French before launch.
