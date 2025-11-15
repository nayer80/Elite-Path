'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ActivityCard from '@/components/ActivityCard';
import HotelCard from '@/components/HotelCard';
import Link from 'next/link';

const featuredActivities = [
  {
    id: 1,
    title: 'Desert Safari Dubai',
    location: 'Dubai, UAE',
    image: '🏜️',
    rating: 4.8,
    price: 89,
    description: 'Experience thrilling desert activities and traditional Bedouin culture.',
  },
  {
    id: 2,
    title: 'Burj Khalifa Tour',
    location: 'Dubai, UAE',
    image: '🏢',
    rating: 4.9,
    price: 129,
    description: 'Visit the world\'s tallest building with stunning city views.',
  },
  {
    id: 3,
    title: 'Abu Dhabi City Tour',
    location: 'Abu Dhabi, UAE',
    image: '🕌',
    rating: 4.7,
    price: 99,
    description: 'Explore iconic landmarks including Sheikh Zayed Grand Mosque.',
  },
  {
    id: 4,
    title: 'Singapore City Tour',
    location: 'Singapore',
    image: '🌃',
    rating: 4.6,
    price: 75,
    description: 'Discover modern Singapore with Marina Bay and Gardens by the Bay.',
  },
];

const featuredHotels = [
  {
    id: 1,
    name: 'Luxury Desert Resort',
    location: 'Dubai, UAE',
    rating: 4.9,
    pricePerNight: 450,
    image: '🏨',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 2,
    name: 'Marina Bay Suites',
    location: 'Singapore',
    rating: 4.8,
    pricePerNight: 380,
    image: '🏩',
    amenities: ['WiFi', 'Gym', 'Bar', 'Business Center'],
  },
  {
    id: 3,
    name: 'Sheikh\'s Palace Hotel',
    location: 'Abu Dhabi, UAE',
    rating: 4.7,
    pricePerNight: 320,
    image: '🏛️',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Concierge'],
  },
  {
    id: 4,
    name: 'Beach Resort Paradise',
    location: 'Maldives',
    rating: 5.0,
    pricePerNight: 550,
    image: '🏝️',
    amenities: ['Beach', 'Snorkeling', 'Spa', 'Water Sports'],
  },
];

export default function Home() {
  const router = useRouter();
  const [quickVisa, setQuickVisa] = useState('');

  const handleQuickVisa = (val: string) => {
    if (!val) return;
    let slug = val.toLowerCase().replace(/\s+/g, '-');
    if (!slug.endsWith('-visa')) slug = slug + '-visa';
    router.push(`/visas/details?visa=${encodeURIComponent(slug)}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Journey Starts Here
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover amazing destinations, book flights, hotels, and create unforgettable travel memories with Elite Path.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/activities" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Explore Activities
              </Link>
              <Link href="/contact" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-gray-100 py-8">
        <div className="container">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Destination</label>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Check-in</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Check-out</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full btn-primary">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-center">Featured Activities</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our most popular tours and experiences carefully curated for unforgettable moments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/activities" className="btn-primary text-lg px-8 py-3">
              View All Activities
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-center">Featured Hotels</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Handpicked luxury accommodations for your comfort and convenience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/hotels" className="btn-primary text-lg px-8 py-3">
              View All Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: '✈️', label: 'Activities', href: '/activities' },
              { icon: '🏨', label: 'Hotels', href: '/hotels' },
              { icon: '🎉', label: 'Holidays', href: '/holidays' },
              { icon: '🛂', label: 'Visas', href: '/visas' },
              { icon: '⛴️', label: 'Cruises', href: '/cruises' },
            ].map((service, idx) => (
              <div key={idx}>
                <Link href={service.href}>
                  <div className="bg-gradient-to-br from-primary to-orange-500 text-white p-8 rounded-lg text-center hover:shadow-lg transition cursor-pointer">
                    <div className="text-5xl mb-3">{service.icon}</div>
                    <h3 className="font-bold text-lg">{service.label}</h3>
                  </div>
                </Link>

                {/* Quick visa selector shown under Visas card */}
                {service.label === 'Visas' && (
                  <div className="mt-3">
                    <label className="sr-only">Quick Visa</label>
                    <select
                      value={quickVisa}
                      onChange={(e) => { setQuickVisa(e.target.value); handleQuickVisa(e.target.value); }}
                      className="w-full mt-2 rounded-lg px-3 py-2 text-gray-700"
                    >
                      <option value="">Quick select visa...</option>
                      <option value="Schengen Visa">Schengen Visa</option>
                      <option value="USA Visa">USA Visa</option>
                      <option value="Australia Visa">Australia Visa</option>
                      <option value="Canada Visa">Canada Visa</option>
                      <option value="United Kingdom Visa">United Kingdom Visa</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'John Doe',
                text: 'Amazing service! Booked my entire trip through Elite Path and had zero issues.',
                rating: 5,
              },
              {
                name: 'Sarah Smith',
                text: 'The customer support was incredible. They helped me with every step of my vacation.',
                rating: 5,
              },
              {
                name: 'Mike Johnson',
                text: 'Best travel deals I\'ve found. Highly recommended to all my friends!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-bold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
