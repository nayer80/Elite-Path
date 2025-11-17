/**
 * Handle Add to Cart functionality for visa pages
 * Stores visa info in localStorage and redirects to checkout
 * Uses the global CurrencyConversionService for all price conversions
 */

import { currencyService, ExchangeRates } from './currencyService';

export interface VisaCartItem {
  visaType: string;
  visaOption: string;
  // `price` is stored as a numeric value in the original currency
  price: number;
  // Store base price in AED for conversions
  priceInAED: number;
  currency: string;
  // The unit price as displayed to the user at time of add-to-cart (numeric) and its currency
  unitPrice?: number;
  unitCurrency?: string;
  processingType?: string;
  travelDate?: string;
  quantity?: number;
  timestamp: number;
}

/**
 * Parse price string to extract numeric value
 * Delegates to global currency service
 */
function parsePrice(priceStr: string): number {
  return currencyService.parsePrice(priceStr);
}

/**
 * Add visa to cart and redirect to checkout page
 * @param visaType - The type of visa (e.g., 'usa-visa', 'australia-visa')
 * @param visaOption - The specific visa option (e.g., 'USA VISA B1/B2')
 * @param price - The price of the visa (e.g., '$399' or '399')
 * @param currency - The selected currency (e.g., 'USD', 'AED')
 * @param additionalData - Optional additional data (processingType, travelDate, quantity)
 */
export function handleAddToCart(
  visaType: string,
  visaOption: string,
  price: string,
  currency: string,
  additionalData?: {
    processingType?: string;
    travelDate?: string;
    quantity?: number;
    // numeric unit price as displayed on the product page (in selected currency)
    unitPrice?: number;
    unitCurrency?: string;
  }
): void {
  // Parse the incoming price string to numeric (remove symbols)
  const numericPrice = parsePrice(price);

  // Determine base price in AED. If the incoming currency is AED assume numericPrice is AED.
  // Otherwise convert the numeric price in `currency` to AED using exchange rates cached in the service.
  let priceInAED = numericPrice;
  try {
    const rates = currencyService.getExchangeRates();
    if (currency && currency !== 'AED' && rates && rates[currency]) {
      // rates[currency] is how much 1 AED equals in target currency (e.g., USD: 0.27)
      // To convert price in target currency back to AED: priceInAED = priceInTarget / rate
      const rate = rates[currency];
      if (rate && rate > 0) {
        priceInAED = Math.round((numericPrice / rate) * 100) / 100;
      }
    }
  } catch (err) {
    console.warn('handleAddToCart: failed to compute AED base price, using numeric price', err);
    priceInAED = numericPrice;
  }

  // Create visa cart item
  const cartItem: VisaCartItem = {
    visaType,
    visaOption,
    // store price as numeric value (in the provided currency)
    price: numericPrice,
    priceInAED,
    currency,
    processingType: additionalData?.processingType,
    travelDate: additionalData?.travelDate,
    quantity: additionalData?.quantity || 1,
    unitPrice: additionalData?.unitPrice,
    unitCurrency: additionalData?.unitCurrency,
    timestamp: Date.now(),
  };

  // Save to localStorage
  try {
    const existingCart = localStorage.getItem('visaCart');
    let cartItems: VisaCartItem[] = [];

    if (existingCart) {
      cartItems = JSON.parse(existingCart);
    }

    // Add new item to cart
    cartItems.push(cartItem);
    localStorage.setItem('visaCart', JSON.stringify(cartItems));
    // Save the selected visa separately so the checkout page can identify the exact picked item
    localStorage.setItem('selectedVisa', JSON.stringify(cartItem));

    // Log for debugging
    console.log('Visa added to cart:', cartItem);
    // Keep cart count in sync
    try {
      syncCartCountFromCart();
    } catch (e) {
      /* ignore */
    }
  } catch (error) {
    console.error('Error saving visa to cart:', error);
  }

  // Redirect to checkout page
  // Note: Using window.location.href to handle client-side navigation
  if (typeof window !== 'undefined') {
    // For Next.js, use a relative path or the full checkout page
    window.location.href = '/visa-checkout';
    // Fallback for static HTML pages:
    // window.location.href = '/visa-checkout.html';
  }
}

/**
 * Get all visas from cart
 * @returns Array of visa items in cart
 */
export function getVisaCart(): VisaCartItem[] {
  try {
    const cart = localStorage.getItem('visaCart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading visa cart:', error);
    return [];
  }
}

/**
 * Clear visa cart
 */
