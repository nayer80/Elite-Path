'use client';

const cruises = [
  {
    id: 1,
    name: 'Dubai to Muscat Cruise',
    ship: 'Luxury Liner',
    duration: '3 Days / 2 Nights',
    price: 899,
    ports: ['Dubai', 'Muscat', 'Dubai'],
    image: '⛴️',
  },
  {
    id: 2,
    name: 'Caribbean Adventure',
    ship: 'Royal Caribbean',
    duration: '7 Days / 6 Nights',
    price: 1599,
    ports: ['Miami', 'Turks & Caicos', 'Jamaica', 'Miami'],
    image: '🚢',
  },
  {
    id: 3,
    name: 'Mediterranean Escape',
    ship: 'European Star',
    duration: '10 Days / 9 Nights',
    price: 2199,
    ports: ['Barcelona', 'Nice', 'Rome', 'Athens', 'Barcelona'],
    image: '⛵',
  },
  {
    id: 4,
    name: 'Asian Passage',
    ship: 'Orient Express',
    duration: '14 Days / 13 Nights',
    price: 2899,
    ports: ['Singapore', 'Hong Kong', 'Shanghai', 'Tokyo', 'Singapore'],
    image: '🌏',
  },
  {
    id: 5,
    name: 'Alaska Expedition',
    ship: 'Arctic Explorer',
    duration: '7 Days / 6 Nights',
    price: 1799,
    ports: ['Seattle', 'Juneau', 'Ketchikan', 'Seattle'],
    image: '❄️',
  },
  {
    id: 6,
    name: 'Persian Gulf Cruise',
    ship: 'Gulf Navigator',
    duration: '5 Days / 4 Nights',
    price: 999,
    ports: ['Dubai', 'Abu Dhabi', 'Doha', 'Dubai'],
    image: '🌊',
  },
];

export default function CruisesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Cruise Packages</h1>
          <p className="mt-2">Unforgettable ocean voyages to exotic destinations</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-100 py-8">
        <div className="container">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Departure Port</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>All Ports</option>
                  <option>Dubai</option>
                  <option>Miami</option>
                  <option>Singapore</option>
                  <option>Barcelona</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Duration</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Any Duration</option>
                  <option>3-4 Days</option>
                  <option>5-7 Days</option>
                  <option>8-10 Days</option>
                  <option>11+ Days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Departure Date</label>
                <input type="date" className="w-full border rounded-lg px-4 py-2" />
              </div>
              <div className="flex items-end">
                <button className="w-full btn-primary">Search Cruises</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cruises Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cruises.map((cruise) => (
              <div key={cruise.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-r from-primary to-orange-500 flex items-center justify-center text-6xl">
                  {cruise.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{cruise.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">🚢 {cruise.ship}</p>
                  <p className="text-gray-600 text-sm mb-4">⏱️ {cruise.duration}</p>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Ports of Call:</p>
                    <div className="flex flex-wrap gap-2">
                      {cruise.ports.map((port, idx) => (
                        <span key={idx} className="bg-gray-200 text-xs px-2 py-1 rounded">
                          {port}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">From ${cruise.price}</span>
                    <button className="btn-primary">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Cruise Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🍽️', title: 'Dining', desc: 'World-class restaurants and cafes' },
              { icon: '🏊', title: 'Recreation', desc: 'Pools, spas, and fitness centers' },
              { icon: '🎭', title: 'Entertainment', desc: 'Shows, concerts, and nightlife' },
              { icon: '🛏️', title: 'Accommodations', desc: 'Luxurious staterooms and suites' },
            ].map((amenity, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-5xl mb-3">{amenity.icon}</div>
                <h3 className="font-bold text-lg mb-2">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
