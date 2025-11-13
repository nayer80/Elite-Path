'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Rayna Tours</h3>
            <p className="text-gray-300 text-sm">
              Your trusted partner for unforgettable travel experiences worldwide. We offer curated tours, hotel bookings, and visa services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-accent">About Us</a></li>
              <li><a href="/contact" className="hover:text-accent">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-accent">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-accent">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/activities" className="hover:text-accent">Activities</a></li>
              <li><a href="/hotels" className="hover:text-accent">Hotels</a></li>
              <li><a href="/holidays" className="hover:text-accent">Holidays</a></li>
              <li><a href="/visas" className="hover:text-accent">Visas</a></li>
              <li><a href="/cruises" className="hover:text-accent">Cruises</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="hover:text-accent">📘 Facebook</a>
              <a href="#" className="hover:text-accent">𝕏 Twitter</a>
              <a href="#" className="hover:text-accent">📷 Instagram</a>
            </div>
            <div className="text-sm">
              <p className="font-semibold mb-2">Contact:</p>
              <p>Email: info@raynatours.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Rayna Tours. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Designed and Developed with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
