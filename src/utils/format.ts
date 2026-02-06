//yardımcı fonksiyonlar(para formatı gibi)

//1- para formatlama
export const formatMoney = (amount: number): string => {
    //sayıyı yerel formata çevir
    return new Intl.NumberFormat('en-US', {
        style: 'currency', //para formatı
        currency: 'USD',
        minimumFractionDigits: 0, //ondalık basamak yok
        maximumFractionDigits: 0,
    }).format(amount);
};

console.log(formatMoney(1000));
