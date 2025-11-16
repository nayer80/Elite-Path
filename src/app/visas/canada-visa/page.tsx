"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function CanadaVisaPage() {
  const [appointmentSelected, setAppointmentSelected] = useState(true);
  const [frequentSelected, setFrequentSelected] = useState(false);

  const [appointmentProcessingType, setAppointmentProcessingType] = useState('Normal');
  const [frequentProcessingType, setFrequentProcessingType] = useState('Normal');

  const [appointmentDate, setAppointmentDate] = useState('');
  const [frequentDate, setFrequentDate] = useState('');

  const [appointmentQuantity, setAppointmentQuantity] = useState(1);
  const [frequentQuantity, setFrequentQuantity] = useState(1);

  useEffect(() => {
    // read query param on client to prefill travel dates
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('date');
      if (q) {
        setAppointmentDate(q);
        setFrequentDate(q);
      }
    }
  }, []);

  const prices = useMemo(() => ({ appointment: 1020, frequent: 780 }), []);

  const totalPrice = useMemo(() => {
    return (appointmentSelected ? prices.appointment * appointmentQuantity : 0) + (frequentSelected ? prices.frequent * frequentQuantity : 0);
  }, [appointmentSelected, frequentSelected, appointmentQuantity, frequentQuantity, prices]);

  const addToCart = () => {
    // Placeholder: integrate with real cart system when available
    const items = [];
    if (appointmentSelected) {
      items.push({
        id: 'appointment',
        name: 'Canada Visa Appointment + Assistance',
        processingType: appointmentProcessingType,
        travelDate: appointmentDate,
        quantity: appointmentQuantity,
        price_each: prices.appointment,
        total: prices.appointment * appointmentQuantity,
      });
    }

    if (frequentSelected) {
      items.push({
        id: 'frequent',
        name: 'Canada Visa Frequent Travelers (Biometric Not Required)',
        processingType: frequentProcessingType,
        travelDate: frequentDate,
        quantity: frequentQuantity,
        price_each: prices.frequent,
        total: prices.frequent * frequentQuantity,
      });
    }

    try {
      const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
      items.forEach((it) => cart.push(it));
      sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }

    if (items.length > 0) {
      alert('Added to cart: ' + items.map((i) => i.name).join(', ') + ' (AED ' + items.reduce((s, i) => s + i.total, 0) + ')');
    } else {
      alert('Please select at least one option to add to cart.');
    }
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
                  type="checkbox"
                  name="canadaOptionAppointment"
                  checked={appointmentSelected}
                  onChange={(e) => setAppointmentSelected(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-semibold">Canada Visa Appointment + Assistance</span>
                <span className="ml-2 text-sm text-gray-400">(i)</span>
              </label>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-600">Processing Type</label>
                  <select value={appointmentProcessingType} onChange={(e) => setAppointmentProcessingType(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
                    <option>Normal</option>
                    <option>Express</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Travel Date</label>
                  <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">No. Of Visa</label>
                  <select value={String(appointmentQuantity)} onChange={(e) => setAppointmentQuantity(Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2">
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
                <div className="text-xl font-bold text-orange-600">AED { (prices.appointment * appointmentQuantity).toLocaleString() }</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="canadaOptionFrequent"
                  checked={frequentSelected}
                  onChange={(e) => setFrequentSelected(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="font-semibold">Canada Visa Frequent Travelers (Biometric Not Required)</span>
                <span className="ml-2 text-sm text-gray-400">(i)</span>
              </label>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-600">Processing Type</label>
                  <select value={frequentProcessingType} onChange={(e) => setFrequentProcessingType(e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
                    <option>Normal</option>
                    <option>Express</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Travel Date</label>
                  <input type="date" value={frequentDate} onChange={(e) => setFrequentDate(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">No. Of Visa</label>
                  <select value={String(frequentQuantity)} onChange={(e) => setFrequentQuantity(Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2">
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
                <div className="text-xl font-bold text-orange-600">AED { (prices.frequent * frequentQuantity).toLocaleString() }</div>
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
