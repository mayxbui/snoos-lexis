interface ControlButtonsProps {
  onSubmit: () => void;
  onClear: () => void;
  onShuffle: () => void;
}

export default function ControlButtons({
  onSubmit,
  onClear,
  onShuffle,
}: ControlButtonsProps) {
  return (
    <div className="flex gap-4">
      <button onClick={onShuffle} className="retro-btn">
        Shuffle
      </button>

      <button onClick={onClear} className="retro-btn">
        Clear
      </button>

      <button onClick={onSubmit} className="retro-btn">
        Submit
      </button>
    </div>
  );
}
