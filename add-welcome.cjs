const fs = require('fs');

const add = {
  en: {
    'hero.eyebrow': 'Welcome to EAR Kacyiru',
    'hero.title': 'Come as you are. You belong here.',
    'hero.welcome': 'Whether it is your first Sunday or your thousandth, there is a seat for you, a hand to shake and a family to pray with. Join us in English or Kinyarwanda.',
    'hero.verse': 'I was glad when they said unto me, Let us go into the house of the LORD.',
    'hero.verse.ref': 'Psalm 122:1',
  },
  rw: {
    'hero.eyebrow': 'Murakaza neza kuri EAR Kacyiru',
    'hero.title': 'Ngwino uko uri. Hano ni iwawe.',
    'hero.welcome': "Waba uje bwa mbere cyangwa umaze igihe, hari umwanya wawe, ukuboko kukwakira n'umuryango muzasenga hamwe. Mudusange mu Cyongereza cyangwa mu Kinyarwanda.",
    'hero.verse.ref': 'Zaburi 122:1',
    // 'hero.verse': 'PASTE THE EXACT VERSE FROM YOUR KINYARWANDA BIBLE HERE',
  },
  fr: {
    'hero.eyebrow': 'Bienvenue à EAR Kacyiru',
    'hero.title': 'Venez comme vous êtes. Vous êtes chez vous.',
    'hero.welcome': 'Que ce soit votre premier dimanche ou votre millième, une place vous attend, une main tendue et une famille pour prier avec vous. Rejoignez-nous en anglais ou en kinyarwanda.',
    'hero.verse': 'Je suis dans la joie quand on me dit : Allons à la maison de l’Éternel !',
    'hero.verse.ref': 'Psaume 122:1',
  },
};

for (const [lang, keys] of Object.entries(add)) {
  const file = `client/src/i18n/locales/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  Object.assign(data, keys);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('updated', file);
}