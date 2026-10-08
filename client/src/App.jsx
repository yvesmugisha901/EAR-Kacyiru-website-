import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Sermons from './pages/Sermons.jsx';
import Events from './pages/Events.jsx';
import Ministries from './pages/Ministries.jsx';
import Choirs from './pages/Choirs.jsx';
import Giving from './pages/Giving.jsx';
import Contact from './pages/Contact.jsx';

const NotFound = () => (
  <section className="container-x py-24">
    <h1 className="text-4xl">Page not found</h1>
    <Link to="/" className="btn-primary mt-6">Back to home</Link>
  </section>
);

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sermons" element={<Sermons />} />
        <Route path="events" element={<Events />} />
        <Route path="ministries" element={<Ministries />} />
        <Route path="choirs" element={<Choirs />} />
        <Route path="giving" element={<Giving />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
