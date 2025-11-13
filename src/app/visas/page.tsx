'use client';

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
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">International Visas</h1>
          <p className="mt-2">Get visa assistance for travel to any country</p>
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
