/**
 * Componente Flashcard con efecto flip 3D
 */
export function Flashcard({ term, definition, category, isFlipped, onFlip }) {
  return (
    <div
      onClick={onFlip}
      className="flashcard-container"
      style={{
        width: '100%',
        height: '20rem',
        perspective: '1000px',
        cursor: 'pointer'
      }}
    >
      <div
        className="flashcard-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Side */}
        <div
          className="flashcard-front bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl border-b-8 border-emerald-500"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            MozBackfaceVisibility: 'hidden'
          }}
        >
          <span className="absolute top-6 left-6 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">
            {category}
          </span>
          <h2 className="text-4xl font-black text-slate-800 text-center leading-tight animate-fadeIn">
            {term}
          </h2>
          <p className="mt-8 text-slate-400 text-sm font-medium animate-pulse">
            Click to see definition
          </p>
        </div>

        {/* Back Side */}
        <div
          className="flashcard-back bg-emerald-500 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            MozBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-emerald-100 text-xs font-bold uppercase mb-4 tracking-widest">
            Definition
          </h3>
          <p className="text-lg font-bold text-white text-center leading-relaxed">
            {definition}
          </p>
          <p className="mt-6 text-emerald-200 text-xs italic">
            Click to see the term
          </p>
        </div>
      </div>
    </div>
  )
}
