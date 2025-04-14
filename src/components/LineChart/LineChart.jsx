import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ historicalData, currencySymbol }) => {
    const [data, setData] = useState([["Date", "Prices"]])
    
    useEffect(() => {
        if (historicalData?.prices) {
            const formattedData = historicalData.prices.map(item => [
                new Date(item[0]), 
                item[1]
            ])
            setData([['Date', 'Price'], ...formattedData])
        }
    }, [historicalData])

    const options = {
        backgroundColor: 'transparent',
        legend: 'none',
        curveType: 'function',
        hAxis: {
            textStyle: { color: '#9CA3AF' },
            gridlines: { color: '#374151' },
            format: 'MMM dd',
        },
        vAxis: {
            textStyle: { color: '#9CA3AF' },
            gridlines: { color: '#374151' },
            format: `'${currencySymbol}'#,##0.00`
        },
        chartArea: {
            backgroundColor: {
                fill: 'transparent',
                opacity: 0
            },
            width: '90%',
            height: '80%'
        },
        colors: ['#10B981'],
        lineWidth: 3,
        trendlines: {
            0: {
                type: 'linear',
                color: '#06B6D4',
                lineWidth: 1,
                opacity: 0.4,
                showR2: false
            }
        },
        crosshair: {
            trigger: 'both',
            orientation: 'vertical',
            color: '#06B6D4',
            opacity: 0.2
        },
        tooltip: {
            textStyle: { color: '#F3F4F6' },
            showColorCode: true,
            isHtml: true
        }
    }

    return (
        <div className="h-96 w-full bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
            <Chart
                chartType="LineChart"
                data={data}
                options={options}
                loader={<div className="text-emerald-400">Loading Market Data...</div>}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}

export default LineChart