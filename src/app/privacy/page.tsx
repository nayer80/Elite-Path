'use client';

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect information you provide directly to us, such as when you
              create an account, make a booking, or contact our support team. This
              includes your name, email address, phone number, and payment
              information.
            </p>

            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-6">
              We use the information we collect to provide, maintain, and improve our
              services, process transactions, send transactional and promotional
              emails, and provide customer support.
            </p>

            <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal
              information. However, no security system is impenetrable, and we cannot
              guarantee absolute security of your information.
            </p>

            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
            <p className="text-gray-700 mb-6">
              We may share your information with partner airlines, hotels, and tour
              operators to fulfill your booking. We do not sell your information to
              third parties.
            </p>

            <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-6">
              You have the right to access, update, or delete your personal
              information. Please contact us at privacy@raynatours.com to exercise
              these rights.
            </p>

            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@raynatours.com
              <br />
              Address: 123 Travel Street, New York, NY 10001
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
