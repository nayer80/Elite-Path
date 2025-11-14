'use client';

import { useParams } from 'next/navigation';

const visasData: { [key: string]: any } = {
  'schengen-visa': {
    country: 'Schengen Visa',
    duration: '30 Days',
    processingTime: '15 Days',
    fee: 299,
    flag: '🇪🇺',
    description: 'Travel freely across 27 European countries with a Schengen visa.',
  },
  'usa-visa': {
    country: 'USA Visa',
    duration: '180 Days',
    processingTime: '30 Days',
    fee: 399,
    flag: '🇺🇸',
    description: 'Official US travel visa for tourism, business, and study.',
  },
  'canada-visa': {
    country: 'Canada Visa',
    duration: '6 Months',
    processingTime: '20 Days',
    fee: 349,
    flag: '🇨🇦',
    description: 'Canadian travel and work visa assistance.',
  },
  'uk-visa': {
    country: 'UK Visa',
    duration: '6 Months',
    processingTime: '25 Days',
    fee: 375,
    flag: '🇬🇧',
    description: 'United Kingdom travel and visa services.',
  },
  'australia-visa': {
    country: 'Australia Visa',
    duration: '1 Year',
    processingTime: '15 Days',
    fee: 325,
    flag: '🇦🇺',
    description: 'Australian tourist, work, and student visa assistance.',
  },
  'dubai-visa': {
    country: 'Dubai Visa',
    duration: '30 Days',
    processingTime: '5 Days',
    fee: 199,
    flag: '🇦🇪',
    description: 'Quick and easy Dubai tourist visa application.',
  },
  'thailand-visa': {
    country: 'Thailand Visa',
    duration: '60 Days',
    processingTime: '10 Days',
    fee: 149,
    flag: '🇹🇭',
    description: 'Thailand travel and tourist visa services.',
  },
  'singapore-visa': {
    country: 'Singapore Visa',
    duration: '90 Days',
    processingTime: '10 Days',
    fee: 179,
    flag: '🇸🇬',
    description: 'Singapore business and travel visa assistance.',
  },
  'japan-visa': {
    country: 'Japan Visa',
    duration: '90 Days',
    processingTime: '15 Days',
    fee: 259,
    flag: '🇯🇵',
    description: 'Japan tourist and business visa services.',
  },
  'turkey-visa': {
    country: 'Turkey Visa',
    duration: '30 Days',
    processingTime: '3 Days',
    fee: 99,
    flag: '🇹🇷',
    description: 'Fast-track Turkey travel visa application.',
  },
  'india-visa': {
    country: 'India Visa',
    duration: '1 Year',
    processingTime: '15 Days',
    fee: 229,
    flag: '🇮🇳',
    description: 'India tourist, business, and visa-on-arrival assistance.',
  },
  'malaysia-visa': {
    country: 'Malaysia Visa',
    duration: '3 Months',
    processingTime: '7 Days',
    fee: 129,
    flag: '🇲🇾',
    description: 'Malaysia travel and business visa services.',
  },
};

export default function VisaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const visa = visasData[slug];

  if (!visa) {
    return (
      <div className="bg-gray-100 py-12">
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Visa Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, this visa service is not available.</p>
          <a href="/visas" className="btn-primary">
            Back to Visas
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{visa.flag}</span>
            <div>
              <h1 className="text-4xl font-bold">{visa.country}</h1>
              <p className="mt-2">Complete visa assistance and processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Details */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Details Card */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Visa Information</h2>
                <p className="text-gray-700 mb-8 text-lg">{visa.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Validity Duration</p>
                    <p className="text-2xl font-bold text-primary">{visa.duration}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Processing Time</p>
                    <p className="text-2xl font-bold text-green-600">{visa.processingTime}</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Service Fee</p>
                    <p className="text-2xl font-bold text-orange-600">${visa.fee}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">What's Included:</h3>
                <ul className="space-y-2 text-gray-700 mb-8">
                  <li>✅ Document verification and preparation</li>
                  <li>✅ Application form assistance</li>
                  <li>✅ Interview coaching (if required)</li>
                  <li>✅ Real-time application tracking</li>
                  <li>✅ Visa status updates via email</li>
                </ul>

                <a href="/contact" className="btn-primary">
                  Apply Now
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-600">Validity</p>
                    <p className="font-semibold">{visa.duration}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-600">Processing Time</p>
                    <p className="font-semibold">{visa.processingTime}</p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-600">Fee</p>
                    <p className="text-2xl font-bold text-primary">${visa.fee}</p>
                  </div>
                  <button className="w-full btn-primary mt-4">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
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
                q: 'What documents do I need?',
                a: 'Required documents vary by visa type. Our team will send you a complete checklist after you apply.',
              },
              {
                q: 'Can I track my application?',
                a: 'Yes! You can track your application in real-time through our online portal.',
              },
              {
                q: 'What if my visa is rejected?',
                a: 'We offer free consultation and support for reapplication. Our success rate is 98%.',
              },
              {
                q: 'How do I get started?',
                a: 'Click "Apply Now" to fill out your details. Our team will contact you within 24 hours.',
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

      {/* CTA Section */}
      <section className="bg-primary text-white py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="mb-6 text-lg">Start your visa application today and get approved faster</p>
          <a href="/contact" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
            Get Started
          </a>
        </div>
      </section>
    </>
  );
}
