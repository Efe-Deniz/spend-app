//alt sepet özeti

import type { Product } from '../types';

import { formatMoney } from '../utils/format';

interface CartSummaryProps {
    cart: Product[]; // Sepetteki ürünler
    totalSpent: number; // Toplam harcama
}

export const CartSummary = ({ cart, totalSpent }: CartSummaryProps) => {
    // Sepet boşsa gösterme
    if (cart.length === 0) {
        return null; // Hiçbir şey render etme
    }

    return (
        // Dış container (sticky - sayfayı kaydırınca sabit kalır)
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg">
            {/* İçerik container */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Başlık */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Receipt</h2>

                {/* Ürün listesi */}
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                    {/* Her ürün için bir satır */}
                    {cart.map((product) => (
                        <div
                            key={product.id}
                            className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                            {/* Sol: İsim + Adet */}
                            <div className="flex items-center gap-3">
                                {/* Emoji */}
                                <span className="text-2xl">{product.image}</span>
                                {/* İsim ve adet */}
                                <div>
                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        x{product.quantity}
                                        {/* Örnek: x5 */}
                                    </p>
                                </div>
                            </div>

                            {/* Sağ: Toplam fiyat (bu üründen) */}
                            <p className="font-bold text-gray-800">
                                {formatMoney(product.price * product.quantity)}
                                {/* Örnek: $1000 × 5 = $5,000 */}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Toplam harcama ( */}
                <div className="border-t-2 border-gray-800 pt-4">
                    <div className="flex justify-between items-center">
                        {/* Sol: Label */}
                        <p className="text-xl font-bold text-gray-800">TOTAL</p>
                        {/* Sağ: Tutar */}
                        <p className="text-2xl font-bold text-green-600">
                            {formatMoney(totalSpent)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
