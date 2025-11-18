"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, User, ShoppingCart, LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useCurrency } from "@/lib/CurrencyContext";
import { useAuth } from "@/lib/AuthContext";
import { getCartCount } from '@/lib/visaCartHandler';
import { GoogleLogin } from '@react-oauth/google';
import AuthModal from '@/components/AuthModal';

export default function HeaderBar() {
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openHelpline, setOpenHelpline] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const { user, login, logout } = useAuth();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const helplineRef = useRef(null);
  const helplineButtonRef = useRef(null);
  const userMenuRef = useRef(null);
  const userMenuButtonRef = useRef(null);
  const [helplineStyle, setHelplineStyle] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loginError, setLoginError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
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
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userMenuButtonRef.current &&
        !userMenuButtonRef.current.contains(e.target)
      ) {
        setOpenUserMenu(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpenCurrency(false);
        setOpenHelpline(false);
        setOpenUserMenu(false);
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

  // Handle Google OAuth success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoginError('');
      const { credential } = credentialResponse;

      if (!credential) {
        setLoginError('No credential received from Google');
        return;
      }

      // Decode JWT to get user info (basic decoding without verification)
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decodedToken = JSON.parse(jsonPayload);

      // For production, you'd exchange the credential here
      // For now, create user object from decoded token
      const userData = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture || '',
      };

      // Store user data in context
      login(userData, credential);
      setOpenUserMenu(false);
    } catch (error) {
      console.error('Google OAuth error:', error);
      setLoginError('Failed to sign in with Google');
    }
  };

  const handleGoogleError = () => {
    setLoginError('Google sign-in failed');
  };

  const handleLogout = () => {
    logout();
    setOpenUserMenu(false);
  };

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

        {/* Login / User Menu */}
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              ref={userMenuButtonRef}
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            >
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-xs font-semibold max-w-[80px] truncate">{user.name}</span>
              <ChevronDown size={14} />
            </button>

            {openUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-xs text-gray-600">Signed in as</div>
                  <div className="font-semibold truncate">{user.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              onClick={(e) => {
                // Keep header layout identical — open modal instead of navigating
                e.preventDefault();
                setShowAuthModal(true);
              }}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
            >
              <User size={16} />
              <span>Log In</span>
            </Link>

            <AuthModal
              open={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              onGoogleSuccess={(res) => {
                handleGoogleSuccess(res);
                setShowAuthModal(false);
              }}
              onGoogleError={() => {
                handleGoogleError();
              }}
            />
          </>
        )}

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
