import React from 'react';
import { ToothSelection, GrillColor } from '../types';

interface TeethRowProps {
  teeth: ToothSelection[];
  isTop: boolean;
  onToothClick: (index: number) => void;
  onColorChange: (index: number, color: GrillColor) => void;
  selectedColor: GrillColor;
}

export function TeethRow({ teeth, isTop, onToothClick, selectedColor }: TeethRowProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-0.5 bg-gray-100 p-4 rounded-xl">
        {teeth.map((tooth, index) => (
          <button
            key={tooth.id}
            onClick={() => onToothClick(index)}
            className={`
              relative w-12 h-16 transition-all
              ${tooth.selected
                ? `${
                    tooth.color === 'silver'
                      ? 'bg-gray-300'
                      : tooth.color === 'gold9k'
                      ? 'bg-yellow-400'
                      : 'bg-yellow-600'
                  }`
                : 'bg-white'
              }
              ${tooth.selected ? 'border-blue-500' : 'border-gray-300'}
              border-2 hover:border-blue-300
            `}
            style={{
              clipPath: isTop
                ? 'polygon(30% 0%, 70% 0%, 90% 20%, 100% 100%, 0% 100%, 10% 20%)'
                : 'polygon(10% 0%, 90% 0%, 100% 80%, 70% 100%, 30% 100%, 0% 80%)',
              boxShadow: tooth.selected ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <div 
              className={`
                absolute inset-0 
                ${isTop ? 'border-b-4' : 'border-t-4'} 
                border-gray-200 opacity-50
              `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}