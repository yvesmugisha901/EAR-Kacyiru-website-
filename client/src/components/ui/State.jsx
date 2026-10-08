export default function State({ loading, error, empty, children }) {
  if (loading) return <p role="status" className="py-8">Loading…</p>;
  if (error) return <p role="alert" className="py-8 text-red-700">{error} Check that the server is running and try again.</p>;
  if (empty) return <p className="py-8">{empty}</p>;
  return children;
}
