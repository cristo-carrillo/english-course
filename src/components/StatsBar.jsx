/**
 * Component to show statistics and progress
 */
export function StatsBar({ learned, total, showHideLearned = true, hideLearned, onToggleHide }) {
  const percentage = Math.round((learned / total) * 100)

  return (
    <div className="mt-8 space-y-4 w-full max-w-md">
      {/* Progress Bar */}
      <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total" value={total} highlight={false} />
        <StatCard label="Learned" value={learned} highlight={true} />
        <StatCard label="Progress" value={`${percentage}%`} highlight={false} />
      </div>

      {/* Hide Learned Checkbox */}
      {showHideLearned && (
        <label className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={hideLearned}
            onChange={(e) => onToggleHide(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          Hide learned terms
        </label>
      )}
    </div>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
      <p className="text-slate-500 text-[11px] uppercase font-bold mb-1">{label}</p>
      <p className={`text-lg font-bold ${highlight ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}
