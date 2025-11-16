"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  exchangeRates: ExchangeRates;
  loading: boolean;
  convertPrice: (priceInAED: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ AED: 1 });
  const [loading, setLoading] = useState(false);

  // Fetch exchange rates on mount and when currency changes
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      try {
        // Using exchangerate-api.com free tier (1500 requests/month)
        // Or you can use your own API endpoint
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/AED`,
          { cache: "no-store" }
        );
        
        if (response.ok) {
          const data = await response.json();
          setExchangeRates(data.rates || { AED: 1 });
        } else {
          // Fallback to default rates if API fails
          setExchangeRates(getDefaultRates());
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Use fallback rates
        setExchangeRates(getDefaultRates());
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertPrice = (priceInAED: number): number => {
    if (!exchangeRates[selectedCurrency]) {
      return priceInAED; // Return original if currency not found
    }
    return Math.round(priceInAED * exchangeRates[selectedCurrency] * 100) / 100;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        exchangeRates,
        loading,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

// Fallback exchange rates (approximate, update daily)
function getDefaultRates() {
  return {
    AED: 1,
    USD: 0.27,
    EUR: 0.25,
    GBP: 0.21,
    INR: 22.5,
    SAR: 1.01,
    SGD: 0.36,
    MYR: 1.27,
    ZAR: 5.0,
    THB: 9.5,
    OMR: 0.1,
    AUD: 0.42,
    GEL: 0.7,
    AMD: 104,
    HKD: 2.1,
    JPY: 41,
    CAD: 0.37,
    CHF: 0.24,
    CNY: 1.95,
    KRW: 358,
    TRY: 9.0,
    DKK: 1.87,
    VND: 6820,
    IDR: 4300,
    PHP: 15.5,
    PKR: 75,
    BDT: 28,
    LKR: 90,
    IQD: 354,
    JOD: 0.19,
    LBP: 24000,
    EGP: 13,
    RUB: 26,
    BRL: 1.58,
    MXN: 4.7,
    CLP: 251,
    COP: 1101,
    PEN: 1.0,
    TWD: 8.8,
    NZD: 0.46,
    SEK: 2.88,
    NOK: 2.88,
  };
}
