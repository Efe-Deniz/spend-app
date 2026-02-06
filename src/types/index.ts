//bu dosya typscript tiplerini barındıracak->Product, AppState,Action
//diğer dosylar buradan import edecek

//1- her ürünün yapısını tanımlayalım
export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

//2-uygulamamnın tüm stateni tanımlar
export interface AppState {
    products: Product[];
}

//3-useReducer için action tiplerini tanımlar
export type ButAction = {
    type: 'BUY';
    payload: {
        productId: number; //hangi ürün
    };
};

export type SellAction = {
    type: 'SELL';
    payload: {
        productId: number;
    };
};

//input ile direk adet ayarla
export type SetQuantityAction = {
    type: 'SET_QUANTITY';
    payload: {
        productId: number;
        quantity: number;
    };
};

//tüm quantityleri 0 yap
export type ResetAction = {
    type: 'RESET';
    //payload yok hepsini sıfırla
};

//Tüm actionları birleştirecez. çünkü Reducer'de sadece bu tipi kullanacaz

export type Action = ButAction | SellAction | SetQuantityAction | ResetAction;
