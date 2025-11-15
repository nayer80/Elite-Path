'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const visaDetails: { [key: string]: any } = {
  'usa-visa': {
    title: 'USA Visa',
    flag: '🇺🇸',
    processingTypes: [
      { name: 'Normal', days: '3-4 Working Days', icon: '📅' },
      { name: 'Easy Documentation', icon: '📄' },
      { name: 'Online Payment Option', icon: '💳' },
    ],
    visaOptions: [
      {
        id: 1,
        type: 'USA VISA B1/B2',
        description: 'Business/Tourist Visa',
        fields: [
          { label: 'Processing Type', type: 'select', placeholder: 'Select Processing Type' },
          { label: 'Travel Date', type: 'date', placeholder: 'Select Travel Date' },
          { label: 'No. Of Visa', type: 'select', placeholder: 'Select Quantity' },
        ],
        prices: {
          normal: '$399',
          express: '$499',
          urgent: '$599',
        },
      },
      {
        id: 2,
        type: 'USA VISA H1B',
        description: 'Work Visa',
        fields: [
          { label: 'Processing Type', type: 'select', placeholder: 'Select Processing Type' },
          { label: 'Travel Date', type: 'date', placeholder: 'Select Travel Date' },
          { label: 'No. Of Visa', type: 'select', placeholder: 'Select Quantity' },
        ],
        prices: {
          normal: '$599',
          express: '$699',
          urgent: '$799',
        },
      },
      {
        id: 3,
        type: 'USA VISA L1',
        description: 'Intra-company Transfer Visa',
        fields: [
          { label: 'Processing Type', type: 'select', placeholder: 'Select Processing Type' },
          { label: 'Travel Date', type: 'date', placeholder: 'Select Travel Date' },
          { label: 'No. Of Visa', type: 'select', placeholder: 'Select Quantity' },
        ],
        prices: {
          normal: '$549',
          express: '$649',
          urgent: '$749',
        },
      },
    ],
  },
  'schengen-visa': {
    title: 'Schengen Visa',
    flag: '🇪🇺',
    processingTypes: [
      { name: 'Normal', days: '15 Working Days', icon: '📅' },
      { name: 'Easy Documentation', icon: '📄' },
      { name: 'Online Payment Option', icon: '💳' },
    ],
    visaOptions: [
      {
        id: 1,
        type: 'SCHENGEN VISA',
        description: 'Multi-country Schengen Visa',
        fields: [
          { label: 'Processing Type', type: 'select', placeholder: 'Select Processing Type' },
          { label: 'Travel Date', type: 'date', placeholder: 'Select Travel Date' },
          { label: 'No. Of Visa', type: 'select', placeholder: 'Select Quantity' },
        ],
        prices: {
          normal: '$299',
          express: '$399',
          urgent: '$499',
        },
      },
    ],
  },
  'canada-visa': {
    title: 'Canada Visa',
    flag: '🇨🇦',
    processingTypes: [
      { name: 'Normal', days: '20 Working Days', icon: '📅' },
      { name: 'Easy Documentation', icon: '📄' },
      { name: 'Online Payment Option', icon: '💳' },
    ],
    visaOptions: [
      {
        id: 1,
        type: 'CANADA VISITOR VISA',
        description: 'Tourist/Business Visa',
        fields: [
          { label: 'Processing Type', type: 'select', placeholder: 'Select Processing Type' },
          { label: 'Travel Date', type: 'date', placeholder: 'Select Travel Date' },
          { label: 'No. Of Visa', type: 'select', placeholder: 'Select Quantity' },
        ],
        prices: {
          normal: '$349',
          express: '$449',
          urgent: '$549',
        },
      },
    ],
  },
  'australia-visa': {
    title: 'Australia Visa',
    flag: '🇦🇺',
    processingTypes: [
      { name: 'Normal', days: '15 Working Days', icon: '📅' },
      { name: 'Easy Documentation', icon: '📄' },
      { name: 'Online Payment Option', icon: '💳' },
    ],
    visaOptions: [
      {
        id: 1,
        type: 'AUSTRALIA VISITOR VISA',
        description: 'Tourist Visa',
        fields: [
          { label: 'Processing Type', type: 'select', placeholder: 'Select Processing Type' },
          { label: 'Travel Date', type: 'date', placeholder: 'Select Travel Date' },
          { label: 'No. Of Visa', type: 'select', placeholder: 'Select Quantity' },
        ],
        prices: {
          normal: '$325',
          express: '$425',
          urgent: '$525',
        },
      },
    ],
  },
  'united-kingdom-visa': {
    title: 'United Kingdom Visa',
    flag: '🇬🇧',
    processingTypes: [
      { name: 'Normal', days: '25 Working Days', icon: '📅' },
      { name: 'Easy Documentation', icon: '📄' },
      { name: 'Online Payment Option', icon: '💳' },
    ],
    visaOptions: [
      {
        id: 1,
        type: 'UK VISITOR VISA',
        description: 'Tourist/Business Visa',
        fields: [
          { label: 'Processing Type', type: 'select', placeholder: 'Select Processing Type' },
          { label: 'Travel Date', type: 'date', placeholder: 'Select Travel Date' },
          { label: 'No. Of Visa', type: 'select', placeholder: 'Select Quantity' },
        ],
        prices: {
          normal: '$375',
          express: '$475',
          urgent: '$575',
        },
      },
    ],
  },
};

