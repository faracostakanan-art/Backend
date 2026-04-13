import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NumericKeypad = ({ onNumberClick, onDelete, onSubmit, value, maxLength, submitLabel = 'Valider', showAsDashes = false, inputLabel = '' }) => {
  const [shuffledGrid, setShuffledGrid] = useState([]);

  useEffect(() => {
    shuffleNumbers();
  }, []);

  const shuffleNumbers = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const grid = new Array(16).fill(null);
    
    // Shuffle numbers
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    // Place numbers randomly in 16 cells (4x4 grid), leaving 6 empty
    const positions = [];
    while (positions.length < 10) {
      const pos = Math.floor(Math.random() * 16);
      if (!positions.includes(pos)) {
        positions.push(pos);
      }
    }
    
    positions.forEach((pos, idx) => {
      grid[pos] = numbers[idx];
    });
    
    setShuffledGrid(grid);
  };

  const handleClear = () => {
    for (let i = 0; i < value.length; i++) {
      onDelete();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Input label */}
      {inputLabel && (
        <p className="text-gray-600 text-sm mb-2">{inputLabel}</p>
      )}

      {/* Input display */}
      {!showAsDashes ? (
        <div className="relative mb-6">
          <div className="w-full border-2 border-[#1a2b6d] rounded-lg px-4 py-3 text-2xl font-bold text-gray-900 bg-white min-h-[56px] flex items-center">
            {value || <span className="text-gray-400 text-base font-normal">Saisissez votre identifiant</span>}
          </div>
          {value.length > 0 && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
              data-testid="clear-input-btn"
            >
              <X size={20} />
            </button>
          )}
        </div>
      ) : (
        <div className="relative mb-6">
          <div className="flex items-center gap-3 justify-center">
            {Array.from({ length: maxLength }).map((_, index) => (
              <div
                key={index}
                className={`w-10 h-1.5 rounded-full transition-all duration-200 ${
                  value.length > index
                    ? 'bg-[#1a2b6d]'
                    : 'bg-gray-300'
                }`}
              />
            ))}
            {value.length > 0 && (
              <button
                onClick={handleClear}
                className="text-gray-500 hover:text-gray-700 p-1 ml-2"
                data-testid="clear-password-btn"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Numeric keypad - 4x4 grid with random positions */}
      <div className="grid grid-cols-4 gap-2 mb-6" data-testid="numeric-keypad">
        {shuffledGrid.map((num, index) => (
          <button
            key={index}
            type="button"
            onClick={() => num !== null && onNumberClick(num)}
            disabled={num === null || value.length >= maxLength}
            data-testid={num !== null ? `key-${num}` : `key-empty-${index}`}
            className={`h-14 text-xl font-semibold rounded-lg transition-all duration-150 ${
              num !== null
                ? 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 cursor-pointer'
                : 'bg-transparent cursor-default'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {num !== null ? num : ''}
          </button>
        ))}
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={value.length !== maxLength}
        data-testid="submit-keypad-btn"
        className="w-full py-4 text-lg font-semibold text-white bg-[#e60028] hover:bg-[#c00020] rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitLabel}
      </button>
    </div>
  );
};

export default NumericKeypad;
