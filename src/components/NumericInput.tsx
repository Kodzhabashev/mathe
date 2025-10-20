import React, { useRef, useState } from 'react';
import Numpad from './Numpad';

interface NumericInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  showNumpad?: boolean;
  onNumpadNumber?: (number: number) => void;
  onNumpadBackspace?: () => void;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  placeholder = '',
  maxLength = 4,
  className = '',
  showNumpad = false,
  onNumpadNumber,
  onNumpadBackspace
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isNumpadVisible, setIsNumpadVisible] = useState(showNumpad);

  // Detect if device supports touch (tablet/phone)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const handleFocus = () => {
    // Show numpad on touch devices when input is focused
    if (isTouchDevice && onNumpadNumber && onNumpadBackspace) {
      setIsNumpadVisible(true);
    }
  };

  const handleBlur = () => {
    // Hide numpad on touch devices when input loses focus
    if (isTouchDevice) {
      // Delay hiding to allow numpad clicks
      setTimeout(() => setIsNumpadVisible(false), 200);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow numeric characters
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    onChange(numericValue);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, tab, escape, enter, and arrow keys
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'Tab' ||
      e.key === 'Escape' ||
      e.key === 'Enter' ||
      (e.key >= '0' && e.key <= '9') ||
      (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x'))
    ) {
      return;
    }
    // Prevent other keys
    e.preventDefault();
  };

  return (
    <div className={`numeric-input-container ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        className="numeric-input"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="clear-button"
          aria-label="Clear input"
        >
          ✕
        </button>
      )}
      {(showNumpad || isNumpadVisible) && onNumpadNumber && onNumpadBackspace && (
        <Numpad
          onNumberClick={onNumpadNumber}
          onBackspace={onNumpadBackspace}
        />
      )}
    </div>
  );
};

export default NumericInput;
