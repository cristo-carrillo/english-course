/**
 * Professional Button Component
 * Variants: primary (default), secondary, ghost
 * Sizes: sm, md, lg
 */
export function Button({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold shadow-lg hover:shadow-xl active:shadow-md',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white font-semibold border border-slate-600 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent border-2 border-slate-600 hover:border-slate-400 text-slate-100 hover:text-white font-medium'
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-8 py-3.5 text-base font-semibold rounded-xl'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        inline-flex items-center justify-center
        transition-all duration-200 ease-out
        active:scale-95 active:duration-75
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        hover:translate-y-[-1px]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-emerald-500/50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
