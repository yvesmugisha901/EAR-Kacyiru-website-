export const notFound = (req, res) => res.status(404).json({ message: 'Not found' });

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error. Please try again later.' });
};
