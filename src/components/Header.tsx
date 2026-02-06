//üst kısım (resim, başlık, para)
import { formatMoney } from '../utils/format';

//compınenti alacağı props
interface HeaderProps {
    balance: number; //kalan para
}

export const Header = ({ balance }: HeaderProps) => {
    return (
        //dış container
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
            {/**içerik container */}
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/**profil resmi */}
                <div className="mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center text-5xl">
                        <img src={'https://neal.fun/spend/billgates.jpg'} alt={'bill'} />
                    </div>
                </div>
                <h1 className="text-4xl font-bold mb-2">Spend Bill Gate's Money</h1>
                <p className="text-blue-100 mb-6">What would you do with $100 billion?</p>
                {/**para gösteri mi */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg py-4 px-6 inline-block">
                    <p className="text-sm text-blue-100 mb-1">Balance</p>
                    <p className="text-3xl font-bold">{formatMoney(balance)}</p>
                </div>
            </div>
        </header>
    );
};
