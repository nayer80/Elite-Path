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
    <div dir={slug === 'usa-visa' ? 'ltr' : undefined}>
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
                        (option.type && option.type.toLowerCase().includes('canada')) || (option.type && option.type.toLowerCase().includes('usa')) ? (
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">{field.placeholder}</option>
                            <option value="normal">Normal</option>
                          </select>
                        ) : (
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">{field.placeholder}</option>
                            <option value="normal">Normal</option>
                            <option value="express">Express</option>
                          </select>
                        )
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
                    <button onClick={() => window.location.href = '/quick-enquiry'} className="flex-1 md:flex-none px-6 py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition">
                      Quick Enquiry
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Australia descriptive copy (moved below pricing) */}
                {slug === 'usa-visa' && option.type === 'USA VISA L1' && (
                  <div className="mt-6 text-gray-700">
                    <h4 className="text-lg font-semibold mb-2">USA Visa Online</h4>
                    <p className="mb-2">
                      As a leader in international visa services, Elite Path is a trusted source for all your USA visa requirements. We specialize in a full range of expert services designed to turn the stress of complicated visa procedures into a completely hassle-free experience. Our visa department is staffed with highly competent specialists who possess in-depth knowledge and extensive experience working efficiently with almost all consulates and embassies in the UAE. This enables us to recommend the most suitable visa options for you and minimize any chances of your US visa application being rejected.
                    </p>
                    <p className="mb-2">
                      Whether you're traveling to the US for tourism or for an important business meeting or conference, we will represent you promptly in all your visa-related requirements. We assist you in preparing your application by accurately outlining and verifying all necessary documents to ensure fast visa processing. Unlike many other service providers who outsource their visa services, we handle the entire procedure from start to finish. This allows us to keep you updated on your visa status and, most importantly, ensure a smooth and timely approval of your US visa.
                    </p>

                    <h5 className="font-semibold mt-4">USA Visa Documents</h5>
                    <p className="font-semibold mt-2">Client Documents</p>
                    <ul className="list-disc list-inside mb-3">
                      <li>Valid UAE residence visa with at least 30 days of validity</li>
                      <li>Original passport (minimum 6 months validity with at least two blank pages)</li>
                      <li>Original NOC letter stating salary, designation, joining date, and travel purpose for employees, addressed to the US Embassy</li>
                      <li>Valid trade license copy, along with a self-introduction letter stating monthly income and passport details for partners, investors, and owners</li>
                      <li>Three recent photographs with a white background (5 × 5 cm)</li>
                      <li>Latest 6-month online bank statement with bank stamp or original bank statement</li>
                      <li>Invitation letter from a friend or relative (optional but helpful)</li>
                      <li>Invitation letter required for business visa</li>
                      <li>Urgent service available with additional charges</li>
                    </ul>

                    <h5 className="font-semibold mt-2">Elite Path Assistance</h5>
                    <ul className="list-disc list-inside mb-3">
                      <li>Assistance with scheduling a US visa appointment</li>
                      <li>Application support and DS-160 form filling</li>
                      <li>Document verification</li>
                      <li>Flight and hotel booking assistance</li>
                    </ul>

                    <h5 className="font-semibold mt-2">Special Notes</h5>
                    <ul className="list-disc list-inside mb-3">
                      <li>Holiday packages available including flights, hotel, sightseeing, and transfers</li>
                      <li>Original passport will be held at the embassy for stamping</li>
                      <li>Client must personally visit the embassy to submit original documents</li>
                      <li>Service fees and visa fees are non-refundable in case of rejection</li>
                      <li>Confirmed return air ticket and hotel booking may be required at the airport when visiting the US</li>
                    </ul>

                    <h5 className="font-semibold mt-2">How to Apply for a USA Visa</h5>
                    <p className="mb-2">Simply contact any of the visa representatives at Elite Path, and leave the rest to us.</p>
                    <p className="mb-2">Get instant help from our expert team and stay worry-free throughout the visa process.</p>
                    <p className="mb-4">Contact us at: <a href="mailto:intvisas@elitepath.com" className="underline">intvisas@elitepath.com</a> or call our toll-free number <span className="font-semibold">80072962</span> or <span className="font-semibold">+971 42 087 543</span>.</p>

                    <h5 className="font-semibold mt-2">USA Visa FAQs</h5>
                    <div className="space-y-2">
                      <p><strong>Is it important to obtain a visa before traveling to the US?</strong><br/>Yes. A visa is mandatory for all UAE nationals and UAE residents who are not eligible for any type of visa exemption.</p>
                      <p><strong>Do you specialize in all types of US visas?</strong><br/>At Elite Path, we assist with obtaining US B1 and B2 visas only.</p>
                      <p><strong>What is the difference between a B1 and B2 US visa?</strong><br/>B1 Visa: For business travel such as meetings, conferences, or training. B2 Visa: For tourism, visiting family/friends, or medical treatment.</p>
                      <p><strong>How long is a US B1/B2 visa valid for?</strong><br/>The validity may range from a few months to 10 years, depending on your nationality and embassy discretion. Duration of stay is determined by the immigration officer at the port of entry.</p>
                      <p><strong>Can I work in the US on a B1/B2 visa?</strong><br/>No. Employment is strictly prohibited under the B1/B2 visa category.</p>
                      <p><strong>How can I apply for a US visa?</strong><br/>You may apply online or speak directly with one of our visa specialists. After reviewing your travel purpose and requirements, we advise you on the most suitable visa type and handle all paperwork to ensure your application is completed correctly.</p>
                      <p><strong>What are the prerequisites for a US visa application?</strong><br/>Required documents include: US visa application form confirmation page, original passport (minimum 6 months validity), two recent photos on a white background, cover letter explaining your US trip, 3-month bank statement, invitation letter (from company, family, or friends), employment contract copy, travel itinerary.</p>
                      <p><strong>Do I need travel insurance for my US trip?</strong><br/>Not mandatory, but strongly recommended due to high medical costs in the US.</p>
                      <p><strong>Do I need to attend a US visa interview?</strong><br/>Yes. Most applicants must attend an in-person interview at the US Embassy or Consulate. Applicants under 14 and over 79 may be exempt.</p>
                      <p><strong>Are children exempt from paying the visa fee?</strong><br/>No. All children require a visa and must pay the visa fee.</p>
                      <p><strong>Can I extend my stay in the US?</strong><br/>Yes. Our visa consultants can guide you through the extension procedure.</p>
                      <p><strong>What happens if I overstay my US visa?</strong><br/>Overstaying may result in visa cancellation, fines, or future travel bans.</p>
                      <p><strong>What is the processing time for a US visa?</strong><br/>Typically 4–5 working days. Approval will be communicated via your registered email.</p>
                      <p><strong>Can I track my visa application status?</strong><br/>Yes. You can track your application using your unique booking reference number.</p>
                    </div>
                  </div>
                )}
                {slug === 'australia-visa' && option.type === 'AUSTRALIA VISITOR VISA' && (
                  <div className="mt-6 text-gray-700">
                    <h4 className="text-lg font-semibold mb-2">Australia Visa Online</h4>
                    <p className="mb-2">
                      With its awe-inspiring blend of lively cities, coastal experiences, untouched wilderness, wildlife wonders, and natural diversity accompanied by laidback feel, Australia is easily one of the most sought-after vacation spots. So if you plan for a trip to this wonderful country, we can help you with all your travel arrangements including professional visa assistance.
                    </p>
                    <p className="mb-2">
                      As a specialist in international visa services, Elite Path offers prompt visa services to people who wish to travel to Australia from the UAE. Be it for holidaying or business purpose, our highly knowledgeable and experienced visa team will assist you through the meticulous procedures, from the expert advice on the selection of right visa as well as eligibility criteria to the submission of your application as per the rules and regulations to keep you updated till the approval and on time delivery of your Australian visa.
                    </p>
                    <p>
                      Make a quick enquiry of our visa services by filling out all relevant details, such as number of visas, travel date, and processing type. The rest is assured that our panel of experts will review your queries and get back to you at the earliest possible convenience, ensuring seamlessly quick visa processing. Depending on the type of visa, you'll be required to meet certain requirements for the approval of your visa. Please refer to the 'VisaDocuments' section for the entire list.
                    </p>
                  </div>
                )}

                {/* Canada-specific option content removed */}

                
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
    </div>
  );
}