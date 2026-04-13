import React from 'react';
import { Button } from './ui/button';
import { Delete } from 'lucide-react';

const NumericKeypad = ({ onNumberClick, onDelete, onSubmit, value, maxLength, submitLabel = 'Suivant' }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Display boxes */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: maxLength }).map((_, index) => (
          <div
            key={index}
            className={`w-12 h-14 border-2 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200 ${
              value.length > index
                ? 'border-[#e60028] bg-[#e60028]/5 text-[#e60028]'
                : 'border-gray-300 bg-white'
            }`}
          >
            {value[index] ? '•' : ''}
          </div>
        ))}
      </div>

      {/* Numeric keypad */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {numbers.map((num) => (
          <Button
            key={num}
            type="button"
            onClick={() => onNumberClick(num)}
            disabled={value.length >= maxLength}
            className="h-16 text-2xl font-semibold bg-white hover:bg-[#e60028] hover:text-white text-gray-800 border-2 border-gray-200 hover:border-[#e60028] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          onClick={onDelete}
          disabled={value.length === 0}
          variant="outline"
          className="h-14 text-lg font-semibold border-2 border-gray-300 hover:border-[#e60028] hover:bg-[#e60028]/5 hover:text-[#e60028] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Delete size={20} className="mr-2" />
          Effacer
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={value.length !== maxLength}
          className="h-14 text-lg font-semibold bg-[#e60028] hover:bg-[#c00020] text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export default NumericKeypad;
