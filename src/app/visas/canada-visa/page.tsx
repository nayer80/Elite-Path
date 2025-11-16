"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function CanadaVisaPage() {
  const [selected, setSelected] = useState<'appointment' | 'frequent'>('appointment');
  const [processingType, setProcessingType] = useState('Normal');
  const [travelDate, setTravelDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // read query param on client to prefill travel date
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('date');
      if (q) setTravelDate(q);
    }
  }, []);

  const prices = useMemo(() => ({ appointment: 1020, frequent: 780 }), []);

  const currentPrice = useMemo(() => {
    const base = selected === 'appointment' ? prices.appointment : prices.frequent;
    return base * quantity;
  }, [selected, quantity, prices]);

  const addToCart = () => {
    // Placeholder: integrate with real cart system when available
    const item = {
      id: selected,
      name: selected === 'appointment' ? 'Canada Visa Appointment + Assistance' : 'Canada Visa Frequent Travelers',
      processingType,
      travelDate,
      quantity,
      price_each: selected === 'appointment' ? prices.appointment : prices.frequent,
      total: currentPrice,
    };
    // For now, store in sessionStorage for demo
    try {
      const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
      cart.push(item);
      sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
    alert('Added to cart: ' + item.name + ' (AED ' + item.total + ')');
  };

  return (
    <main className="container py-8">
      <section className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Canada Visa Prices & Options</h1>

        {/* Option Rows */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b pb-4">
            <div className="flex-1">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="canadaOption"
                  checked={selected === 'appointment'}
                  onChange={() => setSelected('appointment')}
                  className="w-5 h-5"
                />
                <span className="font-semibold">Canada Visa Appointment + Assistance</span>
                <span className="ml-2 text-sm text-gray-400">(i)</span>
              </label>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-600">Processing Type</label>
                  <select value={processingType} onChange={(e) => setProcessingType(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
                    <option>Normal</option>
                    <option>Express</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Travel Date</label>
                  <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">No. Of Visa</label>
                  <select value={String(quantity)} onChange={(e) => setQuantity(Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full md:w-48 mt-4 md:mt-0 flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-xl font-bold text-orange-600">AED { (prices.appointment * (selected === 'appointment' ? quantity : 0)).toLocaleString() || prices.appointment.toLocaleString() }</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="canadaOption"
                  checked={selected === 'frequent'}
                  onChange={() => setSelected('frequent')}
                  className="w-5 h-5"
                />
                <span className="font-semibold">Canada Visa Frequent Travelers (Biometric Not Required)</span>
                <span className="ml-2 text-sm text-gray-400">(i)</span>
              </label>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-600">Processing Type</label>
                  <select value={processingType} onChange={(e) => setProcessingType(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
                    <option>Normal</option>
                    <option>Express</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Travel Date</label>
                  <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">No. Of Visa</label>
                  <select value={String(quantity)} onChange={(e) => setQuantity(Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full md:w-48 mt-4 md:mt-0 flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-xl font-bold text-orange-600">AED { (prices.frequent * (selected === 'frequent' ? quantity : 0)).toLocaleString() || prices.frequent.toLocaleString() }</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action row */}
        <div className="mt-6 flex justify-end gap-3">
          <Link href="/quick-enquiry" className="px-4 py-2 border border-orange-500 text-orange-600 rounded">Quick Enquiry</Link>
          <button onClick={addToCart} className="px-4 py-2 bg-orange-600 text-white rounded">Add to Cart</button>
        </div>
      </section>
    </main>
  );
}
