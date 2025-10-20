import React from 'react';

interface NumpadProps {
  onNumberClick: (number: number) => void;
  onClear: () => void;
  onEnter: () => void;
  disabled?: boolean;
}

const Numpad: React.FC<NumpadProps> = ({
  onNumberClick,
  onClear,
  onEnter,
  disabled = false
}) => {
  const handleNumberClick = (number: number) => {
    if (!disabled) {
      onNumberClick(number);
    }
  };

  const handleClear = () => {
    if (!disabled) {
      onClear();
    }
  };

  const handleEnter = () => {
    if (!disabled) {
      onEnter();
    }
  };

  return (
    <div className="numpad">
      <div className="numpad-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
          <button
            key={number}
            type="button"
            className="numpad-button"
            onClick={() => handleNumberClick(number)}
            disabled={disabled}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="numpad-actions">
        <button
          type="button"
          className="numpad-button clear-button"
          onClick={handleClear}
          disabled={disabled}
        >
          Clear
        </button>
        <button
          type="button"
          className="numpad-button enter-button"
          onClick={handleEnter}
          disabled={disabled}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default Numpad;
