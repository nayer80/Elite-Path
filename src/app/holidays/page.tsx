'use client';

const holidays = [
  {
    id: 1,
    title: 'Dubai Luxury Escape',
    duration: '5 Days / 4 Nights',
    price: 1299,
    image: '✈️',
    includes: ['Flights', 'Hotel', 'Activities', 'Meals'],
  },
  {
    id: 2,
    title: 'Singapore Adventure',
    duration: '4 Days / 3 Nights',
    price: 899,
    image: '🌏',
    includes: ['Flights', 'Hotel', 'Tours', 'Meals'],
  },
  {
    id: 3,
    title: 'Thailand Beach Holiday',
    duration: '7 Days / 6 Nights',
    price: 1099,
    image: '🏖️',
    includes: ['Flights', 'Resort', 'Activities', 'Meals'],
  },
  {
    id: 4,
    title: 'Maldives Honeymoon',
    duration: '5 Days / 4 Nights',
    price: 2499,
    image: '💑',
    includes: ['Flights', 'Water Villa', 'Water Sports', 'Spa'],
  },
  {
    id: 5,
    title: 'Abu Dhabi Explorer',
    duration: '3 Days / 2 Nights',
    price: 699,
    image: '🕌',
    includes: ['Flights', 'Hotel', 'City Tour', 'Meals'],
  },
  {
    id: 6,
    title: 'European Grand Tour',
    duration: '10 Days / 9 Nights',
    price: 2999,
    image: '🇪🇺',
    includes: ['Flights', 'Hotels', 'Tours', 'Meals', 'Train'],
  },
];

export default function HolidaysPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Holiday Packages</h1>
          <p className="mt-2">All-inclusive vacation packages curated just for you</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-100 py-8">
        <div className="container">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Destination</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>All Destinations</option>
                  <option>Dubai</option>
                  <option>Thailand</option>
                  <option>Maldives</option>
                  <option>Singapore</option>
                  <option>Europe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Duration</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Any Duration</option>
                  <option>2-3 Days</option>
                  <option>4-5 Days</option>
                  <option>6-7 Days</option>
                  <option>8+ Days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Budget</label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>Any Budget</option>
                  <option>Under $1000</option>
                  <option>$1000 - $2000</option>
                  <option>Over $2000</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full btn-primary">Search Packages</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Packages */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {holidays.map((holiday) => (
              <div key={holiday.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-40 bg-gradient-to-r from-primary to-orange-500 flex items-center justify-center text-6xl">
                  {holiday.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{holiday.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">⏱️ {holiday.duration}</p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Package Includes:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {holiday.includes.map((item, idx) => (
                        <li key={idx}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${holiday.price}</span>
                    <button className="btn-primary">Book Package</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
