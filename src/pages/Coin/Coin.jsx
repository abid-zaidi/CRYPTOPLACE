import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'
import { ArrowUp, ArrowDown } from 'lucide-react'

const Coin = () => {
    const { coinId } = useParams()
    const [coinData, setCoinData] = useState()
    const [historicalData, setHistoricalData] = useState()
    const { currency } = useContext(CoinContext)

    const fetchCoinData = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-9BWjDQ6vmip8APNYhdZkxyvE'
            }
        }

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => res.json())
            .then(res => setCoinData(res))
            .catch(err => console.error(err))
    }

    const fetchHistoricalData = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-9BWjDQ6vmip8APNYhdZkxyvE'
            }
        }

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(res => setHistoricalData(res))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchCoinData()
        fetchHistoricalData()
    }, [currency, coinId])

    if (coinData && historicalData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 text-white px-[5%] md:px-[8%] lg:px-[10%] py-10">
                {/* Coin Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl border border-emerald-500/20 hover:border-cyan-500/30 transition-all duration-300">
                    <img
                        src={coinData.image.large}
                        alt={coinData.name}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-1"
                    />
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            {coinData.name}
                            <span className="text-2xl md:text-3xl ml-2 text-cyan-400/80">
                                ({coinData.symbol.toUpperCase()})
                            </span>
                        </h1>
                        <p className="mt-2 text-gray-300/80">
                            Market Rank: #{coinData.market_cap_rank}
                        </p>
                    </div>
                </div>

                {/* Chart */}
                <div className="mb-8 bg-gray-800/30 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/20 shadow-[0_0_30px_-15px_rgba(34,197,94,0.1)]">
                    <h2 className="text-xl font-semibold mb-4 text-emerald-400/90">
                        Price Chart ({currency.symbol})
                    </h2>
                    <div className="h-96">
                        <LineChart
                            historicalData={historicalData}
                            currencySymbol={currency.symbol}
                        />
                    </div>
                </div>

                {/* Market Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        {
                            title: "Current Price",
                            value: coinData.market_data.current_price[currency.name]
                        },
                        {
                            title: "Market Cap",
                            value: coinData.market_data.market_cap[currency.name]
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-500/20 hover:bg-gray-700/40 transition-all duration-300">
                            <h3 className="text-sm text-cyan-400/80 mb-2">{item.title}</h3>
                            <p className="text-2xl font-bold text-emerald-400">
                                {currency.symbol}{item.value.toLocaleString()}
                            </p>
                        </div>
                    ))}

                    <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-500/20 hover:bg-gray-700/40 transition-all duration-300">
                        <h3 className="text-sm text-cyan-400/80 mb-2">24h High/Low</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center text-green-400">
                                <ArrowUp className="w-5 h-5 mr-1" />
                                {currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}
                            </div>
                            <div className="flex items-center text-red-400">
                                <ArrowDown className="w-5 h-5 mr-1" />
                                {currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-500/20">
                        <h3 className="text-lg font-semibold mb-4 text-emerald-400/90">
                            Price Change (24h)
                        </h3>
                        <div className="flex items-center gap-4">
                            <span className={`text-lg ${
                                coinData.market_data.price_change_percentage_24h > 0
                                    ? 'text-green-400'
                                    : 'text-red-400'
                            }`}>
                                {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                            </span>
                            {coinData.market_data.price_change_percentage_24h > 0 ? (
                                <ArrowUp className="w-6 h-6 text-green-400" />
                            ) : (
                                <ArrowDown className="w-6 h-6 text-red-400" />
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-emerald-500/20">
                        <h3 className="text-lg font-semibold mb-4 text-emerald-400/90">
                            Trading Volume
                        </h3>
                        <p className="text-xl text-cyan-400">
                            {currency.symbol}{coinData.market_data.total_volume[currency.name].toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        )
    }
}

export default Coin
