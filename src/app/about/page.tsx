'use client';

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">About Elite Path</h1>
          <p className="mt-2">Your trusted travel partner since 1990</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 1990, Elite Path has been providing exceptional travel
                experiences to thousands of satisfied customers worldwide. What
                started as a small local travel agency has grown into a global travel
                powerhouse.
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is simple: to make travel accessible, affordable, and
                unforgettable for everyone. We partner with the best hotels, airlines,
                and activity providers to ensure our customers get the best value and
                experience.
              </p>
              <p className="text-gray-700">
                Today, we serve customers in 50+ countries, offering tours, hotel
                bookings, visa services, and cruise packages to destinations across
                the globe.
              </p>
            </div>
            <div className="bg-primary text-white p-8 rounded-lg text-center text-6xl">
              ✈️
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '150+', label: 'Destinations' },
              { number: '30+', label: 'Years of Service' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-100 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '❤️',
                title: 'Customer First',
                desc: 'We prioritize our customers\' needs and satisfaction above everything else.',
              },
              {
                icon: '🌟',
                title: 'Excellence',
                desc: 'We strive for excellence in every aspect of our service delivery.',
              },
              {
                icon: '🌍',
                title: 'Sustainability',
                desc: 'We are committed to responsible and sustainable tourism practices.',
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'John Smith', title: 'Founder & CEO' },
              { name: 'Sarah Johnson', title: 'Chief Operations Officer' },
              { name: 'Michael Brown', title: 'Head of Customer Service' },
              { name: 'Emma Davis', title: 'Director of Marketing' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-primary text-white h-40 flex items-center justify-center text-5xl">
                  👤
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
