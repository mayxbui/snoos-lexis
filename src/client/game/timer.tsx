import React from "react";

interface TimerProps {
  seconds: number;
  isActive: boolean;
  totalSeconds: number;
}

const Timer: React.FC<TimerProps> = ({
  seconds,
  isActive,
  totalSeconds,
}) => {
  const percentage = Math.max((seconds / totalSeconds) * 100, 0);

  const getBarColor = () => {
    if (seconds <= 0) return "bg-red-800";
    if (seconds <= 10) return "bg-red-600";
    if (seconds <= 20) return "bg-yellow-700";
    if (seconds <= 45) return "bg-yellow-500";
    return "bg-[var(--color-secondary)]";
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 sm:gap-3">
      <div className="
        w-full 
        max-w-3xl 
        h-4 
        sm:h-5 
        md:h-6 
        bg-[var(--color-background)] 
        border-2 border-[var(--color-secondary)] 
        overflow-hidden
        shadow-inner
      ">
        <div
          className={`
            h-full 
            transition-all 
            duration-1000 
            ease-linear 
            ${getBarColor()}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Status Text */}
      <div className="
        text-xs 
        sm:text-sm 
        md:text-base 
        font-semibold 
        text-center
      ">
        {!isActive && seconds === 0 && (
          <span className="text-red-700">Game Over!</span>
        )}
      </div>
    </div>
  );
};

export default Timer;