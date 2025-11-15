'use client';

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By using Elite Path's website and services, you agree to be bound by
              these Terms and Conditions. If you do not agree to these terms, please
              do not use our services.
            </p>

            <h2 className="text-2xl font-bold mb-4">2. Booking and Reservations</h2>
            <p className="text-gray-700 mb-6">
              All bookings made through our website are subject to availability and
              acceptance by the respective service providers. We reserve the right to
              cancel any booking if payment is not received or if misleading
              information was provided.
            </p>

            <h2 className="text-2xl font-bold mb-4">3. Cancellation Policy</h2>
            <p className="text-gray-700 mb-6">
              Cancellations must be made at least 7 days before the scheduled travel
              date to receive a full refund. Cancellations within 7 days may incur a
              20-50% cancellation fee depending on the service provider's policy.
            </p>

            <h2 className="text-2xl font-bold mb-4">4. Liability Limitations</h2>
            <p className="text-gray-700 mb-6">
              Elite Path shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from the use of our
              services. Our liability is limited to the amount paid for the booking.
            </p>

            <h2 className="text-2xl font-bold mb-4">5. Travel Documents</h2>
            <p className="text-gray-700 mb-6">
              It is your responsibility to ensure you have valid passports, visas, and
              travel documents as required by your destination country. We recommend
              checking visa requirements at least 30 days before your trip.
            </p>

            <h2 className="text-2xl font-bold mb-4">6. Travel Insurance</h2>
            <p className="text-gray-700 mb-6">
              We strongly recommend purchasing travel insurance to cover unexpected
              circumstances such as cancellations, medical emergencies, and lost
              luggage.
            </p>

            <h2 className="text-2xl font-bold mb-4">7. User Conduct</h2>
            <p className="text-gray-700 mb-6">
              Users agree not to engage in any unlawful, threatening, abusive, or
              defamatory conduct on our platform. We reserve the right to terminate
              accounts that violate this policy.
            </p>

            <h2 className="text-2xl font-bold mb-4">8. Modifications to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms and Conditions at any time.
              Changes will be effective immediately upon posting to the website.
              Continued use of our services constitutes acceptance of modified terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
