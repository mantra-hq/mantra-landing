import { GitCommit } from 'lucide-react';

export function TimeTravelVisual() {
  return (
    <div className="glass-dark rounded-2xl p-6 glow-secondary">
      <div className="space-y-4">
        {/* Timeline with markers */}
        <div className="relative py-4">
          <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-secondary to-primary rounded-full" />
          </div>
          {/* Draggable indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-secondary cursor-grab"
            style={{ left: '60%', transform: 'translate(-50%, -50%)' }}
          />
          {/* User message markers (blue dots) */}
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" style={{ left: '10%' }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" style={{ left: '35%' }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" style={{ left: '75%' }} />
          {/* Git commit markers (green squares) */}
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-sm" style={{ left: '25%', transform: 'translate(-50%, -50%)' }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-sm" style={{ left: '55%', transform: 'translate(-50%, -50%)' }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-sm" style={{ left: '90%', transform: 'translate(-50%, -50%)' }} />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-primary rounded-full" />
            <span>User Message</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-secondary rounded-sm" />
            <span>Git Commit</span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Code preview panel */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-dark-300/50">
            <div className="text-xs text-gray-500 mb-2 font-mono">src/App.tsx</div>
            <div className="text-xs text-gray-400 font-mono space-y-1">
              <div><span className="text-secondary">+</span> const [dark, setDark]</div>
              <div><span className="text-secondary">+</span> useState(false)</div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-dark-300/50">
            <div className="flex items-center gap-2 mb-2">
              <GitCommit className="w-3 h-3 text-secondary" />
              <span className="text-xs text-secondary font-mono">a3f2c1d</span>
            </div>
            <div className="text-xs text-gray-400">Add dark mode toggle</div>
          </div>
        </div>
      </div>
    </div>
  );
}
