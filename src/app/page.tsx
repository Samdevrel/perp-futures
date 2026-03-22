'use client';

import { useState } from 'react';

interface Position {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  lev
      <header className="border-b-4 border-purple-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">App</h1>
              <p className="text-gray-400 mt-2">Interactive demo</p>
            </div>
            <nav className="flex gap-2">
              <a href="/" className="px-4 py-2 bg-gray-800 border-2 border-gray-600 hover:border-purple-400 rounded font-bold transition-all">
                Home
              </a>
              <a href="/docs" className="px-4 py-2 bg-purple-500 border-2 border-purple-400 rounded font-bold transition-all">
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </header>

erage: number;
  entryPrice: number;
  markPrice: number;
  size: number;
  pnl: number;
  pnlPercent: number;
}

interface Market {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: string;
  openInterest: string;
  fundingRate: number;
}

const positions: Position[] = [
  {
    id: 'POS-001',
    symbol: 'BTC-PERP',
    side: 'long',
    leverage: 10,
    entryPrice: 67500,
    markPrice: 68200,
    size: 0.5,
    pnl: 350,
    pnlPercent: 10.37,
  },
  {
    id: 'POS-002',
    symbol: 'ETH-PERP',
    side: 'short',
    leverage: 5,
    entryPrice: 3500,
    markPrice: 3450,
    size: 2,
    pnl: 100,
    pnlPercent: 2.86,
  },
  {
    id: 'POS-003',
    symbol: 'SOL-PERP',
    side: 'long',
    leverage: 20,
    entryPrice: 142,
    markPrice: 145,
    size: 50,
    pnl: 150,
    pnlPercent: 2.11,
  },
];

const markets: Market[] = [
  { symbol: 'BTC-PERP', price: 68200, change24h: 2.3, volume24h: '$4.2B', openInterest: '$1.8B', fundingRate: 0.01 },
  { symbol: 'ETH-PERP', price: 3450, change24h: 1.8, volume24h: '$2.1B', openInterest: '$890M', fundingRate: 0.008 },
  { symbol: 'SOL-PERP', price: 145, change24h: 4.2, volume24h: '$890M', openInterest: '$320M', fundingRate: 0.015 },
  { symbol: 'ARB-PERP', price: 1.82, change24h: -1.2, volume24h: '$210M', openInterest: '$85M', fundingRate: -0.005 },
  { symbol: 'SPX-PERP', price: 5780, change24h: 0.8, volume24h: '$150M', openInterest: '$42M', fundingRate: 0.002 },
];

export default function Home() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [leverage, setLeverage] = useState(10);
  const [orderSide, setOrderSide] = useState<'long' | 'short'>('long');

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-red-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Perp Futures DEX</h1>
          <p className="text-gray-400 mt-2">24/7 leveraged trading with up to 200x leverage</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-red-400 p-4 text-center">
            <div className="text-3xl font-black text-red-400">$7.5B</div>
            <div className="text-sm text-gray-400">24h Volume</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">$3.1B</div>
            <div className="text-sm text-gray-400">Open Interest</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-green-400">200x</div>
            <div className="text-sm text-gray-400">Max Leverage</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">5</div>
            <div className="text-sm text-gray-400">Markets</div>
          </div>
        </section>

        {/* Markets */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Perpetual Markets</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">Symbol</th>
                  <th className="text-right py-3">Price</th>
                  <th className="text-right py-3">24h Change</th>
                  <th className="text-right py-3">Volume</th>
                  <th className="text-right py-3">Open Interest</th>
                  <th className="text-right py-3">Funding</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr
                    key={market.symbol}
                    onClick={() => setSelectedMarket(market)}
                    className={`border-b border-gray-800 cursor-pointer hover:bg-gray-800 ${
                      selectedMarket?.symbol === market.symbol ? 'bg-red-900/20' : ''
                    }`}
                  >
                    <td className="py-3 font-bold text-red-400">{market.symbol}</td>
                    <td className="py-3 text-right">${market.price.toLocaleString()}</td>
                    <td className={`py-3 text-right ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {market.change24h >= 0 ? '+' : ''}{market.change24h}%
                    </td>
                    <td className="py-3 text-right">{market.volume24h}</td>
                    <td className="py-3 text-right">{market.openInterest}</td>
                    <td className={`py-3 text-right ${market.fundingRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {market.fundingRate >= 0 ? '+' : ''}{market.fundingRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Trade Panel */}
        {selectedMarket && (
          <section className="bg-gray-900 border-4 border-red-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-red-400">{selectedMarket.symbol}</h2>
                <p className="text-2xl font-bold">${selectedMarket.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedMarket(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setOrderSide('long')}
                    className={`flex-1 py-3 font-bold border-4 ${
                      orderSide === 'long'
                        ? 'bg-green-500 border-green-400'
                        : 'bg-gray-800 border-gray-600 hover:border-green-400'
                    }`}
                  >
                    LONG
                  </button>
                  <button
                    onClick={() => setOrderSide('short')}
                    className={`flex-1 py-3 font-bold border-4 ${
                      orderSide === 'short'
                        ? 'bg-red-500 border-red-400'
                        : 'bg-gray-800 border-gray-600 hover:border-red-400'
                    }`}
                  >
                    SHORT
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Leverage: {leverage}x</label>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={leverage}
                    onChange={(e) => setLeverage(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1x</span>
                    <span>50x</span>
                    <span>100x</span>
                    <span>200x</span>
                  </div>
                </div>

                <button
                  className={`w-full py-4 font-bold border-4 text-xl ${
                    orderSide === 'long'
                      ? 'bg-green-500 border-green-400 hover:bg-green-400'
                      : 'bg-red-500 border-red-400 hover:bg-red-400'
                  }`}
                >
                  {orderSide === 'long' ? 'Open Long' : 'Open Short'}
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Funding Rate</div>
                  <div className={`text-xl font-bold ${selectedMarket.fundingRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedMarket.fundingRate >= 0 ? '+' : ''}{selectedMarket.fundingRate}%
                  </div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Open Interest</div>
                  <div className="text-xl font-bold">{selectedMarket.openInterest}</div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">24h Volume</div>
                  <div className="text-xl font-bold">{selectedMarket.volume24h}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Open Positions */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Open Positions</h2>
          <div className="space-y-3">
            {positions.map((pos) => (
              <div key={pos.id} className="p-4 bg-gray-800 border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-red-400">{pos.symbol}</span>
                    <span className={`ml-3 px-2 py-1 text-xs font-bold ${
                      pos.side === 'long' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                    }`}>
                      {pos.side.toUpperCase()} {pos.leverage}x
                    </span>
                  </div>
                  <div className={`text-right ${pos.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <div className="font-bold">{pos.pnl >= 0 ? '+' : ''}${pos.pnl.toLocaleString()}</div>
                    <div className="text-xs">{pos.pnl >= 0 ? '+' : ''}{pos.pnlPercent}%</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                  <div>
                    <span className="text-gray-500">Entry:</span> ${pos.entryPrice.toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-500">Mark:</span> ${pos.markPrice.toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-500">Size:</span> {pos.size}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How Perpetual Futures Work</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-red-400 mb-2">Choose Market</h3>
              <p className="text-xs text-gray-400">Select perpetual contract</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Set Leverage</h3>
              <p className="text-xs text-gray-400">1x to 200x amplification</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Open Position</h3>
              <p className="text-xs text-gray-400">Long or short exposure</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Funding Rate</h3>
              <p className="text-xs text-gray-400">Longs/shorts pay each other</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-red-400 hover:underline">@samdevrel</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