export function clearVisaCart(): void {
  try {
    localStorage.removeItem('visaCart');
    console.log('Visa cart cleared');
    // remove selectedVisa and reset cart count
    try {
      localStorage.removeItem('selectedVisa');
      syncCartCountFromCart();
    } catch (e) {
      /* ignore */
    }
  } catch (error) {
    console.error('Error clearing visa cart:', error);
  }
}

/**
 * Remove specific item from cart by index
 * @param index - Index of item to remove
 */
export function removeVisaFromCart(index: number): void {
  try {
    const cart = getVisaCart();
    cart.splice(index, 1);
    localStorage.setItem('visaCart', JSON.stringify(cart));
    console.log('Visa removed from cart');
    // sync cart count after removal
    try {
      syncCartCountFromCart();
    } catch (e) {
      /* ignore */
    }
  } catch (error) {
    console.error('Error removing visa from cart:', error);
  }
}

/**
 * Convert price from AED to target currency
 * Delegates to global currency service
 */
export function convertPriceFromAED(
  priceInAED: number,
  targetCurrency: string,
  exchangeRates: ExchangeRates
): number {
  return currencyService.convertPrice(priceInAED, targetCurrency);
}

/**
 * Format price with currency symbol
 * Delegates to global currency service
 */
export function formatPrice(price: number, currencyCode: string): string {
  return currencyService.formatPrice(price, currencyCode);
}

/**
 * Update all price displays on the checkout page
 * Uses the global currency service to update prices
 */
export function updateCheckoutPrices(
  newCurrency: string,
  exchangeRates: ExchangeRates
): void {
  try {
    const cartItems = getVisaCart();

    // Update cart items' currency identifier (keep numeric prices unchanged)
    cartItems.forEach((item) => {
      item.currency = newCurrency;
    });

    // Save updated cart to localStorage
    localStorage.setItem('visaCart', JSON.stringify(cartItems));

    // Use global service to update all prices on page
    currencyService.updateAllPricesOnPage();

    // Update total price displays
    updateTotalPrices(newCurrency, exchangeRates);

    console.log(`Prices updated to ${newCurrency}`);
  } catch (error) {
    console.error('Error updating checkout prices:', error);
  }
}

/**
 * Update total price calculations on the page
 * Uses the global currency service
 */
export function updateTotalPrices(
  currency: string,
  exchangeRates: ExchangeRates
): void {
  try {
    const cartItems = getVisaCart();

    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => {
      const convertedPrice = currencyService.convertPrice(item.priceInAED, currency);
      return sum + convertedPrice * (item.quantity || 1);
    }, 0);

    // Update subtotal element
    const subtotalElement = document.getElementById('subtotal-price');
    if (subtotalElement) {
      subtotalElement.textContent = currencyService.formatPrice(subtotal, currency);
      subtotalElement.setAttribute('data-subtotal', subtotal.toString());
    }

    // Update total element
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
      totalElement.textContent = currencyService.formatPrice(subtotal, currency);
    }

    console.log(`Total prices updated to ${currency}:`, { subtotal });
  } catch (error) {
    console.error('Error updating total prices:', error);
  }
}

/**
 * Initialize currency change listener
 * Subscribes to the global currency service
 */
export function initializeCurrencyListener(
  onCurrencyChange: (currency: string, rates: ExchangeRates) => void
): () => void {
  // Subscribe to global currency service changes
  const unsubscribe = currencyService.subscribe((currency, rates) => {
    updateCheckoutPrices(currency, rates);
    onCurrencyChange(currency, rates);
  });

  return unsubscribe;
}

/**
 * Dispatch currency change event
 * Uses the global currency service
 */
export function dispatchCurrencyChangeEvent(
  currency: string,
  exchangeRates: ExchangeRates
): void {
  currencyService.setSelectedCurrency(currency);
}

/** CART COUNT HELPERS **/
function dispatchCartCountEvent(count: number) {
  try {
    if (typeof window !== 'undefined' && window.CustomEvent) {
      window.dispatchEvent(new CustomEvent('cartCountChanged', { detail: { count } }));
    }
  } catch (e) {
    // ignore
  }
}

export function getCartCount(): number {
  try {
    const raw = localStorage.getItem('cartCount');
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch (e) {
    return 0;
  }
}

function setCartCount(n: number) {
  try {
    localStorage.setItem('cartCount', String(n));
    dispatchCartCountEvent(n);
  } catch (e) {
    // ignore
  }
}

export function syncCartCountFromCart(): number {
  try {
    const cart = getVisaCart();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(count);
    return count;
  } catch (e) {
    setCartCount(0);
    return 0;
  }
}
