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
  // Canada Visa removed per request
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
  
  const countries = [
    'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan',
    'Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi',
    'Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Congo-Brazzaville)','Costa Rica','Côte d’Ivoire','Croatia','Cuba','Cyprus','Czech Republic',
    'Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France',
    'Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy',
    'Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar',
    'Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal',
    'Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria',
    'Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
  ];

  const handleSearch = () => {
    if (!visaFor) {
      alert('Please select a destination visa');
      return;
    }

    if (!nationality) {
      alert('Please select your nationality');
      return;
    }

    if (!livingCountry) {
      alert('Please select your current living country');
      return;
    }

    if (!travelDate) {
      alert('Please select your travel date');
      return;
    }

    // Build slug. For Schengen, prefer specific country if selected.
    let visaSlug = visaFor.toLowerCase().replace(/\s+/g, '-');
    
    // Ensure all visa slugs end with "-visa"
    if (!visaSlug.endsWith('-visa')) {
      visaSlug = visaSlug + '-visa';
    }
    
    if (visaFor === 'Schengen') {
      if (schengenCountry) {
        visaSlug = schengenCountry.toLowerCase().replace(/\s+/g, '-') + '-visa';
      } else {
        visaSlug = 'schengen-visa';
      }
    }

    // If Canada was selected, redirect to the dedicated Canada page (keeps query params)
    const params = new URLSearchParams({
      visa: visaSlug,
      nationality,
      living: livingCountry,
      date: travelDate,
    });

    if (visaSlug === 'canada-visa') {
      router.push(`/visas/canada-visa?${params.toString()}`);
      return;
    }

    // Redirect to details page with query parameters for other visas
    router.push(`/visas/details?${params.toString()}`);
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
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
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
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
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
