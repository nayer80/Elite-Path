'use client';

const destinations = [
  {
    id: 1,
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: '🏙️',
    description: 'Experience the glamour and luxury of the Middle East',
    activities: ['Desert Safari', 'Burj Khalifa', 'Shopping Mall'],
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Abu Dhabi',
    country: 'United Arab Emirates',
    image: '🕌',
    description: 'Discover the cultural heart of UAE',
    activities: ['Sheikh Zayed Mosque', 'Ferrari World', 'Beach'],
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Singapore',
    country: 'Singapore',
    image: '🌃',
    description: 'Modern cityscape meets cultural diversity',
    activities: ['Marina Bay', 'Gardens', 'Heritage Tour'],
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Bangkok',
    country: 'Thailand',
    image: '🏯',
    description: 'Ancient temples and vibrant street life',
    activities: ['Temples', 'Night Markets', 'River Cruises'],
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Paris',
    country: 'France',
    image: '🗼',
    description: 'The city of light and romance',
    activities: ['Eiffel Tower', 'Museums', 'Cafes'],
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Tokyo',
    country: 'Japan',
    image: '🗾',
    description: 'Ancient tradition meets cutting-edge technology',
    activities: ['Temples', 'Shopping', 'Nightlife'],
    rating: 4.7,
  },
  {
    id: 7,
    name: 'Bali',
    country: 'Indonesia',
    image: '🏝️',
    description: 'Tropical paradise with stunning beaches',
    activities: ['Beaches', 'Temples', 'Water Sports'],
    rating: 4.8,
  },
  {
    id: 8,
    name: 'New York',
    country: 'United States',
    image: '🗽',
    description: 'The city that never sleeps',
    activities: ['Broadway', 'Museums', 'Shopping'],
    rating: 4.6,
  },
  {
    id: 9,
    name: 'London',
    country: 'United Kingdom',
    image: '🇬🇧',
    description: 'Royal heritage and modern culture',
    activities: ['Big Ben', 'Museums', 'Theater'],
    rating: 4.7,
  },
];

export default function DestinationsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Popular Destinations</h1>
          <p className="mt-2">Explore the world's most fascinating travel destinations</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-100 py-8">
        <div className="container">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                placeholder="Search destination..."
                className="flex-1 min-w-200 border rounded-lg px-4 py-2"
              />
              <select className="border rounded-lg px-4 py-2">
                <option>All Regions</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Americas</option>
                <option>Middle East</option>
              </select>
              <button className="btn-primary">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-r from-primary to-orange-500 flex items-center justify-center text-6xl group-hover:scale-110 transition">
                  {destination.image}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">📍 {destination.country}</p>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 font-semibold">{destination.rating}/5</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{destination.description}</p>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Top Activities:</p>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full btn-primary">Explore Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Regions */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Regions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                region: 'Middle East',
                countries: ['UAE', 'Saudi Arabia', 'Qatar'],
                icon: '🏜️',
              },
              {
                region: 'Southeast Asia',
                countries: ['Thailand', 'Singapore', 'Indonesia'],
                icon: '🌴',
              },
              {
                region: 'Europe',
                countries: ['France', 'UK', 'Italy'],
                icon: '🏰',
              },
            ].map((reg, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-5xl mb-3">{reg.icon}</div>
                <h3 className="text-xl font-bold mb-3">{reg.region}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {reg.countries.map((country, i) => (
                    <span key={i} className="bg-gray-200 text-sm px-3 py-1 rounded">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
