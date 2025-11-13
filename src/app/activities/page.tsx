'use client';

import ActivityCard from '@/components/ActivityCard';

const activities = [
  {
    id: 1,
    title: 'Desert Safari Dubai',
    location: 'Dubai, UAE',
    image: '🏜️',
    rating: 4.8,
    price: 89,
    description: 'Experience thrilling desert activities.',
  },
  {
    id: 2,
    title: 'Burj Khalifa Tour',
    location: 'Dubai, UAE',
    image: '🏢',
    rating: 4.9,
    price: 129,
    description: 'World\'s tallest building tour.',
  },
  {
    id: 3,
    title: 'Abu Dhabi City Tour',
    location: 'Abu Dhabi, UAE',
    image: '🕌',
    rating: 4.7,
    price: 99,
    description: 'Iconic landmarks exploration.',
  },
  {
    id: 4,
    title: 'Singapore City Tour',
    location: 'Singapore',
    image: '🌃',
    rating: 4.6,
    price: 75,
    description: 'Modern Singapore exploration.',
  },
  {
    id: 5,
    title: 'Dhow Cruise Dubai',
    location: 'Dubai, UAE',
    image: '⛵',
    rating: 4.7,
    price: 65,
    description: 'Scenic Arabian Gulf cruise.',
  },
  {
    id: 6,
    title: 'Hot Air Balloon Dubai',
    location: 'Dubai, UAE',
    image: '🎈',
    rating: 4.9,
    price: 199,
    description: 'Aerial desert adventure.',
  },
  {
    id: 7,
    title: 'Ferrari World Abu Dhabi',
    location: 'Abu Dhabi, UAE',
    image: '🏎️',
    rating: 4.8,
    price: 109,
    description: 'Theme park experience.',
  },
  {
    id: 8,
    title: 'Skiing in Dubai',
    location: 'Dubai, UAE',
    image: '⛷️',
    rating: 4.6,
    price: 89,
    description: 'Indoor skiing adventure.',
  },
];

export default function ActivitiesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Explore Activities</h1>
          <p className="mt-2">Discover amazing tours and experiences around the world</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-100 py-8">
        <div className="container">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Destination</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>All Destinations</option>
                  <option>Dubai</option>
                  <option>Abu Dhabi</option>
                  <option>Singapore</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Price Range</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>All Prices</option>
                  <option>Under $100</option>
                  <option>$100 - $200</option>
                  <option>Over $200</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Rating</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>All Ratings</option>
                  <option>4.5+ ⭐</option>
                  <option>4.7+ ⭐</option>
                  <option>4.9+ ⭐</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full btn-primary">Apply Filters</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
