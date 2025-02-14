import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItem, COLOR_NAMES } from '../types';

interface CartProps {
  items: CartItem[];
  onCheckout: () => void;
}

export function Cart({ items, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg max-w-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart
        </h2>
        <span className="text-lg font-semibold">${total.toFixed(2)}</span>
      </div>
      
      {items.map((item) => (
        <div key={item.id} className="mb-4 p-3 bg-gray-50 rounded">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Grill Design</span>
            <span>${item.totalPrice.toFixed(2)}</span>
          </div>
          <div className="text-sm text-gray-600">
            {[
              { teeth: item.topTeeth, label: 'Top' },
              { teeth: item.bottomTeeth, label: 'Bottom' },
            ].map(({ teeth, label }) => (
              <div key={label}>
                {label}:{' '}
                {teeth.filter((t) => t.selected).length > 0
                  ? teeth
                      .filter((t) => t.selected)
                      .map((t) => COLOR_NAMES[t.color])
                      .join(', ')
                  : 'None'}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Checkout (${total.toFixed(2)})
      </button>
    </div>
  );
}