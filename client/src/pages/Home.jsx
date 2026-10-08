import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero.jsx';
import ServiceTimes from '../components/home/ServiceTimes.jsx';
import Welcome from '../components/home/Welcome.jsx';
import MinistriesPreview from '../components/home/MinistriesPreview.jsx';
import FeaturedSermon from '../components/home/FeaturedSermon.jsx';
import UpcomingEvents from '../components/home/UpcomingEvents.jsx';
import GivingCTA from '../components/home/GivingCTA.jsx';
import LocationPreview from '../components/home/LocationPreview.jsx';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>EAR Kacyiru – Anglican Church, Kigali</title>
        <meta name="description" content="EAR Kacyiru, an Anglican parish in Kigali. English service Sundays 07:00, Kinyarwanda service 10:00, youth service Mondays 17:30." />
      </Helmet>
      <Hero />
      <ServiceTimes />
      <Welcome />
      <FeaturedSermon />
      <UpcomingEvents />
      <MinistriesPreview />
      <GivingCTA />
      <LocationPreview />
    </>
  );
}
