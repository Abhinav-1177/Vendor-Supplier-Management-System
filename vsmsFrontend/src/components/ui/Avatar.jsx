const GRADIENTS = [
  'linear-gradient(135deg,#0a2540,#3b82f6)',
  'linear-gradient(135deg,#ff6b35,#f59e0b)',
  'linear-gradient(135deg,#10b981,#059669)',
  'linear-gradient(135deg,#3b82f6,#8b5cf6)',
  'linear-gradient(135deg,#00d4aa,#0094ff)',
];

// Colour is picked from the name, so the same person always gets the same avatar
export default function Avatar({ name = '?', size = 40 }) {
  const idx = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % GRADIENTS.length;
  return (
    <div
      className="sb-avatar"
      style={{ width: size, height: size, fontSize: size * 0.4, background: GRADIENTS[idx] }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}