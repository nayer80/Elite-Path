"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, User, ShoppingCart } from "lucide-react";

export default function HeaderBar() {
  const [openCurrency, setOpenCurrency] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
            onClick={() => setOpenCurrency(!openCurrency)}
          >
            <span>{selectedCurrency}</span>
            <ChevronDown size={14} />
          </div>

          {/* Dropdown Panel */}
          {openCurrency && (
            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl p-4 z-50 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-4 gap-3 text-sm">
                {[
                  { code: "AED", symbol: "د.إ" },
                  { code: "AFN", symbol: "؋" },
                  { code: "ALL", symbol: "L" },
                  { code: "AMD", symbol: "֏" },
                  { code: "ANG", symbol: "ƒ" },
                  { code: "AOA", symbol: "Kz" },
                  { code: "ARS", symbol: "$" },
                  { code: "AUD", symbol: "A$" },
                  { code: "AWG", symbol: "ƒ" },
                  { code: "AZN", symbol: "₼" },
                  { code: "BAM", symbol: "KM" },
                  { code: "BBD", symbol: "$" },
                  { code: "BDT", symbol: "৳" },
                  { code: "BGN", symbol: "лв" },
                  { code: "BHD", symbol: ".د.ب" },
                  { code: "BIF", symbol: "FBu" },
                  { code: "BMD", symbol: "$" },
                  { code: "BND", symbol: "$" },
                  { code: "BOB", symbol: "Bs." },
                  { code: "BRL", symbol: "R$" },
                  { code: "BSD", symbol: "$" },
                  { code: "BWP", symbol: "P" },
                  { code: "BYN", symbol: "Br" },
                  { code: "BZD", symbol: "$" },
                  { code: "CAD", symbol: "C$" },
                  { code: "CDF", symbol: "FC" },
                  { code: "CHE", symbol: "CHE" },
                  { code: "CHF", symbol: "CHF" },
                  { code: "CHW", symbol: "CHW" },
                  { code: "CLF", symbol: "CLF" },
                  { code: "CLP", symbol: "$" },
                  { code: "CNY", symbol: "¥" },
                  { code: "COP", symbol: "$" },
                  { code: "CRC", symbol: "₡" },
                  { code: "CUC", symbol: "$" },
                  { code: "CUP", symbol: "₱" },
                  { code: "CVE", symbol: "$" },
                  { code: "CZK", symbol: "Kč" },
                  { code: "DJF", symbol: "Fdj" },
                  { code: "DKK", symbol: "kr" },
                  { code: "DOP", symbol: "$" },
                  { code: "DZD", symbol: "د.ج" },
                  { code: "EGP", symbol: "£" },
                  { code: "ERN", symbol: "Nfk" },
                  { code: "ETB", symbol: "Br" },
                  { code: "EUR", symbol: "€" },
                  { code: "FJD", symbol: "$" },
                  { code: "FKP", symbol: "£" },
                  { code: "GBP", symbol: "£" },
                  { code: "GEL", symbol: "₾" },
                  { code: "GHS", symbol: "₵" },
                  { code: "GIP", symbol: "£" },
                  { code: "GMD", symbol: "D" },
                  { code: "GNF", symbol: "FG" },
                  { code: "GTQ", symbol: "Q" },
                  { code: "GYD", symbol: "$" },
                  { code: "HKD", symbol: "HK$" },
                  { code: "HNL", symbol: "L" },
                  { code: "HRK", symbol: "kn" },
                  { code: "HTG", symbol: "G" },
                  { code: "HUF", symbol: "Ft" },
                  { code: "IDR", symbol: "Rp" },
                  { code: "ILS", symbol: "₪" },
                  { code: "INR", symbol: "₹" },
                  { code: "IQD", symbol: "ع.د" },
                  { code: "IRR", symbol: "﷼" },
                  { code: "ISK", symbol: "kr" },
                  { code: "JMD", symbol: "$" },
                  { code: "JOD", symbol: "د.ا" },
                  { code: "JPY", symbol: "¥" },
                  { code: "KES", symbol: "KSh" },
                  { code: "KGS", symbol: "с" },
                  { code: "KHR", symbol: "៛" },
                  { code: "KMF", symbol: "CF" },
                  { code: "KPW", symbol: "₩" },
                  { code: "KRW", symbol: "₩" },
                  { code: "KWD", symbol: "د.ك" },
                  { code: "KYD", symbol: "$" },
                  { code: "KZT", symbol: "₸" },
                  { code: "LAK", symbol: "₭" },
                  { code: "LBP", symbol: "£" },
                  { code: "LKR", symbol: "Rs" },
                  { code: "LRD", symbol: "$" },
                  { code: "LSL", symbol: "L" },
                  { code: "LYD", symbol: "ل.د" },
                  { code: "MAD", symbol: "د.م." },
                  { code: "MDL", symbol: "L" },
                  { code: "MGA", symbol: "Ar" },
                  { code: "MKD", symbol: "ден" },
                  { code: "MMK", symbol: "K" },
                  { code: "MNT", symbol: "₮" },
                  { code: "MOP", symbol: "P" },
                  { code: "MRU", symbol: "UM" },
                  { code: "MUR", symbol: "₨" },
                  { code: "MVR", symbol: "Rf" },
                  { code: "MWK", symbol: "MK" },
                  { code: "MXN", symbol: "$" },
                  { code: "MYR", symbol: "RM" },
                  { code: "MZN", symbol: "MT" },
                  { code: "NAD", symbol: "$" },
                  { code: "NGN", symbol: "₦" },
                  { code: "NIO", symbol: "C$" },
                  { code: "NOK", symbol: "kr" },
                  { code: "NPR", symbol: "₨" },
                  { code: "NZD", symbol: "NZ$" },
                  { code: "OMR", symbol: "ر.ع." },
                  { code: "PAB", symbol: "B/." },
                  { code: "PEN", symbol: "S/" },
                  { code: "PGK", symbol: "K" },
                  { code: "PHP", symbol: "₱" },
                  { code: "PKR", symbol: "₨" },
                  { code: "PLN", symbol: "zł" },
                  { code: "PYG", symbol: "Gs" },
                  { code: "QAR", symbol: "ر.ق" },
                  { code: "RON", symbol: "lei" },
                  { code: "RSD", symbol: "д" },
                  { code: "RUB", symbol: "₽" },
                  { code: "RWF", symbol: "FRw" },
                  { code: "SAR", symbol: "﷼" },
                  { code: "SBD", symbol: "$" },
                  { code: "SCR", symbol: "₨" },
                  { code: "SDG", symbol: "ج.س" },
                  { code: "SEK", symbol: "kr" },
                  { code: "SGD", symbol: "S$" },
                  { code: "SHP", symbol: "£" },
                  { code: "SLL", symbol: "Le" },
                  { code: "SOS", symbol: "Sh" },
                  { code: "SRD", symbol: "$" },
                  { code: "SSP", symbol: "£" },
                  { code: "STN", symbol: "Db" },
                  { code: "SYP", symbol: "£" },
                  { code: "SZL", symbol: "L" },
                  { code: "THB", symbol: "฿" },
                  { code: "TJS", symbol: "ЅМ" },
                  { code: "TMT", symbol: "m" },
                  { code: "TND", symbol: "د.ت" },
                  { code: "TOP", symbol: "T$" },
                  { code: "TRY", symbol: "₺" },
                  { code: "TTD", symbol: "$" },
                  { code: "TVD", symbol: "$" },
                  { code: "TWD", symbol: "NT$" },
                  { code: "TZS", symbol: "TSh" },
                  { code: "UAH", symbol: "₴" },
                  { code: "UGX", symbol: "USh" },
                  { code: "USD", symbol: "$" },
                  { code: "UYU", symbol: "$" },
                  { code: "UZS", symbol: "сўм" },
                  { code: "VES", symbol: "Bs." },
                  { code: "VND", symbol: "₫" },
                  { code: "VUV", symbol: "VT" },
                  { code: "WST", symbol: "T" },
                  { code: "XAF", symbol: "FCFA" },
                  { code: "XCD", symbol: "$" },
                  { code: "XOF", symbol: "CFA" },
                  { code: "XPF", symbol: "₣" },
                  { code: "YER", symbol: "﷼" },
                  { code: "ZAR", symbol: "R" },
                  { code: "ZMW", symbol: "ZK" },
                  { code: "ZWL", symbol: "$" }
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
        <Link
          href="/login"
          className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
        >
          <User size={16} />
          <span>Log In</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-300"></div>

        {/* Cart */}
        <div className="relative cursor-pointer hover:text-blue-600">
          <ShoppingCart size={20} />
          <div className="absolute -top-1.5 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            0
          </div>
        </div>
      </div>
    </div>
  );
}
