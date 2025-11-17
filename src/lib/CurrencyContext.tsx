"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { currencyService, ExchangeRates } from "./currencyService";

interface CurrencyContextType {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  exchangeRates: ExchangeRates;
  loading: boolean;
  convertPrice: (priceInAED: number) => number;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrencyState] = useState("AED");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ AED: 1 });
  const [loading, setLoading] = useState(true);

  // Initialize the currency service on mount
  useEffect(() => {
    const initService = async () => {
      try {
        await currencyService.initialize();
        
        // Load initial state from service
        setSelectedCurrencyState(currencyService.getSelectedCurrency());
        setExchangeRates(currencyService.getExchangeRates());

        // Subscribe to currency changes from other pages/components
        const unsubscribe = currencyService.subscribe((currency, rates) => {
          setSelectedCurrencyState(currency);
          setExchangeRates(rates);
          // Update all prices on the page when currency changes
          currencyService.updateAllPricesOnPage();
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Failed to initialize currency service:", error);
      } finally {
        setLoading(false);
      }
    };

    initService();
  }, []);

  const setSelectedCurrency = (currency: string) => {
    currencyService.setSelectedCurrency(currency);
    setSelectedCurrencyState(currency);
    setExchangeRates(currencyService.getExchangeRates());
  };

  const convertPrice = (priceInAED: number): number => {
    return currencyService.convertPrice(priceInAED, selectedCurrency);
  };

  const formatPrice = (price: number): string => {
    return currencyService.formatPrice(price, selectedCurrency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        exchangeRates,
        loading,
        convertPrice,
        formatPrice,
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
