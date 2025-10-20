import React from 'react';

interface NumpadProps {
  onNumberClick: (number: number) => void;
  onBackspace: () => void;
  disabled?: boolean;
}

const Numpad: React.FC<NumpadProps> = ({
  onNumberClick,
  onBackspace,
  disabled = false
}) => {
  const handleNumberClick = (number: number) => {
    if (!disabled) {
      onNumberClick(number);
    }
  };

  const handleBackspace = () => {
    if (!disabled) {
      onBackspace();
    }
  };

  return (
    <div className="numpad">
      <div className="numpad-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
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
        <button
          type="button"
          className="numpad-button"
          onClick={() => handleNumberClick(0)}
          disabled={disabled}
        >
          0
        </button>
        <button
          type="button"
          className="numpad-button backspace-button"
          onClick={handleBackspace}
          disabled={disabled}
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default Numpad;
