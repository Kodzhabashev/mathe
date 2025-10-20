import React, { useRef } from 'react';

interface NumericInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  placeholder = '',
  maxLength = 4,
  className = '',
  onFocus,
  onBlur
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
        onFocus={onFocus}
        onBlur={onBlur}
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
    </div>
  );
};

export default NumericInput;
