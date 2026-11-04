export default function Stars({ value, max = 5 }) {
  const full = Math.round(value);
  return (
    <span className="stars" role="img" aria-label={`${value} out of ${max} stars`}>
      {'★'.repeat(full)}{'☆'.repeat(max - full)}
    </span>
  );
}