export default function VisaDetailPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
      <VisaDetailContent />
    </Suspense>
  );
}

function VisaDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('visa');
  const nationality = searchParams.get('nationality');
  const livingCountry = searchParams.get('living');
  const travelDate = searchParams.get('date');

  const visa = slug ? visaDetails[slug] : null;

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
      <section className="bg-gray-50 py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-6">{visa.title}</h1>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visa.processingTypes.map((item: any, idx: number) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  {item.days && <p className="text-sm text-gray-600">{item.days}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Details */}
      <section className="bg-blue-50 py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {nationality && (
              <div>
                <p className="text-gray-600">Your Nationality</p>
                <p className="font-semibold">{nationality}</p>
              </div>
            )}
            {livingCountry && (
              <div>
                <p className="text-gray-600">Current Living Country</p>
                <p className="font-semibold">{livingCountry}</p>
              </div>
            )}
            {travelDate && (
              <div>
                <p className="text-gray-600">Intended Travel Date</p>
                <p className="font-semibold">{travelDate}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visa Prices & Options */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="text-orange-500">|</span> {visa.title} Prices & Options
          </h2>

          <div className="space-y-8">
            {slug === 'australia-visa' && (
              <div className="bg-white p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-3">Australia Visa Online</h3>
                <p className="text-gray-700 mb-4">
                  With its awe-inspiring blend of lively cities, coastal experiences, untouched wilderness, wildlife wonders, and natural diversity accompanied by laidback feel, Australia is easily one of the most sought-after vacation spots. So if you plan for a trip to this wonderful country, we can help you with all your travel arrangements including professional visa assistance.
                </p>
                <p className="text-gray-700 mb-4">
                  As a specialist in international visa services, Rayna Tours offers prompt visa services to people who wish to travel to Australia from the UAE. Be it for holidaying or business purpose, our highly knowledgeable and experienced visa team will assist you through the meticulous procedures, from the expert advice on the selection of right visa as well as eligibility criteria to the submission of your application as per the rules and regulations to keep you updated till the approval and on time delivery of your Australian visa.
                </p>
                <p className="text-gray-700">
                  Make a quick enquiry of our visa services by filling out all relevant details, such as number of visas, travel date, and processing type. The rest is assured that our panel of experts will review your queries and get back to you at the earliest possible convenience, ensuring seamlessly quick visa processing. Depending on the type of visa, you'll be required to meet certain requirements for the approval of your visa. Please refer to the 'VisaDocuments' section for the entire list.
                </p>
              </div>
            )}
            {visa.visaOptions.map((option: any) => (
              <div key={option.id} className="bg-white rounded-lg shadow-lg p-8">
                {/* Visa Type */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{option.type}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {option.fields.map((field: any, idx: number) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        field.label && field.label.toLowerCase().includes('processing') ? (
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">{field.placeholder}</option>
                            <option value="normal">Normal</option>
                            <option value="express">Express</option>
                          </select>
                        ) : (
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">{field.placeholder}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        )
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Pricing and Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-right w-full md:w-auto">
                    <p className="text-sm text-gray-600 mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-primary">{option.prices.normal}</p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition">
                      Quick Enquiry
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="mb-6 text-lg">Get your visa approved quickly with our expert assistance</p>
          <button className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
            Apply Now
          </button>
        </div>
      </section>
    </>
  );
}