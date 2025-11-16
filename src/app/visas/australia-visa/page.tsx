"use client";

import React from "react";
import { useCurrency } from "@/lib/CurrencyContext";

// Australia Visa Page (Elite Path version)
// Copy into /pages/australia-visa.jsx or /app/australia-visa/page.jsx
// Tailwind CSS required

export default function AustraliaVisaPage() {
  const { selectedCurrency, convertPrice } = useCurrency();
  const documents = [
    "Passport with a minimum validity of six months",
    "UAE residence visa with 90+ days validity",
    "Recent photograph (3.5 x 4.5 cm, white background)",
    "Six-month bank statement with bank stamp",
    "NOC letter from employer (salary, designation, joining date, purpose)",
    "Trade license copy for business owners",
    "Invitation letter (if visiting family or for business)",
  ];

  const assistance = [
    "Visa application form filling assistance",
    "Document verification",
    "Appointment scheduling assistance",
    "Flight & hotel booking support",
    "Full guidance by Elite Path consultants",
  ];

  const specialNotes = [
    "Visa approval is at the sole discretion of Australia Immigration.",
    "Processing time may vary based on nationality and document completeness.",
    "Visa & service fees are non‑refundable.",
    "Elite Path does not guarantee visa approval.",
  ];

  const faqs = [
    {
      q: "Do UAE residents need a visa for Australia?",
      a: "Yes. All UAE residents (except Australian and New Zealand passport holders) require a visa to enter Australia.",
    },
    {
      q: "How long does Australia visa processing take?",
      a: "A standard tourist visa may take between 25 to 45 working days depending on nationality.",
    },
    {
      q: "Will I be required to submit biometrics?",
      a: "Yes, most applicants need to provide biometrics at an authorized VAC.",
    },
    {
      q: "Does Elite Path guarantee visa approval?",
      a: "No. Visa approval is strictly determined by Australian Immigration.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
        {/* HEADER */}
        <header className="p-6 border-b">
          <h1 className="text-3xl font-bold">Australia Visa</h1>
          <p className="mt-2 text-sm text-gray-600">
            Australia Visa — Tourist & Business Visa Assistance by Elite Path
          </p>
        </header>

        <section className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            <img
              src="https://www.raynatours.com/_nuxt/img/hero-australia.67e92f6.jpg"
              alt="Australia"
              className="w-full h-52 object-cover rounded-lg shadow-sm mb-6"
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/900x300?text=Australia+Visa")}
            />

            <article className="prose max-w-none">
              <h2>Australia Visa Information</h2>
              <p>
                Planning a trip to Australia? Elite Path offers professional visa processing services for
                tourists, business travelers, and family visit applicants. With years of experience and
                a dedicated team, we ensure your documentation is accurate and complete.
              </p>

              <h3>Required Documents</h3>
              <ul className="list-disc pl-5">
                {documents.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <h3 className="mt-6">Elite Path Assistance</h3>
              <ul className="list-disc pl-5">
                {assistance.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>

              <h3 className="mt-6">Special Notes</h3>
              <ul className="list-disc pl-5">
                {specialNotes.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <h3 className="mt-6">How to Apply</h3>
              <p>
                Contact Elite Path and our consultants will guide you through every step — from form filling
                to document submission.
              </p>
              <p>
                Email: <a href="mailto:info@elitepath.com" className="text-blue-600">info@elitepath.com</a><br />
                Phone: <strong>+971 000 000 000</strong>
              </p>

              <h3 className="mt-6">Frequently Asked Questions</h3>
              <div>
                {faqs.map((f, idx) => (
                  <details key={idx} className="mb-3 border rounded p-3">
                    <summary className="cursor-pointer font-medium">{f.q}</summary>
                    <p className="mt-2 text-gray-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <div className="mb-4">
              <div className="text-sm text-gray-500">From</div>
              <div className="text-2xl font-bold">{selectedCurrency} {convertPrice(550).toLocaleString()}</div>
              <div className="text-xs text-gray-500">Processing: 25–45 working days</div>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold">Apply Now</button>
              <a
                href="mailto:info@elitepath.com?subject=Australia%20Visa%20Enquiry"
                className="w-full inline-block text-center py-2 rounded-lg border"
              >
                Quick Enquiry
              </a>
            </div>

            <div className="text-xs text-gray-500 mt-4">
              Elite Path — Trusted Visa Assistance Service
            </div>
          </aside>
        </section>

        <footer className="p-6 border-t text-sm text-gray-600 text-center">
          © Elite Path — Visa Assistance Services
        </footer>
      </div>
    </main>
  );
}
