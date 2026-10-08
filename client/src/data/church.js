// Single source of truth for church details. Items marked SAMPLE are placeholders.
export const church = {
  name: 'EAR Kacyiru',
  fullName: 'Église Anglicane du Rwanda – Paroisse Kacyiru',
  diocese: 'Diocese of Gasabo',
  tagline: 'A welcoming Anglican family in the heart of Kacyiru',
  address: '1 KG 513 St, Kacyiru, Kigali, Rwanda',
  phone: '+250 788 811 904',
  phoneHref: 'tel:+250788811904',
  email: 'info@earkacyiru.org', // SAMPLE
  coordinates: { lat: -1.93514, lng: 30.07959 },
  youtube: 'https://www.youtube.com/@EARKACYIRU', // verify exact handle
  services: [
    { id: 'en', name: 'English service', day: 'Sunday', start: '07:00', end: '09:30' },
    { id: 'rw', name: 'Kinyarwanda service', day: 'Sunday', start: '10:00', end: '12:30' },
    { id: 'youth', name: 'Youth service', day: 'Monday', start: '17:30', end: '20:00' },
  ],
  youthLeader: 'Bigiringabo Moses',
  ministries: [
    { id: 'youth', name: 'Youth ministry', blurb: 'Monday evenings of worship, teaching and friendship, led by Bigiringabo Moses.' },
    { id: 'choir', name: 'Choirs', blurb: 'Korali Abacunguwe and other choirs lead the parish in song.' },
    { id: 'children', name: "Children's ministry", blurb: 'Sunday School for children to learn and grow in faith.' }, // SAMPLE
    { id: 'women', name: "Women's ministry", blurb: 'Fellowship, prayer and support among the women of the parish.' }, // SAMPLE
    { id: 'men', name: "Men's ministry", blurb: 'Brothers growing together in faith and service.' }, // SAMPLE
    { id: 'outreach', name: 'Outreach', blurb: 'Serving our neighbours across Kacyiru and beyond.' }, // SAMPLE
  ],
};
