"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, User, ShoppingCart } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useCurrency } from "@/lib/CurrencyContext";
import { getCartCount } from '@/lib/visaCartHandler';

export default function HeaderBar() {
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openHelpline, setOpenHelpline] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const helplineRef = useRef(null);
  const helplineButtonRef = useRef(null);
  const [helplineStyle, setHelplineStyle] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpenCurrency(false);
      }
      if (
        helplineRef.current &&
        !helplineRef.current.contains(e.target) &&
        helplineButtonRef.current &&
        !helplineButtonRef.current.contains(e.target)
      ) {
        setOpenHelpline(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpenCurrency(false);
        setOpenHelpline(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    // initialize cart count from storage
    try {
      const initial = getCartCount();
      setCartCount(initial);
    } catch (e) {
      try {
        const raw = localStorage.getItem('cartCount');
        setCartCount(raw ? parseInt(raw, 10) : 0);
      } catch (err) {
        setCartCount(0);
      }
    }

    function onCartCountChanged(ev) {
      const next = ev?.detail?.count ?? Number(localStorage.getItem('cartCount') || 0);
      setCartCount(Number.isFinite(next) ? next : 0);
    }

    // listen for custom cart count events
    window.addEventListener('cartCountChanged', onCartCountChanged);
    // listen for storage events (multi-tab)
    function onStorage(e) {
      if (e.key === 'cartCount' || e.key === 'visaCart') {
        const n = Number(localStorage.getItem('cartCount') || 0);
        setCartCount(Number.isFinite(n) ? n : 0);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener('cartCountChanged', onCartCountChanged);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <div className="w-full bg-white border-b py-2 text-sm overflow-visible">
      <div className="max-w-7xl mx-auto flex items-center justify-end gap-6 pr-4 overflow-visible">

        {/* Helpline (restored to original position) */}
        <div className="relative overflow-visible" ref={helplineRef} style={{ zIndex: 'auto' }}>
          <button
            type="button"
            ref={helplineButtonRef}
            onClick={() => {
              const opening = !openHelpline;
              setOpenHelpline(opening);
              if (opening && helplineButtonRef.current) {
                const rect = helplineButtonRef.current.getBoundingClientRect();
                const panelWidth = 220;
                const left = Math.max(8, rect.right - panelWidth);
                setHelplineStyle({ position: 'fixed', top: `${rect.bottom + 8}px`, left: `${left}px`, width: `${panelWidth}px` });
              } else {
                setHelplineStyle(null);
              }
            }}
            className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
            aria-haspopup="true"
            aria-expanded={openHelpline}
          >
            <span>Helpline</span>
            <ChevronDown size={14} />
          </button>

          {openHelpline && (
            <div
              className="border rounded-lg p-3 flex-col text-sm"
              style={{
                ...(helplineStyle || { position: 'fixed', top: '56px', right: '1rem', width: '220px' }),
                backgroundColor: '#ffffff',
                color: '#374151',
                zIndex: 50000,
                display: 'block',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                borderColor: '#e5e7eb',
              }}
            >
              <a href="tel:+971509787748" className="flex items-center gap-2 hover:text-blue-600" style={{ color: '#374151', textDecoration: 'none', marginBottom: '8px', display: 'flex' }}>
                <span className="text-lg">🇦🇪</span>
                <span>+971 509787748</span>
              </a>
              <a href="tel:+201020430122" className="flex items-center gap-2 hover:text-blue-600" style={{ color: '#374151', textDecoration: 'none', display: 'flex' }}>
                <span className="text-lg">🇪🇬</span>
                <span>+20 1020430122</span>
              </a>
            </div>
          )}
        </div>

        {/* Language */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
          <span>English</span>
          <ChevronDown size={14} />
        </div>

        {/* Currency Dropdown */}
        <div className="relative group" ref={dropdownRef}>
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
            ref={buttonRef}
            onClick={() => {
              const opening = !openCurrency;
              setOpenCurrency(opening);
              if (opening && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                // w-72 = 18rem = 288px; align right edge of panel with button's right edge
                const panelWidth = 288;
                const left = Math.max(8, rect.right - panelWidth); // prevent off-screen left
                setDropdownStyle({ position: 'fixed', top: `${rect.bottom + 8}px`, left: `${left}px`, width: `${panelWidth}px` });
              } else {
                setDropdownStyle(null);
              }
            }}
          >
            <span>{selectedCurrency}</span>
            <ChevronDown size={14} />
          </div>

          {openCurrency && (
            <div
              className="bg-white shadow-2xl rounded-xl p-4 z-[9999] max-h-96 overflow-y-auto border border-gray-200"
              style={dropdownStyle || { position: 'fixed', top: '56px', right: '1rem', width: '288px' }}
            >
              <div className="grid grid-cols-4 gap-3 text-sm">
                {[
                  { code: "GBP", symbol: "£", flag: null },
                  { code: "EGP", symbol: "£", flag: "🇪🇬" },
                  { code: "AED", symbol: "د.إ", flag: "🇦🇪" },
                  { code: "SAR", symbol: "ر.س", flag: null },
                  { code: "KWD", symbol: "د.ك", flag: null },
                  { code: "OMR", symbol: "ر.ع", flag: null },
                  { code: "USD", symbol: "$", flag: null }
                ].map((c) => (
                  <div
                    key={c.code}
                    onClick={() => {
                      setSelectedCurrency(c.code);
                      setOpenCurrency(false);
                    }}
                    className={`border rounded-lg py-1.5 px-2 text-center cursor-pointer hover:bg-gray-100 transition ${selectedCurrency === c.code ? 'border-orange-500 text-orange-500' : 'border-gray-300'}`}
                  >
                    {c.flag ? (
                      <div className="text-2xl">{c.flag}</div>
                    ) : (
                      <>
                        <div className="font-semibold">{c.code}</div>
                        <div className="text-xs text-gray-500">{c.symbol}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Login */}
        <Link href="/login" className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
          <User size={16} />
          <span>Log In</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-300"></div>

        {/* Cart */}
        <div
          className="relative cursor-pointer hover:text-blue-600"
          role="button"
          tabIndex={0}
          onClick={() => {
            try {
              const n = getCartCount();
              if (n > 0) {
                router.push('/visa-checkout');
              }
            } catch (e) {
              // fallback: read from localStorage
              const n = Number(localStorage.getItem('cartCount') || 0);
              if (n > 0) router.push('/visa-checkout');
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              try {
                const n = getCartCount();
                if (n > 0) router.push('/visa-checkout');
              } catch (err) {
                const n = Number(localStorage.getItem('cartCount') || 0);
                if (n > 0) router.push('/visa-checkout');
              }
            }
          }}
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <div
              aria-label={`Cart has ${cartCount} item${cartCount > 1 ? 's' : ''}`}
              className="absolute -top-1.5 -right-1 bg-orange-500 text-white text-[10px] min-w-[1rem] h-4 px-1 flex items-center justify-center rounded-full"
            >
              {cartCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
