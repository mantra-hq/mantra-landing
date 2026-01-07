import { useState, useEffect } from 'react';

const TOOLS = ['Claude Code', 'Cursor', 'Gemini CLI', 'Codex', 'Antigravity'];

export function RollingToolName() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TOOLS.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative overflow-hidden align-bottom" style={{ minWidth: '160px' }}>
      <span
        className={`inline-block text-gradient font-semibold transition-all duration-300 ${
          isAnimating
            ? 'transform -translate-y-full opacity-0'
            : 'transform translate-y-0 opacity-100'
        }`}
      >
        {TOOLS[currentIndex]}
      </span>
    </span>
  );
}
