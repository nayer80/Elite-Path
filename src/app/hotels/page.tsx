'use client';

import HotelCard from '@/components/HotelCard';

const hotels = [
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
  {
    id: 5,
    name: 'Downtown Boutique',
    location: 'Dubai, UAE',
    rating: 4.6,
    pricePerNight: 280,
    image: '🏩',
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Fitness Center'],
  },
  {
    id: 6,
    name: 'Beachfront Oasis',
    location: 'Abu Dhabi, UAE',
    rating: 4.8,
    pricePerNight: 420,
    image: '🏨',
    amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 7,
    name: 'City Central Hotel',
    location: 'Singapore',
    rating: 4.5,
    pricePerNight: 290,
    image: '🏢',
    amenities: ['WiFi', 'Gym', 'Restaurant', 'Conference'],
  },
  {
    id: 8,
    name: 'Tropical Villa Resort',
    location: 'Thailand',
    rating: 4.9,
    pricePerNight: 350,
    image: '🏝️',
    amenities: ['Pool', 'Spa', 'Restaurant', 'Water Sports'],
  },
];

export default function HotelsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Find Your Perfect Stay</h1>
          <p className="mt-2">Luxury accommodations at the best rates</p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-gray-100 py-8">
        <div className="container">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Destination</label>
                <input
                  type="text"
                  placeholder="City name"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Check-in</label>
                <input type="date" className="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Check-out</label>
                <input type="date" className="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Guests</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full btn-primary">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Available Hotels</h2>
            <p className="text-gray-600">Showing {hotels.length} results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
