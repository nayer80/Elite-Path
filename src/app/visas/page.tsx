'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const visas = [
  {
    id: 1,
    country: 'Schengen Visa',
    duration: '30 Days',
    processingTime: '15 Days',
    fee: 299,
    flag: '🇪🇺',
  },
  {
    id: 2,
    country: 'USA Visa',
    duration: '180 Days',
    processingTime: '30 Days',
    fee: 399,
    flag: '🇺🇸',
  },
  {
    id: 3,
    country: 'Canada Visa',
    duration: '6 Months',
    processingTime: '20 Days',
    fee: 349,
    flag: '🇨🇦',
  },
  {
    id: 4,
    country: 'UK Visa',
    duration: '6 Months',
    processingTime: '25 Days',
    fee: 375,
    flag: '🇬🇧',
  },
  {
    id: 5,
    country: 'Australia Visa',
    duration: '1 Year',
    processingTime: '15 Days',
    fee: 325,
    flag: '🇦🇺',
  },
  {
    id: 6,
    country: 'Dubai Visa',
    duration: '30 Days',
    processingTime: '5 Days',
    fee: 199,
    flag: '🇦🇪',
  },
  {
    id: 7,
    country: 'Thailand Visa',
    duration: '60 Days',
    processingTime: '10 Days',
    fee: 149,
    flag: '🇹🇭',
  },
  {
    id: 8,
    country: 'Singapore Visa',
    duration: '90 Days',
    processingTime: '10 Days',
    fee: 179,
    flag: '🇸🇬',
  },
  {
    id: 9,
    country: 'Japan Visa',
    duration: '90 Days',
    processingTime: '15 Days',
    fee: 259,
    flag: '🇯🇵',
  },
  {
    id: 10,
    country: 'Turkey Visa',
    duration: '30 Days',
    processingTime: '3 Days',
    fee: 99,
    flag: '🇹🇷',
  },
  {
    id: 11,
    country: 'India Visa',
    duration: '1 Year',
    processingTime: '15 Days',
    fee: 229,
    flag: '🇮🇳',
  },
  {
    id: 12,
    country: 'Malaysia Visa',
    duration: '3 Months',
    processingTime: '7 Days',
    fee: 129,
    flag: '🇲🇾',
  },
];

export default function VisasPage() {
  const router = useRouter();
  const [visaFor, setVisaFor] = useState('');
  const [nationality, setNationality] = useState('');
  const [livingCountry, setLivingCountry] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [schengenCountry, setSchengenCountry] = useState('');

  const schengenCountries = [
    'Austria', 'Belgium', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
    'Iceland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland',
    'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland'
  ];

  const handleSearch = () => {
    if (!visaFor) {
      alert('Please select a destination visa');
      return;
    }

    // Build slug. For Schengen, prefer specific country if selected.
    let slug = visaFor.toLowerCase().replace(/\s+/g, '-');
    if (visaFor === 'Schengen') {
      if (schengenCountry) {
        slug = schengenCountry.toLowerCase().replace(/\s+/g, '-') + '-visa';
      } else {
        slug = 'schengen-visa';
      }
    }

    router.push(`/visas/${slug}`);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">International Visas</h1>
          <p className="mt-2">Get visa assistance for travel to any country</p>
        </div>
      </section>

      {/* Search / Filter Form */}
      <section className="bg-white py-8 shadow-md">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
            {/* Visa For */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visa For</label>
              <select
                value={visaFor}
                onChange={(e) => setVisaFor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Destination</option>
                <option value="Schengen">Schengen Visa</option>
                <option value="USA">USA Visa</option>
                <option value="Australia">Australia Visa</option>
                <option value="Canada">Canada Visa</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>

            {/* Schengen Countries (shown when Schengen selected) */}
            {visaFor === 'Schengen' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schengen Country</label>
                <select
                  value={schengenCountry}
                  onChange={(e) => setSchengenCountry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Schengen Country</option>
                  {schengenCountries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Select Nationality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Nationality</label>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Choose Nationality</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
                <option value="PK">Pakistan</option>
                <option value="BD">Bangladesh</option>
                <option value="SG">Singapore</option>
                <option value="MY">Malaysia</option>
                <option value="TH">Thailand</option>
              </select>
            </div>

            {/* Select Living */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Living</label>
              <select
                value={livingCountry}
                onChange={(e) => setLivingCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Current Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
                <option value="PK">Pakistan</option>
                <option value="BD">Bangladesh</option>
                <option value="SG">Singapore</option>
                <option value="MY">Malaysia</option>
                <option value="TH">Thailand</option>
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearch}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                🔍 Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gray-50 py-8">
        <div className="container">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              We provide complete visa assistance services including documentation, application, and processing. Our team of experts ensures your visa application is completed accurately and submitted on time.
            </p>
          </div>
        </div>
      </section>

      {/* Visas Grid */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Available Visa Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visas.map((visa) => (
              <div key={visa.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-orange-500 py-6 text-center">
                  <div className="text-5xl mb-2">{visa.flag}</div>
                  <h3 className="text-xl font-bold text-white">{visa.country}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Validity</p>
                      <p className="font-semibold text-lg">{visa.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Processing Time</p>
                      <p className="font-semibold text-lg">{visa.processingTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Service Fee</p>
                      <p className="font-semibold text-2xl text-primary">${visa.fee}</p>
                    </div>
                  </div>
                  <button className="w-full btn-primary">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                q: 'How long does visa processing take?',
                a: 'Processing times vary by country. Most visas take 7-30 days. Express processing is available for urgent requests.',
              },
              {
                q: 'What documents do I need?',
                a: 'Required documents depend on the destination country. Our team will provide a complete checklist for your visa type.',
              },
              {
                q: 'Can I track my application?',
                a: 'Yes! We provide real-time tracking for all visa applications through our online portal.',
              },
              {
                q: 'What if my visa is rejected?',
                a: 'We offer consultation and support for reapplication. Our success rate is 98% across all visa types.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
