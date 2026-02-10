import React, {useMemo} from "react";

interface TimerProps{
    seconds: number;
    isActive: boolean;
}

export const Timer: React.FC<TimerProps>=({seconds,isActive})=>{
    const formattedTime = useMemo(()=>{
        const minutes=Math.floor(seconds/60);
        const secs=seconds%60;
        return `${minutes}:${secs.toString().padStart(2,`0`)}`;
    }, [seconds]);

      const getTimerClass = (): string => {
    if (!isActive) return 'timer-finished';      // Game over
    if (seconds <= 0) return 'timer-expired';    // Time's up
    if (seconds <= 10) return 'timer-critical';  // Critical: < 10 seconds
    if (seconds <= 20) return 'timer-low';       // Low: < 20 seconds
    if (seconds <= 45) return 'timer-medium';    // Medium: < 45 seconds
    return 'timer-high';                         // Plenty of time
  };

  /**
   * Determine if timer should pulse (animate)
   * Pulse when time is critical (< 10 seconds)
   */
  const shouldPulse = isActive && seconds > 0 && seconds <= 10;

  return (
    <div className={`timer-container ${shouldPulse ? 'pulsing' : ''}`}>
      {/* Main timer display */}
      <div className={`timer ${getTimerClass()}`}>
        <div className="timer-icon">⏱️</div>
        <div className="timer-display">
          <span className="timer-text">{formattedTime}</span>
        </div>
        <div className="timer-label">time left</div>
      </div>

      {/* Time status indicator (visual feedback) */}
      <div className="timer-status">
        {!isActive && seconds === 0 && (
          <div className="status-text finished">Game Over!</div>
        )}
        {isActive && seconds > 0 && seconds <= 10 && (
          <div className="status-text critical">Hurry!</div>
        )}
        {isActive && seconds > 10 && seconds <= 30 && (
          <div className="status-text warning">Time running out</div>
        )}
      </div>

      {/* Progress bar (optional - shows time remaining visually) */}
      <div className="timer-progress-container">
        <div
          className="timer-progress-bar"
          style={{
            width: `${(seconds / 60) * 100}%`,
            backgroundColor: getProgressBarColor(seconds),
          }}
        ></div>
      </div>
    </div>
  );
};

/**
 * Helper function to determine progress bar color
 */
function getProgressBarColor(seconds: number): string {
  if (seconds <= 0) return '#B70000';        // Red
  if (seconds <= 10) return '#580000';       // Red (critical)
  if (seconds <= 20) return '#1D1B08';       // Orange (low)
  if (seconds <= 45) return '#35321E';       // Yellow (medium)
  return '#504E42';                          // Green (high)
}

export default Timer;
