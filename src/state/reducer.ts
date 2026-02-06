//state yönetimi useReducer fonksiyonu
import type { AppState, Action, Product } from '../types';

//başlangıç parası

export const INITIAL_BALANCE = 100_000_000_000;

//toplam harcamayı hesapla
const calculateTotalSpent = (products: Product[]): number => {
    return products.reduce((total, product) => {
        //her ürün için
        return total + product.price * product.quantity;
    }, 0);
};

//kalan parayı hesaplama
const calculateBalance = (products: Product[]): number => {
    const totalSpent = calculateTotalSpent(products);
    return INITIAL_BALANCE - totalSpent;
};

//bir üründen maksimum kaç adet alınabilir
const calculateMaxAffordable = (
    products: Product[],
    productId: number,
    productPrice: number,
): number => {
    //diğer ürünlerin toplam harcamasını hesaplama
    const otherProductsSpent = products
        .filter((p) => p.id !== productId)
        .reduce((sum, p) => sum + p.price * p.quantity, 0);

    //Kalan para
    const availableBalance = INITIAL_BALANCE - otherProductsSpent;

    //maksimum adet
    return Math.floor(availableBalance / productPrice);
};
/**
 * Reducer fonksiyonu-><ana fonksiyon
 * parametreler
 * -state: Mevcut state->AppStore
 * -action:Ne yapılacağı->Action
 * -dönüş yeri:yeni state->AppState
 */

export const reducer = (state: AppState, action: Action): AppState => {
    //Action type'ına göre farklı işlemler yap
    switch (action.type) {
        //bir ürünün quantitysini +1
        //para yeterli mi kontrol et
        case 'BUY': {
            //ürünü bul
            const product = state.products.find((p) => p.id === action.payload.productId);
            //ürün bulunamadı mı? state değiştirme
            if (!product) return state;
            //para kontrolü
            const currentBalance = calculateBalance(state.products);
            //para yetmiyor mu? state değiştirme
            if (currentBalance < product.price) return state;
            //para yetiyor! satate güncelle
            return {
                ...state,
                products: state.products.map((p) =>
                    p.id === action.payload.productId ? { ...p, quantity: p.quantity + 1 } : p,
                ),
            };
        }
        case 'SELL': {
            const product = state.products.find((p) => p.id === action.payload.productId);
            if (!product) return state;

            //quanttiy 0 ise satış yapılmaz
            if (product.quantity === 0) return state;
            //quantity>0 state güncelle
            return {
                ...state,
                products: state.products.map((p) =>
                    product.id === action.payload.productId
                        ? { ...p, quantity: p.quantity - 1 }
                        : p,
                ),
            };
        }
        case 'SET_QUANTITY': {
            //payloaddan değerleri al
            const { productId, quantity } = action.payload;
            //ürünü bul
            const product = state.products.find((p) => p.id === productId);

            if (!product) return state;

            if (quantity < 0) return state;

            //maksimum alınabilir adeti hesaplama
            const maxAffordable = calculateMaxAffordable(state.products, productId, product.price);

            //kullanıcın girdiği veya maksimum quantity
            const finalQuantity = Math.min(quantity, maxAffordable);

            //state güncelleme
            return {
                ...state,
                products: state.products.map((p) =>
                    p.id === productId ? { ...p, quantity: finalQuantity } : p,
                ),
            };
        }
        case 'RESET': {
            //tüm ürünlerin quanttiysini 0 yap
            return {
                ...state,
                products: state.products.map((p) => ({
                    ...p,
                    quantity: 0,
                })),
            };
        }
        default:
            return state;
    }
};
