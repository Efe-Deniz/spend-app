import { useReducer } from 'react';

import type { AppState } from './types';

import { products } from './data/products';
import { reducer, INITIAL_BALANCE } from './state/reducer';

import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartSummary } from './components/CartSummary';

const initialState: AppState = {
    products: products,
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const totalSpent = state.products.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);

    const balance = INITIAL_BALANCE - totalSpent;

    const cart = state.products.filter((product) => product.quantity > 0);

    const handleBuy = (productId: number) => {
        dispatch({
            type: 'BUY',
            payload: { productId },
        });
    };

    const handleSell = (productId: number) => {
        dispatch({
            type: 'SELL',
            payload: { productId },
        });
    };

    const handleQuantityChange = (productId: number, quantity: number) => {
        dispatch({
            type: 'SET_QUANTITY',
            payload: { productId, quantity },
        });
    };

    const canBuyProduct = (productPrice: number): boolean => {
        return balance >= productPrice;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header balance={balance} />

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Product grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {state.products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onBuy={handleBuy}
                            onSell={handleSell}
                            onQuantityChange={handleQuantityChange}
                            canBuy={canBuyProduct(product.price)}
                        />
                    ))}
                </div>
            </main>

            <CartSummary cart={cart} totalSpent={totalSpent} />
        </div>
    );
}

export default App;
