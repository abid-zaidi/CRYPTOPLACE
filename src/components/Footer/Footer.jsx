import React from 'react'

const Footer = () => {
    return (
        <div className="w-full py-6  bg-gradient-to-r from-gray-900/50 via-gray-900/80 to-gray-900/50 backdrop-blur-xl border-t border-emerald-500/20 shadow-[0_0_30px_-10px_rgba(34,197,94,0.1)]">
            <div className="px-[5%] md:px-[8%] lg:px-[10%]">
                <p className="text-center text-sm md:text-base text-gray-300/80 hover:text-cyan-400/90 transition-colors duration-300">
                    <span className="bg-gradient-to-r from-emerald-400/80 to-cyan-400/80 bg-clip-text text-transparent">
                        © 2024 CryptoTracker
                    </span> 
                    - All market data sourced from CoinGecko API
                </p>
                <p className="text-center text-xs md:text-sm text-gray-400/60 mt-2">
                    Made with <span className="text-red-400/80">♥</span> · 
                    <a href="https://hexagondigitalservices.com/" className="ml-2 hover:text-emerald-400/90 transition-colors">
                        Hexagon Digital Services
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Footer