import React, { useState } from 'react';
import { TeethRow } from './components/TeethRow';
import { Cart } from './components/Cart';
import { ColorSelector } from './components/ColorSelector';
import { ToothSelection, CartItem, GrillColor, PRICES } from './types';

function createTeethArray(): ToothSelection[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    selected: false,
    color: 'silver',
  }));
}

function App() {
  const [topTeeth, setTopTeeth] = useState<ToothSelection[]>(createTeethArray());
  const [bottomTeeth, setBottomTeeth] = useState<ToothSelection[]>(createTeethArray());
  const [selectedColor, setSelectedColor] = useState<GrillColor>('silver');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleToothClick = (isTop: boolean, index: number) => {
    const teethArray = isTop ? topTeeth : bottomTeeth;
    const setTeeth = isTop ? setTopTeeth : setBottomTeeth;
    
    setTeeth(
      teethArray.map((tooth, i) =>
        i === index 
          ? { 
              ...tooth, 
              selected: !tooth.selected,
              color: !tooth.selected ? selectedColor : tooth.color 
            } 
          : tooth
      )
    );
  };

  const calculatePrice = (teeth: ToothSelection[]): number => {
    return teeth.reduce((total, tooth) => {
      if (tooth.selected) {
        return total + PRICES[tooth.color];
      }
      return total;
    }, 0);
  };

  const handleAddToCart = () => {
    const totalPrice = calculatePrice(topTeeth) + calculatePrice(bottomTeeth);
    
    setCart([
      ...cart,
      {
        id: Date.now().toString(),
        topTeeth: [...topTeeth],
        bottomTeeth: [...bottomTeeth],
        totalPrice,
      },
    ]);

    // Reset selections
    setTopTeeth(createTeethArray());
    setBottomTeeth(createTeethArray());
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    setCart([]);
  };

  const totalPrice = calculatePrice(topTeeth) + calculatePrice(bottomTeeth);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Custom Grill Designer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 space-y-12">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Top Row</h2>
              <TeethRow
                teeth={topTeeth}
                isTop={true}
                onToothClick={(index) => handleToothClick(true, index)}
                onColorChange={(index, color) => {}}
                selectedColor={selectedColor}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Bottom Row</h2>
              <TeethRow
                teeth={bottomTeeth}
                isTop={false}
                onToothClick={(index) => handleToothClick(false, index)}
                onColorChange={(index, color) => {}}
                selectedColor={selectedColor}
              />
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="text-xl">
                Total: <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={![...topTeeth, ...bottomTeeth].some((t) => t.selected)}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <ColorSelector 
              selectedColor={selectedColor} 
              onColorSelect={setSelectedColor} 
            />
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Select a material from the options above</li>
                <li>2. Click on the teeth you want to customize</li>
                <li>3. Add your design to cart when ready</li>
                <li>4. Proceed to checkout</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <Cart items={cart} onCheckout={handleCheckout} />
    </div>
  );
}

export default App;