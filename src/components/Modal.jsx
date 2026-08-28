import useFocusTrap from './useFocusTrap.js'

export default function Modal({ onClose, label, children, className = '' }) {
  const containerRef = useFocusTrap(onClose)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div ref={containerRef} tabIndex={-1} className={`relative max-h-[90vh] overflow-y-auto bg-white outline-none ${className}`}>
        {children}
      </div>
    </div>
  )
}
