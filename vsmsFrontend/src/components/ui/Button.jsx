// variant: accent | primary | outline | danger | success ; size: md | sm
export default function Button({ variant = 'primary', size = 'md', icon, block, children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`sb-btn sb-btn--${variant} sb-btn--${size} ${block ? 'sb-btn--block' : ''} ${className}`}
      {...props}
    >
      {icon && <i className={`bi ${icon}`} />}
      {children}
    </button>
  );
}