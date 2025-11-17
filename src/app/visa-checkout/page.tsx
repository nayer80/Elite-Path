"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getVisaCart,
  removeVisaFromCart,
  clearVisaCart,
  VisaCartItem,
  formatPrice,
  convertPriceFromAED,
  initializeCurrencyListener,
  syncCartCountFromCart,
} from '@/lib/visaCartHandler';
import { useCurrency } from '@/lib/CurrencyContext';
import { currencyService } from '@/lib/currencyService';
import { useRouter } from 'next/navigation';

export default function VisaCheckout() {
  const [cartItems, setCartItems] = useState<VisaCartItem[]>([]);
  const [selectedVisa, setSelectedVisa] = useState<VisaCartItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { selectedCurrency, exchangeRates, convertPrice, formatPrice: ctxFormat } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    const items = getVisaCart();
    setCartItems(items);

    // attempt to load the explicitly selected visa saved by the details page
    try {
      const raw = localStorage.getItem('selectedVisa');
      if (raw) {
        const parsed = JSON.parse(raw) as VisaCartItem;
        setSelectedVisa(parsed);
      }
    } catch (e) {
      // ignore parse errors
    }
    setLoading(false);

    // Initialize global currency listener to update prices when changed
    const unsubscribe = initializeCurrencyListener(() => {
      const fresh = getVisaCart();
      setCartItems(fresh);
      // refresh selectedVisa from storage as well (so totals re-render)
      try {
        const raw = localStorage.getItem('selectedVisa');
        if (raw) setSelectedVisa(JSON.parse(raw) as VisaCartItem);
      } catch (e) {
        /* ignore */
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRemove = (index: number) => {
    removeVisaFromCart(index);
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Confirmation modal state for removing product
  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const handleConfirmYes = () => {
    // Remove the specific selected product (if present) and redirect home
    try {
      const cart = getVisaCart();
      if (selectedVisa) {
        const idx = cart.findIndex((it) => it.timestamp === selectedVisa.timestamp);
        if (idx !== -1) {
          removeVisaFromCart(idx);
        } else if (cart.length > 0) {
          // fallback: remove first item
          removeVisaFromCart(0);
        }
      } else if (cart.length > 0) {
        // no explicit selectedVisa: remove first
        removeVisaFromCart(0);
      }
      // sync count and UI
      syncCartCountFromCart();
    } catch (e) {
      console.error('Error removing product via confirm modal', e);
    }
    // refresh UI
    const fresh = getVisaCart();
    setCartItems(fresh);
    setSelectedVisa(null);
    setShowConfirm(false);
    // redirect to homepage
    try {
      router.push('/');
    } catch (e) {
      // fallback
      window.location.href = '/';
    }
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear the entire cart?')) {
      clearVisaCart();
      setCartItems([]);
    }
  };

  // Compute totals grouped by the currency they were displayed in when added to cart.
  // We must not re-convert prices at checkout — use the stored `unitPrice` and `unitCurrency`.
  const computeTotalsByCurrency = () => {
    const totals: Record<string, number> = {};

    const addItem = (unitPrice: number | undefined, unitCurrency: string | undefined, qty: number) => {
      const cur = unitCurrency || selectedCurrency || 'AED';
      const price = Number.isFinite(unitPrice as number) ? (unitPrice as number) : 0;
      totals[cur] = (totals[cur] || 0) + price * qty;
    };

    if (selectedVisa) {
      addItem(selectedVisa.unitPrice ?? selectedVisa.price, selectedVisa.unitCurrency ?? selectedVisa.currency, selectedVisa.quantity || 1);
      return totals;
    }

    cartItems.forEach((item) => {
      addItem(item.unitPrice ?? item.price, item.unitCurrency ?? item.currency, item.quantity || 1);
    });

    return totals;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  const primaryItem = selectedVisa ?? cartItems[0] ?? null;

  const totalsByCurrency = computeTotalsByCurrency();
  const currencyKeys = Object.keys(totalsByCurrency);

  // Update quantity for the primary item (selectedVisa preferred)
  const updateQuantity = (newQty: number) => {
    if (!Number.isFinite(newQty) || newQty < 1) newQty = 1;

    try {
      // update selectedVisa if present
      if (selectedVisa) {
        selectedVisa.quantity = newQty;
        localStorage.setItem('selectedVisa', JSON.stringify(selectedVisa));
      }

      // update cart array
      const cart = getVisaCart();
      if (cart && cart.length > 0) {
        // try to find matching item by timestamp when selectedVisa exists
        if (selectedVisa) {
          const idx = cart.findIndex((it) => it.timestamp === selectedVisa.timestamp);
          if (idx !== -1) {
            cart[idx].quantity = newQty;
          }
        } else {
          // fallback: update first item
          cart[0].quantity = newQty;
        }
        localStorage.setItem('visaCart', JSON.stringify(cart));
      }

      // refresh UI and cart count
      const fresh = getVisaCart();
      setCartItems(fresh);
      try { syncCartCountFromCart(); } catch (e) { /* ignore */ }
    } catch (e) {
      console.error('Error updating quantity', e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top progress + continue shopping */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-orange-500 font-bold">1</div>
                <div className="text-sm text-gray-700">Add to Cart</div>
              </div>
              <div className="w-24 h-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-orange-500 font-bold">2</div>
                <div className="text-sm text-gray-700">Payment</div>
              </div>
              <div className="w-24 h-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-orange-500 font-bold">3</div>
                <div className="text-sm text-gray-700">Print Voucher</div>
              </div>
            </div>
          </div>

          <div className="text-right text-sm">
            <div>Currently, you have {cartItems.length} item(s) in your cart</div>
            <Link href="/visas" className="text-orange-500 font-semibold">CONTINUE SHOPPING</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Lead Passenger Details */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-orange-500 text-2xl">👥</div>
                <h2 className="text-xl font-bold">Lead Passenger Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="sr-only">Title</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200">
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="sr-only">First Name</label>
                  <input placeholder="First Name *" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-100" />
                </div>
                <div className="md:col-span-2">
                  <label className="sr-only">Last Name</label>
                  <input placeholder="Last Name *" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-100" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <input placeholder="Email Address *" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-100" />
                </div>
                <div>
                  <select className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-100">
                    <option>Nationality</option>
                    <option>Egypt</option>
                    <option>United Arab Emirates</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <input placeholder="ISD Code" className="w-1/3 px-4 py-3 rounded-lg bg-gray-100 border border-gray-100" />
                  <input placeholder="Phone Number *" className="w-2/3 px-4 py-3 rounded-lg bg-gray-100 border border-gray-100" />
                </div>
              </div>

              <div className="mt-4">
                <textarea placeholder="Special Request" className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-100 h-32"></textarea>
              </div>

              <div className="mt-4">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Update booking information in your account</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right - Visa Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow p-6 relative">
                {/* X button to remove product (opens confirmation modal) */}
                <button
                  onClick={openConfirm}
                  aria-label="Remove product"
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg"
                  style={{background:'#f36d1d'}}
                >
                  ✕
                </button>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{primaryItem?.visaType ? primaryItem.visaType.replace('-', ' ') : 'USA Visa'}</h3>
                  <button className="text-gray-400">▴</button>
                </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Visa Option</span>
                  <span className="font-medium">{primaryItem?.visaOption || 'USA VISA B1/B2'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Travel Date :</span>
                  <span className="font-medium">{primaryItem?.travelDate || '18/11/2025'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Type :</span>
                  <span className="font-medium">{primaryItem?.processingType || 'Normal'}</span>
                </div>
                <div className="flex justify-between">
                  <span>No. Of Visa</span>
                  <span className="font-medium">
                    <select
                      className="px-2 py-1 border rounded"
                      value={primaryItem?.quantity ?? 1}
                      onChange={(e) => updateQuantity(parseInt(e.target.value, 10))}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600 font-medium">Last Date to Cancel :</span>
                  <span className="text-red-600 font-medium">Non Refundable</span>
                </div>
                <div className="flex justify-between">
                  <span>Availability</span>
                  <span className="font-medium">Available</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg text-gray-800" id="total-price">
                      {currencyKeys.length === 0 && ctxFormat(0)}
                      {currencyKeys.length === 1 && currencyService.formatPrice(totalsByCurrency[currencyKeys[0]], currencyKeys[0])}
                      {currencyKeys.length > 1 && (
                        <div className="space-y-1 text-right">
                          {currencyKeys.map((c) => (
                            <div key={c}>{currencyService.formatPrice(totalsByCurrency[c], c)}</div>
                          ))}
                        </div>
                      )}
                    </span>
                  </div>
                </div>
                {/* Confirmation modal (clear cart) */}
                {showConfirm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={closeConfirm} />
                    <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="flex items-center justify-between px-6 py-4 border-b">
                        <h4 className="text-lg font-semibold">Alert!</h4>
                        <button
                          aria-label="close"
                          onClick={closeConfirm}
                          className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center"
                          style={{background:'#f36d1d'}}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="px-6 py-6 text-center">
                        <p className="text-gray-700 mb-6">Do you want to remove this product from cart..??</p>

                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={handleConfirmYes}
                            className="px-6 py-2 rounded-full bg-orange-500 text-white font-medium"
                            style={{background:'#f36d1d'}}
                          >
                            Yes
                          </button>

                          <button
                            onClick={closeConfirm}
                            className="px-6 py-2 rounded-full bg-orange-500 text-white font-medium"
                            style={{background:'#f36d1d'}}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
