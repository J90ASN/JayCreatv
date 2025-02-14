import React from 'react';
import { GrillColor, PRICES, COLOR_NAMES } from '../types';

interface ColorSelectorProps {
  selectedColor: GrillColor;
  onColorSelect: (color: GrillColor) => void;
}

export function ColorSelector({ selectedColor, onColorSelect }: ColorSelectorProps) {
  const colors: { color: GrillColor; gradient: string }[] = [
    { color: 'silver', gradient: 'from-gray-300 to-gray-400' },
    { color: 'gold9k', gradient: 'from-yellow-400 to-yellow-500' },
    { color: 'gold18k', gradient: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Select Material</h3>
      <div className="space-y-3">
        {colors.map(({ color, gradient }) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`
              w-full flex items-center justify-between p-3 rounded-lg
              ${selectedColor === color 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient}`} />
              <span className="font-medium">{COLOR_NAMES[color]}</span>
            </div>
            <div className="text-sm font-semibold">
              ${PRICES[color]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}