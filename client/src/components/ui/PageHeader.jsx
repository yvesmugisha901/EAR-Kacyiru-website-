import { Helmet } from 'react-helmet-async';

export default function PageHeader({ title, intro }) {
  return (
    <header className="bg-cyprus text-sand">
      <Helmet><title>{title} – EAR Kacyiru</title></Helmet>
      <div className="container-x py-14 md:py-20">
        <h1 className="text-4xl text-sand sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-xl text-lg text-sand/85">{intro}</p>}
      </div>
    </header>
  );
}
