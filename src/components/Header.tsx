'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary">✈️ Elite Path</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/activities" className="hover:text-primary transition">
              Activities
            </Link>
            <Link href="/hotels" className="hover:text-primary transition">
              Hotels
            </Link>
            <Link href="/holidays" className="hover:text-primary transition">
              Holidays
            </Link>
            <Link href="/visas" className="hover:text-primary transition">
              Visa
            </Link>
            <Link href="/cruises" className="hover:text-primary transition">
              Cruise
            </Link>
            <Link href="/destinations" className="hover:text-primary transition">
              Destinations
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/login" className="text-secondary font-semibold hover:text-primary">
              Login
            </Link>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/activities" className="hover:text-primary">
              Activities
            </Link>
            <Link href="/hotels" className="hover:text-primary">
              Hotels
            </Link>
            <Link href="/holidays" className="hover:text-primary">
              Holidays
            </Link>
            <Link href="/visas" className="hover:text-primary">
              Visa
            </Link>
            <Link href="/cruises" className="hover:text-primary">
              Cruise
            </Link>
            <Link href="/destinations" className="hover:text-primary">
              Destinations
            </Link>
            <Link href="/login" className="text-secondary font-semibold">
              Login
            </Link>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
