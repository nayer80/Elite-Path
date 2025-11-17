/**
 * Global Currency Conversion Service
 * Provides centralized currency conversion, rate management, and DOM price updates
 * Used across all pages and components for consistent currency handling
 */

export interface ExchangeRates {
  [key: string]: number;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
}

// Supported currencies with their symbols
export const SUPPORTED_CURRENCIES: { [key: string]: CurrencyConfig } = {
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  SAR: { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  OMR: { code: 'OMR', symbol: 'ر.ع', name: 'Omani Rial' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  GEL: { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
  EGP: { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
};

// Default fallback rates (AED as base currency)
const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
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
  EGP: 15.5,
};

// Storage keys
const STORAGE_KEYS = {
  SELECTED_CURRENCY: 'elitePath_selectedCurrency',
  EXCHANGE_RATES: 'elitePath_exchangeRates',
  RATES_TIMESTAMP: 'elitePath_ratesTimestamp',
};

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

class CurrencyConversionService {
  private exchangeRates: ExchangeRates = DEFAULT_EXCHANGE_RATES;
  private selectedCurrency: string = 'AED';
  private listeners: Set<(currency: string, rates: ExchangeRates) => void> = new Set();
  private isInitialized = false;

  /**
   * Initialize the service and load saved preferences
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load saved currency preference
      const savedCurrency = this.loadFromStorage(STORAGE_KEYS.SELECTED_CURRENCY);
      if (savedCurrency) {
        this.selectedCurrency = savedCurrency;
      }

      // Load cached exchange rates
      const rates = this.loadFromStorage(STORAGE_KEYS.EXCHANGE_RATES);
      const timestamp = this.loadFromStorage(STORAGE_KEYS.RATES_TIMESTAMP);

      if (rates && timestamp) {
        const cacheAge = Date.now() - parseInt(timestamp);
        if (cacheAge < CACHE_EXPIRATION_TIME) {
          this.exchangeRates = rates;
          this.isInitialized = true;
          console.log('CurrencyService: Loaded cached exchange rates');
          return;
        }
      }

      // Fetch fresh rates
      await this.fetchExchangeRates();
    } catch (error) {
      console.error('CurrencyService: Failed to initialize, using default rates:', error);
      this.exchangeRates = DEFAULT_EXCHANGE_RATES;
    }

    this.isInitialized = true;
  }

  /**
   * Fetch latest exchange rates from API
   */
  private async fetchExchangeRates(): Promise<void> {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/AED`,
        { cache: 'no-store' }
      );

      if (response.ok) {
        const data = await response.json();
        this.exchangeRates = data.rates || DEFAULT_EXCHANGE_RATES;

        // Cache the rates
        this.saveToStorage(STORAGE_KEYS.EXCHANGE_RATES, this.exchangeRates);
        this.saveToStorage(STORAGE_KEYS.RATES_TIMESTAMP, Date.now().toString());

        console.log('CurrencyService: Fetched fresh exchange rates');
      } else {
        throw new Error(`API response status: ${response.status}`);
      }
    } catch (error) {
      console.warn('CurrencyService: Failed to fetch rates, using defaults:', error);
      this.exchangeRates = DEFAULT_EXCHANGE_RATES;
    }
  }

  /**
   * Set the selected currency and notify listeners
   */
  setSelectedCurrency(currency: string): void {
    if (!SUPPORTED_CURRENCIES[currency]) {
      console.warn(`CurrencyService: Unsupported currency ${currency}`);
      return;
    }

    this.selectedCurrency = currency;
    this.saveToStorage(STORAGE_KEYS.SELECTED_CURRENCY, currency);

    // Notify all listeners
    this.notifyListeners();

    console.log(`CurrencyService: Currency changed to ${currency}`);
  }

  /**
   * Get the currently selected currency
   */
  getSelectedCurrency(): string {
    return this.selectedCurrency;
  }

  /**
   * Get the current exchange rates
   */
  getExchangeRates(): ExchangeRates {
    return { ...this.exchangeRates };
  }

  /**
   * Convert price from AED to target currency
   */
  convertPrice(priceInAED: number, targetCurrency: string): number {
    if (!this.exchangeRates[targetCurrency]) {
      console.warn(`CurrencyService: Exchange rate not found for ${targetCurrency}`);
      return priceInAED;
    }

    const converted = priceInAED * this.exchangeRates[targetCurrency];
    return Math.round(converted * 100) / 100;
  }

  /**
   * Format a price with currency symbol
   */
  formatPrice(price: number, currencyCode: string): string {
    const config = SUPPORTED_CURRENCIES[currencyCode];
    if (!config) {
      console.warn(`CurrencyService: Unknown currency ${currencyCode}`);
      return `${price.toFixed(2)} ${currencyCode}`;
    }

    return `${config.symbol} ${price.toFixed(2)}`;
  }

  /**
   * Parse price string to extract numeric value
   * Supports formats like "$399", "399", "د.إ 399"
   */
  parsePrice(priceStr: string): number {
    const numericValue = parseFloat(priceStr.replace(/[^0-9.-]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  /**
   * Update all price elements on the page with data-price-aed attribute
   * This allows any element to mark its base price for auto-conversion
   */
  updateAllPricesOnPage(): void {
    try {
      const priceElements = document.querySelectorAll('[data-price-aed]');
      let updatedCount = 0;

      priceElements.forEach((element) => {
        const priceInAED = parseFloat(element.getAttribute('data-price-aed') || '0');
        if (priceInAED > 0) {
          const convertedPrice = this.convertPrice(priceInAED, this.selectedCurrency);
          const formattedPrice = this.formatPrice(convertedPrice, this.selectedCurrency);
          element.textContent = formattedPrice;
          updatedCount++;
        }
      });

      if (updatedCount > 0) {
        console.log(`CurrencyService: Updated ${updatedCount} price elements on page`);
      }
    } catch (error) {
      console.error('CurrencyService: Error updating prices on page:', error);
    }
  }

  /**
   * Subscribe to currency change events
   */
  subscribe(callback: (currency: string, rates: ExchangeRates) => void): () => void {
    this.listeners.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners of currency change
   */
  private notifyListeners(): void {
    this.listeners.forEach((callback) => {
      try {
        callback(this.selectedCurrency, this.getExchangeRates());
      } catch (error) {
        console.error('CurrencyService: Error in listener callback:', error);
      }
    });
  }

  /**
   * Save data to localStorage (with error handling)
   */
  private saveToStorage(key: string, value: any): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`CurrencyService: Failed to save ${key} to localStorage:`, error);
    }
  }

  /**
   * Load data from localStorage (with error handling)
   */
  private loadFromStorage(key: string): any {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
    } catch (error) {
      console.warn(`CurrencyService: Failed to load ${key} from localStorage:`, error);
    }
    return null;
  }

  /**
   * Clear all stored currency data
   */
  clearStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_CURRENCY);
        localStorage.removeItem(STORAGE_KEYS.EXCHANGE_RATES);
        localStorage.removeItem(STORAGE_KEYS.RATES_TIMESTAMP);
      }
    } catch (error) {
      console.warn('CurrencyService: Failed to clear storage:', error);
    }
  }

  /**
   * Refresh exchange rates from API
   */
  async refreshRates(): Promise<void> {
    await this.fetchExchangeRates();
    this.notifyListeners();
  }
}

// Export singleton instance
export const currencyService = new CurrencyConversionService();
