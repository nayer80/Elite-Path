"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, User, ShoppingCart } from "lucide-react";
import { useCurrency } from "@/lib/CurrencyContext";

export default function HeaderBar() {
  const [openCurrency, setOpenCurrency] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState(null);

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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white border-b py-2 text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-end gap-6 pr-4">
        {/* Helpline */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
          <span>Helpline</span>
          <ChevronDown size={14} />
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
                  { code: "GBP", symbol: "£" },
                  { code: "EGP", symbol: "£" },
                  { code: "AED", symbol: "د.إ" },
                  { code: "SAR", symbol: "ر.س" },
                  { code: "KWD", symbol: "د.ك" },
                  { code: "OMR", symbol: "ر.ع" },
                  { code: "USD", symbol: "$" }
                ].map((c) => (
                  <div
                    key={c.code}
                    onClick={() => {
                      setSelectedCurrency(c.code);
                      setOpenCurrency(false);
                    }}
                    className={`border rounded-lg py-1.5 px-2 text-center cursor-pointer hover:bg-gray-100 transition ${selectedCurrency === c.code ? 'border-orange-500 text-orange-500' : 'border-gray-300'}`}
                  >
                    <div className="font-semibold">{c.code}</div>
                    <div className="text-xs text-gray-500">{c.symbol}</div>
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
        <div className="relative cursor-pointer hover:text-blue-600">
          <ShoppingCart size={20} />
          <div className="absolute -top-1.5 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</div>
        </div>
      </div>
    </div>
  );
}
