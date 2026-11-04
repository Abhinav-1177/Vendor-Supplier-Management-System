export default function ProgressBar({ value, label }) {
  return (
    <div className="progress-modern" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="progress-modern__bar" style={{ width: `${value}%` }} />
    </div>
  );
}