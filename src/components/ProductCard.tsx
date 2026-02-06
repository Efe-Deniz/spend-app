//tek bir ürün kartı

import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { formatMoney } from '../utils/format';

interface ProductCardProps {
    product: Product; //ürün bilgisi
    onBuy: (productId: number) => void; //by button hanfler
    onSell: (productId: number) => void; //sell button handler
    onQuantityChange: (productId: number, quantity: number) => void;
    canBuy: boolean;
}

export const ProductCard = ({
    product,
    onBuy,
    onSell,
    onQuantityChange,
    canBuy,
}: ProductCardProps) => {
    //inputun gösterdiği değer
    const [inputValue, setInputValue] = useState<string>(product.quantity.toString());

    //product.quantity değiştiğinde inputu güncelle
    useEffect(() => {
        setInputValue(product.quantity.toString());
    }, [product.quantity]);

    //event handlers
    const handleBuy = () => {
        onBuy(product.id);
    };

    const handleSell = () => {
        onSell(product.id);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') {
            setInputValue('');
            return;
        }

        const numValue = parseInt(value, 10);

        if (!isNaN(numValue)) {
            setInputValue(value);
            onQuantityChange(product.id, numValue);
        }
    };

    const handleInputBlur = () => {
        if (inputValue === '') {
            setInputValue('0');
            onQuantityChange(product.id, 0);
        }
    };

    return (
        // Kart container
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            {/* Ürün resmi (emoji) */}
            <div className="text-6xl mb-3">{product.image}</div>

            {/* Ürün adı */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{product.name}</h3>

            {/* Ürün fiyatı */}
            <p className="text-green-600 font-bold mb-4">{formatMoney(product.price)}</p>

            {/* Buton + Input container */}
            <div className="flex items-center gap-2 w-full">
                {/* Sell butonu */}
                <button
                    onClick={handleSell}
                    disabled={product.quantity === 0} // Quantity 0 ise disabled
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 transition"
                >
                    Sell
                </button>

                {/* Quantity input */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-20 text-center border-2 border-gray-300 rounded-lg py-2 font-semibold focus:outline-none focus:border-blue-500"
                />

                {/* Buy butonu */}
                <button
                    onClick={handleBuy}
                    disabled={!canBuy} // Para yoksa disabled
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition"
                >
                    Buy
                </button>
            </div>

            {/* Toplam harcama (bu üründen) */}
            {product.quantity > 0 && (
                <p className="text-sm text-gray-600 mt-3">
                    Total: {formatMoney(product.price * product.quantity)}
                </p>
            )}
        </div>
    );
};
