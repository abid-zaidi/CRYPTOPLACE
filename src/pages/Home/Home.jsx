"use client"

import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const { allCoin, currency, displayCoin, setDisplayCoin } = useContext(CoinContext);
    const [input, setInput] = useState('');

    // Keep existing handler functions

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 text-white px-[5%] md:px-[8%] lg:px-[10%] py-10">
            {/* Animated Hero Section */}
            <div className="text-center mb-12 space-y-6 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl opacity-30 animate-pulse-slow" />
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent animate-gradient-x leading-tight">
                    Crypto <br />
                    <span className="text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        Market Intelligence
                    </span>
                </h1>
                <p className="text-gray-300/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                    Track real-time cryptocurrency metrics with advanced analytics and 
                    <br/>
                    <span className="bg-gradient-to-r from-emerald-400/80 to-cyan-400/80 bg-clip-text text-transparent mx-2">
                        neural network predictions
                    </span>
                </p>
            </div>

            {/* Holographic Table Header */}
            <div className="grid grid-cols-5 gap-4 text-sm py-4 px-4 mb-2 bg-gray-800/40 backdrop-blur-lg rounded-xl border border-emerald-500/20 shadow-[0_0_30px_-15px_rgba(34,197,94,0.1)]">
                <p className="text-emerald-400/90">Rank</p>
                <p className="text-cyan-400/90">Asset</p>
                <p>Price</p>
                <p className="text-center">24H Flux</p>
                <p className="text-right">Market Cap</p>
            </div>

            {/* Cybernetic Coins List */}
            <div className="space-y-2">
                {displayCoin.slice(0, 10).map((item, index) => (
                    <Link
                        to={`/coin/${item.id}`}
                        key={index}
                        className="grid grid-cols-5 gap-4 items-center py-4 px-4 bg-gray-800/30 backdrop-blur-md hover:bg-gray-700/40 rounded-lg border border-emerald-500/10 hover:border-cyan-500/30 transition-all duration-300 group shadow hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400/80">#{item.market_cap_rank}</span>
                            <div className="w-1 h-4 bg-emerald-500/30 group-hover:bg-cyan-500/50 transition-colors" />
                        </div>

                        <div className="flex items-center gap-3">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-0.5" 
                            />
                            <div>
                                <p className="font-medium text-gray-100">{item.name}</p>
                                <p className="text-sm text-cyan-400/80">{item.symbol.toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-cyan-400/80">{currency.symbol}</span>
                            <span className="text-gray-100">{item.current_price.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-center">
                            <div className={`px-3 py-1 rounded-full backdrop-blur-sm ${
                                item.price_change_percentage_24h > 0 
                                    ? 'bg-emerald-500/20 text-emerald-400' 
                                    : 'bg-red-500/20 text-red-400'
                            }`}>
                                <span className="flex items-center gap-1">
                                    {item.price_change_percentage_24h > 0 ? '▲' : '▼'}
                                    {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                                </span>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-gray-100">
                                {currency.symbol}{item.market_cap.toLocaleString()}
                            </p>
                            <p className="text-sm text-emerald-400/60">
                                Vol: {currency.symbol}{item.total_volume.toLocaleString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Grid Scan Effect */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMWExYSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]" />
            </div>
        </div>
    )
}

export default Home